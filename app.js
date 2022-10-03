const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/08ff8fb7d2";

  const options = {
    method: "POST",
    auth: "josetomas:60f8d0f2351b92301b045aa137d11fb3-us18",
  };

  const request = https.request(url, options, function (response) {
    response.statusCode == 200
      ? res.sendFile(__dirname + "/success.html")
      : res.sendFile(__dirname + "/failure.html");

    // response.on("data", function (data) {
    //   console.log(JSON.parse(data));
    // });
  });

  request.end();
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Server running on Heroku or port 4000");
});

// Mailchimp
// API Key: 60f8d0f2351b92301b045aa137d11fb3-us18
// Audience ID: 08ff8fb7d2
