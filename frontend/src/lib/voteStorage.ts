import type { VoteStance } from "../api/types";

const PREFIX = "policy-storyteller:vote:";

export function getStoredVote(storyKey: string): VoteStance | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(`${PREFIX}${storyKey}`);
  return v === "for" || v === "against" || v === "neutral" ? v : null;
}

export function setStoredVote(storyKey: string, stance: VoteStance): void {
  window.localStorage.setItem(`${PREFIX}${storyKey}`, stance);
}
