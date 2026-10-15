---
name: clay-component
description: Build or change a UI component in Kiddy Bank's claymorphism style. Use whenever creating a new component, screen, or visual element, or restyling an existing one, in the kid or parent view.
---

# Clay Component

Build UI pieces that follow Kiddy Bank's clay look and reuse what exists. The design tokens, base components, and the reference images are the source of truth, so they win over generic design advice from other skills.

## Reference images
View these before designing anything new:
- `references/kid-app-reference.png`: the kid view. Learning app with a soft white background, lavender primary, and a 3D mascot.
- `references/parent-board-reference.png`: the parent view. Sky-blue sidebar, pastel tinted columns, coral primary button.

## What to copy from the references
Kid view (kid-app-reference):
- Near-white page, cards slightly raised with very soft shadows; large rounded cards (28px or more).
- Lavender/purple as the kid primary color, with pill buttons and rounded-square icon tiles.
- 3D clay mascot and illustrated prize tiles; coin balance chip in the top-right corner.
- Bottom tab bar with 4 items (Home, Savings, Loans, Shop); active tab in lavender.
- Stat cards in a row (like Lessons, Streak, Badges) for balance, savings, loan owed.
- Chunky progress bars; list rows with an icon tile, a title, a subtitle, and a round arrow button.
- Few words per screen. Bold rounded headings.

Parent view (parent-board-reference):
- Left sidebar in sky blue; active nav item as a coral pill with a soft glow.
- Colored column or section backgrounds (lavender, coral, peach, mint), each holding tinted white cards.
- Small colored pill tags for category and status; a count badge on each section header.
- Circular avatars, overlapping in groups, one per child; mint progress bars; date and count chips.
- Coral for the main action ("Add task" style buttons), soft pastel pills for filters.
- Denser than the kid view, but the same shadows and radii.

## Before building
1. Read the design tokens file (colors, shadows, radii, font). Its path is set in Milestone 1.
2. Check for an existing base component first: ClayCard, ClayButton, ClayInput, ProgressBar, Tag, Modal, Avatar. Compose them; do not restyle ad hoc.
3. Decide the view, kid or parent, and match the matching reference image.

## Clay rules
- Soft layered shadows only: light inner highlight, soft inner shade, diffuse outer drop shadow. No hard borders or flat black shadows.
- Radius 24px or more on cards; pill shape for buttons, tags, chips.
- Pastel fills from the token palette; one saturated accent per context (lavender for kid, coral for parent actions). Never hard-code hex values, shadows, or radii in a component; add a token instead.
- Tap targets 44px or more. Kid screens: big targets, one idea per screen, little text.
- Text must meet contrast (4.5:1). If a pastel fails, darken the text, not the fill. The references' pale tag text is the main risk.
- Motion: springs via Motion, squish on press, respect reduced motion. Use the apple-design skill for interaction details.

## Build steps
1. Write the component small and typed, with clear props and a short docstring.
2. Add it to the showcase page with its variants and states (default, hover, pressed, disabled, empty).
3. Compare it against the matching reference image at desktop and narrow widths.
4. Run lint, typecheck, and tests; fix before moving on.

## Do not
- Add a one-off style that belongs in the tokens.
- Build a new component when a base one can be composed.
- Use dark patterns on kid screens (countdowns or nudges that push kids to spend or borrow).
- Use emojis in code or UI strings.
