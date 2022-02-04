# Tomato

A simple React App with an Express server designed to return a tweet with '#Tomato' appended on the end of it. This is a single page web app with 2 text areas: an input in which a user types, and an output which returns what the user has typed with the word '#Tomato' appended on the end of it - the word 'Tomato' is translated to the detected language. The translation is handled by Google's Cloud Translate API which is required for this project.


## How to run the app
 - First clone the repo, and then type ```npm install``` into the main directory of the project folder. This will install all of the necessary dependencies. 
 - To start the server, make sure you are in the main directory (typing ```ls``` in the terminal should show you ```client``` and ```server```) and then navigate  into the server with the command ```cd server``` and then type ```npm start```. This will start the server locally on your machine on port 5000.
 - Then open another terminal window, navigate to the client folder via ```cd client``` and then type ```npm start```. This will start React locally on your machine on port 3000
 
 
 ## How to use the app
 - Simply type into the text area on the left, and after a randomised delay between 0.5 and 2.5 seconds, you will see the text you have written on the text area on the right (bottom if in mobile view) with '#Tomato' appended on the end of the string. If you write in Spanish, for example, then you will see the word 'Tomato' returned as ```#Tomate```
 - The output will be no more than 280 characters including the '#Tomato', as that is the maximum length of a tweet.
 
 
