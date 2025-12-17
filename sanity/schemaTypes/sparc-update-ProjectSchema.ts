/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

// Sparc-update project schema
export const Projects = {
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "isHighlighted",
      title: "Highlight Project",
      type: "boolean",
      description: "Only 2 projects can be highlighted at a time",
      initialValue: false,
      validation: (Rule: Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-01-01" });

          const highlightedProjects = await client.fetch(
            `count(*[_type == "projects" && isHighlighted == true && _id != $id])`,
            { id: document?._id }
          );

          if (highlightedProjects >= 2) {
            return "Only 2 projects can be highlighted at a time. Please unhighlight another project first.";
          }

          return true;
        }),
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ongoing", value: "Ongoing" },
          { title: "Completed", value: "Completed" },
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
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "projectImage",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      status: "status",
      date: "date",
      isHighlighted: "isHighlighted",
      media: "projectImage",
    },
    prepare(selection: Record<string, any>) {
      const { title, status, date, isHighlighted, media } = selection;
      return {
        title: `${isHighlighted ? "⭐ " : ""}${title || "Untitled"}`,
        subtitle: `${status || "No status"} - ${date || "No date"}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Highlighted First",
      name: "highlightedFirst",
      by: [
        { field: "isHighlighted", direction: "desc" },
        { field: "date", direction: "desc" },
      ],
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
  ],
};
