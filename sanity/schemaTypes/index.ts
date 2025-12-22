import { type SchemaTypeDefinition } from "sanity";

import project from "./project";
import academicExperience from "./academicExperience";
import organizationExperience from "./organizationExperience";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, academicExperience, organizationExperience],
};
