export interface Project {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  status: string;
  duration: string;
  authors: string[];
  objectives: string[];
  location: string;
  fundedBy: string;
  researchers: string[];
  methodology: string;
  impact: string;
}

export interface ResearchData {
  tabs: { id: string; label: string }[];
  projects: Project[];
}
