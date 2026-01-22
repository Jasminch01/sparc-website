
import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "TESTIMONIALS SECTION",
  type: "document",
  fields: [
    defineField({
      name: "testimoniname",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Client Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Testimonial Description",
      type: "text",
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Show/hide this testimonial",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "testimoniname",
      subtitle: "designation",
    },
  },
});
