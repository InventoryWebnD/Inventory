export interface RecentConcept {
  id: string;
  tech: string;
  slug: string;
  title: string;
  timestamp?: number;
}

const STORAGE_KEY = "webnd_recent_concepts";
const MAX_RECENT_ITEMS = 6;

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function subscribeRecent(callback: () => void): () => void {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      notifyListeners();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

let cachedRaw: string | null = null;
let cachedSnapshot: RecentConcept[] = [];

export function getRecentSnapshot(): RecentConcept[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      const parsed = raw ? JSON.parse(raw) : [];
      cachedSnapshot = Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT_ITEMS) : [];
    }
    return cachedSnapshot;
  } catch {
    return [];
  }
}

export function getRecentConcepts(): RecentConcept[] {
  return getRecentSnapshot();
}

export function addRecentConcept(concept: {
  id: string;
  tech: string;
  slug: string;
  title: string;
}): void {
  if (typeof window === "undefined") return;

  try {
    const current = getRecentSnapshot();
    const filtered = current.filter((item) => item.id !== concept.id);
    const updated = [
      {
        id: concept.id,
        tech: concept.tech,
        slug: concept.slug,
        title: concept.title,
        timestamp: Date.now(),
      },
      ...filtered,
    ].slice(0, MAX_RECENT_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    notifyListeners();
  } catch (e) {
    console.error("Failed to save recent concept to localStorage:", e);
  }
}

export function clearRecentConcepts(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    notifyListeners();
  } catch (e) {
    console.error("Failed to clear recent concepts:", e);
  }
}
