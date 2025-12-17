/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";
import { FaHandshake } from "react-icons/fa";
export const Partners = {
  name: "partner",
  title: "PARTNERS",
  icon: FaHandshake,
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
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Partner Banner Image",
      type: "image",
      description: "Main image or banner for the partner",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "about",
      title: "About",
      type: "array",
      of: [{ type: "block" }],
      description: "Description about the partner organization",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "link",
      title: "Partner Website Address",
      type: "url",
      description: "Partner organization website URL",
      validation: (Rule: Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
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
