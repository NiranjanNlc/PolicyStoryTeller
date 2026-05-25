import { useState } from "react";
import type { PersonaStory } from "../../api/types";
import type { Strings } from "../../i18n";
import { ClickPager } from "../ClickPager";
import { personaAvatar } from "./personaAvatars";

type Props = { stories: PersonaStory[]; t: Strings };

export function ComparePersonas({ stories, t }: Props) {
  const [idx, setIdx] = useState(0);
  const entry = stories[idx];
  if (!entry) return null;

  return (
    <ClickPager
      className="min-h-0 flex-1"
      index={idx}
      total={stories.length}
      onPrev={() => setIdx((i) => Math.max(0, i - 1))}
      onNext={() => setIdx((i) => Math.min(stories.length - 1, i + 1))}
    >
      <div className="flex min-h-0 flex-col overflow-hidden">
        <h2 className="flex shrink-0 items-center gap-1.5 font-display text-sm font-semibold text-gray-900">
          <span aria-hidden>⚖️</span>
          {t.compareTitle}
        </h2>
        <p className="mt-1 shrink-0 line-clamp-2 text-xs text-gray-600">{t.compareSubtitle}</p>

        <article className="q-panel-inset mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-2xl" aria-hidden>
              {personaAvatar(idx)}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold text-blue-600">{t.questLevelLabel(idx + 1)}</p>
              <p className="truncate font-semibold text-gray-900">{entry.persona.name}</p>
              <p className="truncate text-xs text-gray-500">{entry.persona.occupation}</p>
            </div>
          </div>
          <p className="line-clamp-3 shrink-0 text-xs leading-snug text-gray-700">{entry.persona.bio}</p>
          <div className="min-h-0 flex-1 space-y-2 overflow-hidden">
            <div>
              <p className="q-label text-[10px]">{t.riskier}</p>
              <ul className="mt-0.5 space-y-0.5">
                {entry.risks.riskier.slice(0, 2).map((item, j) => (
                  <li key={j} className="line-clamp-2 text-xs text-red-800">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="q-label text-[10px]">{t.safer}</p>
              <ul className="mt-0.5 space-y-0.5">
                {entry.risks.safer.slice(0, 2).map((item, j) => (
                  <li key={j} className="line-clamp-2 text-xs text-green-800">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>
    </ClickPager>
  );
}
