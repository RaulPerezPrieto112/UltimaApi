// Reemplaza los valores con tus credenciales de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAoOtL6MZ-dSYYslMydMqDBQZUcvTAnNYk",
    authDomain: "esp32-22209.firebaseapp.com",
    databaseURL: "https://esp32-22209-default-rtdb.firebaseio.com",
    projectId: "esp32-22209",
    storageBucket: "esp32-22209.appspot.com",
    messagingSenderId: "767120006500",
    appId: "1:767120006500:web:7ade8ca717ab1b25b76e71",
    measurementId: "G-R58KS9TLJC"
  };
  
  const express = require("express");
  const bodyParser = require("body-parser");
  const admin = require("firebase-admin");
  
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: firebaseConfig.databaseURL,
  });
  
  const app = express();
  const port = 3000;
  
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.post("/api/tds", (req, res) => {
    const tdsValue = parseFloat(req.body.tdsValue);
    
    if (isNaN(tdsValue)) {
      return res.status(400).send("Invalid tdsValue");
    }
  
    // Guardar el valor en Firebase
    const db = admin.database();
    const ref = db.ref("tds");
    ref.push({ value: tdsValue, timestamp: admin.database.ServerValue.TIMESTAMP })
      .then(() => {
        return res.status(200).send("TDS value saved successfully");
      })
      .catch((error) => {
        console.error("Error saving TDS value to Firebase:", error);
        return res.status(500).send("Error saving TDS value");
      });
  });
  
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
  