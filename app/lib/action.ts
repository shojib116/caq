"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const SubjectSchema = z.object({
  subject: z.string(),
});

export async function addSubject(formData: FormData) {
  const { subject } = SubjectSchema.parse({
    subject: formData.get("subject"),
  });

  try {
    await prisma.subject.create({
      data: {
        text: subject,
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

export async function updateSubject(id: string, formData: FormData) {
  const { subject } = SubjectSchema.parse({
    subject: formData.get("subject"),
  });

  try {
    await prisma.subject.update({
      where: {
        id,
      },
      data: {
        text: subject,
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

const QuestionSchema = z.object({
  question: z.string(),
  level: z.coerce.number(),
});

export async function addQuestion(subjectId: string, formData: FormData) {
  const { question, level } = QuestionSchema.parse({
    question: formData.get("question"),
    level: formData.get("level"),
  });

  try {
    const response = await prisma.question.create({
      data: {
        subjectId: subjectId,
        text: question,
        level: level,
      },
    });

    revalidatePath("/subjects");
  } catch (error) {
    return {
      message: "Database Error: Failed to add question",
    };
  }
}

export async function updateQuestion(
  questionId: string,
  question: string,
  level: number
) {
  try {
    await prisma.question.update({
      where: { id: questionId },
      data: {
        text: question,
        level: level,
      },
    });

    revalidatePath("/subjects");
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

    revalidatePath("/subjects");
  } catch (error) {
    return {
      message: "Database Error: Failed to delete question",
    };
  }
}


export async function updatePersonnel(id: string, formData: FormData) {}
export async function deletePersonnel(id: string) {}