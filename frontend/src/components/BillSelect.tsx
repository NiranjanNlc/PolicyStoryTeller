import { BILLS, type Bill } from "../data/bills";
import type { Lang, Strings } from "../i18n";

type Props = {
  lang: Lang;
  t: Strings;
  value: string;
  onChange: (bill: Bill) => void;
  id?: string;
};

export function BillSelect({ lang, t, value, onChange, id = "bill-select" }: Props) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-gray-200">
        {t.selectBillLabel}
      </label>
      <p className="mt-1 text-xs text-gray-500">{t.selectBillHint}</p>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          const bill = BILLS.find((b) => b.id === e.target.value);
          if (bill) onChange(bill);
        }}
        className="mt-3 w-full min-h-12 cursor-pointer appearance-none rounded-xl border border-gray-600 bg-gray-900 px-4 py-3 pr-12 text-sm font-medium text-gray-100 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1.25rem",
        }}
      >
        {BILLS.map((bill) => (
          <option key={bill.id} value={bill.id}>
            {bill.emoji} {bill.label[lang]}
          </option>
        ))}
      </select>
    </div>
  );
}
