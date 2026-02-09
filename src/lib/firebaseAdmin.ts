import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let adminDb: Firestore | null = null;

function getAdminDb(): Firestore | null {
  if (adminDb) return adminDb;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !rawKey || rawKey.includes("your-private-key")) {
    console.warn(
      "Firebase Admin SDK not configured – running in fallback mode.",
      { hasProjectId: !!projectId, hasClientEmail: !!clientEmail, hasPrivateKey: !!rawKey }
    );
    return null;
  }

  // Handle both JSON-escaped \\n and real newlines
  const privateKey = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

  try {
    let app: App;
    if (getApps().length === 0) {
      app = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });
    } else {
      app = getApps()[0];
    }
    adminDb = getFirestore(app);
    console.log("Firebase Admin SDK initialized successfully");
    return adminDb;
  } catch (e) {
    console.error("Failed to initialize Firebase Admin:", e);
    return null;
  }
}

export { getAdminDb };
