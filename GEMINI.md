# Antigravity Global Context: Portfolio Fotografico

## 🎯 Obiettivo del Progetto
Sviluppo di una piattaforma web full-stack per un portfolio fotografico professionale e un sistema di consegna sicura dei lavori ai clienti.

## 🛠 Tech Stack (Monorepo Multi-root)
- **Frontend (`/frontend`):** Next.js (App Router), React, Tailwind CSS, TypeScript. (Porta: 3001)
- **Backend (`/backend`):** NestJS, TypeScript, architettura modulare. (Porta: 3000)
- **Database:** PostgreSQL (tramite Docker) + Prisma ORM.
- **Storage:** Object Storage S3-compatible (es. Cloudflare R2 / AWS S3).

## 📐 Regole di Esecuzione per gli Agenti
1. **Consapevolezza del Workspace:** Sei in un monorepo. Prima di eseguire comandi da terminale (installazioni di pacchetti, build, avvio server), assicurati SEMPRE di essere nella directory corretta (`/frontend` o `/backend`).
2. **Pianificazione (Artifacts):** Prima di scrivere codice per feature complesse, genera un piano di implementazione tramite Artifacts. Attendi approvazione se siamo in modalità "Review-Driven".
3. **TypeScript e OOP:** Mantieni un rigore logico orientato agli oggetti nel backend (sfruttando la Dependency Injection di NestJS). I tipi generati da Prisma devono essere la singola fonte di verità condivisa.
4. **Sicurezza Zero-Trust:** Le immagini delle gallerie private NON devono mai avere URL pubblici. Il backend deve validare l'hash della password (bcrypt) e restituire **Presigned URL** a scadenza.
5. **Testing e Browser Agent:** Puoi utilizzare il Browser Agent integrato per testare le rotte di navigazione su localhost:3001 e i form di caricamento o prenotazione.

## 📍 Stato Attuale e Prossimo Task
- **Stato:** Boilerplate Next.js e NestJS inizializzati, ripuliti e funzionanti. Repository Git globale configurata.
- **Task Attuale:** Creare il file `docker-compose.yml` nella root per avviare il container PostgreSQL (ottimizzato per architettura linux/arm64) e inizializzare Prisma ORM all'interno della cartella `/backend` per modellare le entità: `Album`, `Photo` e `Booking`.