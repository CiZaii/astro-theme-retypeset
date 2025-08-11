---
title: Theme Setup Guide
published: 2025-01-26T00:00:00.000Z
updated: 2025-04-13T00:00:00.000Z
draft: true
tags:
  - Blog Theme
  - Guide
pin: 99
lang: en
abbrlink: theme-guide
aicommit: "This is Zang-AI. This article introduces the setup guide for the Retypeset static blog theme based on the Astro framework, aimed at helping users quickly build personal blogs. The article's core content is divided into two parts: theme configuration and new article creation. In terms of theme configuration, it details how to customize site information, theme colors, global settings, comment system, search engine optimization, footer, and resource preloading by modifying configuration files, and mentions other configurations such as syntax highlighting, article summaries, Open Graph social cards, and RSS subscriptions. The new article creation section emphasizes the mandatory nature of core configuration items and introduces various advanced configurations such as drafts, pinning, table of contents generation, language specification, and custom article URLs. The article also introduces optimization operations to improve the formatting of mixed CJK and English text, adding spaces and correcting punctuation to optimize typography."
---

Retypeset is a static blog theme based on the [Astro](https://astro.build/) framework. This article serves as a setup guide for the Retypeset theme, primarily introducing how to modify theme configuration and create new articles to help you quickly build a personal blog.

## Theme Configuration

Customize your blog by modifying the configuration file [src/config.ts](https://github.com/radishzzz/astro-theme-retypeset/blob/master/src/config.ts).

### Site Information

Configure basic site information including title, subtitle, description, author, and URL.

### Color Settings

Set light and dark theme colors using OKLCH color values for consistent theming across the site.

### Global Settings

Configure default language, font styles, date format, table of contents, math rendering, and motion preferences.

### Comment System

Enable and configure comment systems including Giscus, Twikoo, and Waline with language-specific settings.

### SEO Settings

Set up search engine optimization including social media verification, analytics, and Open Graph settings.

### Footer Settings

Configure social links and website start year for the footer section.

### Preload Settings

Optimize performance with image hosting and custom analytics script configurations.

## Creating New Articles

Use the `pnpm new-post "Article Title"` command to create a new article with proper frontmatter template.

### Required Frontmatter

- `title`: Article title
- `published`: Publication date

### Optional Frontmatter

- `description`: Article description
- `updated`: Last updated date
- `tags`: Article tags array
- `draft`: Draft status (boolean)
- `pin`: Pin priority (0-99)
- `toc`: Table of contents (boolean)
- `lang`: Language code (en, zh, etc.)
- `abbrlink`: Custom URL slug
- `password`: Password protection

### Advanced Features

The theme supports:
- Reading time calculation
- Syntax highlighting with GitHub themes
- KaTeX math rendering
- Container directives for callouts
- Image optimization with LQIP
- Multi-language content support
- RSS feed generation

## Content Optimization

Use the formatting tools to optimize mixed CJK and English text by adding proper spacing and correcting punctuation for better typography.
