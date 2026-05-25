import type { Strings } from "../i18n";

type Props = { scenario: string; t: Strings; variant?: "default" | "quest" };

function scenarioChunks(text: string): string[] {
  const byParagraph = text.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
  if (byParagraph.length > 1) return byParagraph;
  return [text];
}

export function ScenarioBox({ scenario, t, variant = "default" }: Props) {
  const chunks = scenarioChunks(scenario);

  if (variant === "quest") {
    return (
      <section aria-labelledby="scenario-heading">
        <h2
          id="scenario-heading"
          className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-100"
        >
          <span aria-hidden>📖</span>
          {t.scenarioTitle}
        </h2>
        <div className="space-y-3">
          {chunks.map((chunk, i) => (
            <p key={`${i}-${chunk.slice(0, 32)}`} className="q-scenario-block">
              {chunk}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="q-panel" aria-labelledby="scenario-heading">
      <h2 id="scenario-heading" className="font-display text-xl font-semibold text-gray-100">
        {t.scenarioTitle}
      </h2>
      <p className="mt-3 leading-relaxed text-gray-300">{scenario}</p>
    </section>
  );
}
