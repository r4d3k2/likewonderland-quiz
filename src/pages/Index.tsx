import { useState } from "react";
import { Quiz } from "@/components/quiz/Quiz";
import { Menu } from "@/components/quiz/Menu";
import { VocabularyQuiz } from "@/components/quiz/VocabularyQuiz";
import { FloatingDecor } from "@/components/quiz/FloatingDecor";

type Screen = "menu" | "likelikes" | "vocabulary";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");

  return (
    <>
      <FloatingDecor />
      <main className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-16">
        {currentScreen === "menu" && <Menu onSelect={setCurrentScreen} />}
        {currentScreen === "likelikes" && (
          <Quiz onBack={() => setCurrentScreen("menu")} />
        )}
        {currentScreen === "vocabulary" && (
          <VocabularyQuiz onBack={() => setCurrentScreen("menu")} />
        )}
      </main>
    </>
  );
};

export default Index;
