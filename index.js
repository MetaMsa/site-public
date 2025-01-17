const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { json } = require("stream/consumers");

var subs = fetch(
  "https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCCaXdWt0SGQnVHxpGmpz_EQ&key=AIzaSyAfwVlJJBg1eegX0V8aefJ5dM9Gj6o5fXQ"
)
  .then((response) => response.json())
  .then((data) => (subs = data.items[0].statistics.subscriberCount));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static("public"));

const filePath = path.join(__dirname, "lang.json");
let jsonData;

fs.readFile(filePath, "utf-8", (err, data) => {
  jsonData = JSON.parse(data);
});

var time = new Date("2024-05-23");
var today = new Date();
var timestamp = Math.floor((today - time) / (1000 * 60 * 60 * 24));

app.get("/game", function (req, res) {
  res.render("game", {
    img: jsonData[timestamp % jsonData.length].image,
  });
});

app.post("/submit", (req, res) => {
  let count = 0;

  const { name } = req.body;

  var namee = jsonData[timestamp % jsonData.length].name;
  var yearr = jsonData[timestamp % jsonData.length].year;
  var compiledd = jsonData[timestamp % jsonData.length].compiled;
  var cc = jsonData[timestamp % jsonData.length].c;

  var statee;

  for (let i = 0; i < jsonData.length; i++) {
    if (jsonData[i].name === name) {
      if (jsonData[i].name === namee) {
        statee = "doğru";

        count++;
      } else {
        if (jsonData[i].year > yearr) {
          statee = "daha eski";

          count++;
        }

        if (jsonData[i].year === yearr) {
          statee = "yıl doğru";

          count++;
        }

        if (jsonData[i].year < yearr) {
          statee = "daha yeni";

          count++;
        }

        if (jsonData[i].compiled === compiledd) {
          statee = "derleme doğru";

          count++;
        }

        if (jsonData[i].compiled !== compiledd) {
          statee = "derleme yanlış";

          count++;
        }

        if (jsonData[i].c === cc) {
          statee = "c doğru";

          count++;
        }

        if (jsonData[i].c !== cc) {
          count++;
        }
      }
    }
  }

  if (count == 0) {
    statee = "bulunamadı";
  }

  res.json({ state: statee });
});

app.get("/gdpr", function (req, res) {
  res.render("gdpr");
});

app.get("/blog", function (req, res) {
  res.render("blog");
});

app.get("/", function (req, res) {
  res.render("index", {
    sub: subs,
  });
});

app.get("*", function (req, res) {
  res.send("<center><h1>404</h1></center>");
});

app.listen(process.env.PORT || 3000);
