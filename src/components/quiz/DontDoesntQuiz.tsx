import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, Home, ArrowLeft, Check, X, Sparkles } from "lucide-react";
import { popConfetti, bigConfetti } from "./Confetti";

type Answer = "don't" | "doesn't";
interface Q {
  id: number;
  before: string;
  after: string;
  answer: Answer;
}

const QUESTIONS: Q[] = [
  { id: 1, before: "Mike", after: "read comics.", answer: "doesn't" },
  { id: 2, before: "Peter and John", after: "play tennis.", answer: "don't" },
  { id: 3, before: "Kate", after: "play volleyball.", answer: "doesn't" },
  { id: 4, before: "We", after: "play football.", answer: "don't" },
  { id: 5, before: "My brothers", after: "play the violin.", answer: "don't" },
  { id: 6, before: "My sister", after: "like spiders.", answer: "doesn't" },
  { id: 7, before: "His cat", after: "eat chocolate.", answer: "doesn't" },
  { id: 8, before: "I", after: "get up at six o'clock.", answer: "don't" },
  { id: 9, before: "Eddie", after: "play football.", answer: "doesn't" },
  { id: 10, before: "We", after: "have lunch at home.", answer: "don't" },
  { id: 11, before: "They", after: "get up at eight o'clock.", answer: "don't" },
  { id: 12, before: "Billy", after: "go swimming.", answer: "doesn't" },
  { id: 13, before: "Greg and Polly", after: "play ice hockey.", answer: "don't" },
  { id: 14, before: "Jack", after: "like sport.", answer: "doesn't" },
  { id: 15, before: "Mickey", after: "like volleyball.", answer: "doesn't" },
  { id: 16, before: "Molly and her friends", after: "play football.", answer: "don't" },
  { id: 17, before: "You", after: "go swimming.", answer: "don't" },
  { id: 18, before: "He", after: "play a musical instrument.", answer: "doesn't" },
];

type Phase = "intro" | "playing" | "done";
type Feedback = null | "correct" | "wrong";

interface Props { onBack?: () => void }

export const DontDoesntQuiz = ({ onBack }: Props) => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>(() =>
    Array(QUESTIONS.length).fill(null)
  );
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [locked, setLocked] = useState(false);

  const total = QUESTIONS.length;
  const current = QUESTIONS[index];
  const correctCount = useMemo(
    () => answers.filter((a, i) => a && a === QUESTIONS[i].answer).length,
    [answers]
  );

  const stars = (s: number) => (s === total ? 3 : s >= Math.ceil(total * 0.7) ? 2 : 1);

  const handleAnswer = (choice: Answer) => {
    if (locked) return;
    setLocked(true);
    const isCorrect = choice === current.answer;
    setFeedback(isCorrect ? "correct" : "wrong");
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = choice;
      return next;
    });
    if (isCorrect) popConfetti();

    setTimeout(() => {
      setFeedback(null);
      setLocked(false);
      if (index + 1 >= total) {
        setPhase("done");
        bigConfetti();
      } else {
        setIndex((i) => i + 1);
      }
    }, 1000);
  };

  const reset = () => {
    setIndex(0);
    setAnswers(Array(total).fill(null));
    setFeedback(null);
    setLocked(false);
    setPhase("playing");
  };

  if (phase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto text-center"
      >
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-fire shadow-card-soft hover:scale-105 transition-transform"
          >
            <ArrowLeft className="h-4 w-4" /> Menu
          </button>
        )}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-fire shadow-card-soft">
          <Sparkles className="h-4 w-4" /> English Quiz · 4. třída
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-none mb-4">
          <span className="bg-gradient-fire bg-clip-text text-transparent">Don't</span>{" "}
          <span className="text-foreground/80">or</span>{" "}
          <span className="bg-gradient-fire bg-clip-text text-transparent">Doesn't?</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-10">
          Fill in the blank! 🚫
        </p>
        <Button
          size="lg"
          onClick={() => setPhase("playing")}
          className="h-16 px-10 text-2xl font-display font-bold rounded-full bg-gradient-fire hover:opacity-95 shadow-pop hover:scale-105 transition-transform text-fire-foreground"
        >
          Start Quiz 🚀
        </Button>
      </motion.div>
    );
  }

  if (phase === "done") {
    const s = stars(correctCount);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto text-center"
      >
        <div className="rounded-[2.5rem] bg-white shadow-card-soft p-8 sm:p-12 border-4 border-fire">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-fire shadow-pop mb-4 animate-pop">
            <Trophy className="h-10 w-10 text-fire-foreground" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-2">
            {correctCount === total ? "Champion! 🏆" : correctCount >= 12 ? "Awesome! 🌟" : "Good try! 💪"}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            You got <b className="text-fire">{correctCount}</b> / <b>{total}</b>!
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`text-6xl ${i < s ? "" : "grayscale opacity-30"}`}>⭐</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} className="h-14 px-6 text-lg font-display font-bold rounded-full bg-gradient-fire text-fire-foreground shadow-button-pop hover:scale-105 transition-transform">
              <RefreshCw className="mr-2 h-5 w-5" /> Try again!
            </Button>
            {onBack && (
              <Button onClick={onBack} variant="outline" className="h-14 px-6 text-lg font-display font-bold rounded-full border-2 border-fire text-fire hover:bg-fire hover:text-fire-foreground">
                <Home className="mr-2 h-5 w-5" /> ← Menu
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const progress = ((index + (locked ? 1 : 0)) / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {onBack && (
        <div className="mb-4 flex justify-start">
          <button onClick={onBack} className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-fire shadow-card-soft hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" /> Menu
          </button>
        </div>
      )}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="font-display font-bold text-foreground/70">
            Question {index + 1} / {total}
          </span>
          <span className="font-display font-bold text-fire">⭐ {correctCount}</span>
        </div>
        <div className="h-4 rounded-full bg-white/80 overflow-hidden shadow-inner border-2 border-white">
          <motion.div
            className="h-full bg-gradient-fire"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className={`relative rounded-[2rem] bg-white p-6 sm:p-10 shadow-card-soft border-4 ${
            feedback === "correct" ? "border-success animate-pop"
              : feedback === "wrong" ? "border-destructive animate-shake"
              : "border-white"
          }`}
        >
          <div className="text-center mb-6">
            <div className="text-6xl sm:text-7xl mb-4 inline-block animate-float">🚫</div>
            <p className="font-display text-2xl sm:text-3xl font-bold leading-snug">
              {current.before}{" "}
              <span className="inline-block min-w-[4rem] sm:min-w-[6rem] px-3 pb-1 mx-1 border-b-4 border-dashed border-fire/60 text-fire">
                {answers[index] ?? "___"}
              </span>{" "}
              {current.after}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(["don't", "doesn't"] as Answer[]).map((opt, i) => {
              const picked = answers[index] === opt;
              const isCorrect = current.answer === opt;
              const showResult = feedback && picked;
              const showRightAnswer = feedback === "wrong" && !picked && isCorrect;
              return (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.92 }}
                  whileHover={!locked ? { scale: 1.04, y: -2 } : {}}
                  disabled={locked}
                  onClick={() => handleAnswer(opt)}
                  className={`relative h-20 sm:h-24 rounded-2xl font-display font-extrabold text-2xl sm:text-3xl shadow-button-pop border-4 transition-colors uppercase ${
                    showResult && isCorrect
                      ? "bg-success text-success-foreground border-success"
                      : showResult && !isCorrect
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : showRightAnswer
                      ? "bg-success/20 text-success border-success"
                      : i === 0
                      ? "bg-destructive text-destructive-foreground border-white"
                      : "bg-accent text-accent-foreground border-white"
                  } disabled:cursor-not-allowed`}
                >
                  {opt}
                  {showResult && isCorrect && <Check className="absolute top-2 right-2 h-6 w-6" />}
                  {showResult && !isCorrect && <X className="absolute top-2 right-2 h-6 w-6" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
