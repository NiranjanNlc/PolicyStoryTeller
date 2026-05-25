import type { ReactNode } from "react";

export function QuestPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`q-panel ${className}`.trim()}>{children}</div>;
}

export function QuestHeader({
  icon,
  chapter,
  title,
  subtitle,
}: {
  icon: string;
  chapter?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-6">
      <div className="flex items-start gap-3">
        <span className="q-icon-box" aria-hidden>
          {icon}
        </span>
        <div className="min-w-0">
          {chapter ? <p className="q-label mb-1">{chapter}</p> : null}
          <h2 className="q-title">{title}</h2>
          {subtitle ? <p className="q-subtitle mt-2 max-w-2xl">{subtitle}</p> : null}
        </div>
      </div>
    </header>
  );
}

export function QuestProgress({
  percent,
  label,
  indeterminate,
}: {
  percent?: number;
  label?: string;
  indeterminate?: boolean;
}) {
  return (
    <div className="mb-4">
      {label ? (
        <p className="mb-1.5 text-xs font-medium text-gray-400">
          <span>{label}</span>
          {!indeterminate && percent != null ? (
            <span className="float-right">{percent}%</span>
          ) : null}
        </p>
      ) : null}
      <div
        className="q-progress-track overflow-hidden"
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        aria-busy={indeterminate || undefined}
      >
        {indeterminate ? (
          <div className="h-full w-full animate-pulse rounded-full bg-sky-500/70" />
        ) : (
          <div className="q-progress-fill" style={{ width: `${percent ?? 0}%` }} />
        )}
      </div>
    </div>
  );
}

export function QuestStepTrack({
  steps,
  current,
}: {
  steps: { icon: string; label: string }[];
  current: number;
}) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-1 sm:gap-0" aria-label="Quest progress">
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center">
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
          {i < steps.length - 1 ? (
            <span className="mx-1 hidden h-px w-4 bg-gray-700 sm:block" aria-hidden />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
