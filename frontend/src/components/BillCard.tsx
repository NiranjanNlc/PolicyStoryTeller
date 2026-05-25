import type { Bill } from "../data/bills";
import type { Lang } from "../i18n";

type Props = {
  bill: Bill;
  lang: Lang;
  selected: boolean;
  disabled?: boolean;
  compact?: boolean;
  onSelect: (bill: Bill) => void;
};

export function BillCard({ bill, lang, selected, disabled, compact, onSelect }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(bill)}
      aria-pressed={selected}
      className={`group flex h-full min-h-[4.5rem] flex-col justify-center gap-1 rounded-xl border p-3 text-left transition sm:min-h-0 sm:gap-2 sm:rounded-2xl sm:p-4 ${
        selected
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span className={compact ? "text-2xl" : "text-3xl"} aria-hidden>
        {bill.emoji}
      </span>
      <h3
        className={`font-display font-semibold leading-tight text-gray-900 ${
          compact ? "line-clamp-2 text-xs sm:text-sm" : "text-base"
        }`}
      >
        {bill.label[lang]}
      </h3>
      {!compact ? (
        <p className="line-clamp-2 text-sm leading-snug text-gray-600">{bill.summary[lang]}</p>
      ) : null}
    </button>
  );
}
