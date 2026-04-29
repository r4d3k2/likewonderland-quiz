import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type Screen = "menu" | "likelikes" | "vocabulary";

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
        English Quiz <span className="inline-block animate-wiggle">🌟</span>
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
      </div>
    </motion.div>
  );
};
