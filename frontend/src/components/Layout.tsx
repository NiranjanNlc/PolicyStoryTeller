import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { STRINGS } from "../i18n";
import { StepIndicator } from "./StepIndicator";

export function Layout() {
  const { lang, setLang } = useApp();
  const t = STRINGS[lang];
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const main = document.getElementById("main");
    if (main) main.scrollTop = 0;
  }, [pathname]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {t.skipToMain}
      </a>

      <header className="shrink-0 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-3 py-2 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold uppercase tracking-wide text-blue-600 sm:text-xs">
                {t.brand}
              </p>
              <h1 className="truncate font-display text-base font-bold text-gray-900 sm:text-2xl">
                {t.tagline}
              </h1>
              {isHome ? (
                <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-gray-600 sm:text-sm">
                  {t.intro}
                </p>
              ) : null}
            </div>
            <div
              className="flex shrink-0 items-center gap-0.5 rounded-full border border-gray-200 bg-gray-100 p-0.5 text-[11px] font-semibold"
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
                    className={`min-h-8 rounded-full px-2.5 py-0.5 transition sm:min-h-9 sm:px-3 ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {code === "en" ? t.langEn : t.langNe}
                  </button>
                );
              })}
            </div>
          </div>
          <StepIndicator t={t} />
        </div>
      </header>

      <main
        id="main"
        className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col overflow-hidden bg-white px-3 py-2 sm:px-4 sm:py-4"
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet context={{ lang, t }} />
        </div>
      </main>

      <footer className="hidden shrink-0 border-t border-gray-200 py-3 text-center text-xs text-gray-500 md:block">
        {t.footer}
      </footer>
    </div>
  );
}
