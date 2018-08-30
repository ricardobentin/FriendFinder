// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Friends list(DATA)
// =============================================================
let friends = [];

//route for catch all
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/app/public/", "home.html"));
});

//route for survey
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname + "/app/public/", "survey.html"));
});

//route for retreiving all friends via a get request to api friends
app.get("/api/friends", function(req, res) {
  console.log(friends.length);
  if (friends.length === 0) {
    res.send(
      "Sorry, You don't have any friends yet. Get out and make some connections!"
    );
  } else {
    for (var i = 0; i < friends.length; i++) {
      res.json(friends);
    }
  }
});
//route for adding new friends by doing a post to api friends
app.post("/api/friends", function(req, res) {
  let newfriend = req.body;
  console.log("This is a new friend\n", newfriend);
  friends.push(newfriend);

  for (var i = 0; i < friends.length; i++) {
    console.log(friends[i].ans);
  }

  res.json(newfriend);
  //logic for compatibility match
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
