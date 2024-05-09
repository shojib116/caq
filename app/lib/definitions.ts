export type ResponseSubject = {
  questions: {
    id: string;
    subjectID: string;
    personnelIDs: string[];
    text: string;
    level: number;
  }[];
} & {
  id: string;
  text: string;
};

export type CheckedItems = {
  [key: string]: boolean;
};
