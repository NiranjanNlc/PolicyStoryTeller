import { useCallback, useEffect, useState } from "react";
import type { VoteStance } from "../api/types";
import { fetchVoteStats, submitVote } from "../api/client";
import { getStoredVote, setStoredVote } from "../lib/voteStorage";
import type { Strings } from "../i18n";

type Props = {
  storyKey: string | null;
  t: Strings;
};

const STANCE_STYLE: Record<VoteStance, string> = {
  for: "border-sky-600/50 bg-sky-600/15 hover:bg-sky-600/25",
  against: "border-red-800/50 bg-red-950/30 hover:bg-red-950/50",
  neutral: "border-gray-600 bg-gray-800 hover:bg-gray-700",
};

export function VotePanel({ storyKey, t }: Props) {
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
    <section aria-labelledby="vote-heading">
      <h2
        id="vote-heading"
        className="flex items-center gap-2 font-display text-lg font-semibold text-gray-50"
      >
        <span aria-hidden>🏆</span>
        {t.voteTitle}
      </h2>
      <p className="q-subtitle mt-1">{t.voteHint}</p>

      {myVote ? (
        <p className="mt-4 rounded-xl border border-sky-600/40 bg-sky-950/30 px-4 py-3 text-sm font-medium text-sky-100" role="status">
          {t.voteThankYou(stanceLabel[myVote])}
        </p>
      ) : null}

      {!storyKey ? (
        <p className="mt-4 text-sm text-gray-400" role="status">
          {t.voteEnable}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={t.voteTitle}>
        {(["for", "against", "neutral"] as const).map((stance) => (
          <button
            key={stance}
            type="button"
            disabled={disabled}
            onClick={() => void onVote(stance)}
            className={`min-h-11 min-w-[7rem] rounded-xl border px-4 py-2 text-sm font-semibold text-gray-100 transition disabled:cursor-not-allowed disabled:opacity-40 ${
              myVote === stance ? "ring-2 ring-sky-400" : ""
            } ${STANCE_STYLE[stance]}`}
          >
            {stanceLabel[stance]}
          </button>
        ))}
      </div>

      {myVote ? (
        <p className="mt-3 text-xs text-gray-500">{t.voteAlready}</p>
      ) : null}

      {stats && total > 0 ? (
        <div className="mt-6 space-y-2" aria-live="polite">
          <p className="text-xs font-medium text-gray-500">
            {t.voteTotals(stats.for, stats.against, stats.neutral)}
          </p>
          {(
            [
              { count: stats.for, bar: "bg-sky-500", label: t.voteFor },
              { count: stats.against, bar: "bg-red-500/80", label: t.voteAgainst },
              { count: stats.neutral, bar: "bg-gray-500", label: t.voteNeutral },
            ] as const
          ).map(({ count, bar, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className="w-16 shrink-0 text-gray-400">{label}</span>
              <div className="q-progress-track h-2 flex-1">
                <div
                  className={`h-full rounded-full ${bar}`}
                  style={{ width: `${Math.round((count / total) * 100)}%` }}
                />
              </div>
              <span className="w-6 text-right text-gray-400">{count}</span>
            </div>
          ))}
        </div>
      ) : stats ? (
        <p className="mt-4 text-sm text-gray-500">
          {t.voteTotals(stats.for, stats.against, stats.neutral)}
          <span>{t.voteFirst}</span>
        </p>
      ) : storyKey ? (
        <p className="mt-4 text-sm text-gray-500" role="status">
          {t.voteLoading}
        </p>
      ) : null}

      {error ? (
        <p className="q-alert-error mt-3" role="alert">
          {error}
        </p>
      ) : null}
    </section>
  );
}
