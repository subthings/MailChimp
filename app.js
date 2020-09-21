const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", (req, res) => {
    const name = req.body.name;
    const company = req.body.company;
    const email = req.body.email;
})

app.listen(3000, () => {
    console.log("Listen port 3000");
})

