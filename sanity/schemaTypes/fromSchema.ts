/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";
import { FaGraduationCap } from "react-icons/fa";

export const fromSchema = {
  name: "forms",
  title: "OPPORTUNITY FORMS",
  icon: FaGraduationCap,
  type: "document",
  fields: [
    {
      name: "formName",
      title: "Form Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
      options: {
        list: [
          { title: "Internship", value: "internship" },
          { title: "Fellowship", value: "fellowship" },
        ],
        layout: "radio",
      },
    },
    {
      name: "form",
      title: "Form Link",
      type: "url",
      description: "Google Form URL",
      validation: (Rule: Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    },
  ],
  preview: {
    select: {
      title: "formName",
      subtitle: "category",
    },
    prepare(selection: Record<string, any>) {
      const { title, subtitle } = selection;
      return {
        title: title || "Untitled",
        subtitle: subtitle
          ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1)
          : "",
      };
    },
  },
};
