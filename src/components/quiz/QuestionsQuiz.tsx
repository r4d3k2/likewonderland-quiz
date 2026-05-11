import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { bigConfetti, popConfetti } from "./Confetti";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Trophy, Home } from "lucide-react";

interface Question {
  id: number;
  correct: string[];
}

const QUESTIONS: Question[] = [
  { id: 1, correct: ["Is", "it", "a", "dog", "?"] },
  { id: 2, correct: ["Are", "there", "any", "apples", "?"] },
  { id: 3, correct: ["Do", "you", "like", "pizza", "?"] },
  { id: 4, correct: ["Does", "she", "live", "here", "?"] },
  { id: 5, correct: ["Can", "he", "swim", "?"] },
  { id: 6, correct: ["Is", "she", "your", "sister", "?"] },
  { id: 7, correct: ["Are", "they", "at", "school", "?"] },
  { id: 8, correct: ["Do", "we