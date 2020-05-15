# Hack Reactor: Mini Apps 1 Sprint
This README lists specs completed as specified on GLearn.

---

## Challenge 1: Tic Tac Toe
- [x] __BMR__

<br/>

- [ ] __Advanced Content__
<br/>
- [x] Refactor to use one event handler for all clicks on game board
<br/>
- [ ] Keep track of the winner from the last round and allow the winner (X or O) to make the first move on the next round of gameplay.
<br/>
- [x] Keep a tally of the number of times X vs. O won a game. Refreshing the page should reset the tally.
<br/>
- [ ] Let each player (X vs. O) enter their name. Display this name next to the player's symbol (X vs. O).
<br/>
- [x] If not already done, refactor your app so that all game state is self-contained in one object or module.
<br/>
- [ ] If not already done, refactor all your presentation code so that it lives in one module or object.
<br/>
- [ ] If not already done, refactor all code related to user input so that this code lives in one module or object.
<br/>
- [x] Add a little CSS styling to make your game look more visually presentable.
<br/>
- [ ] If not already done, move your CSS into an external style sheet.
<br/>
- [ ] Add a twist to the game: after each move, rotate the board 90 degrees and apply gravity to the played squares, so they stack against the bottom of the board. Add a UI element to toggle this behavior (on/off) at the start of each game.
<br/>
- [ ] Serve the game and its assets from an express server.

<br/>

- [ ] __Nightmare Mode__
<br/>
- [ ]  Use one more ES6 class for managing state, move it into its own file and instantiate an instance of this class for each round of gameplay.
<br/>
- [ ]  Use one more ES6 class for managing presentation logic, move it into its own file and instantiate an instance of this class for each round of gameplay.
<br/>
- [ ]  Use one more ES6 class for managing user input, move it into its own file and instantiate an instance of this class for each round of gameplay.
<br/>
- [ ]  Refactor your app to not use any global variables, except for the classes created in the previous steps.
<br/>
- [ ]  Refactor your app to not make use of any closure variables. All functions should be pure functions, meaning all their dependencies are supplied as inputs.
<br/>
- [x] If you used a table for your game board, refactor to use divs instead. CSS will be necessary to align your elements correctly. If not already done so, refactor to use flex-box layout management.
<br/>
- [ ] Refreshing or reloading the page should not reset the scoring tally. Add a button to explicitly reset the tally.
<br/>
- [ ] Move the Game Logic to the server and build an API to power the UI.
<br/>
- [ ] Turn this game into an [SOS game](https://en.wikipedia.org/wiki/SOS_(game))

---

### Challenge 2: CSV Report Generator
- [x] __BMR__

<br/>

- [ ] __Advanced Content__
<br/>
- [ ] Add a field to the CSV report that contains a unique identifier (an auto-incrementing integer is fine) for each row of the CSV report.
<br/>
- [ ] Add another field to the CSV report that specifies the ID of the parent record. For top-level objects in the JSON, this field will be empty. For any child objects in the JSON hierarchy, this field will refer to the unique identifier in the prior step.
<br/>
- [ ] Add a form field that allows the user to enter a string, which, when present will filter (remove from the CSV report) any records that contain that string.
<br/>
- [ ] Adjust the generation of unique identifiers such that they remain consecutive (no gaps) even after filtering. Ensure that ID references from the child rows to their respective parents are still correct. If a record is filtered that has children, then all children should also be removed.
<br/>
- [ ] Allow some fields to be optional; i.e. some items in the JSON data might have fewer attributes. Collate attributes across all items you encounter and where missing, leave those fields blank in final CSV report.
<br/>
- [ ] Allow the children property to be optional. When omitted it means there are no children.
<br/>
- [x] Format the CSV report that is received from the server and make it look more readable. (_Interpreted as: add newlines_)
<br/>
- [x] If not already done, reset the form after each submission but leave the last CSV report on the page.
<br/>
- [x] Allow the user to submit the JSON data using either a file picker/upload or textarea and use AJAX to serialize the form and submit the data to the server.
<br/>
- [x] Refactor to using fetch instead of AJAX (fetch is the modern approach to server communication).

<br/>

- [ ] __Nightmare Mode__
<br/>
- [ ] Store each conversion in a database (suggestion: MongoDB)
<br/>
- [ ] Create a page that shows historical conversions and page that lets you view any single conversion. Render all pages using server-side rendering techniques. Be sure to include some navigation. (___Half done, historical conversions on main page___)
<br/>
- [ ] Refactor to use ES6 classes on the server and client. Transpile using babel. Add a build script to your package.json (___Half done, ES6 on client___)
<br/>
- [ ] Add support for drag and drop of JSON files

---

### Challenge 3: Multistep Checkout Experience
- [ ] __BMR__

<br/>

- [ ] __Advanced Content__
<br/>
- [ ] Don't allow the user to proceed until all the required fields are filled in. Address line 2 should be optional. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.
<br/>
- [ ] Validate the form fields. Don't allow the user to proceed to the next step and do not save the data until the fields are valid. Validation means that you must prevent the user from entering haha as the email address -- the email address have a valid data-shape. You'll have to decide which fields deserve validation and which do not. Be sure to display appropriate error messages to the user, so they know why they are not allowed to proceed.
<br/>
- [ ] If the window is closed and reopened, the checkout process should continue at the same step the user was on when the window was closed (it's ok if the fields on the "current" step are blank when the window is reopened). The app should continue to put the remaining data into the same record it was using before the window was closed. Once Purchase is clicked, it should not be possible to continue.
<br/>
- [ ] Allow the user to move back and forward through the checkout process.
<br/>
- [ ] When the user reaches the confirmation page, let the user edit any prior step. After editing fields in that step, the user should be returned to the confirmation page.
<br/>
- [ ] Write tests and use Nightwatch.js to confirm your entire checkout flow is working correctly.

<br/>

- [ ] __Nightmare Mode__
<br/>
- [ ] Refactor to use Redux to store your state.
<br/>
- [ ] If the window is closed and reopened, restore the form field values that were present when the user closed the window.
<br/>
- [ ] Integrate with Google Maps API, adding an address search to verify the ship to address.
<br/>
- [ ] Test your app (either by hand or via automated tests) using different browsers. Fix any issues that arise.

---

### Challenge 4: Connect Four
- [ ] __BMR__

<br/>

- [ ] __Advanced Content__
<br/>
- [ ] Add some routes to your server to save the result of each game.
<br/>
- [ ] Add a database using MongoDB, MySQL, or Postgres to store your scores so they are not lost when the server restarts (such as reloading by nodemon). You must use a different database technology than you used in Challenge 3.
<br/>
- [ ] Add a scoreboard page that fetches the last 30 game results from the server.
<br/>
- [ ] Add a button to restart the game.
<br/>
- [ ] Keep track of the winner from the last round and allow the winner (Red or Black) to make the first move on the next round of gameplay.
<br/>
- [ ] Keep a tally of the number of times Red vs. Black won a game. Refreshing the page should reset the tally.
<br/>
- [ ] Let each player (Red vs. Black) enter their name. Display this name next to the player's symbol (Red vs. Black). Save the user's name along with the game results to the server.
<br/>
- [ ] If not already done, refactor your app so that all game state is self-contained in one object or module. It is ok for this module to live in the same app.js file as the rest of your code. This will simplify your testing. Add more tests if needed.
<br/>
- [ ] If not done, apply CSS styling to make your game look more realistic. Use an external style sheet.

<br/>

- [ ] __Nightmare Mode__
<br/>
- [ ] Add a twist to the game: after each move, rotate the board 90 degrees and apply gravity to the played squares, so they stack against the bottom of the board. Add a UI element to toggle this behavior (on/off) at the start of each game.
<br/>
- [ ] Manage all your game state using a Flux pattern such as Redux.
<br/>
- [ ] If you used a table for your game board, refactor to use divs instead. CSS will be necessary to align your elements correctly. If not already done so, refactor to use flex-box layout management.
<br/>
- [ ] Refreshing or reloading the page should not reset the scoring tally. Add a button to explicitly reset the tally.
<br/>
- [ ] Add pagination to your scoreboard.
<br/>
- [ ] Deploy your app to Heroku.

---

### Challenge 5: Checkers
- [ ] __BMR__

<br/>

- [ ] __Advanced Content__
<br/>
- [ ] Allow players to be kinged and jump backwards too.
<br/>
- [ ] Add support for multiple consecutive jumps in either direction.
<br/>
- [ ] Implement all the nuanced rules for deciding on a winner or tie.
<br/>
- [ ] Add more Mocha and write tests to verify your rules are correct.
<br/>
- [ ] Separate your React components into their own files and configure webpack-dev to load those components into your client.
<br/>
- [ ] If not already done, use flex-box styling.

<br/>

- [ ] __Nightmare Mode__
<br/>
- [ ] Make a single player version of the game, where you play against the computer.

---

### Challenge 6: Battleship
- [ ] __BMR + Advanced + NM__
<br/>
- [ ] Build the UI using ReactJS
<br/>
- [ ] Serve the app from an Express server
<br/>
- [ ] Keep user's high scores in a database and have a leaderboard
<br/>
- [ ] Implement the game logic (for any single game) in the React client
<br/>
- [ ] Implement the overall game management logic on the server
<br/>
- [ ] Track progress on a game and allow it to be restarted later
<br/>
- [ ] Use ES6 and deliver everything to the front-end using Webpack
<br/>
- [ ] Deploy to Heroku (use Webpack-dev for development and Webpack for your Heroku deployment)
<br/>
- [ ] BONUS: support multiple simultaneous gameplays