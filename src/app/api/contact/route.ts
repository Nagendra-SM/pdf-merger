/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    const dbClient = await clientPromise;
    const db = dbClient.db("pdfyog");
    const contacts = db.collection("contacts");
    await contacts.insertOne({ name, email, message, createdAt: new Date() });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save contact message." }, { status: 500 });
  }
}