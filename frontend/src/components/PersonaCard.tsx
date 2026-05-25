import type { Persona } from "../api/types";
import type { Strings } from "../i18n";

type Props = { persona: Persona; t: Strings; variant?: "default" | "quest" };

export function PersonaCard({ persona, t, variant = "default" }: Props) {
  if (variant === "quest") {
    return (
      <article className="flex min-h-0 flex-1 flex-col overflow-hidden" aria-labelledby="persona-heading">
        <h2 id="persona-heading" className="sr-only">
          {t.personaTitle}
        </h2>
        <div className="flex shrink-0 flex-wrap gap-1">
          <span className="q-badge-accent text-xs font-bold">{persona.name}</span>
          <span className="q-badge text-[10px]">
            {persona.age} · {persona.location}
          </span>
        </div>
        <p className="q-panel-inset mt-2 line-clamp-[10] flex-1 text-sm leading-snug text-gray-800">
          {persona.bio}
        </p>
      </article>
    );
  }

  return (
    <article className="q-panel" aria-labelledby="persona-heading">
      <h2 id="persona-heading" className="font-display text-xl font-semibold text-gray-900">
        {t.personaTitle}
      </h2>
      <p className="q-subtitle mt-1">{t.personaSubtitle}</p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-gray-500">{t.personaName}</dt>
          <dd className="font-medium text-gray-900">{persona.name}</dd>
        </div>
        <div>
          <dt className="text-gray-500">{t.personaAge}</dt>
          <dd className="font-medium text-gray-900">{persona.age}</dd>
        </div>
        <div>
          <dt className="text-gray-500">{t.personaOccupation}</dt>
          <dd className="font-medium text-gray-900">{persona.occupation}</dd>
        </div>
        <div>
          <dt className="text-gray-500">{t.personaLocation}</dt>
          <dd className="font-medium text-gray-900">{persona.location}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-gray-500">{t.personaBio}</dt>
          <dd className="mt-1 leading-relaxed text-gray-700">{persona.bio}</dd>
        </div>
      </dl>
    </article>
  );
}
