import { Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { STRINGS } from "../i18n";
import { StepIndicator } from "./StepIndicator";

export function Layout() {
  const { lang, setLang } = useApp();
  const t = STRINGS[lang];
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-gray-900">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sky-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {t.skipToMain}
      </a>

      <header className="border-b border-gray-800 bg-gray-900/95">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="q-label q-accent">{t.brand}</p>
            <h1 className="mt-1 font-display text-2xl font-bold text-gray-50 sm:text-3xl">
              {t.tagline}
            </h1>
            {isHome ? <p className="q-subtitle mt-2 max-w-2xl">{t.intro}</p> : null}
          </div>
          <div
            className="flex items-center gap-1 self-start rounded-full border border-gray-700 bg-gray-800 p-1 text-xs font-semibold sm:self-center"
            role="group"
            aria-label={t.langLabel}
          >
            {(["en", "ne"] as const).map((code) => {
              const active = lang === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={active}
                  className={`min-h-9 rounded-full px-3 py-1 transition ${
                    active
                      ? "bg-sky-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {code === "en" ? t.langEn : t.langNe}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <StepIndicator t={t} />
        <Outlet context={{ lang, t }} />
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-xs text-gray-500">
        {t.footer}
      </footer>
    </div>
  );
}
