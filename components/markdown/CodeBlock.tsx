"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language?: string;
  rawText: string;
  children: React.ReactNode;
}

export default function CodeBlock({
  language,
  rawText,
  children,
}: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = async () => {
    if (!rawText) return;
    try {
      await navigator.clipboard.writeText(rawText);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code to clipboard:", err);
    }
  };

  const displayLanguage = language || "code";

  return (
    <div className="relative my-6 rounded-none overflow-hidden border border-border bg-[#0d1117] text-neutral-100 not-prose">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-[#161b22] text-xs font-mono">
        <span className="text-neutral-400 uppercase tracking-wider text-[11px] font-semibold">
          {displayLanguage}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-none border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-all cursor-pointer text-[11px] font-mono active:translate-x-0.5 active:translate-y-0.5"
          title="Copy code to clipboard"
        >
          {hasCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 opacity-70" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto p-4 text-[14px] sm:text-[15px] leading-relaxed font-mono">
        <pre className="!bg-transparent !p-0 !m-0 !overflow-visible">
          {children}
        </pre>
      </div>
    </div>
  );
}
