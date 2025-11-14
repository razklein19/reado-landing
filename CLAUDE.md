# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page for Reado, a Hebrew-language platform for book summaries and educational content. The site is built with Create React App and features a single-page design with multiple sections showcasing the product.

## Essential Commands

### Development
- `npm start` - Start development server at http://localhost:3000
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build production bundle to `build/` folder

### Testing
- `npm test -- --coverage` - Run tests with coverage report
- `npm test -- --watchAll=false` - Run tests once without watch mode

## Architecture

### Component Structure
The app follows a simple component-based architecture with a single-page layout:

**src/App.js** - Main component that orchestrates all page sections in order:
1. Header (navigation)
2. Hero (main value proposition)
3. Features (key product features)
4. Stats (social proof metrics)
5. Topics (content categories with book carousel)
6. Testimonials (user reviews)
7. CTA (call-to-action)
8. Footer

### Key Components

**Header** (src/components/Header.js)
- Navigation bar with logo and links
- Hebrew RTL text
- Links to external Reado site (https://reado-il.com)

**Hero** (src/components/Hero.js)
- Hero section with headline and CTA
- Displays main product image from `/public/images/reado-phones-circle.png`

**Features** (src/components/Features.js)
- Grid of feature cards using emoji icons
- Data defined as inline array of objects

**Topics** (src/components/Topics.js)
- Topic tags/categories with interactive states
- BookCard carousel showing book covers from `/public/images/books/`

**BookCard** (src/components/BookCard.js)
- Reusable component for displaying book information
- Accepts title, author, and cover image props

### Styling Architecture

**Global Styles** (src/index.css)
- Base body and code font definitions
- Minimal global resets

**Component Styles** (src/App.css)
- All component-specific styles in a single file
- Uses RTL (right-to-left) layout via `direction: rtl` on body
- Color scheme: Primary #00d4aa (teal/cyan), gradients for hero/CTA
- Responsive breakpoints: 968px (hero), 768px (general)
- CSS Grid for layouts (features, stats, topics, testimonials, footer)

### Assets

**Images** stored in `/public/images/`:
- `reado-phones-circle.png` - Main hero image
- `/books/` subdirectory - Individual book cover images referenced by BookCard components

## Important Notes

### RTL (Right-to-Left) Support
The entire site is in Hebrew and uses RTL layout. When making layout changes:
- Text alignment defaults to right
- Flexbox/Grid direction flows right-to-left
- Margin/padding may need RTL-aware adjustments

### External Links
All CTAs and navigation buttons link to `https://reado-il.com` - the main Reado application.

### Create React App
This project uses standard Create React App configuration:
- No custom webpack config
- Uses react-scripts for build tooling
- Jest for testing with React Testing Library
