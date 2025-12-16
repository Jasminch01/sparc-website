/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

// Events schema
export const Events = {
  name: "events",
  title: "Event",
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
          { title: "Upcoming", value: "Upcoming" },
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
      name: "timeLeft",
      title: "Time Left",
      type: "string",
      description: 'e.g., "6d 2hr" - leave empty for past events',
      hidden: ({ parent }: { parent?: any }) =>
        parent?.status === "Completed" || parent?.status === "Cancelled",
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
      title: "Event Image",
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
      timeLeft: "timeLeft",
      media: "img",
    },
    prepare(selection: Record<string, any>) {
      const { title, status, date, timeLeft, media } = selection;
      const subtitle = timeLeft
        ? `${status || "No status"} - ${date || "No date"} (${timeLeft})`
        : `${status || "No status"} - ${date || "No date"}`;
      return {
        title: title || "Untitled",
        subtitle: subtitle,
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
