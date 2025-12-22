import { client } from "@/sanity/lib/client";
import { Project } from "@/types/project";

const PROJECT_QUERY = `
*[_type == "project"]{
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
  return await client.fetch(PROJECT_QUERY);
}
