import type { Lang } from "../i18n";
import type {
  FullStoryResponse,
  NepalPoliciesResponse,
  PersonaResponse,
  RisksResponse,
  ScenarioResponse,
  VoteStats,
  VoteStance,
} from "./types";

const base = () => (import.meta.env.VITE_API_URL as string | undefined) || "";

async function readError(r: Response): Promise<string> {
  try {
    const data = (await r.json()) as { detail?: unknown };
    const d = data.detail;
    if (typeof d === "string") return d;
    if (Array.isArray(d)) return d.map((x) => JSON.stringify(x)).join("; ");
    if (d && typeof d === "object") return JSON.stringify(d);
  } catch {
    /* ignore */
  }
  return r.statusText;
}

async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const r = await fetch(`${base()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await readError(r));
  return r.json() as Promise<T>;
}

export async function generatePersona(lawText: string, language: Lang): Promise<PersonaResponse> {
  return postJSON("/api/generate/persona", { law_text: lawText, language });
}

export async function generateScenario(
  lawText: string,
  persona: PersonaResponse["persona"],
  language: Lang,
): Promise<ScenarioResponse> {
  return postJSON("/api/generate/scenario", { law_text: lawText, persona, language });
}

export async function generateRisks(
  lawText: string,
  persona: PersonaResponse["persona"],
  scenario: string,
  language: Lang,
): Promise<RisksResponse> {
  return postJSON("/api/generate/risks", { law_text: lawText, persona, scenario, language });
}

export async function generateFullStory(
  lawText: string,
  language: Lang,
): Promise<FullStoryResponse> {
  return postJSON("/api/generate/full", { law_text: lawText, language });
}

export async function fetchNepalPolicies(language: Lang): Promise<NepalPoliciesResponse> {
  return postJSON("/api/nepal/policies", { language });
}

export async function submitVote(storyKey: string, stance: VoteStance): Promise<void> {
  await postJSON("/api/vote", { story_key: storyKey, stance });
}

export async function fetchVoteStats(storyKey: string): Promise<VoteStats> {
  const r = await fetch(`${base()}/api/vote/stats/${encodeURIComponent(storyKey)}`);
  if (!r.ok) throw new Error(await readError(r));
  return r.json() as Promise<VoteStats>;
}
