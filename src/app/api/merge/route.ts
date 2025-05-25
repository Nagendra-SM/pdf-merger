/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from "next/server";
import PDFMerger from "pdf-merger-js";
import clientPromise from "@/app/db";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // Get user identifier from headers (to be sent from frontend)
  const userId = req.headers.get("x-user-id") || "anonymous";
  const email = req.headers.get("x-user-email") || "";
  const username = req.headers.get("x-user-username") || "";
  const dbClient = await clientPromise;
  const db = dbClient.db("pdfs");
  const users = db.collection("users");

  // Find or create user record
  let user = await users.findOne({ userId });
  if (!user) {
    user = { _id: new ObjectId(), userId, email, username, generations: 0 };
    await users.insertOne(user);
  } else {
    await users.updateOne({ userId }, { $set: { email, username } });
  }

  // Allow only 1 free generation
  if (user.generations >= 1 && !user.registered && userId === "anonymous") {
    return NextResponse.json({ error: "Free generation limit reached. Please register to continue." }, { status: 403 });
  }

  const formData = await req.formData();
  const files = formData.getAll("files");
  if (!files || files.length < 2) {
    return NextResponse.json({ error: "Please upload at least two PDF files." }, { status: 400 });
  }
  const merger = new PDFMerger();
  try {
    for (const file of files) {
      // @ts-expect-error
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await merger.add(buffer);
    }
    const mergedPdfBuffer = await merger.saveAsBuffer();
    // Increment user's generation count
    await users.updateOne({ userId }, { $inc: { generations: 1 } });
    return new NextResponse(mergedPdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to merge PDFs." }, { status: 500 });
  }
}