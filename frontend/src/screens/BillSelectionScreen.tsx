import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillCard } from "../components/BillCard";
import { LatestPoliciesPanel } from "../components/LatestPoliciesPanel";
import { QuestHeader } from "../components/quest/QuestPrimitives";
import { useApp } from "../context/AppContext";
import { BILLS } from "../data/bills";
import { STRINGS } from "../i18n";

export function BillSelectionScreen() {
  const navigate = useNavigate();
  const { lang } = useApp();
  const t = STRINGS[lang];
  const [selectedId, setSelectedId] = useState(BILLS[0]?.id ?? "");

  return (
    <section aria-labelledby="bills-heading">
      <QuestHeader
        icon="🗺️"
        chapter={t.questChapter(1)}
        title={t.billsTitle}
        subtitle={t.billsIntro}
      />

      <ul className="mb-6 grid gap-3 sm:grid-cols-2" role="list">
        {BILLS.map((bill) => (
          <li key={bill.id}>
            <BillCard
              bill={bill}
              lang={lang}
              selected={bill.id === selectedId}
              onSelect={(b) => setSelectedId(b.id)}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={!selectedId}
        onClick={() => selectedId && navigate(`/bill/${selectedId}`)}
        className="q-btn-primary mt-6 w-full sm:w-auto"
      >
        {t.continueToBill} →
      </button>

      <p className="mt-6 rounded-xl border border-dashed border-gray-700 bg-gray-800/50 px-4 py-3 text-center text-sm text-gray-500">
        {t.billsComingSoon}
      </p>

      <details className="q-panel mt-10">
        <summary className="cursor-pointer font-display text-lg font-semibold text-gray-100">
          {t.policiesSideQuest}
        </summary>
        <div className="mt-4">
          <LatestPoliciesPanel lang={lang} t={t} embedded onUseAsPolicy={() => {}} />
        </div>
      </details>

      <aside className="q-panel mt-6">
        <h3 className="font-display text-lg font-semibold text-gray-100">{t.whyTitle}</h3>
        <p className="q-subtitle mt-2">{t.whyBody}</p>
        <p className="mt-3 text-xs text-gray-500">{t.disclaimer}</p>
      </aside>
    </section>
  );
}
