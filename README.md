# Soul Love & Earth — E-Commerce Frontend

A premium, bilingual e-commerce platform built for the **Soul Love & Earth** conscious living brand. Designed with a luxury aesthetic featuring Apple-like page transitions, fluid responsive grids, and advanced glassmorphism.

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (with custom brand tokens & animations)
- **Routing:** React Router v7
- **Animations:** Framer Motion (Page Transitions)
- **Icons:** Lucide React
- **State Management:** Custom React Contexts (`CartContext`, `LanguageContext`)

## Key Features

### 🌍 Full Bilingual Support (Context API)
- Complete English (LTR) and Arabic (RTL) localization.
- Dynamic layout flipping and typography adjustments based on the active language.
- Real-time language switching without page reloads.

### 🛍️ Comprehensive Storefront
- **Shop Page:** Dynamic filtering by category, search queries, and sorting.
- **Hospitality Collection:** A dedicated B2B view for hotel amenities and bulk products.
- **Cart Drawer:** A slide-out global cart with real-time price calculations.
- **Order Tracking:** A dedicated `/orders` portal.

### ✨ Premium UI / UX
- **Apple-Style Transitions:** Smooth, choreographed fade and slide animations between pages.
- **Glassmorphism:** Frost-glass navigation bars that adapt to scroll state.
- **Responsive Architecture:** Pixel-perfect on both mobile and 4K desktop screens.

## Project Structure

```
src/
├── components/
│   ├── home/           # Homepage sections (Hero, ValueProps, Categories)
│   ├── layout/         # Core layout wrappers (Navbar, Footer, CartDrawer, PageTransition)
│   └── ui/             # Reusable UI elements (ProductCard, WhatsAppButton)
├── context/
│   ├── CartContext.jsx      # Global cart state
│   └── LanguageContext.jsx  # Bilingual translations & RTL logic
├── pages/              # Route entry points (ShopPage, HospitalityPage, StoryPage, etc.)
├── services/
│   └── opencart.js     # Mock API endpoints (Prepared for real OpenCart integration)
├── App.jsx             # Main Router and Theme Provider
└── index.css           # Global CSS variables and core styling
```

## Running the Application

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

## Brand Identity

| Token         | Hex       | Usage                                |
|---------------|-----------|--------------------------------------|
| **Teal 500**  | `#3d9089` | Primary Brand Color / Buttons        |
| **Gold 400**  | `#d4a843` | Accents / Highlights / Labels        |
| **Cream**     | `#faf8f3` | Premium Background Base              |
| **Charcoal**  | `#2c2c2c` | Standard Body Text                   |

- **Display Font:** Cormorant Garamond (Headings)
- **Body Font:** Jost (UI components, paragraphs)