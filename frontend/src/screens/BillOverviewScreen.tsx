import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateFullStory } from "../api/client";
import { QuestProgress } from "../components/quest/QuestPrimitives";
import { useApp } from "../context/AppContext";
import { BILLS } from "../data/bills";
import { friendlyApiError } from "../lib/apiErrors";
import { STRINGS } from "../i18n";

export function BillOverviewScreen() {
  const { billId } = useParams<{ billId: string }>();
  const navigate = useNavigate();
  const { lang, getStory, setStory } = useApp();
  const t = STRINGS[lang];
  const bill = BILLS.find((b) => b.id === billId);
  const existing = billId ? getStory(billId) : null;

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!bill) {
    return (
      <div className="page-shell page-shell--fill items-center justify-center">
        <p className="text-sm text-gray-700">{t.billNotFound}</p>
        <button type="button" onClick={() => navigate("/")} className="q-btn-primary mt-3">
          {t.backToBills}
        </button>
      </div>
    );
  }

  const activeBill = bill;

  async function handleGenerate() {
    if (existing && !window.confirm(t.regenerateConfirm)) return;

    setBusy(true);
    setError(null);
    try {
      const r = await generateFullStory(activeBill.text[lang], lang);
      setStory(activeBill.id, {
        storyKey: r.story_key,
        policyBrief: r.policy_brief,
        stories: r.stories,
      });
      navigate(`/bill/${activeBill.id}/story`);
    } catch (e) {
      const raw = e instanceof Error ? e.message : "Something went wrong";
      setError(friendlyApiError(raw, t));
    } finally {
      setBusy(false);
    }
  }

  function openBrief() {
    if (existing) navigate(`/bill/${activeBill.id}/story`);
    else void handleGenerate();
  }

  return (
    <div className="page-shell page-shell--fill">
      <div className="brief-card flex flex-1 flex-col justify-between gap-3">
        <div className="min-h-0 text-center">
          <span className="text-4xl" aria-hidden>
            {activeBill.emoji}
          </span>
          <p className="q-label mt-2">{t.stepUnderstand}</p>
          <h2 className="mt-1 line-clamp-3 font-display text-base font-semibold text-gray-900">
            {activeBill.label[lang]}
          </h2>
          <p className="mt-2 line-clamp-4 text-sm leading-snug text-gray-700">{activeBill.summary[lang]}</p>
        </div>

        {busy ? (
          <QuestProgress indeterminate label={t.generatingWait} />
        ) : (
          <p className="text-center text-xs text-gray-500">{t.overviewActionHint}</p>
        )}

        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void openBrief()}
            className="q-btn-primary w-full"
          >
            {busy ? `⏳ ${t.analyzingPolicy}` : existing ? `▶ ${t.viewExistingStory}` : `▶ ${t.generateFull}`}
          </button>
          {existing && !busy ? (
            <button
              type="button"
              onClick={() => void handleGenerate()}
              className="q-btn-secondary w-full text-xs"
            >
              {t.generateFull}
            </button>
          ) : null}
        </div>

        {error ? (
          <p className="q-alert-error shrink-0 text-center" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
