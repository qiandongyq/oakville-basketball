import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

// example usage
export default async function gamesApi(req, res) {
  const db = admin.firestore();
  const pastGames = [];
  await db
    .collection("games")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        pastGames.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  res.status(200).json({ pastGames });
}
