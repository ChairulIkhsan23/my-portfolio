import { client } from "@/sanity/lib/client";
import { Project } from "@/types/project";

const PROJECT_QUERY = `
*[_type == "project"] | order(_createdAt desc) {
  "id": _id,
  title,
  description,
  techStack,
  "imageUrl": image.asset->url,
  "imageWidth": image.asset->metadata.dimensions.width,
  "imageHeight": image.asset->metadata.dimensions.height,
  repoUrl,
  liveUrl
}
`;

export async function fetchProjects(): Promise<Project[]> {
  try {
    const projects = await client.fetch(PROJECT_QUERY);
    console.log("Fetched projects:", projects);
    console.log("First project image:", projects[0]?.imageUrl);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
