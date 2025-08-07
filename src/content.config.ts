import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'
import { allLocales, themeConfig } from '@/config'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    // required
    title: z.string(),
    published: z.date(),
    // optional
    description: z.string().optional().default(''),
    updated: z.preprocess(
      val => val === '' ? undefined : val,
      z.date().optional(),
    ),
    tags: z.array(z.string()).optional().default([]),
    // Advanced
    draft: z.boolean().optional().default(false),
    pin: z.number().int().min(0).max(99).optional().default(0),
    toc: z.boolean().optional().default(themeConfig.global.toc),
    lang: z.enum(['', ...allLocales]).optional().default(''),
    abbrlink: z.string().optional().default('').refine(
      abbrlink => !abbrlink || /^[a-z0-9\-]*$/.test(abbrlink),
      { message: 'Abbrlink can only contain lowercase letters, numbers and hyphens' },
    ),
    aicommit: z.string().optional().default(''),
    knowledge_graph: z.object({
      nodes: z.array(z.object({
        id: z.string(),
        label: z.string(),
        type: z.string(),
        description: z.string().optional(),
        importance: z.number().min(0).max(1).optional(),
        category: z.enum(['primary', 'secondary', 'tertiary']).optional(),
      })),
      edges: z.array(z.object({
        id: z.string(),
        source: z.string(),
        target: z.string(),
        type: z.string(),
        label: z.string().optional(),
        weight: z.number().min(0).max(1).optional(),
      })),
      metadata: z.object({
        extracted_at: z.string().optional(),
        entity_count: z.number().int().min(0).optional(),
        relation_count: z.number().int().min(0).optional(),
        confidence: z.number().min(0).max(1).optional(),
      }).optional(),
    }).optional(),
  }),
})

const about = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/about' }),
  schema: z.object({
    lang: z.enum(['', ...allLocales]).optional().default(''),
  }),
})

export const collections = { posts, about }
