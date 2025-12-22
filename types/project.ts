export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  repoUrl?: string;
  liveUrl?: string;
}
