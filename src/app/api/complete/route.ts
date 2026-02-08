import { getAdminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({
        count: Math.floor(Math.random() * 9000) + 1000,
        fallback: true,
      });
    }

    const docRef = db.collection("stats").doc("completions");
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      await docRef.update({
        count: FieldValue.increment(1),
        lastCompleted: FieldValue.serverTimestamp(),
      });
    } else {
      await docRef.set({
        count: 1,
        lastCompleted: FieldValue.serverTimestamp(),
      });
    }

    const updatedSnap = await docRef.get();
    const data = updatedSnap.data();
    const count = data?.count ?? 1;

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error updating completion count:", error);
    return NextResponse.json(
      { count: Math.floor(Math.random() * 9000) + 1000, fallback: true },
      { status: 200 }
    );
  }
}

export async function GET() {
  try {
    const db = getAdminDb();
    if (!db) {
      return NextResponse.json({ count: 0, fallback: true });
    }

    const docRef = db.collection("stats").doc("completions");
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ count: 0 });
    }

    const data = docSnap.data();
    const count = data?.count ?? 0;

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error reading completion count:", error);
    return NextResponse.json({ count: 0, fallback: true }, { status: 200 });
  }
}
