const express=require("express");
const app=express();

/*var subs = fetch("***")
.then(response => response.json())
.then(data => subs = data.items[0].statistics.subscriberCount);*/

app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/game", function(req, res) {
    res.render("game");
});

app.get("/gdpr", function(req, res) {
    res.render("gdpr");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

app.get("/", function(req, res) {
    res.render("index",{
        /*sub: subs*/
    });
});

app.get("*", function(req, res) {   
    res.send("<center><h1>404</h1></center>");
});

app.listen(process.env.PORT || 3000);