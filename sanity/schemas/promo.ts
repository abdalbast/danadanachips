import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'promo',
  title: 'Promotion',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Promotion Title',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ar', type: 'string', title: 'Arabic' },
        { name: 'ckb', type: 'string', title: 'Central Kurdish' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ar', type: 'text', title: 'Arabic' },
        { name: 'ckb', type: 'text', title: 'Central Kurdish' },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Promo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Call-to-Action Text',
      type: 'object',
      fields: [
        { name: 'en', type: 'string', title: 'English' },
        { name: 'ar', type: 'string', title: 'Arabic' },
        { name: 'ckb', type: 'string', title: 'Central Kurdish' },
      ],
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Call-to-Action URL',
      type: 'string',
      description: 'Internal path (e.g., /products/spicy-crunch) or external URL',
    }),
    defineField({
      name: 'terms',
      title: 'Terms & Conditions',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ar', type: 'text', title: 'Arabic' },
        { name: 'ckb', type: 'text', title: 'Central Kurdish' },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this promotion on the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'image',
    },
    prepare({ title, startDate, endDate, media }) {
      const start = startDate ? new Date(startDate).toLocaleDateString() : '';
      const end = endDate ? new Date(endDate).toLocaleDateString() : '';
      return {
        title: title || 'Untitled Promotion',
        subtitle: `${start} - ${end}`,
        media,
      };
    },
  },
});

