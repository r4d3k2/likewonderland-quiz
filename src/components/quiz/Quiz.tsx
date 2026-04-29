import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUESTIONS, type Answer } from "./questions";
import { bigConfetti, popConfetti } from "./Confetti";
import { Button } from "@/components/ui/button";
import { Sparkles, Trophy, RefreshCw, Share2, Check, X } from "lucide-react";
import { toast } from "sonner";

type Phase = "intro" | "playing" | "done";
type Feedback = null | "correct" | "wrong";

export const Quiz = () => {
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

  const stars = (score: number) => (score === total ? 3 : score >= 10 ? 2 : 1);

  const finalMessage = (score: number) => {
    if (score === total) return "You are a champion! 🏆";
    if (score >= 10) return "Awesome job! 🌟";
    if (score >= 6) return "Good try! Keep going! 💪";
    return "Don't give up — try again! 🌈";
  };

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
    }, 1100);
  };

  const reset = () => {
    setIndex(0);
    setAnswers(Array(total).fill(null));
    setFeedback(null);
    setLocked(false);
    setPhase("playing");
  };

  const share = async () => {
    const text = `I scored ${correctCount}/${total} on the "Like or Likes?" English quiz! ${"⭐".repeat(stars(correctCount))}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Like or Likes?", text });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success("Result copied to clipboard! 📋");
      }
    } catch {
      /* user cancelled */
    }
  };

  /* ---------- INTRO ---------- */
  if (phase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-primary shadow-card-soft">
          <Sparkles className="h-4 w-4" /> English Quiz · 4. třída
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-none mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Like</span>{" "}
          <span className="text-foreground/80">or</span>{" "}
          <span className="bg-gradient-secondary bg-clip-text text-transparent">Likes?</span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-10">
          Choose the correct word! ✨🍓🍭
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-10">
          {["🍌", "🍰", "🐶", "🍭", "⚽", "🌈"].map((e, i) => (
            <div
              key={i}
              className="aspect-square rounded-3xl bg-white/90 shadow-card-soft flex items-center justify-center text-5xl animate-float"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {e}
            </div>
          ))}
        </div>

        <Button
          size="lg"
          onClick={() => setPhase("playing")}
          className="h-16 px-10 text-2xl font-display font-bold rounded-full bg-gradient-primary hover:opacity-95 shadow-pop hover:scale-105 transition-transform"
        >
          Start Quiz 🚀
        </Button>
        <p className="mt-6 text-sm text-muted-foreground">
          14 otázek · vyber <b>like</b> nebo <b>likes</b>
        </p>
      </motion.div>
    );
  }

  /* ---------- DONE ---------- */
  if (phase === "done") {
    const s = stars(correctCount);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto text-center"
      >
        <div className="rounded-[2.5rem] bg-white shadow-card-soft p-8 sm:p-12 border-4 border-sunny">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-sun shadow-pop mb-4 animate-pop">
            <Trophy className="h-10 w-10 text-sunny-foreground" />
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
              <RefreshCw className="mr-2 h-5 w-5" /> Try again!
            </Button>
            <Button
              onClick={share}
              variant="outline"
              className="h-14 px-6 text-lg font-display font-bold rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <Share2 className="mr-2 h-5 w-5" /> Share result
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ---------- PLAYING ---------- */
  const progress = ((index + (locked ? 1 : 0)) / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 px-1">
          <span className="font-display font-bold text-foreground/70">
            Question {index + 1} / {total}
          </span>
          <span className="font-display font-bold text-primary">
            ⭐ {correctCount}
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

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 60, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: -60, rotate: -2 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className={`relative rounded-[2rem] bg-white p-6 sm:p-10 shadow-card-soft border-4 ${
            feedback === "correct"
              ? "border-success animate-pop"
              : feedback === "wrong"
              ? "border-destructive animate-shake"
              : "border-white"
          }`}
        >
          <div className="text-center mb-6">
            <div className="text-7xl sm:text-8xl mb-4 inline-block animate-float">
              {current.emoji}
            </div>
            <p className="font-display text-3xl sm:text-4xl font-bold leading-snug">
              {current.before}{" "}
              <span className="inline-block min-w-[3.5rem] sm:min-w-[5rem] px-3 pb-1 mx-1 border-b-4 border-dashed border-primary/50 text-primary">
                {answers[index] ?? "___"}
              </span>{" "}
              {current.after}
            </p>
            {current.hint && (
              <p className="mt-3 text-sm text-muted-foreground italic">
                💡 {current.hint}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(["like", "likes"] as Answer[]).map((opt, i) => {
              const picked = answers[index] === opt;
              const isCorrect = current.answer === opt;
              const showResult = feedback && picked;
              const showRightAnswer =
                feedback === "wrong" && !picked && isCorrect;

              return (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.92 }}
                  whileHover={!locked ? { scale: 1.04, y: -2 } : {}}
                  disabled={locked}
                  onClick={() => handleAnswer(opt)}
                  className={`relative h-20 sm:h-24 rounded-2xl font-display font-extrabold text-2xl sm:text-3xl shadow-button-pop border-4 transition-colors ${
                    showResult && isCorrect
                      ? "bg-success text-success-foreground border-success"
                      : showResult && !isCorrect
                      ? "bg-destructive text-destructive-foreground border-destructive"
                      : showRightAnswer
                      ? "bg-success/20 text-success border-success"
                      : i === 0
                      ? "bg-gradient-secondary text-secondary-foreground border-white"
                      : "bg-gradient-sun text-sunny-foreground border-white"
                  } disabled:cursor-not-allowed`}
                >
                  {opt}
                  {showResult && isCorrect && (
                    <Check className="absolute top-2 right-2 h-6 w-6" />
                  )}
                  {showResult && !isCorrect && (
                    <X className="absolute top-2 right-2 h-6 w-6" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Floating feedback */}
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
