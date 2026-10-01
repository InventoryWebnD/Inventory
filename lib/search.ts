import Fuse, { type IFuseOptions } from "fuse.js";
import { SearchItem } from "@/types/search";
import searchIndexData from "@/data/search-index.json";

const searchIndex: SearchItem[] = searchIndexData as SearchItem[];

const fuseOptions: IFuseOptions<SearchItem> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "keywords", weight: 0.25 },
    { name: "tags", weight: 0.15 },
    { name: "summary", weight: 0.15 },
    { name: "tech", weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

let fuseInstance: Fuse<SearchItem> | null = null;

function getFuseInstance(): Fuse<SearchItem> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(searchIndex, fuseOptions);
  }
  return fuseInstance;
}

export function searchConcepts(query: string, techFilter?: string): SearchItem[] {
  const trimmed = query.trim();
  const fuse = getFuseInstance();

  let results: SearchItem[];

  if (!trimmed) {
    results = techFilter
      ? searchIndex.filter((item) => item.tech.toLowerCase() === techFilter.toLowerCase())
      : searchIndex.slice(0, 10);
  } else {
    const fuseResults = fuse.search(trimmed);
    results = fuseResults.map((result) => result.item);

    if (techFilter) {
      results = results.filter(
        (item) => item.tech.toLowerCase() === techFilter.toLowerCase()
      );
    }
  }

  return results;
}

export function getAllSearchItems(): SearchItem[] {
  return searchIndex;
}
