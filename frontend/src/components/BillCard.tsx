import type { Bill } from "../data/bills";
import type { Lang } from "../i18n";

type Props = {
  bill: Bill;
  lang: Lang;
  selected: boolean;
  disabled?: boolean;
  onSelect: (bill: Bill) => void;
};

export function BillCard({ bill, lang, selected, disabled, onSelect }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(bill)}
      aria-pressed={selected}
      className={`group flex flex-col gap-3 rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-sky-500 bg-sky-600/10 ring-2 ring-sky-500/30"
          : "border-gray-700 bg-gray-800/80 hover:border-gray-600 hover:bg-gray-800"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span className="text-3xl" aria-hidden>
        {bill.emoji}
      </span>
      <h3 className="font-display text-base font-semibold leading-snug text-gray-50">
        {bill.label[lang]}
      </h3>
      <p className="text-sm leading-relaxed text-gray-400">{bill.summary[lang]}</p>
    </button>
  );
}
