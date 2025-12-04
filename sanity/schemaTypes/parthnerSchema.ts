/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

export const Partners = {
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Partner Name",
      type: "string",
      description: "Name of the partner organization",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "logo",
      title: "Partner Logo",
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
      name: "image",
      title: "Partner Image",
      type: "image",
      description: "Main image or banner for the partner",
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
      name: "about",
      title: "About",
      type: "text",
      rows: 6,
      description: "Description about the partner organization",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Website Link",
      type: "url",
      description: "Partner organization website URL",
      validation: (Rule: Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Order in which this partner should appear (lower numbers appear first)",
      validation: (Rule: Rule) => Rule.integer().positive(),
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
      link: "link",
    },
    prepare(selection: Record<string, any>) {
      const { title, media, link } = selection;
      return {
        title: title || "Untitled Partner",
        subtitle: link || "No website link",
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
};
