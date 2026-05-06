import { useState } from "react";
import { Quiz } from "@/components/quiz/Quiz";
import { Menu } from "@/components/quiz/Menu";
import { VocabularyQuiz } from "@/components/quiz/VocabularyQuiz";
import { CityQuiz } from "@/components/quiz/CityQuiz";
import { MemoryGame } from "@/components/quiz/MemoryGame";
import { DontDoesntQuiz } from "@/components/quiz/DontDoesntQuiz";
import { SortingQuiz } from "@/components/quiz/SortingQuiz";
import { FloatingDecor } from "@/components/quiz/FloatingDecor";

type Screen = "menu" | "likelikes" | "vocabulary" | "city" | "memory" | "dontdoesnt" | "sorting";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");
  const back = () => setCurrentScreen("menu");

  return (
    <>
      <FloatingDecor />
      <main className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-16">
        {currentScreen === "menu" && <Menu onSelect={setCurrentScreen} />}
        {currentScreen === "likelikes" && <Quiz onBack={back} />}
        {currentScreen === "vocabulary" && <VocabularyQuiz onBack={back} />}
        {currentScreen === "city" && <CityQuiz onBack={back} />}
        {currentScreen === "memory" && <MemoryGame onBack={back} />}
        {currentScreen === "dontdoesnt" && <DontDoesntQuiz onBack={back} />}
        {currentScreen === "sorting" && <SortingQuiz onBack={back} />}
      </main>
    </>
  );
};

export default Index;
