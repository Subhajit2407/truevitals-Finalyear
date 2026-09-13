# TrueVitals UI Structure

Build ONLY the frontend structure/UI for a modern healthcare web app called “TrueVitals”.

IMPORTANT:

This is a STRUCTURE-FIRST implementation.

Do NOT build backend functionality, authentication, database, AI processing, API integrations, doctor booking logic, video calls, notifications, or real medical analysis yet.

Use the attached reference image as the primary visual/layout reference.

TECH STACK:

- React

- TypeScript

- Tailwind CSS

- Lucide React icons

- Component-based architecture

- Fully responsive

- Desktop + tablet + mobile/iOS-friendly layouts

DESIGN DIRECTION:

Create a premium 2026-era healthcare technology website inspired by Apple-style product design.

Visual language:

- Clean white/off-white background

- Deep navy typography

- Soft medical blue/cyan accents

- Subtle glassmorphism

- Large rounded cards

- Very soft shadows

- Thin borders

- Generous whitespace

- Premium typography

- Minimal iconography

- Smooth hover states

- Modern rounded buttons

- No excessive gradients

- No clutter

- No generic SaaS dashboard appearance

The site should feel like:

“Apple Health × futuristic medical technology × premium hospital”

BRAND:

Name: TrueVitals

Tagline: “Smarter Care. Healthier Tomorrow.”

Create a simple reusable TrueVitals logo component using a medical cross + wordmark.

==================================================

PAGE STRUCTURE

==================================================

Create ONE long landing page with the following sections:

1. STICKY NAVBAR

--------------------------------

Left:

TrueVitals logo

Center:

Home

Features

How It Works

About

Right:

Sign In

Get Started

Desktop navigation should be horizontal.

Mobile:

Use a clean compact navbar with logo + hamburger menu.

Make navbar sticky with a subtle backdrop blur.

--------------------------------

2. HERO SECTION

--------------------------------

Create a large premium hero section.

Left side:

Small eyebrow:

“AI-POWERED HEALTHCARE”

Large heading:

“Smarter Care.

Healthier Tomorrow.”

Supporting text:

“TrueVitals uses AI to turn your medical data into clear insights, personalized care, and a healthier you.”

Buttons:

“Get Started →”

“Watch Video”

Small stats:

1M+ People Trust Us

99% Data Security

24/7 Health Support

Right side:

Large rounded visual container using the provided futuristic hospital image as a placeholder.

Do NOT generate or implement video yet.

Use:

hero-image-placeholder

Make the hero image feel integrated into the layout rather than a basic rectangular image.

--------------------------------

3. WHY TRUEVITALS

--------------------------------

Centered heading:

“More Than a Hospital — A Health Companion”

Subtitle:

“From understanding your reports to personalized care, TrueVitals is with you at every step.”

Create 4 reusable feature cards:

01 — Understand Reports

“Turn complex medical reports into clear, visual insights.”

02 — AI-Powered Insights

“Get personalized health guidance powered by AI.”

03 — Connected Care

“Consult with expert doctors online or in-person.”

04 — Your Data, Your Control

“Secure, private, and always in your hands.”

Use minimal medical line icons.

--------------------------------

4. EXPLORE TRUEVITALS

--------------------------------

Create a large rounded light-blue section.

Heading:

“See Healthcare Differently”

Subtitle:

“Step into a smarter, more connected healthcare experience.”

Add category filter pills:

All

Facilities

Technology

Doctors

Patients

Innovation

Care

Below this create a CAROUSEL STRUCTURE.

Do NOT implement complex carousel logic yet.

Use three image cards:

Left:

“Advanced Diagnostics”

Center / featured:

“Healthier Tomorrow”

Right:

“AI Medical Technology”

Add circular previous/next buttons.

Use the provided hospital images as placeholders.

The center card should be larger than the side cards.

--------------------------------

5. HOW IT WORKS

--------------------------------

Two-column section.

LEFT:

Eyebrow:

“HOW IT WORKS”

Heading:

“From Reports to Real Insights

in 3 Simple Steps”

Description:

“Upload your medical reports and let TrueVitals do the rest.”

Create numbered steps:

01

Upload Reports

“Securely upload your medical documents.”

02

AI Analysis

“Our AI extracts and analyzes key health data.”

03

Get Insights

“View personalized insights and next steps.”

Button:

“Learn More →”

RIGHT:

Large rounded visual placeholder using the provided medical 3D data/reference image.

Use:

medical-data-placeholder

--------------------------------

6. STATISTICS STRIP

--------------------------------

Create a horizontal rounded statistics card.

1M+

People Trust TrueVitals

500+

Expert Doctors

99%

Secure & Private

4.9/5

User Satisfaction

On mobile, stack these vertically or use a horizontal scroll.

--------------------------------

7. TRUEVITALS MOBILE APP

--------------------------------

Create a wide rounded light-blue promotional section.

LEFT:

Eyebrow:

“ALWAYS WITH YOU”

Heading:

“TrueVitals on Your Phone”

Description:

“Access your health data, book appointments, and get AI insights anytime, anywhere.”

Add placeholder buttons:

Download on the App Store

Get it on Google Play

RIGHT:

Create two phone mockup placeholders showing:

Phone 1:

“Good Morning”

Health overview

Heart Rate

Sleep

Activity

Steps

Phone 2:

“Health Insights”

Health graph

Insight cards

Use placeholder UI rather than implementing an actual mobile app.

--------------------------------

8. TESTIMONIALS

--------------------------------

Centered heading:

“Real People. Real Progress.”

Create a horizontal testimonial carousel structure.

Three cards:

Riya Sharma

Verified User

“TrueVitals helped me understand my reports so easily. The AI insights are incredibly helpful.”

Arjun Mehta

Verified User

“Booking appointments and tracking my health has never been this simple.”

Dr. Neha Kapoor

Healthcare Professional

“TrueVitals bridges the gap between technology and real patient care.”

Add star ratings.

Use simple circular avatar placeholders.

Add previous/next controls.

--------------------------------

9. FINAL CTA

--------------------------------

Create a large rounded blue gradient CTA card.

Heading:

“Ready for a Healthier Tomorrow?”

Description:

“Join TrueVitals today and take control of your health with smarter insights and connected care.”

Button:

“Get Started →”

Keep this section visually strong but minimal.

--------------------------------

10. FOOTER

--------------------------------

Create a clean modern footer.

Left:

TrueVitals logo

“Smarter Care. Healthier Tomorrow.”

Social icons:

LinkedIn

Twitter/X

Instagram

YouTube

Columns:

PRODUCT

Features

How It Works

Pricing

Download App

COMPANY

About Us

Careers

Blog

Contact

RESOURCES

Help Center

Privacy Policy

Terms of Service

Cookie Policy

Bottom:

© 2026 TrueVitals. All rights reserved.

==================================================

COMPONENT STRUCTURE

==================================================

Create reusable components:

Navbar

HeroSection

FeatureCard

WhyTrueVitals

ExploreCarousel

CategoryPills

HowItWorks

StepItem

StatsStrip

MobileAppSection

PhoneMockup

Testimonials

TestimonialCard

FinalCTA

Footer

Keep each component simple and reusable.

==================================================

RESPONSIVE DESIGN

==================================================

Desktop:

Premium wide layout similar to the reference.

Tablet:

Reduce spacing and typography while maintaining the hierarchy.

Mobile / iOS:

- Single-column layout

- Large touch-friendly buttons

- Rounded cards

- Proper safe-area spacing

- No horizontal overflow

- Images scale naturally

- Navigation becomes hamburger

- Feature cards stack

- Carousel becomes horizontally scrollable

- Stats become a 2-column grid

- Phone mockups remain visually centered

Pay special attention to iPhone-sized screens.

==================================================

ANIMATION

==================================================

For this first implementation ONLY add lightweight UI transitions:

- Navbar backdrop transition

- Button hover

- Card hover

- Image scale on hover

- Fade/slide reveal when sections enter viewport

Do NOT implement complex scroll-driven video animation yet.

Do NOT implement 3D WebGL.

Do NOT implement backend.

Do NOT implement authentication.

Do NOT implement APIs.

==================================================

PLACEHOLDERS

==================================================

Create clearly named image placeholders so assets can be replaced later:

hero-hospital-image

carousel-diagnostics-image

carousel-hospital-image

carousel-ai-image

medical-data-image

app-phone-image-1

app-phone-image-2

Use the provided reference images where appropriate.

==================================================

FINAL REQUIREMENT

==================================================

The result should be a polished LONG-FORM landing page that visually follows the attached reference image.

Prioritize:

1. Layout

2. Spacing

3. Typography

4. Responsive structure

5. Component organization

6. Visual hierarchy

Do not spend credits implementing functionality that is not required yet.

Make the entire page feel like a modern premium healthcare product designed in 2026.

After completing the initial structure, STOP.

Do not add additional pages or backend functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/88a536fe-3f71-418b-9b25-0976b52c16a8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
