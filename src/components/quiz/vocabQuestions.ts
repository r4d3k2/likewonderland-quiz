export interface VocabQuestion {
  id: number;
  tiles: string[]; // real correct words (will be shuffled at render time)
  correct: string[]; // correct ordered words forming the sentence
}

const q = (id: number, sentence: string): VocabQuestion => {
  const words = sentence.split(" ");
  return { id, tiles: words, correct: words };
};

export const VOCAB_QUESTIONS: VocabQuestion[] = [
  q(1, "I live in a house"),
  q(2, "You live in a flat"),
  q(3, "He lives in the city"),
  q(4, "Where do you live"),
  q(5, "street with cars"),
  q(6, "I eat in the restaurant"),
  q(7, "He eats food in the shop"),
  q(8, "Children play in the park"),
  q(9, "Firefighter likes water"),
  q(10, "I have got one key"),
  q(11, "She has got two keys"),
  q(12, "There is a man in the garden"),
  q(13, "a man and a woman"),
];
