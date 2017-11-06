# hangman

Project Documentation:

# NOTE: Make Sure you enter your name and press save in the modal. Otherwise the game will not start.

Technologies Used:

1. Node and Express - I used node and express due to familarity, ease of use and performance. Session Management was done using express-session.
2. JQuery, Bootstrap, D3 - I used these for client side development due to familiarity. I did not use Angular as I am not that well versed in it. D3 was used to make the pie chart showing overall win-loss distribution.
3. MongoDB - Used Mongodb to store the stats related to a particular user.

Implementation:

The Web App consists of 3 Pages namely: Highscore, Gameplay and Rules.

Highscore Page consist of a Highscore table naming 5 top players who have the highest win percentage and a pie-chart showing the win-loss distribution of the game for all users.

Rules Page Consists of rules on how to play the game.

Gameplay page is where you play the game. The game provides you with keys which are from a-z and 0-9. A hint button is also provided which will provide you with the help you may need.

The Business Logic was implemented in Backend. So only responsibilty of client side Javascript is to do AJAX Requests ,DOM Manipluation and draw figures. The Hangman Drawing was done using Canvas and Pie-Chart was made using D3 . A Bootstrap Modal was also used to store the name of the player which is sent to the user as soon as the game is started so that it can be stored in database. The Server Logic is written in Server.js and 2 supporting modules called high-data.js( which helps with highscores) and hangman.js (class definiton of game keeping track of everything happening in the game).

Improvements and future Work:

1. Design of the pages should be improved.
2. In terms of scaling, it is using program memory for session management which is prone to memory leakages when the game gets big and is played more often. This can be improved by using a store like redis or memcache. Also, We can improve scaling by setting up clusters to utilize Multi Core CPUs.
3. There is a dependancy between saving your name in modal box and the game. This can be avoided by setting deafult name if the user doesnt provide so.
4. Better API for questions should be chosen as present one can include special characters. Currently, the API Chosen is good for development phase but bad for deployment phase.
5. Authentication should be added in the game as we are already have access to a database.
6. If the game is to be scaled, the client side javascript should be minified as well as decisions should be made if we want to keep supporting libraries in our server or loading them at run-time.
5.
4.
