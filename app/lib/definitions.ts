export type QuestionnaireData = {
  id: string;
  questions: {
    id: string;
    text: string;
    level: number;
  }[];
  text: string;
};

export type CheckedItems = {
  [key: string]: boolean;
};
