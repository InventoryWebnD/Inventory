"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export interface CubeFace {
  label: string;
  href: string;
}

interface HeroCubeProps {
  /** Up to 6 faces. Each face is a link to a topic. */
  faces: CubeFace[];
}

// Outward normal of each face, in the same order as the CSS (:nth-child 1..6)
const NORMALS: [number, number, number][] = [
  [0, 0, 1], // front
  [1, 0, 0], // right
  [0, 0, -1], // back
  [-1, 0, 0], // left
  [0, -1, 0], // top
  [0, 1, 0], // bottom
];
// light comes from the upper-left, in front of the cube
const LIGHT = (() => {
  const v = [-0.45, -0.65, 0.62];
  const l = Math.hypot(v[0], v[1], v[2]);
  return v.map((n) => n / l) as [number, number, number];
})();

const SPARKS = 6;

/**
 * Interactive 3D cube.
 *  - Press the LEFT mouse button (or touch) on it and DRAG to rotate. Hovering alone does nothing.
 *  - Let go while moving and it keeps spinning with inertia.
 *  - Click (without dragging) a face to open that topic with a colour-spread transition.
 *  - Arrow keys rotate it when a face is focused.
 *  - Live lighting: each face's shading + gloss follows its angle to a light source.
 */
export default function HeroCube({ faces }: HeroCubeProps) {
  const router = useRouter();
  const opening = useRef(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const s = useRef({
    rx: -24,
    ry: 35,
    vx: 0,
    vy: 0,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    dragging: false,
    downX: 0,
    downY: 0,
    moved: 0,
    raf: 0,
    intro: 0,
  });

  /** Apply rotation + per-face lighting. */
  const paint = useCallback(() => {
    const { rx, ry } = s.current;
    const cube = cubeRef.current;
    if (!cube) return;
    cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

    const a = (rx * Math.PI) / 180;
    const b = (ry * Math.PI) / 180;
    const cx = Math.cos(a), sx = Math.sin(a);
    const cy = Math.cos(b), sy = Math.sin(b);
    const kids = cube.children;
    for (let i = 0; i < kids.length && i < 6; i++) {
      const [nx, ny, nz] = NORMALS[i];
      // CSS: rotateX(rx) rotateY(ry)  =>  p' = Rx * Ry * p
      const x1 = nx * cy + nz * sy;
      const z1 = -nx * sy + nz * cy;
      const y2 = ny * cx - z1 * sx;
      const z2 = ny * sx + z1 * cx;
      const lit = Math.max(0, x1 * LIGHT[0] + y2 * LIGHT[1] + z2 * LIGHT[2]);
      const el = kids[i] as HTMLElement;
      el.style.setProperty("--shade", (0.4 * (1 - lit)).toFixed(3));
      el.style.setProperty("--gloss", (0.06 + 0.55 * lit ** 3).toFixed(3));
    }
  }, []);

  /** Inertia after release / key presses. */
  const step = useCallback(() => {
    const st = s.current;
    if (st.dragging) {
      st.raf = 0;
      return;
    }
    st.ry += st.vx;
    st.rx += st.vy;
    st.vx *= 0.94;
    st.vy *= 0.94;
    paint();
    if (Math.abs(st.vx) > 0.03 || Math.abs(st.vy) > 0.03) {
      st.raf = requestAnimationFrame(step);
    } else {
      st.raf = 0;
    }
  }, [paint]);

  const kick = useCallback(
    (dvx: number, dvy: number) => {
      const st = s.current;
      st.vx = Math.max(-30, Math.min(30, st.vx + dvx));
      st.vy = Math.max(-30, Math.min(30, st.vy + dvy));
      if (!st.raf) st.raf = requestAnimationFrame(step);
    },
    [step]
  );

  // Intro: the cube spins in once and settles. After that it only moves when YOU move it.
  useEffect(() => {
    const st = s.current;
    paint();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const baseRx = st.rx;
    const baseRy = st.ry;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 4); // easeOutQuart
      st.ry = baseRy - 540 * (1 - e);
      st.rx = baseRx + 60 * (1 - e);
      paint();
      st.intro = t < 1 ? requestAnimationFrame(tick) : 0;
    };
    st.intro = requestAnimationFrame(tick);

    return () => {
      if (st.intro) cancelAnimationFrame(st.intro);
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, [paint]);

  /* ---------- drag with the left mouse button (or a finger) ---------- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return; // left button only
    const st = s.current;
    if (st.intro) {
      cancelAnimationFrame(st.intro);
      st.intro = 0;
    }
    if (st.raf) {
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    }
    st.dragging = true;
    st.vx = 0;
    st.vy = 0;
    st.lastX = st.downX = e.clientX;
    st.lastY = st.downY = e.clientY;
    st.lastT = performance.now();
    st.moved = 0;
    stageRef.current?.classList.add("is-dragging");

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - st.lastX;
      const dy = ev.clientY - st.lastY;
      st.lastX = ev.clientX;
      st.lastY = ev.clientY;
      st.moved = Math.max(st.moved, Math.hypot(ev.clientX - st.downX, ev.clientY - st.downY));
      if (st.moved <= 4) return; // ignore tiny jitter so a click stays a click
      st.ry += dx * 0.55;
      st.rx -= dy * 0.55;
      // smoothed release velocity
      st.vx = st.vx * 0.5 + dx * 0.55 * 0.5;
      st.vy = st.vy * 0.5 - dy * 0.55 * 0.5;
      st.lastT = performance.now();
      paint();
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      st.dragging = false;
      stageRef.current?.classList.remove("is-dragging");
      // if the pointer stopped before release, don't fling
      if (performance.now() - st.lastT > 90) {
        st.vx = 0;
        st.vy = 0;
      }
      st.vx = Math.max(-30, Math.min(30, st.vx));
      st.vy = Math.max(-30, Math.min(30, st.vy));
      if (!st.raf) st.raf = requestAnimationFrame(step);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  // A drag must not count as a click on a face.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (s.current.moved > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
    s.current.moved = 0;
  };

  /**
   * Click a face -> that face's colour spreads from the click point until it fills the screen,
   * then we navigate and the colour fades away to reveal the topic page.
   */
  const openFace = (e: React.MouseEvent<HTMLAnchorElement>, face: CubeFace) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (opening.current) return;

    const el = e.currentTarget;
    const cs = getComputedStyle(el);
    const bg = cs.backgroundColor;
    const fg = cs.color;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(face.href);
      return;
    }
    opening.current = true;

    // Keyboard "clicks" have no coordinates -> spread from the face centre.
    let x = e.clientX;
    let y = e.clientY;
    if (e.detail === 0 || (x === 0 && y === 0)) {
      const r = el.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }

    const overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9999",
      background: bg,
      color: fg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      pointerEvents: "all",
      clipPath: `circle(0px at ${x}px ${y}px)`,
      // same dotted texture as the site, drawn in the face's text colour
      backgroundImage: `radial-gradient(color-mix(in srgb, ${fg} 22%, transparent) 1.6px, transparent 1.8px)`,
      backgroundSize: "22px 22px",
    } as Partial<CSSStyleDeclaration>);

    const label = document.createElement("div");
    label.textContent = face.label;
    Object.assign(label.style, {
      fontFamily: "var(--font-mono), monospace",
      fontWeight: "800",
      letterSpacing: "-0.04em",
      fontSize: "clamp(4rem, 16vw, 11rem)",
      opacity: "0",
    } as Partial<CSSStyleDeclaration>);
    overlay.appendChild(label);
    document.body.appendChild(overlay);

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const spread = overlay.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${radius + 40}px at ${x}px ${y}px)` },
      ],
      { duration: 650, easing: "cubic-bezier(.7,0,.2,1)", fill: "forwards" }
    );
    label.animate(
      [
        { opacity: 0, transform: "scale(.6) translateY(20px)" },
        { opacity: 1, transform: "scale(1) translateY(0)" },
      ],
      { duration: 450, delay: 280, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" }
    );

    spread.onfinish = () => {
      router.push(face.href);
      // let the new page mount underneath, then fade the colour out
      window.setTimeout(() => {
        const fade = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 500,
          easing: "ease-out",
          fill: "forwards",
        });
        fade.onfinish = () => {
          overlay.remove();
          opening.current = false;
        };
      }, 350);
    };
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    s.current.moved = 0;
    const k = e.key;
    if (k === "ArrowLeft") kick(-6, 0);
    else if (k === "ArrowRight") kick(6, 0);
    else if (k === "ArrowUp") kick(0, 6);
    else if (k === "ArrowDown") kick(0, -6);
    else return;
    e.preventDefault();
  };

  return (
    <div className="cube-wrap">
      <div ref={stageRef} className="cube-stage float">
        {/* decorative: halo rings + twinkling sparks (the CUBE itself never turns on its own) */}
        <span className="cube-halo" aria-hidden="true" />
        <span className="cube-halo cube-halo--2" aria-hidden="true" />
        <div className="cube-orbit" aria-hidden="true">
          {Array.from({ length: SPARKS }, (_, i) => {
            const ang = (i / SPARKS) * Math.PI * 2;
            return (
              <span
                key={i}
                className="cube-spark"
                style={{
                  left: `${50 + 50 * Math.cos(ang)}%`,
                  top: `${50 + 50 * Math.sin(ang)}%`,
                  animationDelay: `${i * 0.45}s`,
                }}
              >
                ✦
              </span>
            );
          })}
        </div>

        <div className="cube-lift">
          <div
            className="cube-scene"
            role="group"
            aria-label="Interactive 3D cube. Drag to rotate, click a face to open that topic."
            onPointerDown={onPointerDown}
            onKeyDown={onKeyDown}
            onClickCapture={onClickCapture}
            onDragStart={(e) => e.preventDefault()}
          >
            <div ref={cubeRef} className="cube">
              {faces.slice(0, 6).map((face, i) => (
                <Link
                  key={`${face.href}-${i}`}
                  href={face.href}
                  draggable={false}
                  onClick={(e) => openFace(e, face)}
                  aria-label={`Open ${face.label}`}
                  className="cube-face"
                >
                  <span>{face.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cube-shadow" aria-hidden="true" />
      <span className="cube-hint">Drag to spin · click a face to open</span>
    </div>
  );
}
