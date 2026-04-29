import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Trophy, Home } from "lucide-react";
import { bigConfetti, popConfetti } from "./Confetti";

interface Pair {
  cz: string;
  en: string;
}

const PAIRS: Pair[] = [
  { cz: "já bydlím / žiju", en: "I live" },
  { cz: "v domě", en: "in a house" },
  { cz: "v bytě", en: "in a flat" },
  { cz: "v parku", en: "in the park" },
  { cz: "na zahradě", en: "in the garden" },
  { cz: "v budově", en: "in the building" },
  { cz: "Jsem v obchodě.", en: "I am in the shop." },
  { cz: "Jsem v restauraci.", en: "I am in the restaurant." },
  { cz: "Žižkova ulice", en: "Žižkova street" },
  { cz: "Bydlím v Laurinově ulici.", en: "I live on Laurinova street." },
  { cz: "On je hasič.", en: "He is a firefighter." },
  { cz: "To je můj klíč.", en: "This is my key." },
  { cz: "On je muž.", en: "He is a man." },
  { cz: "Ona je žena.", en: "She is a woman." },
  { cz: "Umím hrát baseball.", en: "I can play baseball." },
];

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, " ").replace(/[.!?,]/g, "");

type Phase = "playing" | "done";
type Feedback = null | "correct" | "wrong";

interface Props {
  onBack: () => void;
}

export const CityQuiz = ({ onBack }: Props) => {
  const total = PAIRS.length;
  const [phase, setPhase] = useState<Phase>("playing");
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const current = PAIRS[index];

  useEffect(() => {
    setInput("");
    setFeedback(null);
    setLocked(false);
  }, [index]);

  const advance = () => {
    if (index + 1 >= total) {
      setPhase("done");
      bigConfetti();
    } else {
      setIndex((i) => i + 1);
    }
  };

  const check = () => {
    if (locked || !input.trim()) return;
    setLocked(true);
    const ok = normalize(input) === normalize(current.en);
    setFeedback(ok ? "correct" : "wrong");
    if (ok) {
      popConfetti();
      setCorrectCount((c) => c + 1);
      setTimeout(advance, 1500);
    }
    // wrong → wait for "Next →" click
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") check();
  };

  const reset = () => {
    setIndex(0);
    setCorrectCount(0);
    setPhase("playing");
  };

  const stars = (s: number) => (s === total ? 3 : s >= Math.ceil(total * 0.7) ? 2 : 1);
  const finalMessage = (s: number) => {
    if (s === total) return "Perfect! 🏆";
    if (s >= 10) return "Awesome job! 🌟";
    if (s >= 6) return "Good try! 💪";
    return "Keep practicing! 🌈";
  };

  if (phase === "done") {
    const s = stars(correctCount);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto text-center"
      >
        <div className="rounded-[2.5rem] bg-white shadow-card-soft p-8 sm:p-12 border-4 border-grass">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-grass shadow-pop mb-4 animate-pop">
            <Trophy className="h-10 w-10 text-grass-foreground" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-2">
            {finalMessage(correctCount)}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            You got <b className="text-grass">{correctCount}</b> out of <b>{total}</b> right!
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 + i * 0.2, type: "spring", stiffness: 200 }}
                className={`text-6xl ${i < s ? "" : "grayscale opacity-30"}`}
              >
                ⭐
              </motion.span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              className="h-14 px-6 text-lg font-display font-bold rounded-full bg-gradient-grass shadow-button-pop hover:scale-105 transition-transform"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Play Again
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="h-14 px-6 text-lg font-display font-bold rounded-full border-2 border-grass text-grass hover:bg-grass hover:text-grass-foreground"
            >
              <Home className="mr-2 h-5 w-5" /> ← Menu
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  const progress = (index / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-grass shadow-card-soft hover:scale-105 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" /> Menu
        </button>
        <span className="font-display font-bold text-grass">⭐ {correctCount}</span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="font-display font-bold text-foreground/70">
            Question {index + 1} / {total}
          </span>
        </div>
        <div className="h-4 rounded-full bg-white/80 overflow-hidden shadow-inner border-2 border-white">
          <motion.div
            className="h-full bg-gradient-grass"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className={`relative rounded-[2rem] bg-white p-6 sm:p-10 shadow-card-soft border-4 ${
            feedback === "correct"
              ? "border-success animate-pop"
              : feedback === "wrong"
              ? "border-destructive animate-shake"
              : "border-grass/40"
          }`}
        >
          <p className="text-center text-muted-foreground font-semibold mb-3">
            🇨🇿 Translate to English 🇬🇧
          </p>
          <h2 className="text-center font-display text-3xl sm:text-5xl font-extrabold text-grass mb-6">
            {current.cz}
          </h2>

          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            disabled={locked && feedback === "correct"}
            placeholder="Type in English…"
            className={`w-full text-center text-xl sm:text-2xl font-display font-bold rounded-2xl border-4 px-4 py-4 outline-none transition-colors ${
              feedback === "correct"
                ? "border-success bg-success/10"
                : feedback === "wrong"
                ? "border-destructive bg-destructive/10"
                : "border-grass/40 bg-grass/5 focus:border-grass"
            }`}
          />

          {feedback === "wrong" && (
            <p className="mt-4 text-center font-display font-bold text-destructive">
              Correct answer:{" "}
              <span className="text-foreground">{current.en}</span>
            </p>
          )}

          <div className="flex justify-center mt-6">
            {feedback === "wrong" ? (
              <Button
                onClick={advance}
                className="h-14 px-8 text-xl font-display font-bold rounded-full bg-gradient-grass shadow-button-pop hover:scale-105 transition-transform"
              >
                Next →
              </Button>
            ) : (
              <Button
                onClick={check}
                disabled={locked || !input.trim()}
                className="h-14 px-8 text-xl font-display font-bold rounded-full bg-gradient-grass shadow-button-pop hover:scale-105 transition-transform disabled:opacity-50"
              >
                Check ✅
              </Button>
            )}
          </div>

          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2"
              >
                <span
                  className={`px-5 py-2 rounded-full font-display font-bold text-lg shadow-pop ${
                    feedback === "correct"
                      ? "bg-success text-success-foreground"
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {feedback === "correct" ? "Correct! 🎉" : "Oops! ❌"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
