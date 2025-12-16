/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

export const indiSpeak = {
  name: "indispeakStories",
  title: "Story",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "writtenOn",
      title: "Written On",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "des",
      title: "Story Description",
      type: "text",
      rows: 10,
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "img",
      title: "Author Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "autorName",
      title: "Author Name",
      type: "string",
      description: "Name of the person sharing their story (optional)",
    },
    {
      name: "imgAlt",
      title: "Author title",
      type: "string",
      description: "Title of the author",
      validation: (rule: Rule) => rule.required(),
    },
    {
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description:
        "Mark this story as featured (maximum 3 featured stories allowed)",
      initialValue: false,
      validation: (Rule: Rule) =>
        Rule.custom(async (isFeatured, context) => {
          if (!isFeatured) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-01-01" });

          const featuredStories = await client.fetch(
            `count(*[_type == "indispeakStories" && isFeatured == true && _id != $id])`,
            { id: document?._id }
          );

          if (featuredStories >= 3) {
            return "Maximum 3 featured stories allowed. Please unfeature another story first.";
          }

          return true;
        }),
    },
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "imgAlt",
      media: "img",
      date: "writtenOn",
      isFeatured: "isFeatured",
    },
    prepare(selection: Record<string, any>) {
      const { title, subtitle, media, date, isFeatured } = selection;

      return {
        title: `${isFeatured ? "⭐ " : ""}${title || "Untitled"}`,
        subtitle: `${subtitle || "No description"} - ${date || "No date"}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Date, New",
      name: "dateDesc",
      by: [{ field: "writtenOn", direction: "desc" }],
    },
    {
      title: "Date, Old",
      name: "dateAsc",
      by: [{ field: "writtenOn", direction: "asc" }],
    },
  ],
};
