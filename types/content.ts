export interface Technology {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface Concept {
  id: string;
  title: string;
  slug: string;
  tech: string;
  mdPath: string;
  summary: string;
  tags: string[];
  keywords: string[];
  related?: string[];
  category?: string;
  estimatedTime?: number;
  author?: string;
}
