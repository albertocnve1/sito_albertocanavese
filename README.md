# Portfolio Fotografico - Monorepo

Piattaforma web full-stack per un portfolio fotografico professionale, con sistema di consegna sicura dei lavori ai clienti.

## 🛠 Tecnologie

Questo progetto è strutturato come un **Monorepo Multi-root**.
- **Frontend (`/frontend`)**: Next.js (App Router), React, Tailwind CSS, TypeScript. Avviato sulla porta `3001`.
- **Backend (`/backend`)**: NestJS, TypeScript, architettura modulare, Dependency Injection. Avviato sulla porta `3000`.
- **Database**: PostgreSQL (gestito tramite Docker) e Prisma ORM.
- **Storage**: Object Storage compatibile S3 (es. Cloudflare R2 / AWS S3) utilizzato per archiviare le immagini in modo sicuro.

---

## 🚀 Come Avviare il Progetto (Sviluppo Locale)

### 1. Avviare il Database (PostgreSQL)
Il progetto utilizza un container Docker per ospitare il database. Assicurati di avere Docker installato e in esecuzione.
Dalla root directory del progetto, esegui:
```bash
docker compose up -d
```
Il database sarà esposto localmente sulla porta **5432**.

### 2. Configurare e Avviare il Backend (NestJS)
Il backend si occupa di esporre le API, interagire con il DB e gestire l'autenticazione in modalità Zero-Trust.
```bash
cd backend
npm install          # Installa le dipendenze
npx prisma db push   # Oppure npx prisma migrate dev (allinea lo schema al database)
npm run start:dev    # Avvia il server locale sulla porta 3000 in watch mode
```

### 3. Configurare e Avviare il Frontend (Next.js)
Il frontend è la vetrina dell'applicazione.
```bash
cd frontend
npm install          # Installa le dipendenze
npm run dev          # Avvia Next.js in locale sulla porta 3001
```

---

## 🏗 Struttura del Database (Prisma)
Il database è progettato attorno alle seguenti entità (vedi `/backend/prisma/schema.prisma`):
- **Album**: Rappresenta una collezione di foto o un evento. Gestisce gli accessi privati tramite password (`isPrivate`, `passwordHash`).
- **Photo**: Collegata a un `Album` (relazione 1:N). Mantiene riferimenti diretti agli oggetti di storage cloud in modo da centralizzare il recupero.
- **Booking**: Entità per gestire lo stato della prenotazione e i dati dei diversi clienti che vogliono organizzare uno shooting.

## 🔒 Sicurezza e Protezione Immagini
L'applicazione persegue un rigoroso approccio Zero-Trust per quanto concerne i dati sensibili:
- Le gallerie private **non** espongono in alcun modo URL permanenti.
- Gli album coperti da password verranno decrittati via backend tramite validazione di un hash generato con `bcrypt`.
- A seguito di avvenuta decrittazione, verranno generati e restituiti solo **Presigned URL** con scadenza fissa.
