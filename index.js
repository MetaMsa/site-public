const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

var subs = fetch(
  "https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCCaXdWt0SGQnVHxpGmpz_EQ&key=AIzaSyAfwVlJJBg1eegX0V8aefJ5dM9Gj6o5fXQ"
)
  .then((response) => response.json())
  .then((data) => (subs = data.items[0].statistics.subscriberCount));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

const filePath = path.join(__dirname, "lang.json");
var jsonData;

fs.readFile(filePath, "utf-8", (err, data) => {
  jsonData = JSON.parse(data);
});

var time = new Date("2024-05-23");
var today = new Date();
var timestamp = Math.floor((today - time) / (1000 * 60 * 60 * 24)) - 1;

app.get("/game", function (req, res) {
  res.render("game", {
    img: jsonData[timestamp % jsonData.length].image,
  });
});

app.post("/submit", (req, res) => {
  var statee = "dil yanlış";
  var yearstatee, compilestate, cstate, year, compile, c;

  const { name } = req.body;

  var namee = jsonData[timestamp % jsonData.length].name;
  var yearr = jsonData[timestamp % jsonData.length].year;
  var compiledd = jsonData[timestamp % jsonData.length].compiled;
  var cc = jsonData[timestamp % jsonData.length].c;

  const match = jsonData.find((item) => item.name === name);

  if (match) {
    if (match.name === namee) {
      statee = "dil doğru";
      compile = compiledd;
      c = cc;
      year = yearr;
    } else {
      if (match.year === yearr) {
        yearstatee = "yıl doğru";
        year = match.year;
      }
      if (match.year < yearr) {
        yearstatee = "daha yeni";
        year = match.year;
      }
      if (match.year > yearr) {
        yearstatee = "daha eski";
        year = match.year;
      }
      if (match.compiled === compiledd) {
        compilestate = true;
        compile = match.compiled;
      }
      if (match.compiled !== compiledd) {
        compilestate = false;
        compile = match.compiled;
      }
      if (match.c === cc) {
        cstate = true;
        c = match.c;
      } else {
        cstate = false;
        c = match.c;
      }
    }
  } else {
    statee = "bulunamadı";
  }
  res.json({
    state: statee,
    yearstate: yearstatee,
    compilestate: compilestate,
    cstate: cstate,
    year: year,
    c: c,
    compile: compile,
  });
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
