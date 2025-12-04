/* eslint-disable @typescript-eslint/no-explicit-any */

const archiveSchema = {
  name: "archivePost",
  title: "Archive Post",
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
      name: "des",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule: {
        required: () => {
          (): any;
          new(): any;
          max: { (arg0: number): any; new(): any };
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
      options: {
        list: [
          { title: "Historical Records", value: "historical records" },
          { title: "Community Stories", value: "Community Stories" },
          { title: "News and Update", value: "News and Update" },
        ],
        layout: "dropdown",
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "longdes",
      title: "Long Description",
      type: "text",
      rows: 10,
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .replace(/\s+/g, "-")
            .toLowerCase()
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
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
