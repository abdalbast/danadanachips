import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ar', type: 'string', title: 'Arabic' },
        { name: 'ckb', type: 'string', title: 'Central Kurdish' },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'tiktok', type: 'url', title: 'TikTok' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'wholesaleEmail',
      title: 'Wholesale Enquiries Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'halalCertification',
      title: 'Halal Certification Details',
      type: 'object',
      fields: [
        { name: 'certificateNumber', type: 'string', title: 'Certificate Number' },
        { name: 'issuingBody', type: 'string', title: 'Issuing Body' },
        { name: 'certificateImage', type: 'image', title: 'Certificate Image' },
      ],
    }),
    defineField({
      name: 'mediaKit',
      title: 'Media Kit',
      type: 'file',
      description: 'Upload PDF media kit for press/wholesale',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Default Meta Title',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Default Meta Description',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          type: 'image',
          title: 'Default OG Image',
          description: 'Default social sharing image (1200x630px)',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});

