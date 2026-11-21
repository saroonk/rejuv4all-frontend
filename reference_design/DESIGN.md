---
name: Haute Botanique
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#715c1f'
  on-secondary: '#ffffff'
  secondary-container: '#fee095'
  on-secondary-container: '#786225'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#241a00'
  on-tertiary-container: '#978249'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#fee095'
  secondary-fixed-dim: '#e0c47c'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#584408'
  tertiary-fixed: '#fbe09e'
  tertiary-fixed-dim: '#ddc485'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#564512'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  display-hero:
    fontFamily: Bodoni Moda
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Bodoni Moda
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0em
  headline-md:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Bodoni Moda
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0.01em
  title-editorial:
    fontFamily: Bodoni Moda
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 30px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.14em
  label-refined:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.04em
spacing:
  gutter: 2rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 2rem
  space-xl: 4rem
---

## Brand & Style

This design system embodies the tension between haute-couture editorial poise and botanical precision. Designed for discerning clientele seeking high-performance beauty and restorative hair wellness, the experience evokes quiet confidence, sensory indulgence, and refined luxury.

The aesthetic fuses **Editorial Minimalism** with **Classical Architectural Discipline**:
- **Generous Spatial Rhythm:** Content breathes within expansive, deliberate white/ivory fields that mirror luxury print monographs.
- **Asymmetrical Compositions:** Hero layouts and product showcases employ offset grids, dramatic scale contrast, and overlapping text-over-imagery layers.
- **Architectural Precision:** Structural framing is defined through microscopic hairline borders in warm gold, eliminating heavy shadow drop-offs in favor of crisp, tactile separation.
- **Uncompromising Restraint:** No gimmicky gradients or loud ornamental flourishes. Depth is cultivated strictly through texture, contrast, and meticulous typographic cadence.

## Colors

The palette establishes an immediate high-contrast baseline grounded in Deep Black and luminous Soft Ivory, punctuated by precious Champagne Gold accents.

### Color Hierarchy & Roles
- **Primary (`#101010` - Deep Black):** Used for primary typography, editorial headlines, structural rules, and inverted high-priority action states.
- **Secondary (`#B49A57` - Champagne Gold):** Reserved for accent anchors, active indicator pips, luxury badges, hairline borders, and primary CTA frames.
- **Tertiary (`#C5AD70` - Muted Gold):** Deployed for subtle state changes, hover accents, subtle dividers, and secondary iconography.
- **Neutral Canvas (`#F7F6F2` - Soft Ivory):** The primary tactile background that softens pure digital white into a warm, organic, museum-grade paper texture.
- **Supporting Accents:**
  - `Pure White (#FFFFFF)`: Layered interior card planes and floating imagery panels.
  - `Rich Black (#171717)`: Dark mode surfaces and deep contrast block sections.
  - `Soft Grey (#EAE8E2)`: Inactive track states, tertiary borders, and neutral rules.
  - `Charcoal (#292929)`: Secondary copy, body text on dark blocks, and subtle iconography.

## Typography

The typographical architecture relies on a dramatic pairing between **Bodoni Moda** (for high-fashion editorial presence, dramatic thick-thin stroke cadence, and artisanal authority) and **Manrope** (for technical clarity, readability, and modern functional utility).

### Implementation Rules
- **Editorial Headlines:** Use Bodoni Moda in normal or italic weights to frame brand statements, collection titles, and sensory descriptions. Avoid all-caps for Bodoni Moda except in short 2-3 word category markers.
- **Functional Body Text:** Manrope light (`fontWeight: 300`) and regular (`fontWeight: 400`) ensure clinical, scientific descriptions remain effortlessly legible against the warm ivory ground.
- **Eyebrows & Labels:** Use `label-caps` in uppercase with wide tracking (`0.14em`) for metadata, micro-headers, formula percentages, and pricing indicators.

## Layout & Spacing

The layout model pairs a flexible 12-column grid with deliberate architectural offset principles.

### Grid & Composition
- **Desktop (1200px+):** 12-column grid with `4rem` margins and `2rem` gutters. Primary narrative layouts place imagery spanning 7 columns with asymmetrical text containers spanning 4 columns, offset by a single blank column to evoke magazine layout pacing.
- **Tablet (768px - 1199px):** 8-column grid with `2.5rem` outer margins and `1.5rem` gutters.
- **Mobile (< 768px):** 4-column fluid structure with `1.5rem` outer margins and `1rem` gutters. Complex multi-column product grids collapse into high-focus vertical stacks or horizontal edge-to-edge carousels with peek margins.

### Spacing Cadence
- Use `space-xl` (`4rem`) for section transitions to maintain an unhurried, luxury pace.
- Component micro-spacing uses strict multiples of 4px, where `space-xs` (4px) and `space-sm` (8px) govern tight pairings between badges and titles.

## Elevation & Depth

This design system rejects heavy, plastic drop shadows. Visual depth is engineered through **Tonal Layering** and **Hairline Structural Framing**:

- **Hairline Gold Separation:** Components separate from canvases via crisp 1px borders using `#B49A57` at `30%` opacity or `#EAE8E2` at `100%`.
- **Surface Layering:** 
  - Base level: Canvas `#F7F6F2`.
  - Elevated level: Pure White `#FFFFFF` panels resting flush on the canvas, outlined with hairline edges.
  - Inverted feature panels: Deep Black `#101010` backdrops that sink sections into deep contrast fields.
- **Luminous Ambient Hover (Micro-elevation):** For floating cart drawers or focused popovers, use an ultra-diffused, ambient gold-tinted shadow: `0px 20px 48px rgba(180, 154, 87, 0.08)`.

## Shapes

The shape system adopts a strict **Sharp (`0`)** architecture. Corners remain architectural, square (0px), and pristine, reflecting the cuts of high-end perfume packaging, clean cosmetic boxes, and bespoke apothecary bottles.

Pill-shapes and heavy curves are strictly prohibited to avoid playful or mass-market consumer tech aesthetics. Subtle exceptions are permitted only for circular thumbnail avatars or delicate status dot indicators.

## Components

### Buttons
- **Primary:** Deep Black (`#101010`) background, Pure White (`#FFFFFF`) text, sharp 0px corners, uppercase `label-caps` typography, 16px vertical padding, 32px horizontal padding. On hover, background shifts seamlessly to Champagne Gold (`#B49A57`) with text transitioning to `#101010`.
- **Secondary (Editorial Outline):** Transparent background with a 1px solid hairline border in `#101010` (or `#B49A57` on dark surfaces). Deep Black text. Hover fills the interior with `#101010` and white text.
- **Text Link CTA:** Inline Bodoni Moda or Manrope label accompanied by a thin extending gold hairline rule (`1px` height) that animates outward on hover.

### Product & Editorial Cards
- **Structure:** Clean square-cut cards set on `#FFFFFF` against the `#F7F6F2` canvas, bordered with a 1px `#EAE8E2` or muted gold hairline.
- **Imagery:** Product images occupy 70% of card height with generous internal inset padding (`space-md`), framed without drop shadows.
- **Details:** Hairline gold badges for botanical ingredients or product editions sit top-left in `label-caps`.

### Input Fields & Controls
- **Form Inputs:** Minimalist underline-only or full 1px border fields using `#EAE8E2`, transitioning to `#B49A57` upon focus. Background remains `#FFFFFF` or translucent ivory. Labels float in tracked uppercase `label-caps`.
- **Checkboxes & Radios:** Sharp square indicators (0px radius) with 1px hairline gold or charcoal outlines. Active states display a solid `#101010` interior or an inner hairline gold box.

### Chips & Badges
- **Format:** Rectangular tags with 0px radius, 4px vertical by 10px horizontal padding.
- **Palette:** Soft Ivory background with a 1px hairline border in Champagne Gold (`#B49A57`), text rendered in 11px uppercase Manrope.

### Lists & Accordions
- **Format:** Split by 1px hairline dividers (`#EAE8E2`). Accordion headers use `title-editorial` with delicate `+` and `−` symbols rendered in Champagne Gold.