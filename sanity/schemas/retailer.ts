import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'retailer',
  title: 'Retailer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Retailer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: [
          { title: 'Iraq', value: 'IQ' },
          { title: 'Turkey', value: 'TR' },
          { title: 'Syria', value: 'SY' },
          { title: 'Iran', value: 'IR' },
          { title: 'Other', value: 'OTHER' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'geocode',
      title: 'Location',
      type: 'geopoint',
      description: 'Click on map to set location',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: 'Opening Hours',
      type: 'string',
      description: 'e.g., Mon-Fri: 9am-9pm, Sat-Sun: 10am-8pm',
    }),
    defineField({
      name: 'onlineUrl',
      title: 'Online Store URL',
      type: 'url',
      description: 'Link to retailer website or online store',
    }),
    defineField({
      name: 'logo',
      title: 'Retailer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this retailer on the store locator',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      city: 'city',
      country: 'country',
      media: 'logo',
    },
    prepare({ title, city, country, media }) {
      return {
        title: title || 'Untitled Retailer',
        subtitle: `${city}, ${country}`,
        media,
      };
    },
  },
});

