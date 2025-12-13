/* eslint-disable @typescript-eslint/no-explicit-any */

import { Rule } from '@sanity/types';

export const Story_News = {
    name: 'story',
    title: 'Story',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'date',
            title: 'Date',
            type: 'date',
            options: {
                dateFormat: 'DD MMMM, YYYY',
            },
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
            validation: (Rule: Rule) => Rule.required(),
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        },
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
            date: 'date',
        },
        prepare(selection: Record<string, any>) {
            const { title, media, date } = selection;
            return {
                title: title,
                subtitle: date,
                media: media,
            };
        },
    },
}