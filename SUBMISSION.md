---
title: "Policy Storyteller — Nepali Bills as Day-in-the-Life Stories with Gemma 4"
published: false
description: "Bilingual civic app: Gemma 4 turns Nepal's bills into a plain brief, three personas, scenarios, and what gets riskier/safer."
tags: googleai, gemma4challenge, ai, civic
cover_image: ""
---

## What I Built

**Policy Storyteller** helps Nepali citizens understand laws without a law degree.

Pick a bill → get a **plain-language brief**, **three diverse personas** (Terai, hill, city — farmer, student, shopkeeper…), each with a **day-in-the-life scenario** and **what becomes riskier / safer** → vote on the story. English or नेपाली.

Four bills built in: Social Media Act 2081, IT & Cyber Security 2082, School Education 2080, Privacy Act 2075.

Not legal advice — **digital equity** for low literacy and patchy 4G.

## Demo

**Repo:** https://github.com/NiranjanNlc/PolicyStoryTeller  
**Live:** *(add when deployed)*

**Flow:** Choose bill → Generate story (~1–2 min) → Explore brief & personas → Vote. Stories cache in `localStorage` per bill + language.

## How I Used Gemma 4

Gemma 4 does **everything** — no hand-written summaries, no rules engine. A FastAPI backend chains seven focused calls per story:

| Step | Gemma 4 outputs |
|------|-----------------|
| Brief | JSON: summary, who is affected, key points |
| Personas | 3 diverse Nepali composites |
| Scenarios | 2–3 sentences each, NPR & real places |
| Risks | JSON: riskier / safer lists |

Prompts force **Nepal context** (Nagarpalika, NPR, Dashain, Terai/hill/mountain) and **Devanagari Nepali** when selected. Pydantic validates JSON; one auto-retry if the model adds markdown fences.

Via **OpenRouter** (OpenAI-compatible API) — swap model id in `.env`.

## Which Model & Why

**Gemma 4 small (2B/4B)** — on purpose.

Civic users are on phones and free tiers. Each job is small JSON or a few sentences — not a 31B reasoning marathon. Seven sequential calls already take ~1–2 minutes; small Gemma keeps that affordable, fast enough, and good enough in Nepali. MoE/dense would be overkill; small Gemma is the tool that can run *in* Nepal, not just *about* Nepal.

## Stack

React + Vite + Tailwind · FastAPI + Pydantic · OpenRouter · no DB (localStorage + file votes)

```bash
cd backend && pip install -r requirements.txt && copy .env.example .env
uvicorn main:app --reload --port 8000
cd ../frontend && npm install && npm run dev
```

## Learned (quick)

- Retry on bad JSON beats switching to a bigger model.
- Tell Gemma *who* the reader is (“low legal literacy”) — Nepali output improves a lot.
- Run calls **sequentially** on free tier or you hit 429 halfway through a story.

## Links

👉 https://github.com/NiranjanNlc/PolicyStoryTeller  
[Gemma 4 Challenge](https://dev.to/challenges/google-gemma-2026-05-06) — *Build With Gemma 4* · Solo · MIT

**Disclaimer:** Educational composites only — verify with official Nepal Government sources.
