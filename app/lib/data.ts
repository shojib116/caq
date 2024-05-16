import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchSubjects() {
  noStore();
  try {
    const data = await prisma.subject.findMany({});

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subjects");
  }
}

export async function fetchSubjectsOnly() {
  noStore();
  try {
    const data = await prisma.subject.findMany({
      select: { id: true, text: true },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subjects");
  }
}

export async function fetchSubjectsPagination(
  currentPage: number,
  showCount: number
) {
  noStore();
  const skip = (currentPage - 1) * showCount;
  const take = showCount;

  try {
    const data = await prisma.subject.findMany({
      skip,
      take,
    });

    return data;
  } catch (error) {
    console.log(error);
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subjects");
  }
}

export async function fetchSubjectCount() {
  noStore();
  try {
    const data = await prisma.subject.count();

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subjects");
  }
}

export async function fetchPersonnel() {
  noStore();
  try {
    const data = await prisma.personnel.findMany();

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch personnel");
  }
}

export async function fetchQuestionWithSubjectID(subjectID: string) {
  noStore();
  try {
    const data = await prisma.question.findMany({
      where: { subjectID },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions");
  }
}

export async function fetchPersonnelWithSubjectID(subjectID: string) {
  noStore();
  try {
    const data = await prisma.personnel.findMany({
      where: {
        subjects: {
          some: {
            id: subjectID,
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch personnel");
  }
}

export async function fetchQuestionsWithPersonnelID(personnelID: string) {
  try {
    const data = await prisma.subject.findMany({
      where: { personnelIDs: { has: personnelID } },
      select: {
        id: true,
        text: true,
        questions: {
          where: { personnelIDs: { has: personnelID } },
          select: { id: true, text: true, level: true },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch questions for this personnel");
  }
}

export async function fetchHeader() {
  try {
    const data = await prisma.formHeader.findFirst();

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch header info");
  }
}
