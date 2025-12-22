import { defineType, defineField } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
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
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Next.js", value: "Next.js" },
          { title: "React", value: "React" },
          { title: "TypeScript", value: "TypeScript" },
          { title: "JavaScript", value: "JavaScript" },
          { title: "Tailwind CSS", value: "Tailwind CSS" },
          { title: "Laravel 12", value: "Laravel" },
          { title: "Vite", value: "Vite" },
          { title: "MySQL", value: "MySQL" },
          { title: "PostgreSQL", value: "PostgreSQL" },
          { title: "Sanity CMS", value: "Sanity CMS" },
          { title: "Node.js", value: "Node.js" },
          { title: "Express", value: "Express" },
        ],
        layout: "grid",
      },
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
        }),
      ],
    }),
    defineField({
      name: "repoUrl",
      title: "Repository URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Order for display (lower numbers appear first)",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  orderings: [
    {
      title: "Manual Order",
      name: "manualOrder",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Newest First",
      name: "newestFirst",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      techStack: "techStack",
    },
    prepare(selection) {
      const { title, media, techStack } = selection;
      return {
        title: title,
        media: media,
        subtitle: techStack ? techStack.join(", ") : "No tech stack",
      };
    },
  },
});
