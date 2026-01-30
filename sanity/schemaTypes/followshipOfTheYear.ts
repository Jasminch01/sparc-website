/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiTeamLine } from "react-icons/ri";
import { Rule } from "@sanity/types";

// Section configuration (singleton)
export const fellowshipSection = {
  name: "fellowshipSection",
  title: "Fellowship Section Settings",
  icon: RiTeamLine,
  type: "document",
  fields: [
    {
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      description:
        "The main title for the fellowship section (e.g., FELLOWSHIP 2026)",
      validation: (Rule: Rule) => Rule.required(),
      initialValue: "FELLOWSHIP 2026",
    },
  ],
  preview: {
    select: {
      title: "sectionTitle",
    },
    prepare(selection: { title?: string; subtitle?: number }) {
      const { title } = selection;
      return {
        title: title || "Fellowship Section",
      };
    },
  },
};
// Fellowship members
export const fellowshipMember = {
  name: "fellowshipMember",
  title: "Fellowship Members",
  icon: RiTeamLine,
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Professional title (e.g., Social Worker, MD)",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
    prepare(selection: { title?: string; subtitle?: string; media?: any }) {
      const { title, subtitle, media } = selection;
      return {
        title: title || "Untitled",
        subtitle: subtitle || "No title",
        media,
      };
    },
  },
};
