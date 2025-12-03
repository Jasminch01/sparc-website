import { Rule } from "@sanity/types";

export const Research = {
  name: "research",
  title: "Research Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, ""),
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Building Movements", value: "Building Movements" },
          { title: "Gender & Social Justice", value: "Gender & Social Justice" },
          { title: "Training & Workshop", value: "Training & Workshop" },
          { title: "Language & Education", value: "Language & Education" },
        ],
        layout: "dropdown",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "Ongoing" },
          { title: "Completed", value: "Completed" },
          { title: "Planned", value: "Planned" },
          { title: "On Hold", value: "On Hold" },
        ],
        layout: "radio",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      description: 'e.g., "2025-2026"',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
      description: "List of authors or organizations",
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "objectives",
      title: "Objectives",
      type: "array",
      of: [{ type: "string" }],
      description: "List of project objectives",
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "fundedBy",
      title: "Funded By",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "researchers",
      title: "Researchers",
      type: "array",
      of: [{ type: "string" }],
      description: "List of researchers or research organizations",
      validation: (Rule: Rule) => Rule.required().min(1),
    },
    {
      name: "methodology",
      title: "Methodology",
      type: "text",
      rows: 4,
      description: "Research methodology description",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "impact",
      title: "Impact",
      type: "text",
      rows: 4,
      description: "Project impact and outcomes",
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      status: "status",
      date: "date",
      media: "image",
    },
    prepare(selection: {
      title: string;
      category: string;
      status: string;
      date: string;
      media: unknown;
    }) {
      const { title, category, status, date, media } = selection;
      return {
        title: title,
        subtitle: `${category} - ${status} - ${date}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Category",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
    {
      title: "Status",
      name: "statusOrder",
      by: [{ field: "status", direction: "asc" }],
    },
    {
      title: "Date, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, Old",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
};