import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import type { Strings } from "../i18n";

const STEP_ICONS = ["🗺️", "📋", "👥", "🗳️"] as const;

function stepIndex(pathname: string): number {
  if (pathname === "/") return 0;
  if (/^\/bill\/[^/]+$/.test(pathname)) return 1;
  if (pathname.includes("/story")) return 2;
  if (pathname.includes("/vote")) return 3;
  return 0;
}

type Props = { t: Strings };

export function StepIndicator({ t }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { billId } = useParams<{ billId: string }>();
  const { hasStory } = useApp();
  const current = stepIndex(pathname);
  if (pathname === "/") return null;

  const steps = [
    { icon: STEP_ICONS[0], label: t.stepChoose, path: "/" },
    { icon: STEP_ICONS[1], label: t.stepUnderstand, path: billId ? `/bill/${billId}` : null },
    { icon: STEP_ICONS[2], label: t.stepExplore, path: billId && hasStory(billId) ? `/bill/${billId}/story` : null },
    { icon: STEP_ICONS[3], label: t.stepVote, path: billId && hasStory(billId) ? `/bill/${billId}/vote` : null },
  ];

  return (
    <nav aria-label={t.flowLabel} className="mt-2 border-t border-gray-100 pt-2 sm:mt-3 sm:pt-3">
      <ol className="flex shrink-0 flex-wrap items-center justify-center gap-0.5 sm:gap-0">
        {steps.map((s, i) => {
          const canNavigate = s.path != null && i < current;
          return (
            <li key={s.label} className="flex items-center">
              {canNavigate ? (
                <button
                  type="button"
                  onClick={() => navigate(s.path!)}
                  className="flex items-center gap-1 rounded-full px-1.5 py-1 text-[10px] font-semibold text-gray-500 transition hover:bg-gray-100 sm:gap-2 sm:px-3 sm:text-xs"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-xs text-white sm:h-7 sm:w-7">
                    ✓
                  </span>
                  <span className="hidden max-w-[5rem] truncate sm:inline md:max-w-none">{s.label}</span>
                </button>
              ) : (
                <span
                  className={`flex items-center gap-1 rounded-full px-1.5 py-1 text-[10px] font-semibold sm:gap-2 sm:px-3 sm:text-xs ${
                    i === current
                      ? "bg-blue-50 text-blue-700 ring-1 ring-blue-300"
                      : i < current
                        ? "text-gray-500"
                        : "text-gray-400"
                  }`}
                  aria-current={i === current ? "step" : undefined}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs sm:h-7 sm:w-7 sm:text-sm ${
                      i < current
                        ? "bg-gray-300 text-white"
                        : i === current
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i < current ? "✓" : s.icon}
                  </span>
                  <span className="hidden max-w-[5rem] truncate sm:inline md:max-w-none">{s.label}</span>
                </span>
              )}
              {i < steps.length - 1 ? (
                <span className="mx-0.5 hidden h-px w-3 bg-gray-300 sm:block md:w-6" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
