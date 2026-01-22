/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";
import { ArchiveIcon, IconComponent } from "@sanity/icons";

const archiveSchema = {
  name: "archive",
  title: "Archive",
  icon: ArchiveIcon as IconComponent,
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "DD MMMM YYYY",
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      validation: (Rule: {
        required: () => {
          (): any;
          new (): any;
          max: { (arg0: number): any; new (): any };
        };
      }) => Rule.required().max(200),
    },
    {
      name: "img",
      title: "Featured Image",
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
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "img",
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
  ],
};

export { archiveSchema };
