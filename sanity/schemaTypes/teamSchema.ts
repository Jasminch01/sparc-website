/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiTeamLine } from "react-icons/ri";
const socialWorkerTeamSchema = {
  name: "Team",
  title: "TEAM",
  icon : RiTeamLine,
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "Professional title (e.g., Social Worker, MD)",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Category One", value: "category one" },
          { title: "Category Two", value: "category two" },
          { title: "Category Three", value: "category three" },
          { title: "Category Four", value: "category four" },
        ],
        layout: "dropdown",
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
  },
};

export { socialWorkerTeamSchema };
