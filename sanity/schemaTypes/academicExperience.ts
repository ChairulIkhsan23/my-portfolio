import { defineType, defineField } from "sanity";

export default defineType({
  name: "academicExperience",
  title: "Academic Experience",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category Label",
      type: "string",
      initialValue: "Academic",
      readOnly: true,
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Example: Web Development Certification",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "institution",
      title: "Institution / Platform",
      type: "string",
      description: "Example: Online Learning Platform",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "period",
      title: "Period",
      type: "string",
      description: "Example: 2021 – 2022",
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
