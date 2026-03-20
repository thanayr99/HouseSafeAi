# HourSafe AI

HourSafe AI is a demo Next.js web application for protecting gig workers by insuring lost working hours.

It includes:

- A modern landing page
- Worker registration and login
- Admin demo login
- Worker dashboard with charts
- Rain-event simulation flow
- Policy and premium overview
- Frontend-only demo auth using React Context and `localStorage`

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Framer Motion
- Recharts
- Lucide React
- TypeScript

## Demo Roles

### Worker

- Login page: `/login`
- Worker dashboard: `/dashboard`
- Simulation page: `/simulate`
- Policy page: `/policy`

Demo worker login accepts any name and email in the frontend-only demo flow.

### Admin

- Login page: `/login`
- Admin dashboard: `/admin`

Demo admin credentials:

- Email: `admin@hoursafe.demo`
- Password: `demo-admin`

## Features

- Dark startup-style dashboard UI
- Glassmorphism cards and gradient theme
- Risk indicator with dynamic state
- Recharts visualizations
- Payout simulation
- Toast notifications
- Count-up stat animations
- Demo role-based route access

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Project Structure

```text
app/
  page.tsx
  login/page.tsx
  register/page.tsx
  dashboard/page.tsx
  simulate/page.tsx
  policy/page.tsx
  admin/page.tsx
components/
context/
```

## Notes

- No backend is used in this demo.
- Authentication is simulated in the frontend.
- Session and profile data are persisted in `localStorage`.

## Deployment

This app can be deployed on Vercel directly from GitHub.

Framework preset:

- `Next.js`

Build command:

- `next build`
