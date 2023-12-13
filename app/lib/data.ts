import prisma from "@/app/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchSubjects() {
  noStore();
  try {
    const data = await prisma.subject.findMany();

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
      include: {
        question: true,
      },
    });

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subjects");
  }
}

export async function fetchSubjectCount() {
  noStore();
  try {
    const data = await prisma.subject.findMany();

    return data.length;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subjects");
  }
}
