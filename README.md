# 🌿 Soul Love & Earth — E-Commerce Frontend

A premium, bilingual e-commerce platform built for the **Soul Love & Earth** conscious living brand. Designed with a luxury aesthetic featuring Apple-like page transitions, fluid responsive grids, and advanced glassmorphism.

---

## ✨ Brand Identity & Design System

The platform follows a strict design language to ensure a premium, high-end feel:

| Token             | Hex       | Usage                                |
|-------------------|-----------|--------------------------------------|
| **Forest Green**  | `#2c635a` | Primary Brand Color / Main Buttons   |
| **Teal 500**      | `#3d9089` | Secondary Brand Color / Titles       |
| **Gold 400**      | `#d4a843` | Highlights / Hover States / Badges   |
| **Cream**         | `#faf8f3` | Premium Background Base              |
| **Charcoal**      | `#2c2c2c` | Standard Body Text                   |

- **Typography**: 
  - `Cormorant Garamond`: Used for elegant, high-end headings.
  - `Jost`: Used for clean, modern UI components, prices, and paragraphs.
- **Geometry**: Consistent use of pill-shaped (40px) geometry for all buttons, inputs, and badges.
- **Aesthetics**: Dynamic glassmorphism, subtle micro-animations, and smooth page transitions.

---

## 🚀 Key Features

### 🌍 Full Bilingual Support (Context API)
- **Automatic RTL/LTR Switch**: Complete English (LTR) and Arabic (RTL) localization.
- **Dynamic Typography**: Font weights and sizes adjust automatically based on the selected language.
- **Zero-Crash Architecture**: Hardened translation system with safe fallbacks.

### 🛍️ Comprehensive Storefront
- **Shop Page**: Dynamic filtering by category, real-time search, and price/name sorting.
- **Product Details**: High-performance image carousels with fluid transitions and zoom effects.
- **Smart Cart**: Global cart drawer with real-time price parsing and data sanitization.
- **Hospitality & Offers**: Dedicated sections for B2B hospitality products and limited-time collections.

### 🔐 User Experience & Auth
- **Seamless Authentication**: Built-in Login and Registration flows with form validation.
- **Order Tracking**: My Orders section to track current and past purchases.
- **Checkout Flow**: Secure, streamlined checkout process with order summary and payment integration.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── home/           # Homepage sections (Hero, ValueProps, Categories)
│   ├── layout/         # Core layout wrappers (Navbar, Footer, CartDrawer)
│   ├── shop/           # Shop-specific UI (Filters, ProductGrids)
│   └── ui/             # Reusable UI atoms (Buttons, Badges, Modals)
├── context/
│   ├── CartContext.jsx      # Global cart state & logic
│   └── LanguageContext.jsx  # Bilingual translations & RTL handling
├── pages/              # 19+ Dynamic Route entry points
│   ├── ShopPage.jsx           # Main product catalog
│   ├── ProductPage.jsx        # Individual product view
│   ├── HospitalityPage.jsx    # B2B Hospitality collection
│   ├── StoryPage.jsx          # Brand heritage and mission
│   ├── CheckoutPage.jsx       # Final checkout process
│   └── ...                    # Legal, Auth, and Support pages
├── services/
│   └── opencart.js     # API service layer (OpenCart integration)
├── App.jsx             # Main Router and Theme Provider
├── index.css           # Global CSS variables and design tokens
└── main.jsx            # React entry point
```

---

## 🛠️ Tech Stack

- **Core**: React 19 + Vite 8
- **Styling**: Vanilla CSS + Tailwind CSS (v4) for utility-first flexibility.
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Icons**: FontAwesome (via CDN)

---

## 🏁 Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ✅ Recent Updates

- [x] **Page Title Update**: Synchronized browser tab name to "Soul Love & Earth".
- [x] **Full Arabic Localization**: Implemented comprehensive RTL support across all core pages.
- [x] **Navigation Refinement**: Cleaned up the navigation bar for a more minimalistic aesthetic.
- [x] **Premium Favicon**: Integrated the brand logo as the official site favicon.