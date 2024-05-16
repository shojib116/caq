import { NextResponse } from "next/server";
import path from "path";
import { writeFile, readdir, unlink } from "fs/promises";

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const file = formData.get("file");
  const filename = formData.get("fileName") || "";
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadDir = path.join(process.cwd(), "public/uploads/");

  // Delete all previous files in the directory
  const files = await readdir(uploadDir);
  for (const file of files) {
    await unlink(path.join(uploadDir, file));
  }

  // Write the new file
  try {
    await writeFile(path.join(uploadDir, filename.toString()), buffer);
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
