import { useCallback, useEffect, useState } from "react";
import type { VoteStance } from "../api/types";
import { fetchVoteStats, submitVote } from "../api/client";
import { getStoredVote, setStoredVote } from "../lib/voteStorage";
import type { Strings } from "../i18n";

type Props = {
  storyKey: string | null;
  t: Strings;
  compact?: boolean;
};

const STANCE_STYLE: Record<VoteStance, string> = {
  for: "border-blue-300 bg-blue-50 text-blue-900 hover:bg-blue-100",
  against: "border-red-300 bg-red-50 text-red-900 hover:bg-red-100",
  neutral: "border-gray-300 bg-gray-50 text-gray-800 hover:bg-gray-100",
};

export function VotePanel({ storyKey, t, compact }: Props) {
  const [stats, setStats] = useState<{ for: number; against: number; neutral: number } | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [myVote, setMyVote] = useState<VoteStance | null>(null);

  useEffect(() => {
    if (!storyKey) {
      setMyVote(null);
      return;
    }
    setMyVote(getStoredVote(storyKey));
  }, [storyKey]);

  const refresh = useCallback(async () => {
    if (!storyKey) return;
    setError(null);
    const s = await fetchVoteStats(storyKey);
    setStats(s);
  }, [storyKey]);

  useEffect(() => {
    if (!storyKey) {
      setStats(null);
      setError(null);
      return;
    }
    void refresh();
  }, [storyKey, refresh]);

  async function onVote(stance: VoteStance) {
    if (!storyKey || myVote) return;
    setBusy(true);
    setError(null);
    try {
      await submitVote(storyKey, stance);
      setStoredVote(storyKey, stance);
      setMyVote(stance);
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Vote failed");
    } finally {
      setBusy(false);
    }
  }

  const disabled = !storyKey || busy || myVote != null;
  const total = stats ? stats.for + stats.against + stats.neutral : 0;
  const stanceLabel: Record<VoteStance, string> = {
    for: t.voteFor,
    against: t.voteAgainst,
    neutral: t.voteNeutral,
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden" aria-labelledby="vote-heading">
      <h2 id="vote-heading" className="flex shrink-0 items-center gap-1.5 font-display text-sm font-semibold text-gray-900">
        <span aria-hidden>🏆</span>
        {t.voteTitle}
      </h2>
      <p className="mt-0.5 shrink-0 line-clamp-2 text-xs text-gray-600">{t.voteHint}</p>

      {myVote ? (
        <p
          className="mt-2 shrink-0 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-900"
          role="status"
        >
          {t.voteThankYou(stanceLabel[myVote])}
        </p>
      ) : null}

      <div className="mt-2 flex shrink-0 flex-col gap-1.5" role="group" aria-label={t.voteTitle}>
        {(["for", "against", "neutral"] as const).map((stance) => (
          <button
            key={stance}
            type="button"
            disabled={disabled}
            onClick={() => void onVote(stance)}
            className={`min-h-10 w-full rounded-xl border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
              myVote === stance ? "ring-2 ring-blue-400" : ""
            } ${STANCE_STYLE[stance]}`}
          >
            {stanceLabel[stance]}
          </button>
        ))}
      </div>

      {stats && total > 0 && !compact ? (
        <div className="mt-3 space-y-1.5" aria-live="polite">
          <p className="text-[10px] font-medium text-gray-500">
            {t.voteTotals(stats.for, stats.against, stats.neutral)}
          </p>
        </div>
      ) : stats && total > 0 && compact ? (
        <p className="mt-2 shrink-0 text-center text-[10px] text-gray-500" aria-live="polite">
          {t.voteTotals(stats.for, stats.against, stats.neutral)}
        </p>
      ) : null}

      {error ? (
        <p className="q-alert-error mt-2 shrink-0 text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
