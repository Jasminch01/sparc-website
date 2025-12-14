/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";
import { DocumentTextIcon } from "@sanity/icons";

// Blogs Schema
export const Blogs = {
  name: "blog",
  title: "BLOGS",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      validation: (Rule: Rule) => Rule.required().max(250),
    },

    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: "writtenBy",
      title: "Written By",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "img",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "writtenBy",
      date: "date",
      media: "img",
    },
    prepare(selection: Record<string, any>) {
      const { title, author, date, media } = selection;
      return {
        title: title || "Untitled",
        subtitle: `${author || "Unknown"} - ${date || "No date"}`,
        media: media,
      };
    },
  },
  orderings: [
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
    {
      title: "Author A-Z",
      name: "authorAsc",
      by: [{ field: "writtenBy", direction: "asc" }],
    },
  ],
};
