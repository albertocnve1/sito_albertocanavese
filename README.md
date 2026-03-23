# 📸 Portfolio Fotografico - Guida per "Dummies" (Principianti)

Benvenuto nel progetto del tuo nuovo Portfolio Fotografico! Se stai leggendo questo documento, probabilmente ti stai chiedendo: *"Ok, ho scaricato tutto, ma ora come faccio a far funzionare questa astronave?"*

Niente panico. In questo progetto ci sono **3 pezzi principali** che lavorano insieme. Immagina che il tuo sito web sia un ristorante:
1. **Il Database (PostgreSQL su Docker)** = *Il magazzino*. È dove vengono conservati fisicamente gli ingredienti (i dati degli album, le informazioni sulle foto, le prenotazioni).
2. **Il Backend (NestJS)** = *La cucina*. Prende gli ordini dai clienti, va in magazzino a prendere gli ingredienti, prepara i piatti (le informazioni) e li consegna. È l'unico che ha le chiavi del magazzino.
3. **Il Frontend (Next.js)** = *I camerieri e la sala da pranzo*. È la faccia bella del ristorante. È quello che vedono gli utenti finali (il tuo sito web). Quando un cliente vuole vedere una foto, il frontend la chiede al backend (la cucina), che a sua volta la prende dal database (il magazzino) e la rimanda indietro.

---

## 🚦 In quale ordine devo accendere le cose?

Per far funzionare il tutto, devi accendere questi tre pezzi **sempre e solo in questo ordine esatto**:

### 1. PRIMA COSA: Accendi il Database (Il Magazzino)
Nessuno può lavorare se il magazzino è chiuso. Il nostro database vive dentro **Docker**. Docker è come una scatola magica che contiene un computer in miniatura già configurato.
* **Quando farlo:** È sempre la PRIMA cosa da fare ogni volta che inizi a lavorare.
* **Come farlo:** 
  1. Apri l'app **Docker Desktop** sul tuo Mac e assicurati che sia avviata (deve esserci la balenetta in alto a destra).
  2. Apri il terminale, vai nella cartella principale del progetto (dove c'è questo file README) e scrivi:
     ```bash
     docker compose up -d
     ```
  *Fatto! Il tuo database PostgreSQL ora è acceso e pronto.*

### 2. SECONDA COSA: Accendi il Backend (La Cucina)
Ora che il magazzino è aperto, dobbiamo far entrare i cuochi. Il backend vive nella cartella `/backend`.
* **Quando farlo:** Subito DOPO aver acceso il database tramite Docker.
* **Come farlo:**
  1. Nel terminale, entra nella cartella del backend:
     ```bash
     cd backend
     ```
  2. Accendi il server:
     ```bash
     npm run start:dev
     ```
  *(Se è la primissima volta che lo apri, ricordati di fare prima `npm install` per scaricare gli strumenti, e `npx prisma db push` per creare le tabelle nel magazzino).*
  *Il backend è ora sveglio sulla porta **3000** e sta ascoltando le richieste.*

### 3. TERZA COSA: Accendi il Frontend (La Sala)
Infine, dobbiamo aprire la porta ai clienti. Il frontend vive nella cartella `/frontend`.
* **Quando farlo:** Alla fine, DOPO che Database e Backend sono accesi.
* **Come farlo:**
  1. Apri una **NUOVA** finestra del terminale (non chiudere quella del backend!).
  2. Entra nella cartella del frontend:
     ```bash
     cd frontend
     ```
  3. Accendi il sito:
     ```bash
     npm run dev
     ```
  *(Anche qui, la primissima volta fai `npm install`).*
  *Ora puoi aprire **http://localhost:3001** nel tuo browser. Il sito è vivo!*

---

## 📁 Cosa fanno i vari file e cartelle?

Ecco una mappa del tesoro per capire cosa stai guardando:

### Nella cartella principale (Root):
* **`docker-compose.yml`**: Le istruzioni per "Docker". Gli dice come creare e accendere il database.
* **`GEMINI.md`**: Le regole segrete dell'Intelligenza Artificiale che ti aiuta a programmare.
* **`README.md`**: Questo file che stai leggendo ora!

### Nella cartella `/backend` (Il Server / La Cucina):
* **`package.json`**: L'elenco di tutti gli "strumenti/ingredienti" (librerie) che servono alla cucina per funzionare.
* **`src/`**: Il cuore pulsante. Qui dentro c'è tutto il codice che dice alla cucina come comportarsi. Dimentica il resto, lavorerai quasi sempre qui dentro o in `prisma/`.
  * **`main.ts`**: L'interruttore principale della cucina.
  * **`app.module.ts`**: Il "quadro elettrico" centrale che collega tutte le stanze della cucina.
  * **`albums/`**, **`photos/`**, **`bookings/`**: Sono le singole "postazioni" della cucina (ognuna si occupa di una cosa specifica).
* **`prisma/`**: Qui ci sono le istruzioni per parlare con il magazzino.
  * **`schema.prisma`**: La mappa del magazzino. Spiega esattamente come sono fatte le tabelle `Album`, `Photo` e `Booking`.

### Nella cartella `/frontend` (Il Sito Web / La Sala):
* **`package.json`**: Come sopra, ma con gli strumenti che servono per dipingere il sito web.
* **`src/app/`**: Qui è dove si disegnano le pagine web visualizzate dagli utenti!
  * **`page.tsx`**: La pagina principale (la Home del tuo sito).
  * **`layout.tsx`**: La cornice di ogni pagina (dove magari metterai la barra di navigazione o il footer in basso).
  * **`globals.css`**: Lo stile, i colori, i caratteri del tuo sito.

---

## 🔒 Focus: Ma è sicuro?
Assolutamente sì. Hai chiesto un sito fotografico *"Zero-Trust"*. Significa che:
* Nessuna delle tue foto in gallerie private sarà mai accessibile pubblicamente cercandola su Google.
* Il backend controllerà sempre la password che l'utente inserisce.
* Solo se la password è corretta, il backend creerà un link "usa e getta" (Presigned URL) che scade dopo poco tempo, per mostrare la foto solo a chi ha davvero il permesso.
