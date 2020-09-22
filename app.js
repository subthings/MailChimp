const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const dotenv = require("dotenv").config();

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
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: name,
                COMPANY: company,
            }
        }]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us" + process.env.SERVER + ".api.mailchimp.com/3.0/lists/" + process.env.AUDIENCELISTID;

    const options = {
        method: "POST",
        auth: "anna:" + process.env.APIKEY
      }

    const request = https.request(url, options, (response) => {
        response.statusCode === 200 ? res.sendFile(__dirname + "/success.html") : res.sendFile(__dirname + "/failure.html");
    })

    request.write(jsonData);
    request.end();
})

app.listen(process.env.PORT, () => {
    console.log("Listen port 3000");
})
