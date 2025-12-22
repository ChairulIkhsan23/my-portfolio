import { defineType, defineField } from "sanity";

export default defineType({
  name: "organizationExperience",
  title: "Organizational Experience",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category Label",
      type: "string",
      initialValue: "Organization",
      readOnly: true,
    }),

    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      description: "Example: Project Contributor",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "organization",
      title: "Organization Name",
      type: "string",
      description: "Example: Local NGO Digital Initiative",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "Example: 2022 – 2023",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "highlights",
      title: "Key Highlights",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points shown in the card",
    }),

    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "For slider / pagination order",
    }),
  ],
});
