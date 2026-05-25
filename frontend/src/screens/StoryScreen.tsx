import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { StoryFlow } from "../components/story/StoryFlow";

import { useApp } from "../context/AppContext";

import { BILLS } from "../data/bills";

import { STRINGS } from "../i18n";



export function StoryScreen() {

  const { billId } = useParams<{ billId: string }>();

  const navigate = useNavigate();

  const { lang, getStory, clearStory } = useApp();

  const t = STRINGS[lang];

  const bill = BILLS.find((b) => b.id === billId);

  const story = billId ? getStory(billId) : null;

  const hasStories = (story?.stories.length ?? 0) > 0;



  useEffect(() => {

    if (!billId) return;

    if (!getStory(billId)) {

      navigate(`/bill/${billId}`, { replace: true });

      return;

    }

    if (!hasStories) {

      clearStory(billId);

      navigate(`/bill/${billId}`, { replace: true });

    }

  }, [billId, getStory, navigate, hasStories, clearStory]);



  if (!bill || !story || !hasStories) {

    return (

      <p className="flex flex-1 items-center justify-center text-sm text-gray-500" role="status">

        {t.storyLoading}

      </p>

    );

  }



  return (

    <StoryFlow
      className="page-shell page-shell--fill min-h-0 flex-1"
      stories={story.stories}
      billId={bill.id}
      billLabel={bill.label[lang]}
      t={t}
    />

  );

}

