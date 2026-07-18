export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  altText: string;
  fullStory?: string;
  date?: string;
  tools?: string[];
}

export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}
