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
        layout: "radio", // radio buttons
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
  validation: (Rule: Rule) =>
    Rule.custom(async (document: any, context: any) => {
      const { getClient } = context;
      const client = getClient({ apiVersion: "2023-01-01" });
      
      // Get the category of the current document
      const category = document?.category;
      
      if (!category) {
        return true; // Allow if no category is set yet
      }

      // Query for existing documents with the same category
      const query = `count(*[_type == "forms" && category == $category && _id != $id])`;
      const params = {
        category: category,
        id: document._id || "",
      };

      const count = await client.fetch(query, params);

      // If there's already a form with this category, prevent creation/update
      if (count >= 1) {
        return `Only one form per category is allowed. A ${category} form already exists.`;
      }

      return true;
    }),
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