/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from "@sanity/types";

// Blogs Schema
export const Blogs = {
    name: 'blog',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input: string) => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '')
            },
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'writtenBy',
            title: 'Written By',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: "date",
            title: "Date",
            type: "date",
            options: {
                dateFormat: "DD MMMM YYYY",
            },
            validation: (rule: Rule) => rule.required(),
        },
        {
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule: { required: () => { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; }) => Rule.required().max(250)
        },
        {
            name: 'longdes',
            title: 'Long Description',
            type: 'text',
            rows: 10,
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'img',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string'
                }
            ],
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Indigenous Opinion', value: 'indigenous opinion' },
                    { title: 'News', value: 'news' },
                    { title: 'Analysis', value: 'analysis' },
                    { title: 'Feature', value: 'feature' }
                ],
                layout: 'dropdown'
            },
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Latest', value: 'latest' },
                    { title: 'Featured', value: 'featured' },
                    { title: 'Archived', value: 'archived' }
                ],
                layout: 'radio'
            },
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'subcategory',
            title: 'Subcategory',
            type: 'string',
            options: {
                list: [
                    { title: 'Latest', value: 'latest' },
                    { title: 'Old', value: 'old' }
                ],
                layout: 'radio'
            },
            validation: (Rule: { required: () => any; }) => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'title',
            author: 'writtenBy',
            date: 'date',
            media: 'img'
        },
        prepare(selection: { title: any; author: any; date: any; media: any; }) {
            const { title, author, date, media } = selection;
            return {
                title: title,
                subtitle: `${author} - ${date}`,
                media: media
            }
        }
    },
    orderings: [
        {
            title: 'Date, New',
            name: 'dateDesc',
            by: [{ field: 'date', direction: 'desc' }]
        },
        {
            title: 'Date, Old',
            name: 'dateAsc',
            by: [{ field: 'date', direction: 'asc' }]
        },
        {
            title: 'Author A-Z',
            name: 'authorAsc',
            by: [{ field: 'writtenBy', direction: 'asc' }]
        }
    ]
}

