This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# 🏋️‍♂️ Tränings-app – Next.js Projekt

En **frontend-applikation** byggd med **Next.js** för att logga träningspass och övningar.  
Projektet är mitt **examensarbete** och visar hela processen från planering till deployment.

---

## 🌐 Live-demo

[Se den deployade sidan här](LÄGG_TILL_LIVE_LÄNK)

---

## 🛠 Tech stack

- **Frontend:** Next.js (React)
- **State management:** Zustand
- **Databas:** Prisma + SQLite/PostgreSQL
- **Autentisering:** JWT / NextAuth (om relevant)
- **Hosting / Deployment:** Vercel
- **UI / Styling:** CSS-moduler
- **Prototyping / Design:** Figma

---

## 📦 Installation & utveckling

1. Klona repot:

```bash
git clone <GITHUB_REPO_URL>
cd <repo-folder>
```

2. Installera beroenden:

```bash
npm install
# eller
yarn
# eller
pnpm install
```

3. Starta utvecklingsservern:

```bash
npm run dev
# eller
yarn dev
# eller
pnpm dev

```

## ⚙️ Funktioner

- CRUD för **splits, dagar och övningar**
- Logga övningar med sets, reps, vikt och kommentarer
- Dynamisk uppdatering av loggar i realtid
- YouTube-video för varje övning
- Slugifiering av svenska tecken (å, ä, ö)
- Responsiv design för mobil och desktop
- Dynamiska komponenter med interaktivitet och state management
- Semantisk HTML & WCAG 2.1 tillgänglighet

---

## 🗂 Struktur

```plaintext
src/
 ├─ app/       # Next.js App Router
 ├─ components/ # Återanvändbara komponenter
 ├─ hooks/      # Custom hooks
 ├─ store/      # Zustand store
 ├─ types/      # TypeScript-typer
 ├─ styles/     # Globala och modulära CSS
 ├─ utils/      # Utility-funktioner (t.ex. slugify)
```

---

## ✅ Checklist för G- och VG-krav

### Godkänt (G)

- **Planering & Research:** Målgruppsanalys, backlog i GitHub Projects
- **Design & Prototyping:** Wireframes och högkvalitativ Figma-prototyp, responsiv design
- **Applikationsutveckling:**
  - Next.js + React
  - Databas med Prisma
  - State management (Zustand)
  - Dynamiska komponenter med CRUD & interaktivitet
  - WCAG 2.1-standard
  - Responsiv design för mobil och desktop
- **Versionshantering:** Git + GitHub
- **Slutrapport:** 2–3 sidor, dokumentation av arbetsprocess
- **Deploy:** Publikt via Vercel

### Väl Godkänt (VG)

- Interaktiv prototyp som speglar färdig produkt
- Avancerad state management med globalt state
- Full WCAG 2.1 nivå A och AA
- Optimerad kod, återanvändning av komponenter
- Säker CRUD med autentisering (JWT / NextAuth)
- Automatiserad deployment via Vercel
- Djupgående slutrapport (3–6 sidor) med reflektioner och tekniska motiveringar

---

## 🔗 Länkar

- GitHub repo: [Repo-länk här](LÄGG_TILL_REPO)
- Figma-prototyp: [Figma-länk här](LÄGG_TILL_FIGMA)
- Live-demo: [Länk till deployad sida](LÄGG_TILL_LIVE_LÄNK)

---

## 📖 Arbetsprocess

### Planering & research

- Identifierade målgrupp: personer som vill logga träning på ett enkelt sätt
- Skapade backlog och uppgifter i GitHub Projects

### Design & prototyp

- Wireframes i Figma
- Högkvalitativ prototyp med responsiv design
- Tillgänglighet (WCAG 2.1)

### Utveckling

- CRUD-funktionalitet för splits, dagar, övningar och loggar
- Slugifiering av namn med svenska tecken
- Dynamiska komponenter och state management
- Video-embedding från YouTube

### Deployment

- Publikation på Vercel
- Testad för responsivitet och korrekt funktion på mobil och desktop
