import { useNavigate } from "react-router-dom";
import { BillCard } from "../components/BillCard";
import { useApp } from "../context/AppContext";
import { BILLS } from "../data/bills";
import { STRINGS } from "../i18n";

export function BillSelectionScreen() {
  const navigate = useNavigate();
  const { lang } = useApp();
  const t = STRINGS[lang];

  return (
    <section className="page-shell page-shell--fill" aria-labelledby="bills-heading">
      <h2 id="bills-heading" className="sr-only">
        {t.billsTitle}
      </h2>
      <p className="shrink-0 line-clamp-2 text-sm font-medium text-gray-900">{t.billsTitle}</p>
      <p className="mb-2 shrink-0 line-clamp-2 text-xs text-gray-600">{t.billsIntro}</p>

      <ul className="grid min-h-0 flex-1 grid-cols-2 gap-2 content-stretch" role="list">
        {BILLS.map((bill) => (
          <li key={bill.id} className="min-h-0">
            <BillCard
              bill={bill}
              lang={lang}
              selected={false}
              compact
              onSelect={(b) => navigate(`/bill/${b.id}`)}
            />
          </li>
        ))}
      </ul>

      <p className="mt-2 shrink-0 text-center text-[10px] text-gray-500">{t.disclaimer}</p>
    </section>
  );
}
