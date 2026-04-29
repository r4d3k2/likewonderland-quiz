import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VOCAB_QUESTIONS } from "./vocabQuestions";
import { bigConfetti, popConfetti } from "./Confetti";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Trophy, Home } from "lucide-react";

type Phase = "playing" | "done";
type Feedback = null | "correct" | "wrong";

interface Tile {
  id: number; // unique per occurrence
  word: string;
  color: string; // tailwind classes
}

const TILE_COLORS = [
  "bg-[hsl(280_75%_85%)] text-[hsl(280_60%_30%)]",
  "bg-[hsl(210_80%_85%)] text-[hsl(210_70%_30%)]",
  "bg-[hsl(190_80%_82%)] text-[hsl(190_70%_25%)]",
  "bg-[hsl(260_70%_88%)] text-[hsl(260_60%_30%)]",
  "bg-[hsl(170_70%_82%)] text-[hsl(170_70%_25%)]",
  "bg-[hsl(330_80%_88%)] text-[hsl(330_60%_30%)]",
  "bg-[hsl(48_90%_82%)] text-[hsl(35_70%_30%)]",
  "bg-[hsl(140_60%_82%)] text-[hsl(140_60%_25%)]",
];

interface Props {
  onBack: () => void;
}

export const VocabularyQuiz = ({ onBack }: Props) => {
  const [phase, setPhase] = useState<Phase>("playing");
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>(() =>
    Array(VOCAB_QUESTIONS.length).fill(false)
  );
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [locked, setLocked] = useState(false);

  const total = VOCAB_QUESTIONS.length;
  const current = VOCAB_QUESTIONS[index];

  // Build initial tiles for current question
  const initialTiles: Tile[] = useMemo(
    () =>
      current.scrambled.map((w, i) => ({
        id: i,
        word: w,
        color: TILE_COLORS[(i + current.id) % TILE_COLORS.length],
      })),
    [current]
  );

  const [pool, setPool] = useState<Tile[]>(initialTiles);
  const [answer, setAnswer] = useState<Tile[]>([]);

  // Reset when question changes
  useEffect(() => {
    setPool(initialTiles);
    setAnswer([]);
    setFeedback(null);
    setLocked(false);
  }, [initialTiles]);

  const correctCount = results.filter(Boolean).length;
  const stars = (s: number) => (s === total ? 3 : s >= 10 ? 2 : 1);
  const finalMessage = (s: number) => {
    if (s === total) return "You are a champion! 🏆";
    if (s >= 10) return "Awesome job! 🌟";
    if (s >= 6) return "Good try! Keep going! 💪";
    return "Don't give up — try again! 🌈";
  };

  const moveToAnswer = (tile: Tile) => {
    if (locked) return;
    setPool((p) => p.filter((t) => t.id !== tile.id));
    setAnswer((a) => [...a, tile]);
  };

  const moveToPool = (tile: Tile) => {
    if (locked) return;
    setAnswer((a) => a.filter((t) => t.id !== tile.id));
    setPool((p) => [...p, tile]);
  };

  const check = () => {
    if (locked || answer.length === 0) return;
    setLocked(true);
    const userSentence = answer.map((t) => t.word).join(" ").toLowerCase();
    const correctSentence = current.correct.join(" ").toLowerCase();
    const isCorrect = userSentence === correctSentence;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      popConfetti();
      setResults((r) => {
        const next = [...r];
        next[index] = true;
        return next;
      });
      setTimeout(() => {
        if (index + 1 >= total) {
          setPhase("done");
          bigConfetti();
        } else {
          setIndex((i) => i + 1);
        }
      }, 1500);
    } else {
      // allow retry
      setTimeout(() => {
        setFeedback(null);
        setLocked(false);
      }, 800);
    }
  };

  const reset = () => {
    setIndex(0);
    setResults(Array(total).fill(false));
    setPhase("playing");
  };

  /* ---------- DONE ---------- */
  if (phase === "done") {
    const s = stars(correctCount);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto text-center"
      >
        <div className="rounded-[2.5rem] bg-white shadow-card-soft p-8 sm:p-12 border-4 border-primary">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-primary shadow-pop mb-4 animate-pop">
            <Trophy className="h-10 w-10 text-primary-foreground" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-2">
            {finalMessage(correctCount)}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            You got <b className="text-primary">{correctCount}</b> out of{" "}
            <b>{total}</b> right!
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
              className="h-14 px-6 text-lg font-display font-bold rounded-full bg-gradient-primary shadow-button-pop hover:scale-105 transition-transform"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Play Again
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="h-14 px-6 text-lg font-display font-bold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Home className="mr-2 h-5 w-5" /> ← Menu
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ---------- PLAYING ---------- */
  const progress = (index / total) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary shadow-card-soft hover:scale-105 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" /> Menu
        </button>
        <span className="font-display font-bold text-primary">
          ⭐ {correctCount}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="font-display font-bold text-foreground/70">
            Question {index + 1} / {total}
          </span>
        </div>
        <div className="h-4 rounded-full bg-white/80 overflow-hidden shadow-inner border-2 border-white">
          <motion.div
            className="h-full bg-gradient-primary"
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
          className={`relative rounded-[2rem] bg-white p-6 sm:p-8 shadow-card-soft border-4 ${
            feedback === "correct"
              ? "border-success animate-pop"
              : feedback === "wrong"
              ? "border-destructive animate-shake"
              : "border-primary/30"
          }`}
        >
          <p className="text-center text-muted-foreground font-semibold mb-4">
            🧩 Click the tiles in the right order to build the sentence!
          </p>

          {/* Answer row */}
          <div className="mb-6">
            <p className="text-sm font-bold text-primary mb-2">Your answer:</p>
            <div
              className={`min-h-[5rem] sm:min-h-[6rem] rounded-2xl border-4 border-dashed p-3 flex flex-wrap gap-2 items-center transition-colors ${
                feedback === "correct"
                  ? "border-success bg-success/10"
                  : feedback === "wrong"
                  ? "border-destructive bg-destructive/10"
                  : "border-primary/40 bg-primary/5"
              }`}
            >
              {answer.length === 0 && (
                <span className="text-muted-foreground italic px-2">
                  Tap words below…
                </span>
              )}
              {answer.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => moveToPool(tile)}
                  disabled={locked}
                  className={`px-4 py-2 sm:px-5 sm:py-3 rounded-2xl font-display font-bold text-lg sm:text-2xl shadow-button-pop border-2 border-white transition-transform hover:scale-105 active:scale-95 ${tile.color}`}
                >
                  {tile.word}
                </button>
              ))}
            </div>
          </div>

          {/* Pool */}
          <div className="mb-6">
            <p className="text-sm font-bold text-muted-foreground mb-2">
              Word tiles:
            </p>
            <div className="min-h-[5rem] flex flex-wrap gap-2 sm:gap-3 justify-center p-2">
              {pool.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => moveToAnswer(tile)}
                  disabled={locked}
                  className={`px-4 py-2 sm:px-5 sm:py-3 rounded-2xl font-display font-bold text-lg sm:text-2xl shadow-button-pop border-2 border-white transition-transform hover:scale-110 active:scale-95 ${tile.color}`}
                >
                  {tile.word}
                </button>
              ))}
              {pool.length === 0 && (
                <span className="text-muted-foreground italic">
                  All tiles used!
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={check}
              disabled={locked || answer.length === 0}
              className="h-14 px-8 text-xl font-display font-bold rounded-full bg-gradient-primary shadow-button-pop hover:scale-105 transition-transform disabled:opacity-50"
            >
              Check ✅
            </Button>
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
                  {feedback === "correct" ? "Correct! 🎉" : "Try again! ❌"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
