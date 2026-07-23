export interface Chapter {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  keyFormulas?: { label: string; formula: string }[];
  iconName: string;
}

export interface Feature {
  id: string;
  title: string;
  badge: string;
  description: string;
  highlights: string[];
  iconName: string;
}
