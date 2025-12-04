/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

export const indiSpeak = {
    name: "indispeak",
    title: "Indispeak Story",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "writtenOn",
            title: "Written On",
            type: "date",
            options: {
                dateFormat: "DD MMMM YYYY",
            },
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "des",
            title: "Story Description",
            type: "text",
            rows: 10,
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "img",
            title: "Story Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: "imgName",
            title: "Author Name",
            type: "string",
            description: "Name of the person sharing their story (optional)",
        },
        {
            name: "imgAlt",
            title: "Author Description",
            type: "string",
            description: "Description or title of the person",
            validation: (rule: Rule) => rule.required(),
        },
    ],

    preview: {
        select: {
            title: "title",
            subtitle: "imgAlt",
            media: "img",
            date: "writtenOn",
        },
        prepare(selection: Record<string, any>) {
            const { title, subtitle, media, date } = selection;

            return {
                title: title || "Untitled",
                subtitle: `${subtitle || "No description"} - ${date || "No date"}`,
                media,
            };
        },
    },

    orderings: [
        {
            title: "Date, New",
            name: "dateDesc",
            by: [{ field: "writtenOn", direction: "desc" }],
        },
        {
            title: "Date, Old",
            name: "dateAsc",
            by: [{ field: "writtenOn", direction: "asc" }],
        },
    ],
};