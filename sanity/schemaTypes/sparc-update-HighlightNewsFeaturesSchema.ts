/* eslint-disable @typescript-eslint/no-explicit-any */
// Update
export const Highlight_Stories_Features = {
    name: 'newsUpdate',
    title: 'News Highlight Stories ',
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
            name: 'date',
            title: 'Date',
            type: 'date',
            options: {
                dateFormat: "DD MMMM YYYY",
            },
            description: 'e.g., "October 2025"',
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Highlight', value: 'highlight' },
                    { title: 'Featured Stories', value: 'FEATURED_STORIES' },
                    { title: 'Latest News', value: 'LATEST_NEWS' },
                    { title: 'Breaking News', value: 'BREAKING_NEWS' }
                ],
                layout: 'dropdown'
            },
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'des',
            title: 'Description',
            type: 'text',
            rows: 8,
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
            hidden: ({ parent }: { parent?: any }) => parent?.category === 'LATEST_NEWS' && !!parent?.video
        },
        {
            name: 'video',
            title: 'Video URL',
            type: 'url',
            description: 'YouTube or other video URL',
            hidden: ({ parent }: { parent?: any }) => parent?.category !== 'LATEST_NEWS'
        }
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            date: 'date',
            media: 'img',
            video: 'video'
        },
        prepare(selection: { title: any; category: any; date: any; media: any; video: any; }) {
            const { title, category, date, media, video } = selection;
            const mediaType = video ? '🎥 Video' : '📷 Image';
            return {
                title: title,
                subtitle: `${category} - ${date} (${mediaType})`,
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
            title: 'Category',
            name: 'categoryAsc',
            by: [{ field: 'category', direction: 'asc' }]
        }
    ]
}
