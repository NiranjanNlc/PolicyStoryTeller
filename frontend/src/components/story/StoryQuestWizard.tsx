import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { PersonaStory, PolicyBrief } from "../../api/types";
import type { Strings } from "../../i18n";
import { QuestProgress } from "../quest/QuestPrimitives";
import { ComparePersonas } from "./ComparePersonas";
import { PersonaCard } from "../PersonaCard";
import { RisksList } from "../RisksList";
import { ScenarioBox } from "../ScenarioBox";
import { personaAvatar } from "./personaAvatars";

type Tab = "profile" | "story" | "impact";

type Step =
  | { type: "brief" }
  | { type: "persona"; index: number }
  | { type: "compare" };

type Props = {
  policyBrief?: PolicyBrief;
  stories: PersonaStory[];
  billId: string;
  billEmoji: string;
  billLabel: string;
  t: Strings;
};

function buildSteps(hasBrief: boolean, storyCount: number): Step[] {
  const steps: Step[] = [];
  if (hasBrief) steps.push({ type: "brief" });
  for (let i = 0; i < storyCount; i++) {
    steps.push({ type: "persona", index: i });
  }
  steps.push({ type: "compare" });
  return steps;
}

export function StoryQuestWizard({
  policyBrief,
  stories,
  billId,
  billEmoji,
  billLabel,
  t,
}: Props) {
  const steps = useMemo(
    () => buildSteps(!!policyBrief, stories.length),
    [policyBrief, stories.length],
  );
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<Tab>("profile");
  const [objectiveIdx, setObjectiveIdx] = useState(0);

  const step = steps[index];
  const isLast = index >= steps.length - 1;
  const isFirst = index === 0;
  const isCompare = step?.type === "compare";

  const goNext = () => {
    if (isLast) return;
    const next = index + 1;
    setIndex(next);
    setTab("profile");
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (!isFirst) {
      setIndex((i) => i - 1);
      setTab("profile");
      window.scrollTo(0, 0);
    }
  };

  if (!step) return null;

  const progressPct = Math.round(((index + 1) / steps.length) * 100);

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex items-center gap-3">
        <span className="q-icon-box text-2xl" aria-hidden>
          {billEmoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-gray-100">{billLabel}</p>
          <p className="text-xs text-gray-500">{t.questStepOf(index + 1, steps.length)}</p>
        </div>
      </div>

      <QuestProgress percent={progressPct} label={t.questStepOf(index + 1, steps.length)} />

      <div className="q-panel min-h-[280px]">
        <div className="max-h-[min(58vh,480px)] overflow-y-auto overscroll-contain">
          {step.type === "brief" && policyBrief ? (
            <BriefStep
              brief={policyBrief}
              t={t}
              objectiveIdx={objectiveIdx}
              onObjectiveIdx={setObjectiveIdx}
            />
          ) : null}

          {step.type === "persona" ? (
            <PersonaStep
              entry={stories[step.index]}
              index={step.index}
              tab={tab}
              onTab={setTab}
              t={t}
            />
          ) : null}

          {step.type === "compare" ? <ComparePersonas stories={stories} t={t} /> : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={goBack} disabled={isFirst} className="q-btn-secondary">
          {t.questBackStep}
        </button>
        {isLast ? (
          <Link
            to={`/bill/${billId}/vote`}
            className="q-btn-primary ml-auto flex flex-1 items-center justify-center gap-2 sm:flex-none"
          >
            <span aria-hidden>🏆</span>
            {t.goToVote}
          </Link>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="q-btn-primary ml-auto flex-1 sm:flex-none sm:min-w-[8rem]"
          >
            {t.questNext}
          </button>
        )}
      </div>
      {isCompare ? (
        <p className="mt-2 text-center text-xs text-sky-400/90">{t.questReadyVote}</p>
      ) : null}
    </div>
  );
}

function BriefStep({
  brief,
  t,
  objectiveIdx,
  onObjectiveIdx,
}: {
  brief: PolicyBrief;
  t: Strings;
  objectiveIdx: number;
  onObjectiveIdx: (n: number) => void;
}) {
  const teaser =
    brief.summary.length > 120 ? `${brief.summary.slice(0, 120).trim()}…` : brief.summary;
  const points = brief.key_points;
  const pt = points[objectiveIdx] ?? points[0];

  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-100">
        <span aria-hidden>📋</span>
        {t.questMissionTitle}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-300">{teaser}</p>
      <p className="mt-3 line-clamp-2 text-xs text-gray-400">
        <span className="font-semibold text-gray-300">{t.whoAffected}: </span>
        {brief.who_is_affected}
      </p>
      {points.length > 0 ? (
        <div className="q-panel-inset mt-5">
          <p className="q-label">{t.questObjectives}</p>
          <p className="mt-2 text-sm leading-relaxed text-gray-200">{pt}</p>
          {points.length > 1 ? (
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={objectiveIdx === 0}
                onClick={() => onObjectiveIdx(Math.max(0, objectiveIdx - 1))}
                className="q-btn-secondary min-h-8 px-3 py-1 text-xs"
              >
                ←
              </button>
              <span className="text-xs text-gray-500">
                {objectiveIdx + 1} / {points.length}
              </span>
              <button
                type="button"
                disabled={objectiveIdx >= points.length - 1}
                onClick={() => onObjectiveIdx(Math.min(points.length - 1, objectiveIdx + 1))}
                className="q-btn-secondary min-h-8 px-3 py-1 text-xs"
              >
                →
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function PersonaStep({
  entry,
  index,
  tab,
  onTab,
  t,
}: {
  entry: PersonaStory;
  index: number;
  tab: Tab;
  onTab: (t: Tab) => void;
  t: Strings;
}) {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "profile", label: t.questTabProfile, icon: "🪪" },
    { id: "story", label: t.questTabStory, icon: "📖" },
    { id: "impact", label: t.questTabImpact, icon: "⚖️" },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center gap-3 border-b border-gray-700 pb-3">
        <span className="text-3xl" aria-hidden>
          {personaAvatar(index)}
        </span>
        <div>
          <span className="q-badge-accent">{t.questLevelLabel(index + 1)}</span>
          <p className="mt-1 font-semibold text-gray-100">{entry.persona.name}</p>
          <p className="text-xs text-gray-500">{entry.persona.occupation}</p>
        </div>
      </div>

      <div className="mb-4 flex gap-1 rounded-xl border border-gray-700 bg-gray-900/80 p-1" role="tablist">
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => onTab(id)}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold ${
              tab === id ? "bg-gray-800 text-sky-200" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span aria-hidden>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === "profile" ? <PersonaCard persona={entry.persona} t={t} variant="quest" /> : null}
        {tab === "story" ? <ScenarioBox scenario={entry.scenario} t={t} variant="quest" /> : null}
        {tab === "impact" ? <RisksList risks={entry.risks} t={t} variant="quest" /> : null}
      </div>
    </div>
  );
}
