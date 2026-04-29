import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Trophy, Home } from "lucide-react";
import { bigConfetti, popConfetti } from "./Confetti";

interface Pair {
  a: string;
  b: string;
}

const PAIRS: Pair[] = [
  { a: "I live", b: "bydlím" },
  { a: "house", b: "dům" },
  { a: "flat", b: "byt" },
  { a: "park", b: "park" },
  { a: "garden", b: "zahrada" },
  { a: "shop", b: "obchod" },
  { a: "restaurant", b: "restaurace" },
  { a: "firefighter", b: "hasič" },
  { a: "key", b: "klíč" },
  { a: "man", b: "muž" },
  { a: "woman", b: "žena" },
  { a: "street", b: "ulice" },
  { a: "building", b: "budova" },
  { a: "city", b: "město" },
  { a: "baseball", b: "baseball" },
  { a: "I can play", b: "umím hrát" },
];

interface Card {
  id: number;
  pairId: number;
  text: string;
  side: "a" | "b";
}

const BACK_COLORS = [
  "bg-gradient-pink",
  "bg-gradient-primary",
  "bg-gradient-grass",
  "bg-gradient-sun",
  "bg-gradient-secondary",
];

const PAIR_SIZE = 8; // 4x4 grid = 16 cards = 8 pairs

const buildDeck = (): Card[] => {
  // Pick 8 random pairs from PAIRS
  const shuffledPairs = [...PAIRS].sort(() => Math.random() - 0.5).slice(0, PAIR_SIZE);
  const cards: Card[] = [];
  shuffledPairs.forEach((p, idx) => {
    cards.push({ id: idx * 2, pairId: idx, text: p.a, side: "a" });
    cards.push({ id: idx * 2 + 1, pairId: idx, text: p.b, side: "b" });
  });
  // Shuffle cards
  return cards.sort(() => Math.random() - 0.5);
};

interface Props {
  onBack: () => void;
}

export const MemoryGame = ({ onBack }: Props) => {
  const [deck, setDeck] = useState<Card[]>(() => buildDeck());
  const [flipped, setFlipped] = useState<number[]>([]); // currently face-up but not matched
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const total = deck.length;
  const done = matched.size === total && total > 0;

  useEffect(() => {
    if (done) {
      bigConfetti();
    }
  }, [done]);

  const onFlip = (id: number) => {
    if (locked) return;
    if (matched.has(id)) return;
    if (flipped.includes(id)) return;

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((nid) => deck.find((c) => c.id === nid)!);
      if (a.pairId === b.pairId) {
        setTimeout(() => {
          setMatched((m) => {
            const s = new Set(m);
            s.add(a.id);
            s.add(b.id);
            return s;
          });
          setFlipped([]);
          popConfetti();
        }, 400);
      } else {
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 1000);
      }
    }
  };

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  };

  const stars = moves <= 20 ? 3 : moves <= 30 ? 2 : 1;

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto text-center"
      >
        <div className="rounded-[2.5rem] bg-white shadow-card-soft p-8 sm:p-12 border-4 border-pink">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-pink shadow-pop mb-4 animate-pop">
            <Trophy className="h-10 w-10 text-pink-foreground" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold mb-2">
            All matched! 🎉
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            You did it in <b className="text-pink">{moves}</b> moves!
          </p>
          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2 + i * 0.2, type: "spring", stiffness: 200 }}
                className={`text-6xl ${i < stars ? "" : "grayscale opacity-30"}`}
              >
                ⭐
              </motion.span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={reset}
              className="h-14 px-6 text-lg font-display font-bold rounded-full bg-gradient-pink shadow-button-pop hover:scale-105 transition-transform"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Play Again
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="h-14 px-6 text-lg font-display font-bold rounded-full border-2 border-pink text-pink hover:bg-pink hover:text-pink-foreground"
            >
              <Home className="mr-2 h-5 w-5" /> ← Menu
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-pink shadow-card-soft hover:scale-105 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" /> Menu
        </button>
        <span className="font-display font-bold text-pink">🃏 Moves: {moves}</span>
      </div>

      <div className="rounded-[2rem] bg-white p-4 sm:p-6 shadow-card-soft border-4 border-pink/40">
        <div className="grid grid-cols-4 gap-2 sm:gap-3" style={{ perspective: "1000px" }}>
          {deck.map((card, i) => {
            const isFlipped = flipped.includes(card.id) || matched.has(card.id);
            const isMatched = matched.has(card.id);
            const back = BACK_COLORS[i % BACK_COLORS.length];
            return (
              <button
                key={card.id}
                onClick={() => onFlip(card.id)}
                className="relative aspect-square w-full rounded-2xl focus:outline-none"
                style={{ transformStyle: "preserve-3d" }}
                disabled={isMatched}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Back */}
                  <div
                    className={`absolute inset-0 rounded-2xl border-4 border-white shadow-button-pop flex items-center justify-center ${back}`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <span className="text-3xl sm:text-4xl">❓</span>
                  </div>
                  {/* Front */}
                  <div
                    className={`absolute inset-0 rounded-2xl border-4 flex items-center justify-center p-1 text-center transition-colors ${
                      isMatched
                        ? "bg-success/20 border-success"
                        : "bg-white border-pink"
                    }`}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <span
                      className={`font-display font-bold text-xs sm:text-base leading-tight break-words ${
                        isMatched ? "text-success" : "text-foreground"
                      }`}
                    >
                      {card.text}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
