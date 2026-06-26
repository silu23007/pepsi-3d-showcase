# 🥤 Pepsi 3D Immersive Showcase Portal

A premium, highly interactive, production-ready 3D product showcase landing page for Pepsi. Built using **React 19**, **Vite**, **Three.js / React Three Fiber**, and **GSAP**, this application features a high-fidelity interactive 3D soda can that dynamically transitions layouts, textures, and environmental lighting as users explore the product lineup.

---

## ✨ Features

*   **Cinematic 3D Product Canvas:** A flawlessly lit, responsive Three.js workspace rendering a physical product can with realistic material physics.
*   **Dynamic Scroll Transitions:** Powered by GSAP ScrollTrigger, scrolling seamlessly morphs the web app environment from standard **Pepsi Blue** (#004B87) to sleek **Zero Sugar Matte Black** or crisp **Diet Silver**.
*   **Micro-Interactions & Parallax:** Fluid cursor-tracking script causing the 3D can to organically tilt, float, and sway relative to pointer positioning.
*   **Studio Lighting Configuration:** Complete deployment of environment maps, clearcoat layers, and roughness settings mimicking realistic retail product photography.

---

## 🛠️ Tech Stack & Architecture

*   **Framework:** React 19 (Component-driven)
*   **Build Tool:** Vite 8
*   **3D Engine:** Three.js via `@react-three/fiber` (R3F)
*   **3D Helpers:** `@react-three/drei` (Lighting setup, loaders)
*   **Animation Engine:** GSAP (GreenSock Animation Platform) + ScrollTrigger
*   **Styling:** Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites
Ensure you have **Node.js (v20+ recommended)** installed on your machine.

### Installation
1. Clone the workspace files into your project directory.
2. Install the production and development dependencies listed in `package.json`:
   ```bash
   npm install
   ```

### Development
Launch the local development environment with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build
Compile and bundle optimized static assets for deployment:
```bash
npm run build
```
The output directory will be available under `/dist`.

---

## 📂 Project File Overview

*   `package.json` / `package-lock.json` — Defines critical module bindings including React 19, Vite 8, Three, Drei, and GSAP.
*   `vite.config.js` — Core optimization configuration initializing the `@vitejs/plugin-react` compiler pipeline.
*   `index.html` — The core single-page entry layout mounting the `#root` layout hook.
*   `eslint.config.js` — Flat style guide and strict safety lint rules protecting hooks and rendering cycles.

---

## 📐 Material Specifications (PBR)

To maintain absolute parity with the design system, the 3D models require the following texture attributes:

| Product Variant | Albedo Map | Roughness | Metallic | Accent Hex |
| :--- | :--- | :--- | :--- | :--- |
| **Classic Pepsi** | Royal Pepsi Decal | `0.15` | `0.90` | `#004B87` |
| **Pepsi Zero Sugar** | Sleek Dark Decal | `0.65` (Matte) | `0.40` | `#000000` |
| **Diet Pepsi** | Silver Brushed Foil | `0.20` | `0.95` | `#C9002B` |

---

## 📄 License
This project configuration is structured for branding and interactive web design benchmarks. All trademarked branding elements and labels belong to Soumya Ranjan Bhujabal.
