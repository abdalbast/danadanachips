import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
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
        source: 'name.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flavour',
      title: 'Flavour',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heatLevel',
      title: 'Heat Level',
      type: 'number',
      options: {
        list: [
          { title: 'No Heat', value: 0 },
          { title: 'Mild', value: 1 },
          { title: 'Medium', value: 2 },
          { title: 'Hot', value: 3 },
        ],
      },
      validation: (Rule) => Rule.required().min(0).max(3),
    }),
    defineField({
      name: 'puffType',
      title: 'Puff Type',
      type: 'string',
      options: {
        list: [
          { title: 'Light & Crispy', value: 'light' },
          { title: 'Big & Bold', value: 'big' },
          { title: 'Extra Puffy', value: 'extra-puffy' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', type: 'string', title: 'Size (e.g., 25g, 50g)' },
            { name: 'price', type: 'string', title: 'Price (optional)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'isHalal',
      title: 'Halal Certified',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show on homepage as top flavour',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
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
      name: 'ingredients',
      title: 'Ingredients',
      type: 'object',
      fields: [
        { name: 'en', type: 'text', title: 'English' },
        { name: 'ar', type: 'text', title: 'Arabic' },
        { name: 'ckb', type: 'text', title: 'Central Kurdish' },
      ],
    }),
    defineField({
      name: 'nutritionPer100g',
      title: 'Nutrition Facts (per 100g)',
      type: 'object',
      fields: [
        { name: 'energy', type: 'string', title: 'Energy (kcal)' },
        { name: 'fat', type: 'string', title: 'Fat (g)' },
        { name: 'saturatedFat', type: 'string', title: 'Saturated Fat (g)' },
        { name: 'carbohydrates', type: 'string', title: 'Carbohydrates (g)' },
        { name: 'sugars', type: 'string', title: 'Sugars (g)' },
        { name: 'protein', type: 'string', title: 'Protein (g)' },
        { name: 'salt', type: 'string', title: 'Salt (g)' },
      ],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          type: 'string',
          title: 'Meta Title',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          type: 'text',
          title: 'Meta Description',
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
      flavour: 'flavour',
      media: 'images.0',
      heatLevel: 'heatLevel',
    },
    prepare({ title, flavour, media, heatLevel }) {
      return {
        title: title || 'Untitled',
        subtitle: `${flavour} - Heat Level: ${heatLevel}`,
        media,
      };
    },
  },
});

