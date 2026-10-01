import { SearchItem } from "@/types/search";
import { ArrowRight } from "lucide-react";

interface SearchResultProps {
  item: SearchItem;
  isSelected?: boolean;
  onSelect: (item: SearchItem) => void;
}

export default function SearchResult({
  item,
  isSelected = false,
  onSelect,
}: SearchResultProps) {
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(item)}
      className={`px-3.5 py-2.5 rounded-none cursor-pointer transition-all flex items-center justify-between gap-3 border ${
        isSelected
          ? "bg-foreground text-background border-foreground shadow-hard-xs"
          : "border-transparent hover:border-border hover:bg-muted/60 text-foreground"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded-none border ${
              isSelected
                ? "bg-background/20 border-background/30 text-background"
                : "bg-muted border-border text-muted-foreground"
            }`}
          >
            {item.tech}
          </span>
          <span className="font-semibold text-sm truncate font-sans">{item.title}</span>
        </div>
        <p
          className={`text-xs truncate leading-relaxed ${
            isSelected ? "text-background/80" : "text-muted-foreground"
          }`}
        >
          {item.summary}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="hidden sm:flex gap-1">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-none border ${
                isSelected
                  ? "bg-background/15 border-background/20 text-background"
                  : "bg-muted/50 border-border text-muted-foreground"
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>
        <ArrowRight
          className={`w-3.5 h-3.5 ${
            isSelected ? "text-background" : "text-muted-foreground"
          }`}
        />
      </div>
    </div>
  );
}
