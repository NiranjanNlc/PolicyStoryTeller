import type { Strings } from "../i18n";

type Props = { scenario: string; t: Strings; variant?: "default" | "compact" };

export function ScenarioBox({ scenario, t, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <p className="line-clamp-[14] text-sm leading-relaxed text-gray-800" aria-label={t.scenarioTitle}>
        {scenario}
      </p>
    );
  }

  return (
    <section className="q-panel" aria-labelledby="scenario-heading">
      <h2 id="scenario-heading" className="font-display text-xl font-semibold text-gray-900">
        {t.scenarioTitle}
      </h2>
      <p className="mt-3 leading-relaxed text-gray-700">{scenario}</p>
    </section>
  );
}
