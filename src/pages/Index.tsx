import { Quiz } from "@/components/quiz/Quiz";
import { FloatingDecor } from "@/components/quiz/FloatingDecor";

const Index = () => {
  return (
    <>
      <FloatingDecor />
      <main className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-16">
        <Quiz />
      </main>
    </>
  );
};

export default Index;
