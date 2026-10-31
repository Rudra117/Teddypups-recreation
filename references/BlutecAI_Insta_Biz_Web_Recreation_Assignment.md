# PROJECT: Blutec.AI / Insta Biz Web — Website Recreation Assignment

## Your Role

Act as a Senior Full-Stack Engineer, Technical Architect, UI/UX Analyst, and Reverse Engineering Specialist.

I am completing a Forward Deployed Engineer technical assignment for Blutec.AI / Insta Biz Web.

Reference website:
https://puppy.instabizweb.com/

My objective is to recreate the complete reference website as accurately as possible, including:

- Visual design
- Page layouts
- Responsive behaviour
- Navigation
- Interactive components
- Forms
- Data presentation
- Functional workflows
- Frontend/backend behaviour

The final deliverables are:
1. Deployed website.
2. GitHub repository with complete source code.
3. Loom video explaining development, architecture, AI tools, prompts, implementation decisions, testing and deployment.

Deadline: 48 hours from acceptance confirmation.

This task is time-sensitive. Prioritize accurate analysis, practical architecture and implementation feasibility.

---

# PART 1 — COMPLETE WEBSITE RECONNAISSANCE

Inspect the entire reference website.

Do not restrict your inspection to the homepage.

Explore:

1. Homepage.
2. Puppy catalogue.
3. Every accessible individual puppy profile.
4. Happy Families.
5. How It Works.
6. FAQ.
7. Contact.
8. Gone Home.
9. Delivery and Collection.
10. All additional accessible routes.
11. Header navigation.
12. Footer navigation.
13. Floating buttons.
14. External links.
15. Forms and interactive elements.

For every route, document:

- URL.
- Page purpose.
- Section hierarchy.
- Content structure.
- Reusable components.
- Images and assets.
- Navigation behaviour.
- Interactive elements.
- External dependencies.
- Backend-dependent functionality.
- Error states.
- Mobile behaviour.

Do not invent missing functionality.

If something cannot be inspected, mark it as UNVERIFIED.

# PART 2 — UI/UX AND VISUAL REVERSE ENGINEERING

Analyse the visual design in detail.

Identify:

## Design system
- Primary and secondary colours.
- Background colours.
- Typography and font families.
- Font weights.
- Heading hierarchy.
- Text sizes.
- Line heights.
- Letter spacing.
- Border radii.
- Shadows.
- Borders.
- Spacing system.
- Container widths.
- Grid layouts.
- Button styles.
- Icon styles.

## Layout
- Header height.
- Navigation alignment.
- Hero structure.
- Image dimensions and aspect ratios.
- Section spacing.
- Card dimensions.
- Content alignment.
- Footer structure.
- Desktop and mobile differences.

## Visual behaviour
- Hover states.
- Focus states.
- Active navigation states.
- Transitions.
- Animations.
- Image cropping.
- Sticky elements.
- Dropdowns.
- Carousels.
- Accordions.
- Responsive breakpoints.

Provide approximate measurements wherever possible.

Distinguish observed facts from estimated values.

# PART 3 — INTERACTION AND FUNCTIONALITY AUDIT

Test every accessible interaction.

Specifically investigate:

### Navigation
- Internal navigation.
- External navigation.
- Mobile menu.
- Breadcrumbs.
- Previous/next puppy navigation.

### Puppy catalogue
- Listing structure.
- Availability status.
- Puppy details.
- Profile navigation.
- Breed information.
- Enquiry buttons.

### Puppy profiles
- Image galleries.
- Image navigation.
- Puppy attributes.
- Health information.
- Vaccination information.
- Contact and enquiry buttons.
- Forms.
- Availability handling.

### FAQ
- Accordion behaviour.
- Search functionality.
- Search matching behaviour.
- Empty search results.

### Forms
For every form, document:
- Field names.
- Field types.
- Required fields.
- Validation.
- Error messages.
- Success messages.
- Submission behaviour.
- Network requests.
- External integrations, if observable.

Do not submit real enquiries or personal information.

### WhatsApp
Inspect:
- Phone number, if publicly available.
- Message prefill.
- Whether the message changes depending on the puppy.
- CTA placement.

# PART 4 — TECHNICAL RECONNAISSANCE

Perform technical inspection wherever browser tools and public resources permit.

Investigate:

## Frontend
- Framework or CMS indicators.
- HTML structure.
- CSS architecture.
- JavaScript behaviour.
- Routing strategy.
- Asset loading.
- Image formats.
- Lazy loading.
- Font loading.
- Third-party libraries.
- SEO metadata.
- Accessibility.
- Performance bottlenecks.

## Backend
- API endpoints visible in browser network activity.
- Request methods.
- Request payloads.
- Response formats.
- Authentication requirements.
- Form submission destinations.
- External services.
- CMS integrations.
- CRM integrations.
- Analytics integrations.
- Database-dependent behaviour.

## Hosting and infrastructure
- Hosting indicators.
- CDN.
- Domain configuration.
- Publicly observable server headers.
- Security headers.
- Third-party scripts.

Do not attempt unauthorized access, credential discovery, vulnerability exploitation or security testing.

Do not assume a technology simply because it is common.

For every technical finding, assign one of:
- CONFIRMED
- STRONGLY INDICATED
- ESTIMATED
- UNKNOWN

Explain the evidence supporting the classification.

# PART 5 — ASSETS AND CONTENT INVENTORY

Identify all important assets.

Create an inventory containing:

| Asset | Page | Type | Dimensions | Usage | Source |
|---|---|---|---|---|---|

Investigate:
- Puppy photographs.
- Customer photographs.
- Hero images.
- Icons.
- Logos.
- Background graphics.
- Fonts.
- Videos.

Determine whether assets can be accessed through publicly available resources.

Do not substitute unrelated stock photographs when matching assets are accessible.

Do not claim an image is an original reference asset without verifying its source.

# PART 6 — DATA MODEL AND CONTENT STRUCTURE

Determine the likely data structures needed to recreate the website.

Propose data models for:

1. Puppy.
2. Puppy image gallery.
3. Puppy availability.
4. Breed.
5. Customer testimonial.
6. FAQ.
7. Contact enquiry.
8. Puppy enquiry.
9. Delivery information.

For each model, specify:
- Field name.
- Data type.
- Required/optional.
- Example value.
- Validation.
- Relationships.

Separate observed data from proposed data structures.

# PART 7 — ARCHITECTURE RECOMMENDATION

Evaluate these options:

### Option A
React + Vite frontend only.

### Option B
React + Vite + FastAPI.

### Option C
React + Vite + FastAPI + SQLite.

Recommend the simplest architecture that can reproduce the observed functionality.

Do not introduce backend infrastructure simply to make the assignment look more technically sophisticated.

Explain:
- Which features need a backend.
- Which features can remain frontend-only.
- Whether persistence is required.
- Whether a CMS or external integration is involved.
- Deployment implications.
- Environment variables.
- CORS requirements.
- API security considerations.

# PART 8 — API CONTRACTS

If a backend is genuinely needed, propose API contracts.

For every endpoint specify:

- HTTP method.
- URL.
- Purpose.
- Request body.
- Response body.
- Validation.
- Error responses.
- Status codes.

Consider endpoints for:
- Puppy listings.
- Puppy detail.
- Contact submission.
- Puppy enquiry submission.
- FAQ, only if dynamic functionality requires it.

Use consistent response structures.

Do not implement anything yet.

# PART 9 — FRONTEND IMPLEMENTATION PLAN

Propose:

- React component hierarchy.
- Page structure.
- Reusable components.
- Routing structure.
- Data management.
- State management.
- Asset organization.
- CSS architecture.
- Responsive strategy.

Provide a proposed folder structure.

Explain which components should be shared and which should remain page-specific.

Identify the best implementation order.

# PART 10 — BACKEND IMPLEMENTATION PLAN

If required, propose:

- FastAPI structure.
- Database choice.
- SQLAlchemy or alternative ORM justification.
- Pydantic schemas.
- Service layer.
- API routers.
- Validation.
- Error handling.
- Testing.
- Configuration.
- Deployment.

Keep the backend proportionate to the actual requirements.

# PART 11 — TESTING STRATEGY

Create a complete testing checklist.

Include:

- Page loading.
- Navigation.
- Broken links.
- Image loading.
- Responsive behaviour.
- Forms.
- Validation.
- FAQ.
- Gallery.
- Puppy profile navigation.
- API functionality.
- Backend error handling.
- Build.
- Console errors.
- Accessibility basics.
- Production deployment.

Specify what should be tested manually and what can be automated.

# PART 12 — PERFORMANCE AND SEO

Inspect:
- Page titles.
- Meta descriptions.
- Open Graph metadata.
- Image optimization.
- Lazy loading.
- Semantic HTML.
- Accessibility.
- Core Web Vitals opportunities.
- Mobile performance.

Recommend practical improvements without changing the reference design unnecessarily.

# PART 13 — 48-HOUR IMPLEMENTATION ROADMAP

Produce a realistic schedule.

Classify tasks into:

- Must Have.
- Should Have.
- Nice to Have.

Include:
- Dependencies.
- Estimated duration.
- Expected output.
- Acceptance criteria.
- Risk level.

Reserve time for testing, deployment and Loom recording.

# PART 14 — FINAL ANALYSIS REPORT

Present your findings in this order:

1. Executive summary.
2. Complete page inventory.
3. Navigation map.
4. Page-by-page component inventory.
5. Visual design system.
6. Interaction inventory.
7. Technical reconnaissance.
8. Asset inventory.
9. Data model proposal.
10. Architecture recommendation.
11. API contracts, if needed.
12. Frontend implementation plan.
13. Backend implementation plan.
14. Testing strategy.
15. Performance and SEO.
16. 48-hour execution roadmap.
17. Major technical risks.
18. Unknowns requiring screenshots or manual verification.

For each important finding, include its confidence classification.

---

# IMPORTANT EXECUTION RULES

1. This is an ANALYSIS-ONLY task. Do not modify any project files.
2. Do not generate the complete application.
3. Do not install packages.
4. Do not create a backend.
5. Do not fabricate unavailable information.
6. Do not assume access to the original database.
7. Do not invent API endpoints.
8. Do not make real contact submissions.
9. Do not claim to have tested something you could not access.
10. Do not spend time exploring irrelevant technical details.
11. Prioritize the actual recreation requirements.
12. Make recommendations suitable for a 48-hour hiring assignment.

Where browser inspection is unavailable, explicitly list the missing information and request the exact screenshots or observations needed.

Your goal is to produce a technically defensible implementation blueprint, not an impressive-looking but unsupported architecture document.