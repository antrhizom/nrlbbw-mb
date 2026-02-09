import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const dynamic = "force-dynamic";

export async function GET() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  const info: Record<string, unknown> = {
    hasProjectId: !!projectId,
    projectIdValue: projectId ?? "(not set)",
    hasClientEmail: !!clientEmail,
    clientEmailPrefix: clientEmail ? clientEmail.substring(0, 25) + "..." : "(not set)",
    hasPrivateKey: !!rawKey,
    privateKeyLength: rawKey?.length ?? 0,
    privateKeyStart: rawKey ? rawKey.substring(0, 35) : "(not set)",
    privateKeyEnd: rawKey ? rawKey.substring(rawKey.length - 35) : "(not set)",
  };

  if (!projectId || !clientEmail || !rawKey) {
    return NextResponse.json({ ...info, error: "Missing env vars" });
  }

  // Try replacing \n
  const privateKey = rawKey.replace(/\\n/g, "\n");

  info.privateKeyAfterReplace = privateKey.substring(0, 40);
  info.privateKeyContainsRealNewlines = privateKey.includes("\n");
  info.privateKeyLineCount = privateKey.split("\n").length;

  // Try to initialize Firebase
  try {
    // Use a separate app name to not conflict
    const testAppName = "debug-test-" + Date.now();
    const app = initializeApp(
      { credential: cert({ projectId, clientEmail, privateKey }) },
      testAppName
    );
    const db = getFirestore(app);

    // Try a simple read
    const docRef = db.collection("stats").doc("completions");
    const docSnap = await docRef.get();

    info.firebaseInitSuccess = true;
    info.firestoreDocExists = docSnap.exists;
    info.firestoreData = docSnap.exists ? docSnap.data() : null;

    return NextResponse.json(info);
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    const errorStack = e instanceof Error ? e.stack?.substring(0, 500) : undefined;
    info.firebaseInitSuccess = false;
    info.error = errorMessage;
    info.errorStack = errorStack;
    return NextResponse.json(info);
  }
}
