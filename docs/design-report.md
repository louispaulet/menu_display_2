# Refined V3 Design Report

## Screens Sampled

- Homepage restaurant atlas and regional jump controls.
- Restaurant menus for L'Etoile d'Or, Sakura No Hana, Taman Sari, and The Red Planet Bistro.
- Dish/course cards across French, Japanese, Southeast Asian, and interstellar menus.
- Recipes for caramelized scallops, matcha mousse, and Martian potato soup.
- Wine list overview, grouped cellar shelves, wine bottle detail, and bottle zoom modal.
- Hot sauce list, hot sauce detail, sorting controls, and mobile navigation.

## Current Design Philosophy

Exquisite Menus V3 is a warm, image-forward AI dining atlas. The core palette is parchment, linen, ink, clay, saffron, and subtle regional accent washes. Playfair Display carries the editorial luxury voice, while Montserrat keeps metadata and controls legible. The experience is built around generated visual artifacts: dining rooms, plated dishes, bottles, and sauces are treated as the primary evidence of each imagined culinary world.

The site works best when it feels like a compact magazine and catalog hybrid. Restaurant pages sell place and atmosphere. Course cards make each dish feel collectible. Recipes read like short culinary articles. The cellar behaves like a browsing system for bottles, while hot sauces provide a sharper, more product-led side path. The design should keep that richness, but with more restraint in radii, copy, hierarchy, and repeated information.

## Twenty Improvements Implemented

1. Normalize radii and shadows: oversized rounded panels are reduced to calmer card and panel geometry.
2. Clarify shared design primitives: panels, cards, stat tiles, segmented controls, action pills, and index links are reusable.
3. Improve focus states: focus rings are stronger and easier to see against the warm background.
4. Tighten the sticky header: the header has clearer contrast, a lighter shadow, and cleaner active nav states.
5. Improve mobile navigation: mobile menu states are more readable and less visually heavy.
6. Improve restaurant cards: cards now keep price and course signals close to the title and use a steadier content rhythm.
7. Improve regional chips: accent chips use more consistent tracking and spacing.
8. Improve menu hero framing: restaurant hero images use stronger full-frame visual presence.
9. Replace meta copy with diner-facing facts: menu hero stat cards now show courses, tasting total, and average plate price.
10. Improve course cards: prices are formatted as prices, descriptions are calmer on mobile, and recipe actions use the shared action style.
11. Compact course indexes: sticky course links are smaller, cleaner, and easier to scan.
12. Fix recipe method counts: method steps are counted from flexible markdown heading structures instead of only one exact heading shape.
13. Remove repeated recipe titles: recipe markdown no longer repeats the same title immediately under the hero.
14. Improve recipe readability: article prose and list spacing are tuned for long ingredient and method sections.
15. Improve wine controls: wine view mode buttons now behave like a segmented control.
16. Add cellar shelf anchors: grouped wine sections expose compact jump links from the active view panel.
17. Reduce duplicate wine card pricing: wine cards now emphasize list price and market price once, with rarity and markup as compact badges.
18. Improve wine bottle detail hierarchy: bottle detail pages promote list price, market price, and cellar read as primary facts.
19. Replace wine zoom text controls: zoom controls use icon buttons with labels and titles for clarity.
20. Improve hot sauce hierarchy: sauce cards and details now lead with heat, heat bars, and a visible mobile back link.

## Implementation Notes

- Routes, source data, recipe markdown files, wine JSON, and generated image assets remain unchanged.
- Route-level lazy loading was added to reduce initial bundle pressure and keep heavier pages out of the first payload.
- The design direction remains "Refined V3": same atlas identity, stronger discipline in layout and copy.

## Acceptance Checks

- Run `npm run lint` from `menu_display_2/`.
- Run `npm run build` from `menu_display_2/`.
- Verify the homepage, sampled menu pages, sampled recipe pages, wine list, wine bottle zoom, hot sauce list/detail, and mobile navigation in the in-app browser.
