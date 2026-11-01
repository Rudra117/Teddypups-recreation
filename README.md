# TeddyPups UAE Recreation

A responsive recreation of the TeddyPups UAE puppy adoption website, built to reproduce its page layouts, catalogue flows, and interactive details. Puppy and family-gallery content is static project data; enquiries run in local demo mode and do not contact a service.

## Features

- Responsive homepage with puppy lineup, scroll-driven Meet the Pups section, and reduced-motion support.
- Available puppy catalogue with origin, breed, and gender filters; individual profiles include gallery and previous/next navigation.
- Happy Families gallery, How It Works journey, searchable FAQ, contact form demo, and Gone Home catalogue.
- Mobile navigation, lightboxes, route transitions, and custom paw cursor effects.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/puppies` | Available puppies |
| `/puppies/:slug` | Puppy profile |
| `/puppy/:slug` | Puppy profile compatibility alias |
| `/happy-families` | Family gallery |
| `/how-it-works` | Adoption journey |
| `/faq` | Searchable questions and answers |
| `/contact` | Contact form demo |
| `/gone-home` | Puppies who found homes |

## Technology

React 18, TypeScript, Vite 6, React Router DOM 6, Tailwind CSS 3, and lucide-react.

## Project structure

```text
public/       Static brand and sample assets
src/components/ Shared, homepage, and puppy components
src/data/       Static puppy, FAQ, family, and site data
src/pages/      Route page components
src/types/      Shared TypeScript types
references/     Source recordings, research, and extracted reference material
```

## Requirements and commands

Use Node.js 18, 20, or 22+ (Vite 6 supported lines) and npm. From the project directory:

```bash
npm install
npm run dev -- --host 127.0.0.1
```

The Vite development server uses port 3000 by default. To validate and build for production:

```bash
npx tsc --noEmit
npm run build
npm run preview -- --host 127.0.0.1
```

The preview server prints its URL and usually uses port 4173. Open the URL printed by Vite.

There is no automated test script. Functional browser QA was performed with Playwright and Chrome; the project also uses TypeScript validation as part of `npm run build`.

## Configuration and hosting

No environment variables or credentials are required. Local `.env` files are ignored by Git. The app uses root-relative asset paths and `BrowserRouter`; static hosts must serve `index.html` as the fallback for application routes so direct links and reloads work.

## Limitations

- Contact and puppy enquiry forms are local demos; they do not submit messages.
- Puppy and family-gallery images are hosted on the referenced external media service, and Google Fonts load externally.
- `npm audit` reports two moderate React Router advisories for the installed v6 dependency. npm identifies v7.18.5 as the fix, which is a major upgrade; see the delivery QA notes before planning that migration.
- Reference recordings and extracted research in `references/` are source material, not runtime assets.
