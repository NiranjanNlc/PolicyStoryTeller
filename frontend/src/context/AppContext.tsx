import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { PersonaStory, PolicyBrief } from "../api/types";
import type { Lang } from "../i18n";

export type BillStory = {
  storyKey: string;
  policyBrief?: PolicyBrief;
  stories: PersonaStory[];
};

export type StoredBillEntry = {
  story: BillStory;
  lang: Lang;
  generatedAt: string;
};

function isValidBillStory(raw: unknown): raw is BillStory {
  if (!raw || typeof raw !== "object") return false;
  const o = raw as Record<string, unknown>;
  if (typeof o.storyKey !== "string") return false;
  const stories = o.stories;
  if (!Array.isArray(stories) || stories.length === 0) return false;
  return stories.every((s) => {
    if (!s || typeof s !== "object") return false;
    const row = s as Record<string, unknown>;
    const persona = row.persona as Record<string, unknown> | undefined;
    const risks = row.risks as Record<string, unknown> | undefined;
    return (
      typeof row.scenario === "string" &&
      persona?.name != null &&
      Array.isArray(risks?.riskier) &&
      Array.isArray(risks?.safer)
    );
  });
}

function normalizeEntry(raw: unknown): StoredBillEntry | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (o.story && o.lang && o.generatedAt) {
    const story = normalizeStoryOnly(o.story);
    const lang = o.lang === "ne" || o.lang === "en" ? o.lang : null;
    if (story && lang && typeof o.generatedAt === "string") {
      return { story, lang, generatedAt: o.generatedAt };
    }
  }
  const legacy = normalizeStoryOnly(raw);
  if (legacy) {
    return { story: legacy, lang: "en", generatedAt: new Date(0).toISOString() };
  }
  return null;
}

function normalizeStoryOnly(raw: unknown): BillStory | null {
  if (isValidBillStory(raw)) return raw;
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const persona = o.persona;
  const scenario = o.scenario;
  const risks = o.risks;
  const storyKey = o.storyKey;
  if (
    storyKey &&
    typeof storyKey === "string" &&
    persona &&
    typeof scenario === "string" &&
    risks
  ) {
    const legacy: BillStory = {
      storyKey,
      stories: [{ persona, scenario, risks } as PersonaStory],
    };
    return isValidBillStory(legacy) ? legacy : null;
  }
  return null;
}

type AppContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  getStory: (billId: string) => BillStory | null;
  getStoryMeta: (billId: string) => StoredBillEntry | null;
  setStory: (billId: string, story: BillStory) => void;
  clearStory: (billId: string) => void;
  hasStory: (billId: string) => boolean;
};

const LANG_KEY = "policy-storyteller:lang";
const STORIES_KEY = "policy-storyteller:stories-v2";

const AppContext = createContext<AppContextValue | null>(null);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(LANG_KEY);
  return saved === "ne" || saved === "en" ? saved : "en";
}

function readStoredEntries(): Record<string, StoredBillEntry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORIES_KEY);
    if (!raw) return migrateFromSession();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, StoredBillEntry> = {};
    for (const [billId, value] of Object.entries(parsed)) {
      const entry = normalizeEntry(value);
      if (entry) out[billId] = entry;
    }
    return out;
  } catch {
    return {};
  }
}

function migrateFromSession(): Record<string, StoredBillEntry> {
  try {
    const legacy = window.sessionStorage.getItem("policy-storyteller:stories");
    if (!legacy) return {};
    const parsed = JSON.parse(legacy) as Record<string, unknown>;
    const out: Record<string, StoredBillEntry> = {};
    for (const [billId, value] of Object.entries(parsed)) {
      const entry = normalizeEntry(value);
      if (entry) out[billId] = entry;
    }
    if (Object.keys(out).length > 0) {
      window.localStorage.setItem(STORIES_KEY, JSON.stringify(out));
      window.sessionStorage.removeItem("policy-storyteller:stories");
    }
    return out;
  } catch {
    return {};
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);
  const [entries, setEntries] = useState<Record<string, StoredBillEntry>>(readStoredEntries);
  const prevLang = useRef(lang);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang === "ne" ? "ne-NP" : "en";
    if (prevLang.current !== lang) {
      setEntries({});
      window.localStorage.removeItem(STORIES_KEY);
    }
    prevLang.current = lang;
  }, [lang]);

  useEffect(() => {
    window.localStorage.setItem(STORIES_KEY, JSON.stringify(entries));
  }, [entries]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const getStoryMeta = useCallback(
    (billId: string) => {
      const e = entries[billId];
      if (!e || e.lang !== lang) return null;
      return e;
    },
    [entries, lang],
  );

  const getStory = useCallback(
    (billId: string) => getStoryMeta(billId)?.story ?? null,
    [getStoryMeta],
  );

  const hasStory = useCallback((billId: string) => getStory(billId) != null, [getStory]);

  const setStory = useCallback(
    (billId: string, story: BillStory) => {
      setEntries((prev) => ({
        ...prev,
        [billId]: { story, lang, generatedAt: new Date().toISOString() },
      }));
    },
    [lang],
  );

  const clearStory = useCallback((billId: string) => {
    setEntries((prev) => {
      const next = { ...prev };
      delete next[billId];
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, getStory, getStoryMeta, setStory, clearStory, hasStory }),
    [lang, setLang, getStory, getStoryMeta, setStory, clearStory, hasStory],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
