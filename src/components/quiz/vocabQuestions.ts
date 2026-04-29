export interface VocabQuestion {
  id: number;
  scrambled: string[]; // pre-scrambled words shown to student
  correct: string[]; // correct ordered words forming the sentence
}

// Helper for builder
const q = (id: number, scrambled: string, correct: string): VocabQuestion => ({
  id,
  scrambled: scrambled.split(" "),
  correct: correct.split(" "),
});

export const VOCAB_QUESTIONS: VocabQuestion[] = [
  q(1, "vlei I ehsuo ni a", "I live in a house"),
  q(2, "ielv uYo atfl ni a", "You live in a flat"),
  q(3, "velis eH itcy ni eth", "He lives in the city"),
  q(4, "od erWhe ivle uyo", "Where do you live"),
  q(5, "etetrs htwi srca", "street with cars"),
  q(6, "tea I ni het traruanset", "I eat in the restaurant"),
  q(7, "tesa eH hpso ni het dofo", "He eats food in the shop"),
  q(8, "ylpa lnidCrhe akpr ni het", "Children play in the park"),
  q(9, "elsik irFghiteefr erwat", "Firefighter likes water"),
  q(10, "tgo I yke vhea neo", "I have got one key"),
  q(11, "ash ESh yske ogt wot", "She has got two keys"),
  q(12, "si erThe dnearg ni nma het a", "There is a man in the garden"),
  q(13, "nda a noamw nma a", "a man and a woman"),
];
