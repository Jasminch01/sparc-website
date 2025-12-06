/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

// Sparc-update project schema
export const Projects = {
  name: "project",
  title: "Sparce Update Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
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
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      description: 'e.g., "October 2025"',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "fundedBy",
      title: "Funded By",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "des",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "img",
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
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      date: "date",
      media: "img",
    },
    prepare(selection: Record<string, any>) {
      const { title, status, date, media } = selection;
      return {
        title: title || "Untitled",
        subtitle: `${status || "No status"} - ${date || "No date"}`,
        media: media,
      };
    },
  },
  orderings: [
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
  ],
};
