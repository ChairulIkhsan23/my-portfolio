import { client } from "@/sanity/lib/client";

export async function fetchExperiences() {
  return client.fetch(`
    {
      "academic": *[_type == "academicExperience"] | order(order asc) {
        period,
        title,
        institution,
        description,
        highlights
      },
      "organization": *[_type == "organizationExperience"] | order(order asc) {
        period,
        role,
        organization,
        description,
        highlights
      }
    }
  `);
}
