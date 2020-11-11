const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({ origin: true }));

var serviceAccount = require("./permissions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://media-library-7d283.firebaseio.com",
});

const db = admin.firestore();

app.get("/hello-world", (req, res) => {
  return res.status(200).send("Hello World!");
});

app.get("/api/songs", (req, res) => {
  (async () => {
    try {
      const page = Number(req.query.page);
      const limit = Number(req.query.limit);
      const query = db.collection("songs");
      const response = await query.get().then((querySnapshot) => {
        let allSongs = querySnapshot.docs;

        if (page !== undefined && limit !== undefined) {
          const pageStart = page * limit;
          console.log("pageStart", pageStart);
          console.log("allSongs", allSongs.length);
          allSongs = allSongs.slice(pageStart, pageStart + limit);
          console.log("pageStart + limit", pageStart + limit);
          console.log("allSongs", allSongs.length);
        }

        const docs = allSongs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            album: data.album,
            name: data.name,
            singer: data.singer,
            year: data.year,
          };
        });
        return docs;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);

const generateId = () => Math.random().toString(36).substr(2, 9);
