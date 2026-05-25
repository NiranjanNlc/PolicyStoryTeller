import type { RiskAnalysis } from "../api/types";
import type { Strings } from "../i18n";

type Props = { risks: RiskAnalysis; t: Strings; variant?: "default" | "quest" };

function ImpactCards({
  items,
  tone,
  title,
  icon,
}: {
  items: string[];
  tone: "risk" | "safe";
  title: string;
  icon: string;
}) {
  const panel = tone === "risk" ? "q-risk-panel" : "q-safe-panel";

  return (
    <section className={panel} aria-label={title}>
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <span aria-hidden>{icon}</span>
        {title}
      </h3>
      <ul className="mt-3 space-y-2">
        {items.map((item, i) => (
          <li
            key={`${i}-${item.slice(0, 24)}`}
            className="rounded-lg bg-black/15 px-3 py-2 text-sm leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RisksList({ risks, t, variant = "default" }: Props) {
  if (variant === "quest") {
    return (
      <div className="grid gap-3" aria-labelledby="risks-heading">
        <h2 id="risks-heading" className="sr-only">
          {t.risksHeading}
        </h2>
        <ImpactCards items={risks.riskier} tone="risk" title={t.riskier} icon="⚠️" />
        <ImpactCards items={risks.safer} tone="safe" title={t.safer} icon="✅" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2" aria-labelledby="risks-heading">
      <h2 id="risks-heading" className="sr-only">
        {t.risksHeading}
      </h2>
      <ImpactCards items={risks.riskier} tone="risk" title={t.riskier} icon="⚠️" />
      <ImpactCards items={risks.safer} tone="safe" title={t.safer} icon="✅" />
    </div>
  );
}
