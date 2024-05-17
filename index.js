const express=require("express");
const app=express();
var getJSON = require("get-json");

app.set("view engine", "ejs");
app.use(express.static('public'));

getJSON('***', function(error, response){
    return subs=response.items[0].statistics.subscriberCount;
});

app.get("/gdpr", function(req, res) {
    res.render("gdpr");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

app.get("/", function(req, res) {
    res.render("index",{
        sub: subs
    });
});

app.get("*", function(req, res) {   
    res.send("<center><h1>404</h1></center>");
});

app.listen(process.env.PORT || 5000);