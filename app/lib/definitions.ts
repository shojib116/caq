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

export type PrintPageHeaderTableData = {
  logo?: string;
  centerText: string;
  formNumber?: string;
  issue?: string;
  revision?: string;
  date?: Date | "";
};

export type PrintPageTopTableData = {
  designation: string;
  name?: string;
  staffID?: string;
  date?: Date | "";
};

export type PrintPageContentTableData = {
  id: string;
  text: string;
  satisfied?: string | undefined;
  remarks?: string;
  questions?: { id: string; text: string; level: number }[];
}[];

export type PrintPageAssessorTableData = {
  name?: string;
  position?: string;
  date?: Date | "";
  remarks?: string;
};
