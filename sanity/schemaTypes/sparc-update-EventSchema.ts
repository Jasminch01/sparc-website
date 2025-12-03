/* eslint-disable @typescript-eslint/no-explicit-any */

// Events schema
export const Events = {
    name: 'event',
    title: 'Sparce Update Event',
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
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Upcoming', value: 'Upcoming' },
                    { title: 'Ongoing', value: 'Ongoing' },
                    { title: 'Completed', value: 'Completed' },
                    { title: 'Cancelled', value: 'Cancelled' }
                ],
                layout: 'radio'
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
            name: 'timeLeft',
            title: 'Time Left',
            type: 'string',
            description: 'e.g., "6d 2hr" - leave empty for past events',
            hidden: ({ parent }: { parent?: any }) => parent?.status === 'Completed' || parent?.status === 'Cancelled'
        },
        {
            name: 'des',
            title: 'Description',
            type: 'text',
            rows: 4,
            validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
            name: 'img',
            title: 'Event Image',
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
        }
    ],
    preview: {
        select: {
            title: 'title',
            status: 'status',
            date: 'date',
            timeLeft: 'timeLeft',
            media: 'img'
        },
        prepare(selection: { title: any; status: any; date: any; timeLeft: any; media: any; }) {
            const { title, status, date, timeLeft, media } = selection;
            const subtitle = timeLeft
                ? `${status} - ${date} (${timeLeft})`
                : `${status} - ${date}`;
            return {
                title: title,
                subtitle: subtitle,
                media: media
            }
        }
    },
    orderings: [
        {
            title: 'Status',
            name: 'statusOrder',
            by: [{ field: 'status', direction: 'asc' }]
        },
        {
            title: 'Date, New',
            name: 'dateDesc',
            by: [{ field: 'date', direction: 'desc' }]
        }
    ]
}

