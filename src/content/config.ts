import { defineCollection, z } from 'astro:content';

// ── Content blocks schema ──────────────────────────────────────
// Each block is a discriminated union on the `type` field.
// Sveltia CMS maps these to list-widget entries (see public/admin/config.yml).
// To add a new block type: add it here, create a component in
// src/components/blocks/, add it to BlockRenderer.astro, and to the CMS config.

// Heading — a single line of text (h2-level)
const headingBlock = z.object({
  type: z.literal('heading'),
  text: z.string(),
});

// Paragraph — rich text (bold, italic, links, lists) as HTML
const paragraphBlock = z.object({
  type: z.literal('paragraph'),
  body: z.string(), // HTML from the CMS rich-text editor
});

// Photo — uploaded image with optional caption, alt text, width control
const photoBlock = z.object({
  type: z.literal('photo'),
  image: z.string(), // path relative to site root, e.g. /uploads/foo.jpg
  alt: z.string(),
  caption: z.string().optional(),
  width: z.enum(['normal', 'wide', 'full-bleed']).default('normal'),
});

// YouTube — embedded video with optional caption
const youtubeBlock = z.object({
  type: z.literal('youtube'),
  url: z.string(),
  caption: z.string().optional(),
});

// Code — syntax-highlighted block with language and optional filename
const codeBlock = z.object({
  type: z.literal('code'),
  language: z.enum(['cpp', 'javascript', 'python', 'html', 'css']),
  code: z.string(),
  filename: z.string().optional(),
});

const blockSchema = z.discriminatedUnion('type', [
  headingBlock,
  paragraphBlock,
  photoBlock,
  youtubeBlock,
  codeBlock,
]);

// ── Posts collection ───────────────────────────────────────────
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    cover: z.string(),
    draft: z.boolean().default(false),
    blocks: z.array(blockSchema).default([]),
  }),
});

export const collections = { posts };
