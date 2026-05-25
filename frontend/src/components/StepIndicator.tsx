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
    <nav aria-label={t.flowLabel}>
      <ol className="mb-8 flex flex-wrap items-center gap-1 sm:gap-0">
        {steps.map((s, i) => {
          const canNavigate = s.path != null && i < current;
          return (
            <li key={s.label} className="flex items-center">
              {canNavigate ? (
                <button
                  type="button"
                  onClick={() => navigate(s.path!)}
                  className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold text-gray-400 transition hover:bg-gray-800 hover:text-gray-200 sm:px-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 text-sm text-gray-100">
                    ✓
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ) : (
                <span
                  className={`flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold sm:px-3 ${
                    i === current
                      ? "bg-sky-600/20 text-sky-200 ring-1 ring-sky-500/40"
                      : i < current
                        ? "text-gray-400"
                        : "text-gray-600"
                  }`}
                  aria-current={i === current ? "step" : undefined}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                      i < current
                        ? "bg-gray-600 text-gray-100"
                        : i === current
                          ? "bg-sky-600 text-white"
                          : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {i < current ? "✓" : s.icon}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              )}
              {i < steps.length - 1 ? (
                <span className="mx-1 hidden h-px w-4 bg-gray-700 sm:block" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
