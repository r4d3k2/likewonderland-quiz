export type Answer = "like" | "likes";

export interface Question {
  id: number;
  before: string;
  after: string;
  answer: Answer;
  hint?: string; // krátká česká nápověda
  emoji: string;
}

export const QUESTIONS: Question[] = [
  { id: 1,  before: "I",                       after: "bananas.",        answer: "like",  emoji: "🍌", hint: "po I používáme like" },
  { id: 2,  before: "He",                      after: "juice.",          answer: "likes", emoji: "🧃", hint: "He / She / It → likes" },
  { id: 3,  before: "You",                     after: "pears.",          answer: "like",  emoji: "🍐", hint: "po You používáme like" },
  { id: 4,  before: "Jane",                    after: "oranges.",        answer: "likes", emoji: "🍊", hint: "Jane = she" },
  { id: 5,  before: "It",                      after: "sweets.",         answer: "likes", emoji: "🍬", hint: "It → likes" },
  { id: 6,  before: "Peter",                   after: "cake.",           answer: "likes", emoji: "🍰", hint: "Peter = he" },
  { id: 7,  before: "She",                     after: "lollipops.",      answer: "likes", emoji: "🍭", hint: "She → likes" },
  { id: 8,  before: "My dog",                  after: "cats.",           answer: "likes", emoji: "🐶", hint: "My dog = it / he" },
  { id: 9,  before: "My cat",                  after: "milk.",           answer: "likes", emoji: "🐱", hint: "My cat = it / she" },
  { id: 10, before: "Tadeáš and Ondra",        after: "sport.",          answer: "like",  emoji: "⚽", hint: "dva lidé = they → like" },
  { id: 11, before: "I",                       after: "jam.",            answer: "like",  emoji: "🍓", hint: "po I používáme like" },
  { id: 12, before: "Children",                after: "school trips.",   answer: "like",  emoji: "🚌", hint: "děti = they → like" },
  { id: 13, before: "My cousin",               after: "shops.",          answer: "likes", emoji: "🛍️", hint: "jeden bratranec = he/she" },
  { id: 14, before: "Her cousins",             after: "their mum.",      answer: "like",  emoji: "👨‍👩‍👧", hint: "více bratranců = they" },
];
