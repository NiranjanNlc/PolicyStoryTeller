import type { ReactNode } from "react";

type Props = {
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  children: ReactNode;
  className?: string;
};

export function ClickPager({ index, total, onPrev, onNext, children, className = "" }: Props) {
  if (total <= 1) return <div className={className}>{children}</div>;

  return (
    <div className={`flex min-h-0 flex-col ${className}`.trim()}>
      <div className="min-h-0 flex-1">{children}</div>
      <div className="mt-2 flex shrink-0 items-center justify-between gap-2">
        <button
          type="button"
          disabled={index === 0}
          onClick={onPrev}
          aria-label="Previous"
          className="q-btn-secondary min-h-9 min-w-[3rem] px-3 py-1 text-xs"
        >
          ←
        </button>
        <span className="text-xs font-medium text-gray-500">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          disabled={index >= total - 1}
          onClick={onNext}
          aria-label="Next"
          className="q-btn-secondary min-h-9 min-w-[3rem] px-3 py-1 text-xs"
        >
          →
        </button>
      </div>
    </div>
  );
}
