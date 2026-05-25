import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { QuestHeader, QuestPanel } from "../components/quest/QuestPrimitives";
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
    window.scrollTo(0, 0);
    if (billId && !getStory(billId)) {
      navigate(`/bill/${billId}`, { replace: true });
    }
  }, [billId, getStory, navigate]);

  if (!bill || !story) {
    return (
      <p className="text-sm text-gray-400" role="status">
        {t.voteLoading}
      </p>
    );
  }

  return (
    <div>
      <BackButton to={`/bill/${bill.id}/story`} t={t} />

      <QuestHeader
        icon="🗳️"
        chapter={t.questChapter(4)}
        title={`${bill.emoji} ${bill.label[lang]}`}
        subtitle={t.voteScreenIntro}
      />

      <QuestPanel>
        <VotePanel storyKey={story.storyKey} t={t} />
      </QuestPanel>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-sm font-semibold text-sky-400 transition hover:text-sky-300"
        >
          {t.exploreAnotherBill}
        </button>
      </div>
    </div>
  );
}
