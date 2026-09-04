# ⚡ Electronics Dashboard

A modern, responsive **admin dashboard** for managing an electronics product catalog. Built for teams that need a fast, reliable way to keep their product inventory organized — from adding new items to tracking stock status across categories.

🔗 **Live Demo:** [electronics-dashboard-gamma.vercel.app](https://electronics-dashboard-gamma.vercel.app/)
📦 **Repository:** [github.com/Hossamfcai/Electronics_Dashboard](https://github.com/Hossamfcai/Electronics_Dashboard)

---

## 📖 About the Project

Electronics Dashboard is a single-page application (SPA) that gives store owners, warehouse staff, and inventory managers full control over an electronics product catalog through a clean, intuitive interface. Instead of digging through spreadsheets or juggling multiple tools, everything a team needs to manage products — creating, editing, deleting, searching, and filtering — lives in one place.

The project follows a clean React architecture with a strong separation between UI, state management, and API services, making it easy to extend, maintain, and scale as a business grows.

## ✨ Features

- **Add Products** — Create new electronics products through a validated form.
- **Update Products** — Edit existing product details at any time.
- **Delete Products** — Remove discontinued or incorrect listings.
- **Product Details View** — View full information for any individual product.
- **Search** — Instantly find products by name.
- **Filter by Stock Status** — Narrow the list down to *In Stock* or *Out of Stock* items.
- **Filter by Category** — Browse products grouped by electronics category (e.g., phones, laptops, accessories).
- **Statistics Page** — Get an at-a-glance overview of the product catalog.
- **Fully Integrated CRUD APIs** — All actions are backed by real API calls, not mock/local data.

## 🛠️ Tech Stack & Packages

| Package | Purpose |
|---|---|
| **React** | Core UI library used to build all components and pages. |
| **React DOM** | Renders React components into the browser DOM. |
| **React Router DOM** | Handles client-side routing/navigation between pages (products list, details, add product, statistics, 404). |
| **Mantine Core** | Provides pre-built, accessible UI components (buttons, modals, inputs, layout, etc.) for a polished interface. |
| **Mantine Form** | Manages form state and validation, used in the Add/Edit Product forms. |
| **Mantine Hooks** | Utility React hooks (e.g., disclosure, debounce for search, media queries) that simplify common UI logic. |
| **Axios** | Handles all HTTP requests to the backend API for product CRUD operations. |
| **Tailwind CSS** (`@tailwindcss/vite`, `postcss`, `autoprefixer`) | Utility-first CSS framework used for fast, consistent, and responsive styling. |
| **Framer Motion** | Powers smooth animations and page/component transitions for a more dynamic feel. |
| **Lucide React** | Lightweight, consistent icon set used throughout the dashboard's UI. |
| **Font Awesome Free** | Additional icon library used across the interface. |
| **SweetAlert2** | Displays elegant confirmation dialogs and alerts (e.g., "Are you sure you want to delete this product?"). |
| **Vite** | Fast build tool and development server powering the project. |
| **ESLint** | Enforces code quality and consistency across the codebase. |

## 💡 Why This Matters for Managing an Electronics Brand

Running an electronics brand means dealing with a constantly changing catalog — new models launch, older ones go out of stock, prices shift, and categories multiply (phones, laptops, audio, accessories, and more). This dashboard directly addresses those pain points:

- **Centralized control** — Every product action (add, edit, delete) happens in one place, reducing errors from scattered spreadsheets or manual processes.
- **Real-time stock visibility** — The in-stock / out-of-stock filter lets teams instantly see what needs restocking, helping prevent overselling or missed sales opportunities.
- **Faster decision-making** — Category filters and search let staff find any product in seconds, which matters when a catalog grows into hundreds of SKUs.
- **Better customer experience indirectly** — Accurate, up-to-date inventory data (kept current through this dashboard) means fewer mistakes reaching the storefront.
- **Scalable foundation** — Because the project is built with modular architecture, reusable hooks, and a dedicated API service layer, it can grow alongside the brand — adding new features like order management or analytics is straightforward.
- **Data-driven insight** — The statistics page gives a quick pulse on the catalog's health without needing to dig through raw data manually.

In short, this dashboard turns electronics inventory management from a manual, error-prone task into a fast, organized, and reliable workflow.

## 👥 Development Team

| Team Member | Contributions |
|---|---|
| **Hossam Ibrahim** | Designed the overall project architecture and routing structure. Implemented state management by combining `useReducer` and `useContext` with custom hooks. Built the API services layer that powers all product actions. Developed the Not Found page and the Landing page. |
| **Menna Elsayed** | Built the Statistics page and the Product Details page, integrating the APIs that power full CRUD functionality. |
| **Menna Khaled** | Built the Products List page, including search, filtering by stock status (in stock / out of stock), and filtering by category. Developed the Add Product form/page and integrated the APIs that power CRUD functionality. |

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Hossamfcai/Electronics_Dashboard.git
cd Electronics_Dashboard
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🌐 Live Project

Check out the live version here: **[electronics-dashboard-gamma.vercel.app](https://electronics-dashboard-gamma.vercel.app/)**
