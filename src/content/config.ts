import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    silo: z.string().optional(),
    pubDate: z.string().optional(),
  })
});

export const collections = {
  'articles': articlesCollection,
};
