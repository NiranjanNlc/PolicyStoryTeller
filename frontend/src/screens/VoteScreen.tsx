import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { VotePanel } from "../components/VotePanel";

import { useApp } from "../context/AppContext";

import { BILLS } from "../data/bills";

import { STRINGS } from "../i18n";



export function VoteScreen() {

  const { billId } = useParams<{ billId: string }>();

  const navigate = useNavigate();

  const { lang, getStory } = useApp();

  const t = STRINGS[lang];

  const bill = BILLS.find((b) => b.id === billId);

  const story = billId ? getStory(billId) : null;



  useEffect(() => {

    if (billId && !getStory(billId)) {

      navigate(`/bill/${billId}`, { replace: true });

    }

  }, [billId, getStory, navigate]);



  if (!bill || !story) {

    return (

      <p className="flex flex-1 items-center justify-center text-sm text-gray-500" role="status">

        {t.voteLoading}

      </p>

    );

  }



  return (

    <div className="page-shell page-shell--fill">

      <div className="brief-card flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">

        <div className="shrink-0 text-center">

          <span className="text-2xl" aria-hidden>

            {bill.emoji}

          </span>

          <p className="q-label mt-1">{t.stepVote}</p>

          <p className="line-clamp-2 text-sm font-semibold text-gray-900">{bill.label[lang]}</p>

        </div>

        <div className="min-h-0 flex-1 overflow-hidden">

          <VotePanel storyKey={story.storyKey} t={t} compact />

        </div>

        <button

          type="button"

          onClick={() => navigate("/")}

          className="q-btn-secondary shrink-0 w-full text-xs"

        >

          {t.exploreAnotherBill}

        </button>

      </div>

    </div>

  );

}

