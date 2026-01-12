import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // For series posts
    series: z.object({
      name: z.string(),
      part: z.number(),
      total: z.number().optional(),
    }).optional(),
    // For interactive posts with components
    interactive: z.boolean().default(false),
  }),
});

export const collections = {
  'posts': postsCollection,
};