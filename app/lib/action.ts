"use server";

import prisma from "@/app/lib/prisma";
import { FormHeader } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function addSubject(subject: string, personnelIDs: string[]) {
  try {
    await prisma.subject.create({
      data: {
        text: subject,
        personnelIDs,
      },
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    return {
      message: "Database Error: Failed to delete question",
    };
  }
}

export async function addPersonnel(designation: string) {
  try {
    const highestPriorityPersonnel = await prisma.personnel.findFirst({
      orderBy: {
        priority: "desc",
      },
      take: 1,
    });

    const newPriority = highestPriorityPersonnel
      ? highestPriorityPersonnel.priority + 1
      : 1;

    await prisma.personnel.create({
      data: {
        designation: designation,
        priority: newPriority,
      },
    });
    revalidatePath("/personnel");
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to add Personnel.",
    };
  }

  revalidatePath("/personnel");
}

export async function updatePersonnel(
  personnelId: string,
  designation: string,
  oldPriority: number,
  newPriority: number
) {
  try {
    await prisma.personnel.update({
      where: { id: personnelId },
      data: {
        designation,
      },
    });

    const totalPersonnel = await prisma.personnel.count();

    if (newPriority > totalPersonnel) {
      revalidatePath("/personnel");
      return;
    }

    await prisma.personnel.updateMany({
      where: { priority: { gt: oldPriority } },
      data: {
        priority: {
          decrement: 1,
        },
      },
    });

    await prisma.personnel.updateMany({
      where: {
        priority: {
          gte: newPriority,
        },
      },
      data: {
        priority: {
          increment: 1,
        },
      },
    });

    await prisma.personnel.update({
      where: {
        id: personnelId,
      },
      data: {
        priority: newPriority,
      },
    });

    revalidatePath("/personnel");
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to update personnel designation",
    };
  }
}

export async function deletePersonnel(personnelId: string) {
  try {
    const deletedPersonnel = await prisma.personnel.delete({
      where: { id: personnelId },
    });

    await prisma.personnel.updateMany({
      where: { priority: { gte: deletedPersonnel.priority } },
      data: {
        priority: {
          decrement: 1,
        },
      },
    });

    revalidatePath("/personnel");
  } catch (error) {
    console.error(error);
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
      console.error(error);
      return {
        message: "Database Error: Failed to update header",
      };
    }
  }
}

const userSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  role: z.string({ invalid_type_error: "Please select a role" }),
});

export type UserState = {
  errors?: {
    email?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function authorizeUser(
  prevState: UserState | undefined,
  formData: FormData
) {
  const parsedData = userSchema.safeParse({
    email: formData.get("email"),
    role: formData.get("role"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create user",
    };
  }

  const { email, role } = parsedData.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email,
          role,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to create user",
    };
  }
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to delete user",
    };
  }
  revalidatePath("/admin");
}
