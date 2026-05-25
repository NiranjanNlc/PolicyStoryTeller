import { useState } from "react";
import { Link } from "react-router-dom";
import type { PersonaStory } from "../../api/types";
import type { Strings } from "../../i18n";
import { RisksList } from "../RisksList";
import { ScenarioBox } from "../ScenarioBox";
import { personaAvatar } from "./personaAvatars";

type View = "scenario" | "impact";

type Props = {
  stories: PersonaStory[];
  billId: string;
  billLabel: string;
  t: Strings;
  className?: string;
};

export function StoryFlow({ stories, billId, billLabel, t, className = "" }: Props) {
  const [personaIdx, setPersonaIdx] = useState(0);
  const [view, setView] = useState<View>("scenario");

  const entry = stories[personaIdx];
  const isLast = personaIdx >= stories.length - 1;
  const isFirst = personaIdx === 0;

  if (!entry) return null;

  const goNextPersona = () => {
    if (isLast) return;
    setPersonaIdx((i) => i + 1);
    setView("scenario");
  };

  const goBackPersona = () => {
    if (!isFirst) {
      setPersonaIdx((i) => i - 1);
      setView("scenario");
    }
  };

  return (
    <div className={`flex min-h-0 flex-col overflow-hidden ${className}`.trim()}>
      <p className="mb-2 shrink-0 truncate text-center text-xs font-medium text-gray-500">
        {billLabel} · {t.personaOf(personaIdx + 1, stories.length)}
      </p>

      <div className="brief-card min-h-0 flex-1 overflow-hidden">
        <PersonaPanel entry={entry} index={personaIdx} view={view} onView={setView} t={t} />
      </div>

      <div className="mt-2 flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={goBackPersona}
          disabled={isFirst}
          className="q-btn-secondary min-h-10 flex-1 text-xs"
        >
          {t.back}
        </button>
        {isLast ? (
          <Link
            to={`/bill/${billId}/vote`}
            className="q-btn-primary flex min-h-10 flex-1 items-center justify-center text-xs"
          >
            {t.goToVote}
          </Link>
        ) : (
          <button type="button" onClick={goNextPersona} className="q-btn-primary min-h-10 flex-1 text-xs">
            {t.next}
          </button>
        )}
      </div>
    </div>
  );
}

function PersonaPanel({
  entry,
  index,
  view,
  onView,
  t,
}: {
  entry: PersonaStory;
  index: number;
  view: View;
  onView: (v: View) => void;
  t: Strings;
}) {
  const tabs: { id: View; label: string }[] = [
    { id: "scenario", label: t.scenarioTitle },
    { id: "impact", label: t.impactTab },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-1">
      <div className="mb-2 flex shrink-0 items-center gap-2">
        <span className="text-xl" aria-hidden>
          {personaAvatar(index)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-900">{entry.persona.name}</p>
          <p className="truncate text-[11px] text-gray-500">
            {entry.persona.occupation} · {entry.persona.location}
          </p>
        </div>
      </div>

      <div className="mb-2 flex shrink-0 gap-1 rounded-lg border border-gray-200 bg-gray-50 p-0.5" role="tablist">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={view === id}
            onClick={() => onView(id)}
            className={`flex flex-1 items-center justify-center rounded-md py-2 text-xs font-semibold ${
              view === id ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden" role="tabpanel">
        {view === "scenario" ? (
          <ScenarioBox scenario={entry.scenario} t={t} variant="compact" />
        ) : (
          <RisksList risks={entry.risks} t={t} variant="compact" />
        )}
      </div>
    </div>
  );
}
