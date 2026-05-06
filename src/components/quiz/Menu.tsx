import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Screen = "menu" | "likelikes" | "vocabulary" | "city" | "memory" | "dontdoesnt" | "sorting";

interface MenuProps {
  onSelect: (screen: Screen) => void;
}

export const Menu = ({ onSelect }: MenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto text-center"
    >
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-5 py-2 text-sm font-semibold text-primary shadow-card-soft">
        <Sparkles className="h-4 w-4" /> English Quiz · 4. třída
      </div>
      <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-none mb-3">
        Kiki's English Quiz <span className="inline-block animate-wiggle">🌟</span>
      </h1>
      <p className="text-xl sm:text-2xl text-muted-foreground mb-10">
        Choose your topic!
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Card 1 - Like or Likes */}
        <motion.button
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("likelikes")}
          className="group relative rounded-[2rem] bg-gradient-sun p-8 sm:p-10 text-left shadow-pop border-4 border-white transition-shadow hover:shadow-2xl"
        >
          <div className="text-7xl sm:text-8xl mb-4 inline-block group-hover:animate-wiggle">
            🍌
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-sunny-foreground mb-2">
            Like or Likes?
          </h2>
          <p className="text-lg text-sunny-foreground/80 font-semibold">
            Do you like bananas?
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sunny-foreground font-bold">
            Start →
          </span>
        </motion.button>

        {/* Card 2 - Vocabulary */}
        <motion.button
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("vocabulary")}
          className="group relative rounded-[2rem] bg-gradient-primary p-8 sm:p-10 text-left shadow-pop border-4 border-white transition-shadow hover:shadow-2xl"
        >
          <div className="text-7xl sm:text-8xl mb-4 inline-block group-hover:animate-wiggle">
            🏠
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-2">
            Where do you live?
          </h2>
          <p className="text-lg text-primary-foreground/90 font-semibold">
            Unscramble the words!
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-primary-foreground font-bold">
            Start →
          </span>
        </motion.button>

        {/* Card 3 - The City */}
        <motion.button
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("city")}
          className="group relative rounded-[2rem] bg-gradient-grass p-8 sm:p-10 text-left shadow-pop border-4 border-white transition-shadow hover:shadow-2xl"
        >
          <div className="text-7xl sm:text-8xl mb-4 inline-block group-hover:animate-wiggle">
            🏙️
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-grass-foreground mb-2">
            The City
          </h2>
          <p className="text-lg text-grass-foreground/90 font-semibold">
            Czech → English!
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-grass-foreground font-bold">
            Start →
          </span>
        </motion.button>

        {/* Card 4 - Memory Game */}
        <motion.button
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("memory")}
          className="group relative rounded-[2rem] bg-gradient-pink p-8 sm:p-10 text-left shadow-pop border-4 border-white transition-shadow hover:shadow-2xl"
        >
          <div className="text-7xl sm:text-8xl mb-4 inline-block group-hover:animate-wiggle">
            🃏
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-pink-foreground mb-2">
            Memory Game
          </h2>
          <p className="text-lg text-pink-foreground/90 font-semibold">
            Match the pairs!
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-pink-foreground font-bold">
            Start →
          </span>
        </motion.button>

        {/* Card 5 - Don't or Doesn't */}
        <motion.button
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("dontdoesnt")}
          className="group relative rounded-[2rem] bg-gradient-fire p-8 sm:p-10 text-left shadow-pop border-4 border-white transition-shadow hover:shadow-2xl"
        >
          <div className="text-7xl sm:text-8xl mb-4 inline-block group-hover:animate-wiggle">
            🚫
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-fire-foreground mb-2">
            Don't or Doesn't?
          </h2>
          <p className="text-lg text-fire-foreground/90 font-semibold">
            Fill in the blank!
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-fire-foreground font-bold">
            Start →
          </span>
        </motion.button>

        {/* Card 6 - Sort It Out */}
        <motion.button
          whileHover={{ scale: 1.04, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect("sorting")}
          className="group relative rounded-[2rem] bg-gradient-teal p-8 sm:p-10 text-left shadow-pop border-4 border-white transition-shadow hover:shadow-2xl"
        >
          <div className="text-7xl sm:text-8xl mb-4 inline-block group-hover:animate-wiggle">
            🗂️
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-teal-foreground mb-2">
            Sort It Out!
          </h2>
          <p className="text-lg text-teal-foreground/90 font-semibold">
            Drag into the right group!
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-teal-foreground font-bold">
            Start →
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};
