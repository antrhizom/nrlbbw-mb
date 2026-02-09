import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  return NextResponse.json({
    hasProjectId: !!projectId,
    projectIdValue: projectId ?? "(not set)",
    hasClientEmail: !!clientEmail,
    clientEmailPrefix: clientEmail ? clientEmail.substring(0, 20) + "..." : "(not set)",
    hasPrivateKey: !!rawKey,
    privateKeyLength: rawKey?.length ?? 0,
    privateKeyStart: rawKey ? rawKey.substring(0, 30) : "(not set)",
    privateKeyHasBeginMarker: rawKey?.includes("-----BEGIN") ?? false,
    privateKeyHasNewlines: rawKey?.includes("\\n") ?? false,
    privateKeyHasRealNewlines: rawKey?.includes("\n") ?? false,
  });
}
