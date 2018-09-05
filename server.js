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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Friends list(DATA)
// =============================================================
let friends = [
  {
    name: "Ed",
    photo: "https://data.whicdn.com/images/30847676/large.jpg",
    ans: ['5','1','4','4','5','1','2','5','4','1']
  },
  {
    name: "Tyler",
    photo:
      "https://www.popworkouts.com/wp-content/uploads/2016/05/Brad-Pitt.jpg",
    ans: ['1','5','3','2','5','4','3','2','1','1']
  }, 
  {
    name: "Angel Face",
    photo:
      "http://www.comicbookreligion.com/img/a/n/Angel_Face_32337.jpg",
    ans: ['1','1','1','1','1','1','1','1','1','1']
  },
  {
    name: "Marla",
    photo:
      "https://pbs.twimg.com/profile_images/3353201116/8e191c3c0b3a3c3d85b1640bd5411a1f.jpeg",
    ans: ['5','5','5','5','5','5','5','5','5','5']
  },
  {
    name: "Bob",
    photo:
      "http://www.comicbookreligion.com/img/b/o/Bob_Paulson.jpg",
    ans: ['3','3','3','3','3','3','3','3','3','3']
  }
];

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
  //capture the user input object - passed as userData from HTML
  let newfriend = req.body;
  console.log("This is a new friend\n", newfriend);
  let newfriendAns = req.body.ans;
  console.log("This is friends", friends);
  //match logic
  let matchName = "";
  let matchImage = "";
  let totalDifference = 10000; // Make the initial value big for comparison

  //do the comparison for everyone in the friends array
  for (let i = 0; i < friends.length; i++) {
    // Compute differences for each answer
    let diff = 0;
    for (var j = 0; j < newfriendAns.length; j++) {
      diff += Math.abs(friends[i].ans[j] - newfriendAns[j]);
    }
    // If lowest difference, record the friend match
    if (diff < totalDifference) {
      console.log("Closest match found = " + diff);
      console.log("Friend name = " + friends[i].name);
      console.log("Friend image = " + friends[i].photo);

      totalDifference = diff;
      matchName = friends[i].name;
      matchImage = friends[i].photo;

      console.log("this is match name:", matchName);
      console.log("this is match image:", matchImage);
    }
  }

  //add a new friend
  friends.push(newfriend);

  console.log("this is match name:", matchName);
  console.log("this is match image:", matchImage);
  //send the response back to the html page
  res.json({ matchName: matchName, matchImage: matchImage });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
