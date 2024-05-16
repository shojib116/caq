"use server";

import prisma from "@/app/lib/prisma";
import { FormHeader } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addSubject(subject: string, personnelIDs: string[]) {
  try {
    await prisma.subject.create({
      data: {
        text: subject,
        personnelIDs,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to add subject.",
    };
  }

  revalidatePath("/subjects");
  redirect("/subjects");
}

export async function updateSubject(
  id: string,
  subject: string,
  personnelIDs: string[]
) {
  try {
    await prisma.subject.update({
      where: {
        id,
      },
      data: {
        text: subject,
        personnelIDs,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to add subject.",
    };
  }

  revalidatePath("/subjects");
}

export async function deleteSubject(id: string) {
  try {
    await prisma.subject.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to add subject.",
    };
  }

  revalidatePath("/subjects");
}

export async function addQuestion(
  subjectId: string,
  question: string,
  level: number,
  personnelIDs: string[]
) {
  try {
    const response = await prisma.question.create({
      data: {
        subjectID: subjectId,
        text: question,
        level,
        personnelIDs,
      },
    });

    revalidatePath("/questions");
  } catch (error) {
    return {
      message: "Database Error: Failed to add question",
    };
  }
}

export async function updateQuestion(
  questionId: string,
  question: string,
  level: number,
  personnelIDs: string[]
) {
  try {
    await prisma.question.update({
      where: { id: questionId },
      data: {
        text: question,
        level,
        personnelIDs,
      },
    });

    revalidatePath("/questions");
  } catch (error) {
    return {
      message: "Database Error: Failed to update question",
    };
  }
}

export async function deleteQuestion(questionId: string) {
  try {
    await prisma.question.delete({
      where: { id: questionId },
    });

    revalidatePath("/questions");
  } catch (error) {
    return {
      message: "Database Error: Failed to delete question",
    };
  }
}

export async function addPersonnel(designation: string) {
  try {
    await prisma.personnel.create({
      data: {
        designation,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to add Personnel.",
    };
  }

  revalidatePath("/personnel");
}

export async function updatePersonnel(
  personnelId: string,
  designation: string
) {
  try {
    await prisma.personnel.update({
      where: { id: personnelId },
      data: {
        designation,
      },
    });

    revalidatePath("/personnel");
  } catch (error) {
    return {
      message: "Database Error: Failed to update personnel designation",
    };
  }
}

export async function deletePersonnel(personnelId: string) {
  try {
    await prisma.personnel.delete({
      where: { id: personnelId },
    });

    revalidatePath("/personnel");
  } catch (error) {
    return {
      message: "Database Error: Failed to delete personnel",
    };
  }
}
export async function updateHeader(
  headerData: FormHeader,
  headerLogoURL: string
) {
  if (headerData.id === "") {
    try {
      await prisma.formHeader.create({
        data: {
          logoURL: headerLogoURL,
          centerText: headerData.centerText,
          formNumber: headerData.formNumber,
          issue: headerData.issue,
          revision: headerData.revision,
          date: headerData.date,
        },
      });

      revalidatePath("/config");
    } catch (error) {
      console.error(error);
      return {
        message: "Database Error: Failed to add header",
      };
    }
  } else {
    try {
      await prisma.formHeader.update({
        where: {
          id: headerData.id,
        },
        data: {
          logoURL: headerLogoURL,
          centerText: headerData.centerText,
          formNumber: headerData.formNumber,
          issue: headerData.issue,
          revision: headerData.revision,
          date: headerData.date,
        },
      });

      revalidatePath("/config");
    } catch (error) {
      return {
        message: "Database Error: Failed to update header",
      };
    }
  }
}
