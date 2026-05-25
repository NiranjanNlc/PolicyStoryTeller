import type { PersonaStory } from "../../api/types";
import type { Strings } from "../../i18n";
import { personaAvatar } from "./personaAvatars";

type Props = { stories: PersonaStory[]; t: Strings };

export function ComparePersonas({ stories, t }: Props) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-gray-100">
        <span aria-hidden>⚖️</span>
        {t.compareTitle}
      </h2>
      <p className="q-subtitle mt-2">{t.compareSubtitle}</p>

      <ul className="mt-5 grid gap-4 sm:grid-cols-3" role="list">
        {stories.map((entry, i) => (
          <li key={`${entry.persona.name}-${i}`} className="q-panel-inset flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden>
                {personaAvatar(i)}
              </span>
              <div>
                <p className="text-xs font-bold text-sky-400">{t.questLevelLabel(i + 1)}</p>
                <p className="font-semibold text-gray-100">{entry.persona.name}</p>
                <p className="text-xs text-gray-500">{entry.persona.occupation}</p>
              </div>
            </div>
            <p className="line-clamp-3 text-xs leading-relaxed text-gray-400">{entry.persona.bio}</p>
            <div>
              <p className="q-label text-[10px]">{t.riskier}</p>
              <ul className="mt-1 space-y-1">
                {entry.risks.riskier.slice(0, 2).map((item, j) => (
                  <li key={j} className="text-xs text-red-200/90">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="q-label text-[10px]">{t.safer}</p>
              <ul className="mt-1 space-y-1">
                {entry.risks.safer.slice(0, 2).map((item, j) => (
                  <li key={j} className="text-xs text-green-200/90">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
