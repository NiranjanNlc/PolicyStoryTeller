import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { generateFullStory } from "../api/client";
import { BackButton } from "../components/BackButton";
import { BillSelect } from "../components/BillSelect";
import { QuestHeader, QuestPanel, QuestProgress } from "../components/quest/QuestPrimitives";
import { useApp } from "../context/AppContext";
import { BILLS } from "../data/bills";
import { friendlyApiError } from "../lib/apiErrors";
import { STRINGS } from "../i18n";

export function BillOverviewScreen() {
  const { billId } = useParams<{ billId: string }>();
  const navigate = useNavigate();
  const { lang, getStory, getStoryMeta, setStory } = useApp();
  const t = STRINGS[lang];
  const bill = BILLS.find((b) => b.id === billId);
  const existing = billId ? getStory(billId) : null;
  const meta = billId ? getStoryMeta(billId) : null;

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!bill) {
    return (
      <div>
        <BackButton to="/" t={t} />
        <p className="text-gray-300">{t.billNotFound}</p>
        <button type="button" onClick={() => navigate("/")} className="q-accent mt-4 text-sm font-semibold">
          {t.backToBills}
        </button>
      </div>
    );
  }

  async function handleGenerate() {
    if (!bill) return;
    if (existing && !window.confirm(t.regenerateConfirm)) return;

    setBusy(true);
    setError(null);
    try {
      const r = await generateFullStory(bill.text[lang], lang);
      setStory(bill.id, {
        storyKey: r.story_key,
        policyBrief: r.policy_brief,
        stories: r.stories,
      });
      navigate(`/bill/${bill.id}/story`);
    } catch (e) {
      const raw = e instanceof Error ? e.message : "Something went wrong";
      setError(friendlyApiError(raw, t));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <BackButton to="/" t={t} />

      <QuestHeader
        icon="📋"
        chapter={t.questChapter(2)}
        title={bill.label[lang]}
        subtitle={bill.summary[lang]}
      />

      <QuestPanel className="mb-6">
        <p className="q-label mb-3">{t.switchBill}</p>
        <BillSelect
          lang={lang}
          t={t}
          id="bill-select-overview"
          value={bill.id}
          onChange={(b) => {
            if (b.id !== bill.id) navigate(`/bill/${b.id}`);
          }}
        />
      </QuestPanel>

      <QuestPanel>
        <div className="flex items-start gap-4">
          <span className="q-icon-box text-3xl" aria-hidden>
            {bill.emoji}
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold text-gray-50">{bill.label[lang]}</h2>
            {meta ? (
              <p className="mt-2 text-xs text-sky-400/90">{t.storyLangBadge(meta.lang)}</p>
            ) : null}
            <details className="mt-4 group">
              <summary className="cursor-pointer text-sm font-semibold text-sky-400 hover:text-sky-300">
                {t.viewBillText}
              </summary>
              <p className="mt-3 max-h-40 overflow-y-auto q-panel-inset text-sm leading-relaxed text-gray-400">
                {bill.text[lang]}
              </p>
            </details>
          </div>
        </div>
      </QuestPanel>

      <QuestPanel className="mt-6">
        <h3 className="font-display text-lg font-semibold text-gray-100">{t.overviewActionTitle}</h3>
        <p className="q-subtitle mt-2">{t.overviewActionHint}</p>

        {busy ? <QuestProgress indeterminate label={t.generatingWait} /> : null}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={busy}
            onClick={() => void handleGenerate()}
            className="q-btn-primary flex-1"
          >
            {busy ? `⏳ ${t.analyzingPolicy}` : `▶ ${t.generateFull}`}
          </button>
          {existing ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => navigate(`/bill/${bill.id}/story`)}
              className="q-btn-secondary"
            >
              {t.viewExistingStory}
            </button>
          ) : null}
        </div>

        {busy ? (
          <p className="mt-3 text-sm text-gray-400" aria-live="assertive">
            {t.analyzeHint}
          </p>
        ) : null}
        {error ? (
          <div className="mt-4" role="alert">
            <p className="q-alert-error">{error}</p>
            <p className="mt-2 text-xs text-gray-500">{t.errorRetryHint}</p>
          </div>
        ) : null}
      </QuestPanel>
    </div>
  );
}
