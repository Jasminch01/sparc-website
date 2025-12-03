/* eslint-disable @typescript-eslint/no-explicit-any */
// Sparc-update project schema
export const Projects = {
    name: 'project',
    title: 'Sparce Update Project',
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
                    { title: 'Ongoing', value: 'Ongoing' },
                    { title: 'Completed', value: 'Completed' },
                    { title: 'Planned', value: 'Planned' },
                    { title: 'On Hold', value: 'On Hold' }
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
            name: 'fundedBy',
            title: 'Funded By',
            type: 'string',
            validation: (Rule: { required: () => any; }) => Rule.required()
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
            title: 'Project Image',
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
            media: 'img'
        },
        prepare(selection: { title: any; status: any; date: any; media: any; }) {
            const { title, status, date, media } = selection;
            return {
                title: title,
                subtitle: `${status} - ${date}`,
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

