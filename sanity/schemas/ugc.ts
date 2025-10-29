import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'ugcContent',
  title: 'UGC Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Instagram', value: 'instagram' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'instagram',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaUrl',
      title: 'Media URL',
      type: 'url',
      description: 'Direct link to the post/reel/video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Instagram/TikTok embed code (optional, for better display)',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Upload a screenshot or thumbnail',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ar', type: 'text', title: 'Arabic' },
        { name: 'ckb', type: 'text', title: 'Central Kurdish' },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author/Creator',
      type: 'string',
      description: 'Username or name of the creator',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Toggle to show/hide this content',
      initialValue: true,
    }),
    defineField({
      name: 'featuredProduct',
      title: 'Featured Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'Link to a product if this UGC features a specific flavour',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      author: 'author',
      media: 'thumbnailImage',
    },
    prepare({ title, platform, author, media }) {
      return {
        title: title || 'Untitled UGC',
        subtitle: `${platform}${author ? ` • @${author}` : ''}`,
        media,
      };
    },
  },
});

