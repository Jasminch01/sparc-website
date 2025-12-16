/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

export const ReportsPublications = {
  name: "reports",
  title: "Reports",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "writtenOn",
      title: "Written On",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Reports", value: "reports" },
          { title: "Publications", value: "publications" },
        ],
        layout: "radio",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Date Range",
      type: "string",
      description: 'Year or year range (e.g., "2020-2021")',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "img",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "imgDes",
      title: "Image Description",
      type: "string",
      description: "Caption or description for the image",
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category === "publications",
    },
    // Publications-specific fields
    {
      name: "publisher",
      title: "Publisher",
      type: "string",
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category !== "publications",
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category !== "publications",
    },
    {
      name: "publicationLanguage",
      title: "Publication Language",
      type: "string",
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category !== "publications",
    },
    {
      name: "financialSupportBy",
      title: "Financial Support By",
      type: "string",
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category !== "publications",
    },
    {
      name: "releaseYear", // FIXED: Changed from 'relaseYear' to 'releaseYear'
      title: "Release Year",
      type: "number",
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category !== "publications",
    },
    {
      name: "releaseMonth",
      title: "Release Month",
      type: "string",
      description: 'e.g., "19 October"',
      hidden: ({ parent }: { parent?: { category?: string } }) =>
        parent?.category !== "publications",
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "date",
      media: "img",
    },
    prepare(selection: Record<string, any>) {
      const { title, category, date, media } = selection;
      return {
        title: title || "Untitled",
        subtitle: `${category || "No category"} - ${date || "No date"}`,
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
      title: "Date Range, New",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
};
