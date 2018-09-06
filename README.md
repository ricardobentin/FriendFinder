# FriendFinder

FriendFinder is an application that users can use to find like-minded friends. Each user will answer 10 questions in a survey and then be matched to a friend who answered the survey in a similar fashion.

To get started, you can either go here: https://desolate-hamlet-67909.herokuapp.com

OR

run npm install in your CLI to load the required packages.

Required Packages
* Express
* Path
* Body Parser

From there, run node server.js in your terminal

The application has two HTML pages:
* Home: 
<img src="https://github.com/ricardobentin/FriendFinder/blob/master/assets/images/homepage.png" alt="HOME">

* Survey:
<img src="https://github.com/ricardobentin/FriendFinder/blob/master/assets/images/survey.jpg" alt="SURVEY">

There is an API route for users to see a JSON of all possible friends
* /api/friends
<img src="https://github.com/ricardobentin/FriendFinder/blob/master/assets/images/api-friends.png" alt="API">

Demo of the app:
<img src="https://github.com/ricardobentin/FriendFinder/blob/master/assets/images/demo.GIF" alt="DEMO">

Features of the app:
* Runs on an express server
* Leverages body parser as a middleware to parse incoming request bodies
* Routes
    * HTML Routes: 2 get routes to produce the home page and survey page 
    * API Routes: /api/friends
        * get route to show all of the friends
        * post route to add a new friend to the friends array and then perform the logic to find a friend with similar responses and present the name and image of that friend to the user in a modal window that spawns from the survey html page
