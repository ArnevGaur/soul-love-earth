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
- **Zero-Crash Architecture:** Systemically hardened to handle corrupt or invalid locale data with safe fallbacks.
- Dynamic layout flipping and typography adjustments.

### 🛍️ Comprehensive Storefront
- **Shop Page:** Dynamic filtering by category, search queries, and sorting.
- **Product Details:** High-performance sliding carousel with fluid transitions and premium navigation.
- **Smart Navigation:** Context-aware redirection that returns users to their previous location when emptying the cart from the Checkout view.
- **Cart Drawer:** A sliding-edge global cart with real-time price parsing and defensive data sanitization.

### ✨ Premium UI / UX
- **Dynamic Masonry Grid:** Responsive category grid with nested accordion navigation.
- **Branding Unification:** Harmonized color palette across all primary CTAs using signature **#2c635a** green and **#d4a843** gold.
- **Geometric Excellence:** Consistent use of pill-shaped (40px) geometry for all buttons, inputs, and badges.

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