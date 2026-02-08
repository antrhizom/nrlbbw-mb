import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let adminDb: Firestore | null = null;

function getAdminDb(): Firestore | null {
  if (adminDb) return adminDb;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey || privateKey.includes("your-private-key")) {
    console.warn("Firebase Admin SDK not configured – running in fallback mode.");
    return null;
  }

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
    return adminDb;
  } catch (e) {
    console.error("Failed to initialize Firebase Admin:", e);
    return null;
  }
}

export { getAdminDb };
