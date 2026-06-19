# Employee Onboarding System

A full-stack web application that manages the complete lifecycle of employee onboarding, keeping HR, IT, and Management in sync.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, Server Actions) |
| Backend | NestJS 11 |
| Database | PostgreSQL |
| Styling | Tailwind CSS 4 |

## Onboarding Workflow

```
HR creates request (role, start date, hardware tier, work schedule, urgency)
       ↓
Manager reviews + approves Fișa de post
  └─ can override hardware tier (Premium → Standard skips Finance)
       ↓
Finance approves budget in € (Premium tier only)
  └─ sets spending cap that limits IT laptop options
       ↓
IT provisions email, password, laptop (filtered by approved budget)
       ↓
Completed ✓

At any stage → Reject → Needs Rework → HR edits → resubmits
  └─ rejection reason shown to every subsequent reviewer
```

## Project Structure

```
rinf_tech/
├── app/                    # Next.js pages & server actions
│   ├── dashboard/          # All requests + filters + counters
│   ├── onboarding/
│   │   ├── new/            # HR create form
│   │   └── [id]/           # Detail view, audit log, edit
│   ├── manager/            # Manager review queue
│   ├── finance/            # Finance approval queue
│   ├── it/                 # IT provisioning queue
│   └── actions.ts          # All server actions
├── components/
│   ├── layout/             # Navbar
│   ├── onboarding/         # Feature components
│   └── ui/                 # Shared UI (Button, Badge, Toast, Pagination)
├── lib/                    # API helpers, formatDate, constants, laptop catalogue
├── types/                  # Shared TypeScript types
└── backend/                # NestJS application
    └── src/
        ├── onboarding/     # Module, controller, service, entities, DTOs
        └── common/         # Enums
```

## Prerequisites

- Node.js 18+
- PostgreSQL (running on localhost:5432)

## Setup

### 1. Create the database

In pgAdmin (or psql), create a database named `onboarding`.

### 2. Configure the backend

Create or edit `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=onboarding
PORT=3001
```

### 3. Install dependencies

```bash
# Frontend
npm install

# Backend
cd backend && npm install
```

### 4. Start the backend

```bash
cd backend
npm run start:dev
```

The backend runs on `http://localhost:3001`. On first start, TypeORM will auto-create all tables (`synchronize: true`).

### 5. Start the frontend

```bash
# From the rinf_tech root
npm run dev
```

The frontend runs on `http://localhost:3000`.

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | — | Database password |
| `DB_NAME` | `onboarding` | Database name |
| `PORT` | `3001` | NestJS port |

### Frontend

Create `.env.local` in the project root to override the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Features

- **Full onboarding lifecycle** — Initiation → Manager → Finance (Premium only) → IT → Completion
- **Rejection loop** — any stage can reject back to HR for rework; rejection reason is visible to every subsequent reviewer until approved
- **Hardware tier override** — Manager can downgrade Premium → Standard on approval, skipping Finance entirely
- **Finance budget approval** — required € budget input with quick-select presets (€800 / €1000 / €1500 / €2000); monthly spend summary at the top of the Finance queue
- **Budget-gated laptop selection** — IT laptop dropdown is filtered to models within the Finance-approved budget (Standard tier capped at €500)
- **Work schedule** — requests specify 4h / 6h / 8h per day (part-time / full-time); shown on Fișa de post and detail page
- **Fișa de post** — auto-generated job description modal with PDF download; shows role, start date, work schedule, and hardware tier
- **Audit log** — full activity timeline per request with actor, timestamp, and notes
- **Urgency flag** — mark requests as urgent; sorted to top of all queues; muted to "Was urgent" once completed
- **SLA indicator** — shows days in current status; turns red after 3 days
- **Approval notes** — optional note when approving, recorded in audit log
- **IT provisioning** — email pre-filled as `firstname.lastname@rinf.tech`, password generator with auto-generate button
- **Dashboard summary tiles** — Total / Active / Urgent / Completed counts at a glance
- **Dashboard** — search, filter by status, pagination (10 per page); completed requests sorted to bottom
- **Toast notifications** — success/error feedback on every action
- **Confirmation modal** — delete requires explicit confirmation
