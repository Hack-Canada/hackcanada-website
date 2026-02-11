# HackCanada Website

**Canada's Premier Hackathon**

## Check it out

👉 **[hackcanada.org](https://hackcanada.org)** 👈

---

## Running locally

**1. Clone the repo**

```bash
git clone https://github.com/Hack-Canada/hackcanada-website.git
cd hackcanada-website
```

**2. Install dependencies and start the dev server**

```bash
cd web
npm install
npm run dev
```

**3. Open in your browser**

Go to [http://localhost:3000](http://localhost:3000) and take a look 👀

---

## Tech stack

- **React** 19
- **Next.js** 15 (App Router)
- **TypeScript**
- **Framer Motion**
- **ShadCN UI**
- **Tailwind CSS** 4
- **Turbopack** (dev & build)
- **Supabase** (leaderboard)
- **Vercel** (hosting)

---

## Project structure

```
hackcanada-website/
├── web/                    # Next.js app
│   ├── app/                # App Router (pages, layout, API routes)
│   ├── components/         # React components (sections, UI, team game)
│   ├── lib/                # Utilities, Supabase client, data
│   └── public/             # Static assets
└── README.md
```

---

## Environment variables

For local development, create `web/.env` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Required for the leaderboard feature. See `web/supabase/README.md` for database setup.

---

## License

Code is licensed under the **MIT** license. Other assets are copyright of Hack Canada.

---

## Credits

Built with ❤️ by [Faiz](https://github.com/faizm10), [Adelynn](https://github.com/adelynntran), [Oliver](https://github.com/osh3276), [Advitiya](https://github.com/advitiya6594), [Hreem](https://github.com/HreemPandya).
