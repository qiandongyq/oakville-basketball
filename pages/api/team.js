import * as admin from "firebase-admin";
import Players from "../../data/players.json";
import shuffle from "just-shuffle";
import splitAt from "just-split-at";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

export default async function TeamApi(req, res) {
  const db = admin.firestore();
  const games = [];
  await db
    .collection("games")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        games.push({ ...doc.data(), id: doc.id });
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  const nextGame = games.find((game) => {
    return dayjs(game.date).isSame(dayjs().weekday(5), "day");
  });

  const players = [...nextGame.regular, ...nextGame.dropIn];

  let normalPool = players.filter((player) =>
    Players.normalPlayers.includes(player)
  );
  let weightedPool = players.filter((player) =>
    Players.weightedPlayers.includes(player)
  );
  let shooterPool = players.filter((player) =>
    Players.shooterPlayers.includes(player)
  );
  let flyPool = players.filter((player) => Players.flyPlayers.includes(player));

  let shuffled = shuffle(normalPool);
  let team = splitAt(shuffled, shuffled.length / 2);
  let teamWhite = team[0];
  let teamBlack = team[1];
  let weightPoolShuffled = shuffle(weightedPool);
  let weightTeamSplit = splitAt(
    weightPoolShuffled,
    weightPoolShuffled.length / 2
  );

  if (teamWhite.length <= teamBlack.length) {
    teamWhite = [...teamWhite, ...weightTeamSplit[1]];
    teamBlack = [...teamBlack, ...weightTeamSplit[0]];
  } else {
    teamWhite = [...teamWhite, ...weightTeamSplit[0]];
    teamBlack = [...teamBlack, ...weightTeamSplit[1]];
  }

  let shooterShuffled = shuffle(shooterPool);
  let shooterTeamSplit = splitAt(shooterShuffled, shooterShuffled.length / 2);

  if (teamWhite.length <= teamBlack.length) {
    teamWhite = [...teamWhite, ...shooterTeamSplit[1]];
    teamBlack = [...teamBlack, ...shooterTeamSplit[0]];
  } else {
    teamWhite = [...teamWhite, ...shooterTeamSplit[0]];
    teamBlack = [...teamBlack, ...shooterTeamSplit[1]];
  }

  let flyShuffled = shuffle(flyPool);
  let flyTeamSplit = splitAt(flyShuffled, flyShuffled.length / 2);

  if (teamWhite.length <= teamBlack.length) {
    teamWhite = [...teamWhite, ...flyTeamSplit[1]];
    teamBlack = [...teamBlack, ...flyTeamSplit[0]];
  } else {
    teamWhite = [...teamWhite, ...flyTeamSplit[0]];
    teamBlack = [...teamBlack, ...flyTeamSplit[1]];
  }

  await db
    .collection("games")
    .doc(nextGame.id)
    .update({
      teamWhite,
      teamBlack,
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

  res.status(200).json({ success: true });
}
