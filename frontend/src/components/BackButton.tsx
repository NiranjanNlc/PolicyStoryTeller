import { useNavigate } from "react-router-dom";
import type { Strings } from "../i18n";

type Props = {
  to: string;
  t: Strings;
};

export function BackButton({ to, t }: Props) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="q-btn-secondary mb-6 inline-flex items-center gap-2"
    >
      <span aria-hidden>←</span>
      {t.back}
    </button>
  );
}
