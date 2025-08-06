# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Retypeset**, a static blog theme built with Astro that focuses on typography and elegant design. It's inspired by Typography theme and creates a reading experience reminiscent of paper books. The theme supports multiple languages, comment systems, and has rich customization options.

## Development Commands

### Core Development
- `pnpm dev` - Start development server with type checking
- `pnpm build` - Build for production with type checking and LQIP processing
- `pnpm preview` - Preview production build locally

### Code Quality
- `pnpm lint` - Run ESLint on all files
- `pnpm lint:fix` - Fix ESLint errors automatically

### Content Management
- `pnpm new-post <title>` - Create a new blog post with frontmatter template
- `pnpm format-posts` - Format existing posts
- `pnpm apply-lqip` - Apply Low Quality Image Placeholders after build

### Theme Maintenance
- `pnpm update-theme` - Update theme from upstream repository

## Architecture

### Key Technologies
- **Astro 5** - Static site generator with component islands
- **UnoCSS** - Atomic CSS framework with theme presets
- **TypeScript** - Type safety throughout
- **MDX** - Enhanced markdown with component support
- **Sharp** - Image processing and optimization

### Project Structure

**Core Configuration**
- `src/config.ts` - Main theme configuration (site info, colors, features)
- `astro.config.ts` - Astro framework configuration
- `uno.config.ts` - UnoCSS styling configuration with custom theme

**Content System**
- `src/content/` - Content collections (posts, about pages)
- `src/content.config.ts` - Content schema definitions with Zod validation
- Collections: `posts` (blog posts), `about` (about pages)

**Internationalization**
- `src/i18n/` - Complete i18n system
- `src/i18n/config.ts` - Language mappings for different services (Giscus, Twikoo, Waline)
- Supports 11 languages: de, en, es, fr, ja, ko, pl, pt, ru, zh, zh-tw

**Layout & Components**
- `src/layouts/` - Base page layouts
- `src/components/` - Reusable Astro components
- `src/components/Widgets/` - Interactive widgets (TOC, code copy, image zoom)

**Content Processing**
- `src/plugins/` - Custom Remark/Rehype plugins for markdown processing
- Plugins handle: heading anchors, external links, code copy buttons, image optimization, container directives

### Custom Features

**Typography & Design**
- Custom font loading with EarlySummer serif font
- OKLCH color system for consistent theming
- Responsive typography with CJK language support
- LQIP (Low Quality Image Placeholder) system

**Content Features**
- Reading time calculation
- Table of contents generation
- KaTeX math rendering support
- Syntax highlighting with GitHub themes
- Container directives for callouts

**Comment Systems**
- Supports Giscus, Twikoo, and Waline
- Language-specific configuration mapping

### Build System

The build process includes:
1. Astro type checking (`astro check`)
2. Static site generation (`astro build`)
3. LQIP processing for images
4. Asset compression (CSS, HTML, JS)

**Git Hooks**
- Pre-commit: ESLint with lint-staged on JS/TS/Astro files

### Path Mapping
- `@/*` maps to `src/*` for clean imports

## Content Management

Posts use frontmatter schema defined in `src/content.config.ts`:
- Required: `title`, `published` (date)
- Optional: `description`, `updated`, `tags`, `draft`, `pin`, `toc`, `lang`, `abbrlink`

The `new-post` script creates properly structured posts with correct frontmatter templates.

## Styling System

Uses UnoCSS with:
- Custom theme preset supporting light/dark modes
- Typography-focused font families
- Custom shortcuts for common patterns
- CJK language variants (`cjk:` prefix)
- Color scheme based on OKLCH values from theme config