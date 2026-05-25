import { useState } from "react";
import { fetchNepalPolicies } from "../api/client";
import type { NepalPoliciesBrief } from "../api/types";
import type { Lang, Strings } from "../i18n";
import { QuestHeader, QuestPanel } from "./quest/QuestPrimitives";

type Props = {
  lang: Lang;
  t: Strings;
  onUseAsPolicy: (text: string) => void;
  embedded?: boolean;
};

function confidenceClass(level: string): string {
  const v = level.toLowerCase();
  if (v.startsWith("high")) return "border-green-800/50 bg-green-950/30 text-green-200";
  if (v.startsWith("med")) return "border-gray-600 bg-gray-800 text-gray-300";
  return "border-red-900/50 bg-red-950/30 text-red-200";
}

export function LatestPoliciesPanel({ lang, t, onUseAsPolicy, embedded }: Props) {
  const [brief, setBrief] = useState<NepalPoliciesBrief | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setBusy(true);
    setError(null);
    try {
      const r = await fetchNepalPolicies(lang);
      setBrief(r.brief);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load policies");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-labelledby="policies-heading">
      {embedded ? (
        <p className="q-subtitle mb-4">{t.policiesIntro}</p>
      ) : (
        <QuestHeader icon="📚" title={t.policiesTitle} subtitle={t.policiesIntro} />
      )}

      <QuestPanel className={embedded ? "border-0 bg-transparent p-0 shadow-none" : ""}>
        <button
          type="button"
          onClick={() => void load()}
          disabled={busy}
          className="q-btn-primary"
        >
          {busy ? `⏳ ${t.workingOn(t.busyPolicies)}` : brief ? t.policiesRefresh : t.policiesFetch}
        </button>

        {error ? (
          <p className="q-alert-error mt-4" role="alert">
            {error}
          </p>
        ) : null}

        {brief ? (
          <div className="mt-6 space-y-4">
            <ul className="grid gap-4 sm:grid-cols-2" role="list">
              {brief.items.map((it, idx) => (
                <li key={`${idx}-${it.title}`} className="q-panel-inset flex flex-col gap-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display text-base font-semibold text-gray-100">
                      {it.title}
                    </h3>
                    <span
                      className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${confidenceClass(
                        it.confidence,
                      )}`}
                      title={t.policiesConfidence}
                    >
                      {it.confidence}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] font-medium text-gray-500">
                    <span className="q-badge">
                      {t.policiesArea}: {it.area}
                    </span>
                    <span className="q-badge">{it.year_or_status}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">{it.summary}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-400">{t.policiesAffects}:</span>{" "}
                    {it.who_it_affects}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onUseAsPolicy(
                        `${it.title}\n\n${it.summary}\n\n(${t.policiesAffects}: ${it.who_it_affects})`,
                      )
                    }
                    className="q-btn-secondary mt-auto self-start text-xs"
                  >
                    {t.policiesUse}
                  </button>
                </li>
              ))}
            </ul>
            <p className="q-panel-inset text-xs leading-relaxed text-gray-500">
              {brief.disclaimer || t.policiesDisclaimer}
            </p>
          </div>
        ) : null}
      </QuestPanel>
    </section>
  );
}
