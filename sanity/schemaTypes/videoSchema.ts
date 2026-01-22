import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'VIDEOS SECTION',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Enter the YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)',
      validation: (Rule) =>
        Rule.required().custom((url) => {
          if (!url) return true;
          if (url.includes('youtube.com/embed/') || url.includes('youtu.be/')) {
            return true;
          }
          return 'Please enter a valid YouTube URL';
        }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this video',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'thumbnail',
      order: 'order',
    },
    prepare(selection) {
      const { title, subtitle, media, order } = selection;
      return {
        title: `${order !== undefined ? `${order}. ` : ''}${title}`,
        subtitle: subtitle,
        media: media,
      };
    },
  },
})