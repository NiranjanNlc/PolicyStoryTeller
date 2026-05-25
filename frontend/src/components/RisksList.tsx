import type { RiskAnalysis } from "../api/types";
import type { Strings } from "../i18n";

type Props = { risks: RiskAnalysis; t: Strings; variant?: "default" | "compact" };

function ImpactList({ items, title, tone }: { items: string[]; title: string; tone: "risk" | "safe" }) {
  const panel = tone === "risk" ? "q-risk-panel" : "q-safe-panel";
  return (
    <section className={panel} aria-label={title}>
      <h3 className="text-xs font-semibold">{title}</h3>
      <ul className="mt-1.5 space-y-1">
        {items.map((item, i) => (
          <li key={i} className="line-clamp-3 text-xs leading-snug">
            • {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RisksList({ risks, t, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden" aria-label={t.impactTab}>
        <ImpactList items={risks.riskier} title={t.becomesRiskier} tone="risk" />
        <ImpactList items={risks.safer} title={t.becomesSafer} tone="safe" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2" aria-labelledby="risks-heading">
      <h2 id="risks-heading" className="sr-only">
        {t.risksHeading}
      </h2>
      <ImpactList items={risks.riskier} title={t.riskier} tone="risk" />
      <ImpactList items={risks.safer} title={t.safer} tone="safe" />
    </div>
  );
}
