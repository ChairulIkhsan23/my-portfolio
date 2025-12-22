import {
  SiJavascript,
  SiPhp,
  SiReact,
  SiLaravel,
  SiVite,
  SiMysql,
  SiTailwindcss,
  SiGit,
  SiCanva,
  SiFigma,
} from "react-icons/si";

import type { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  category: string;
}

export const skills: Skill[] = [
  { name: "JavaScript", icon: SiJavascript, category: "Frontend" },
  { name: "PHP", icon: SiPhp, category: "Backend" },
  { name: "React", icon: SiReact, category: "Frontend" },
  { name: "Laravel", icon: SiLaravel, category: "Backend" },
  { name: "Vite", icon: SiVite, category: "Build Tools" },
  { name: "MySQL", icon: SiMysql, category: "Database" },
  { name: "Tailwind", icon: SiTailwindcss, category: "CSS" },
  { name: "Git", icon: SiGit, category: "Tools" },
  { name: "Canva", icon: SiCanva, category: "Design" },
  { name: "Figma", icon: SiFigma, category: "Design" },
];
