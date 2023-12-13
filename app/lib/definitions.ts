export type ResponseSubject = {
  question:
    | {
        id: string;
        subjectId: string;
        text: string;
        level: number;
      }[];
} & {
  id: string;
  text: string;
};
