import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { StoryQuestWizard } from "../components/story/StoryQuestWizard";
import { QuestHeader } from "../components/quest/QuestPrimitives";
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
    window.scrollTo(0, 0);
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
      <p className="text-sm text-gray-400" role="status">
        {t.storyLoading}
      </p>
    );
  }

  return (
    <div className="pb-4">
      <BackButton to={`/bill/${bill.id}`} t={t} />

      <QuestHeader
        icon="👥"
        chapter={t.questChapter(3)}
        title={bill.label[lang]}
        subtitle={t.impactsSubtitle}
      />

      <StoryQuestWizard
        policyBrief={story.policyBrief}
        stories={story.stories}
        billId={bill.id}
        billEmoji={bill.emoji}
        billLabel={bill.label[lang]}
        t={t}
      />
    </div>
  );
}
