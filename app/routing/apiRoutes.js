// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
let friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

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
};