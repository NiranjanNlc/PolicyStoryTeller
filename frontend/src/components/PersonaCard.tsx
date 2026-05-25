import type { Persona } from "../api/types";
import type { Strings } from "../i18n";

type Props = { persona: Persona; t: Strings; variant?: "default" | "quest" };

export function PersonaCard({ persona, t, variant = "default" }: Props) {
  if (variant === "quest") {
    return (
      <article aria-labelledby="persona-heading">
        <h2 id="persona-heading" className="sr-only">
          {t.personaTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
          <span className="q-badge-accent text-sm font-bold">{persona.name}</span>
          <span className="q-badge">
            {persona.age} · {persona.location}
          </span>
          <span className="q-badge">{persona.occupation}</span>
        </div>
        <p className="q-panel-inset mt-4 text-sm leading-7 text-gray-200">{persona.bio}</p>
      </article>
    );
  }

  return (
    <article className="q-panel" aria-labelledby="persona-heading">
      <h2 id="persona-heading" className="font-display text-xl font-semibold text-gray-100">
        {t.personaTitle}
      </h2>
      <p className="q-subtitle mt-1">{t.personaSubtitle}</p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-gray-500">{t.personaName}</dt>
          <dd className="font-medium text-gray-100">{persona.name}</dd>
        </div>
        <div>
          <dt className="text-gray-500">{t.personaAge}</dt>
          <dd className="font-medium text-gray-100">{persona.age}</dd>
        </div>
        <div>
          <dt className="text-gray-500">{t.personaOccupation}</dt>
          <dd className="font-medium text-gray-100">{persona.occupation}</dd>
        </div>
        <div>
          <dt className="text-gray-500">{t.personaLocation}</dt>
          <dd className="font-medium text-gray-100">{persona.location}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-gray-500">{t.personaBio}</dt>
          <dd className="mt-1 leading-relaxed text-gray-300">{persona.bio}</dd>
        </div>
      </dl>
    </article>
  );
}
