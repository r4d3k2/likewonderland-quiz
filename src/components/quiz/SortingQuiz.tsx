import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, Home, ArrowLeft, Sparkles } from "lucide-react";
import { popConfetti, bigConfetti } from "./Confetti";

type Group = "don't" | "doesn't";
interface Word {
  text: string;
  group: Group;
}

const WORDS: Word[] = [
  { text: "I", group: "don't" },
  { text: "you", group: "don't" },
  { text: "we", group: "don't" },
  { text: "they", group: "don't" },
  { text: "mum and dad", group: "don't" },
  { text: "my parents", group: "don't" },
  { text: "Vašík", group: "doesn't" },
  { text: "Egon", group: "doesn't" },
  { text: "he", group: "doesn't" },
  { text: "she", group: "doesn't" },
  { text: "it", group: "doesn't" },
  { text: "my mum", group: "doesn't" },
  { text: "my dad", group: "doesn't" },
];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

type Phase = "intro" | "playing" | "done";
type Feedback = null | { kind: "correct"; group: Group } | { kind: "wrong" };

interface Props { onBack?: () => void }

export const SortingQuiz = ({ onBack }: Props) => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [seed, setSeed] = useState(0);
  const queue = useMemo(() => shuffle(WORDS), [seed]);
  const total = queue.length;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [locked, setLocked] = useState(false);

  const current = queue[index];
  const stars = (s: number) => (s === total ? 3 : s >= Math.ceil(total * 0.7) ? 2 : 1);

  const handleSort = (group: Group) => {
    if (locked || !current) return;
    setLocked(true);
    const correct = group === current.group;
    if (correct) {
      setScore((s) => s + 1);
      setFeedback({ kind: "correct", group });
      popConfetti();
      setTimeout(() => {
        setFeedback(null);
        setLocked(false);
        if (index + 1 >= total) {
          setPhase("done");
          bigConfetti();
        } else {
          setIndex((i) => i + 1);
        }
      }, 700);
    } else {
      setFeedback({ kind: "wrong" });
      setTimeout(() => {
        setFeedback(null);
        setLocked(false);
      }, 600);
    }
  };

  const reset = () => {
    setSeed((s) => s + 1);
    setIndex(0);
    setScore(0);
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
          <button onClick={onBack} className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-teal shadow-card-soft hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" /> Menu
          </button>
        )}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-teal shadow-card-soft">
          <Sparkles className="h-4 w-4" /> English Quiz · 4. třída
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-none mb-4">
          <span className="bg-gradient-teal bg-clip-text text-transparent">Sort It Out!</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-10">
          Drag into the right group! 🗂️
        </p>
        <Button
          size="lg"
          onClick={() => setPhase("playing")}
          className="h-16 px-10 text-2xl font-display font-bold rounded-full bg-gradient-teal text-teal-foreground hover:opacity-95 shadow-pop hover:scale-105 transition-transform"
        >
          Start 🚀
        </Button>
      </motion.div>
    );
  }

  if (phase === "done") {
    const s = stars(score);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl mx-auto text-center">
        <div className="rounded-[2.5rem] bg-white shadow-card-soft p-8 sm:p-12 border-4 border-teal">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-teal shadow-pop mb-4 animate-pop">
            <Trophy className="h-10 w-10 text-teal-foreground" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-2">
            {score === total ? "Perfect! 🏆" : score >= total * 0.7 ? "Great job! 🌟" : "Keep going! 💪"}
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            You got <b className="text-teal">{score}</b> / <b>{total}</b>!
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`text-6xl ${i < s ? "" : "grayscale opacity-30"}`}>⭐</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} className="h-14 px-6 text-lg font-display font-bold rounded-full bg-gradient-teal text-teal-foreground shadow-button-pop hover:scale-105 transition-transform">
              <RefreshCw className="mr-2 h-5 w-5" /> Play Again
            </Button>
            {onBack && (
              <Button onClick={onBack} variant="outline" className="h-14 px-6 text-lg font-display font-bold rounded-full border-2 border-teal text-teal hover:bg-teal hover:text-teal-foreground">
                <Home className="mr-2 h-5 w-5" /> ← Menu
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const progress = (index / total) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {onBack && (
        <div className="mb-4 flex justify-start">
          <button onClick={onBack} className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-teal shadow-card-soft hover:scale-105 transition-transform">
            <ArrowLeft className="h-4 w-4" /> Menu
          </button>
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="font-display font-bold text-foreground/70">
            Word {index + 1} / {total}
          </span>
          <span className="font-display font-bold text-teal">⭐ {score}</span>
        </div>
        <div className="h-4 rounded-full bg-white/80 overflow-hidden shadow-inner border-2 border-white">
          <motion.div
            className="h-full bg-gradient-teal"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />
        </div>
      </div>

      {/* Sentence template */}
      <div className="rounded-[2rem] bg-white p-6 shadow-card-soft border-4 border-white text-center mb-6">
        <p className="font-display text-2xl sm:text-3xl font-bold">
          <span className="inline-block min-w-[5rem] px-3 pb-1 border-b-4 border-dashed border-teal/60 text-teal">
            ___
          </span>{" "}
          like chocolate
        </p>
      </div>

      {/* Word card */}
      <div className="flex justify-center mb-6 min-h-[7rem]">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={`${seed}-${index}`}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                x: feedback?.kind === "correct" ? (feedback.group === "don't" ? -300 : 300) : 0,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              className={`px-8 py-5 rounded-2xl font-display font-extrabold text-3xl sm:text-4xl shadow-pop border-4 bg-gradient-teal text-teal-foreground border-white ${
                feedback?.kind === "wrong" ? "animate-shake border-destructive" : ""
              } ${feedback?.kind === "correct" ? "border-success" : ""}`}
            >
              {current.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Drop boxes */}
      <div className="grid grid-cols-2 gap-4">
        <button
          disabled={locked}
          onClick={() => handleSort("don't")}
          className="h-32 sm:h-40 rounded-3xl font-display font-extrabold text-3xl sm:text-4xl shadow-button-pop border-4 border-white bg-destructive text-destructive-foreground uppercase hover:scale-[1.03] active:scale-95 transition-transform disabled:opacity-80"
        >
          DON'T
        </button>
        <button
          disabled={locked}
          onClick={() => handleSort("doesn't")}
          className="h-32 sm:h-40 rounded-3xl font-display font-extrabold text-3xl sm:text-4xl shadow-button-pop border-4 border-white bg-accent text-accent-foreground uppercase hover:scale-[1.03] active:scale-95 transition-transform disabled:opacity-80"
        >
          DOESN'T
        </button>
      </div>
    </div>
  );
};
