/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rule } from '@sanity/types';

// Learn schema
export const Learn = {
    name: 'learn',
    title: 'Learn',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'des',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule: Rule) => Rule.required().max(200)
        },
        {
            name: 'longDes',
            title: 'Long Description',
            type: 'text',
            rows: 6,
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Culture and Advocacy', value: 'Culture and Advocacy' },
                    { title: 'Indigenous History', value: 'Indigenous History' },
                    { title: 'Sovereignty and Resilience', value: 'Sovereignty and Resilience' },
                    { title: 'Anthropology', value: 'Anthropology' }
                ],
                layout: 'dropdown'
            },
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'img',
            title: 'Course Image',
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
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'price',
            title: 'Price',
            type: 'string',
            description: 'Price in your currency (e.g., "4999")',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'string',
            options: {
                list: [
                    { title: 'Bestseller', value: 'Bestseller' },
                    { title: 'Popular', value: 'Popular' },
                    { title: 'New', value: 'New' },
                    { title: 'Featured', value: 'Featured' }
                ],
                layout: 'radio'
            },
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'itemsSold',
            title: 'Items Sold',
            type: 'number',
            description: 'Number of enrollments or items sold',
            validation: (Rule: Rule) => Rule.required().integer().min(0)
        },
        {
            name: 'updated',
            title: 'Last Updated',
            type: 'date',
            options: {
                dateFormat: "DD MMMM YYYY",
            },
            description: 'e.g., "October 2025"',
            validation: (Rule: Rule) => Rule.required()
        },
        {
            name: 'whatYouLearn',
            title: 'What You Learn / Target Audience',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of learnings or target audience points',
            validation: (Rule: Rule) => Rule.required().min(1)
        }
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            rating: 'rating',
            price: 'price',
            media: 'img'
        },
        prepare(selection: Record<string, any>) {
            const { title, category, rating, price, media } = selection;
            return {
                title: title || 'Untitled',
                subtitle: `${category || 'No category'} - ${rating || 'No rating'} - ৳${price || '0'}`,
                media: media
            }
        }
    },
    orderings: [
        {
            title: 'Category',
            name: 'categoryAsc',
            by: [{ field: 'category', direction: 'asc' }]
        },
        {
            title: 'Most Sold',
            name: 'itemsSoldDesc',
            by: [{ field: 'itemsSold', direction: 'desc' }]
        },
        {
            title: 'Price: Low to High',
            name: 'priceAsc',
            by: [{ field: 'price', direction: 'asc' }]
        },
        {
            title: 'Price: High to Low',
            name: 'priceDesc',
            by: [{ field: 'price', direction: 'desc' }]
        }
    ]
}