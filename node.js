const express=require("express");
const app=express();
var getJSON = require("get-json");

app.set("view engine", "ejs");
app.use(express.static('public'));

getJSON('***', function(error, response){
    return subs=response.items[0].statistics.subscriberCount;
});

app.use("/gdpr", function(req, res) {
    res.render("gdpr");
});

app.use("/", function(req, res) {
    res.render("index",{
        sub: subs
    });
});

app.listen(process.env.PORT || 5000);
