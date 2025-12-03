/* eslint-disable @typescript-eslint/no-explicit-any */

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
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'des',
            title: 'Short Description',
            type: 'text',
            rows: 3,
            validation: (Rule: { required: () => { (): any; new(): any; max: { (arg0: number): any; new(): any; }; }; }) => Rule.required().max(200)
        },
        {
            name: 'longDes',
            title: 'Long Description',
            type: 'text',
            rows: 6,
            validation: (Rule: { required: () => any; }) => Rule.required()
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
            validation: (Rule: { required: () => any; }) => Rule.required()
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
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'price',
            title: 'Price',
            type: 'string',
            description: 'Price in your currency (e.g., "4999")',
            validation: (Rule: { required: () => any; }) => Rule.required()
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
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'itemsSold',
            title: 'Items Sold',
            type: 'number',
            description: 'Number of enrollments or items sold',
            validation: (Rule: { required: () => { (): any; new(): any; integer: { (): { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; new(): any; }; }; }) => Rule.required().integer().min(0)
        },
        {
            name: 'updated',
            title: 'Last Updated',
            type: 'date',
            options: {
                dateFormat: "DD MMMM YYYY",
            },
            description: 'e.g., "October 2025"',
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'whatYouLearn',
            title: 'What You Learn / Target Audience',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of learnings or target audience points',
            validation: (Rule: { required: () => { (): any; new(): any; min: { (arg0: number): any; new(): any; }; }; }) => Rule.required().min(1)
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
        prepare(selection: { title: any; category: any; rating: any; price: any; media: any; }) {
            const { title, category, rating, price, media } = selection;
            return {
                title: title,
                subtitle: `${category} - ${rating} - ৳${price}`,
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