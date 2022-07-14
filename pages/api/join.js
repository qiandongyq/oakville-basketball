import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

// example usage
export default async function JoinApi(req, res) {
  const { id, user, type } = req.body;
  const db = admin.firestore();
  const pastGames = [];
  await db
    .collection("games")
    .doc(id)
    .update({
      [type]: admin.firestore.FieldValue.arrayUnion(user),
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  res.status(200).json({ success: true });
}
