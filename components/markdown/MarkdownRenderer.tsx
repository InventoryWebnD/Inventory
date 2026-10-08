import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import CodeBlock from "./CodeBlock";
import { slugify } from "@/lib/markdown";

interface MarkdownRendererProps {
  content: string;
}

// Recursively extracts plain text from any node (string, React element, AST node)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNodeText(node: any): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (typeof node === "object") {
    if (typeof node.value === "string") return node.value;
    if (node.props && node.props.children) {
      return getNodeText(node.props.children);
    }
    if (node.children) {
      return getNodeText(node.children);
    }
  }
  return "";
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none text-foreground font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Suppress top-level H1 in markdown to prevent duplicate visual title
          h1: () => null,
          h2: ({ children }) => {
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="font-serif text-[22px] sm:text-[26px] font-normal tracking-tight text-foreground mt-12 mb-4 scroll-mt-20 border-b border-border/60 pb-2"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h3
                id={id}
                className="font-sans text-lg font-bold tracking-tight text-foreground mt-8 mb-3 scroll-mt-20"
              >
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="my-5 text-[16px] sm:text-[18px] text-foreground/90 leading-[1.75]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-5 ml-6 list-disc space-y-2 text-[17px] sm:text-[18px] text-foreground/90 leading-[1.75]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-5 ml-6 list-decimal space-y-2 text-[17px] sm:text-[18px] text-foreground/90 leading-[1.75]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-[1.75] pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="my-7 border-l-4 border-accent pl-5 py-2.5 text-foreground/80 bg-muted/40 italic text-[17px] leading-relaxed rounded-lg not-prose">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-7 w-full overflow-x-auto rounded-lg border border-border shadow-hard-xs reveal">
              <table className="w-full text-left text-xs sm:text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/70 border-b border-border text-xs font-mono uppercase font-semibold text-muted-foreground">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-border/60">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-muted/30 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 sm:px-4 py-3 font-semibold text-foreground whitespace-nowrap">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 sm:px-4 py-3 text-foreground/90 align-top">{children}</td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-foreground underline decoration-accent underline-offset-4 hover:text-accent-ink transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const rawText = getNodeText(children);
            const isBlock = Boolean(match) || rawText.includes("\n");

            if (isBlock) {
              return (
                <CodeBlock
                  language={match ? match[1] : undefined}
                  rawText={rawText}
                >
                  <code className={className} {...props}>
                    {children}
                  </code>
                </CodeBlock>
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 rounded-lg bg-muted/70 text-foreground font-mono text-[13.5px] border border-border"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
