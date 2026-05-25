# Policy Storyteller (Gemma 4 Good)

Turn dense **Nepali legislative bills** into a **plain-language policy brief**, **three diverse personas**, each with a **day-in-the-life scenario**, and **what becomes riskier / safer**. Built for **digital equity** and civic literacy.

 
 

## Demo video

Screen recording of the app on mobile (scenario + impact flow):

<video src="Screen%20Recording%202026-05-25%20124229.mp4" controls width="100%">
  Your browser does not support embedded video.
  <a href="Screen%20Recording%202026-05-25%20124229.mp4">Download the demo (MP4)</a>
</video>

Direct link: [Screen Recording 2026-05-25 124229.mp4](Screen%20Recording%202026-05-25%20124229.mp4)
 

## Four bills available now

| Bill | Description |
|------|-------------|
| 📱 **Social Media Act (Bill), 2081** | Regulates social media platforms and users |
| 🔒 **IT and Cyber Security Bill, 2082** | Cybercrime offenses and penalties |
| 🎓 **School Education Bill, 2080** | School levels and standards |
| 🔐 **Privacy Act, 2075** | Personal data protection |

## App flow (quest chapters)

1. **Choose bill** (`/`) — card grid + dropdown
2. **Understand** (`/bill/:id`) — summary, generate full story (1–2 min)
3. **Explore** (`/bill/:id/story`) — brief → 3 personas (tabs) → compare → vote
4. **Vote** (`/bill/:id/vote`) — one vote per browser per story

Stories persist in **localStorage** (per bill + language). Changing language clears cached stories.

## Quick start

### Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env   # add OPENROUTER_API_KEY
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Optional: `VITE_API_URL` for production API origin.

## API

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/generate/full` | `{ law_text, language }` → `story_key`, `policy_brief`, `stories[]` |
| POST | `/api/generate/persona` | Single persona |
| POST | `/api/generate/scenario` | Scenario for one persona |
| POST | `/api/generate/risks` | Risks for one persona + scenario |
| POST | `/api/vote` | `{ story_key, stance }` |
| GET | `/api/vote/stats/{story_key}` | Aggregate counts |
| GET | `/api/health` | Liveness |

## Disclaimer

Generated stories are **educational composites**, not legal advice. Verify with official Nepal Government sources.
