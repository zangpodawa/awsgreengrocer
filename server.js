const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8080;

// import firebase-admin package
const admin = require("firebase-admin");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import service account file (helps to know the firebase project details)
const serviceAccount = require("./greengrocercafe-firebase-adminsdk-ahuk8-c495cf03fe.json");
const exp = require("constants");

// Intialize the firebase-admin project/account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
app.use(cors());
var jsonParser = bodyParser.json();

let auth = admin.auth();

app.get("/", (req, res) => {
  res.send("server running");
});

// app.post("/test", (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
// });

app.post("/login", (req, res) => {
  let adminUid = "EzpJc1z4efdw1Nkd8fOgZ5io9bj1";
  let id = req.body.id;
  const roles = {
    isAdmin: true,
  };
  if (id === adminUid) {
    auth.createCustomToken(adminUid, roles).then((customToken) => {
      res.send({ token: customToken });
    });
  } else {
    auth
      .createCustomToken(id, { isAdmin: (roles.isAdmin = false) })
      .then((customToken) => {
        res.send({ token: customToken });
      });
  }
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
