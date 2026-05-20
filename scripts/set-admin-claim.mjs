import admin from "firebase-admin";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("../service-account.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Remplace par ton vrai UID Firebase Auth
const uid = "lW39gmfA4lYVBU7KqWFbKeyfuwy2";

await admin.auth().setCustomUserClaims(uid, {
  admin: true,
});

console.log(`✅ Admin claim added to ${uid}`);

process.exit(0);