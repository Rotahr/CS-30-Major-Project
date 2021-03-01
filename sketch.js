// Major Project
// Samein Dorazahi
// 28/02/21
//
// Extra for Experts:
// fully finished puzzle game working completely as intended. 
// Custom images, typing feature, and minigames that result in a code for you to complete the game. 
// Small but I still worked hard with the limited amount of time given to create a short, sweet, yet challenging puzzle game. 
// Smaller little hints are hidden around to help you solve the puzzles.

// State variables
let gameState = "veri";
let gameStated;
let tab = "browser1";
let answered;
// Adding timers using millis()
let waitTime = 1000;
let timer = 0;
// Questions it asks you in infoGame()
let savedInfo = new Map();
savedInfo.set(0, "What is your name?");
savedInfo.set(1, "How old are you?");
savedInfo.set(2, "What color is your hair?");
savedInfo.set(3, "What is your favorite color");
savedInfo.set(4, "What do you for a living?");
savedInfo.set(10, "What do you eat for breakfast?");
savedInfo.set(11, "How tall are you?");
savedInfo.set(12, "Do you have a hobby? If so, what is it?");
savedInfo.set(13, "Wh1t is the color of your car?");
savedInfo.set(14, "Cats or 4ogs?");
savedInfo.set(20, "Beaches or Snow?");
savedInfo.set(21, "Coffee or Tea?");
savedInfo.set(22, "What is your most valuable item at home?");
savedInfo.set(23, "Where do you live?");
savedInfo.set(24, "What is your cars li3ense plate number?");
savedInfo.set(30, "What are your work hours?");
savedInfo.set(31, "Do you keep your doors locked?");
savedInfo.set(32, "Do you have any pets at home?");
savedInfo.set(33, "Do you own any firearms?");
savedInfo.set(34, "What's your social security number?");
let numberOfQuestionsAsked = 1;
let numberOfQuestionsAnswered = 0;
let answer = "";
// words you type within infogame
let letters = [];
let page = 0;
let amountOfPages = Math.ceil(savedInfo.size / 5);
let amountOfQuestionPerPage = 5;
let numberOfQuestionsAnsweredTotal = 0;
// preload browsers and other images
let browserStart, neighbour, wordPuzzle, AIbrowser, wordBelow, robot, browser1, browser2, browser3, browser4, Xbutton;
function preload() {
  browserStart = loadImage("assets/Browser Start.PNG");
  neighbour = loadImage("assets/Neigh.PNG");
  wordPuzzle = loadImage("assets/Words.PNG");
  wordBelow = loadImage("assets/WordPuzzle.PNG");
  AIbrowser = loadImage("assets/AIBrowser.PNG");
  robot = loadImage("assets/robot.PNG");
}
// neighbour game setup
let state = "not moving";
// used for both hardcoded and generated grids to count which grid you are currently on
let gridNumber = 0;
// hardcoded grids, must uncomment specific code for it to work
let holdingGrid = [[[0,1,0],[0,0,0],[0,1,0]], [[0,0,1],[1,0,0],[0,0,1]], [[0,1,1],[1,0,0],[0,1,1]]]; 
let grid = [];
let gridToWin = [];
let rows, cols, cellWidth, cellHeight, rectX, rectY, rectXC, rectYC;
// AIbrowser setup
let guess;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // neighbour game setup
  rows = floor(gridNumber/2) + 3;
  cols = floor(gridNumber/2) + 3;
  grid = createRandomGrid(rows, cols);
  gridToWin = createWinningGrid(rows, cols);
  cellWidth = width / 2 / cols;
  cellHeight = height / 2 / rows;
  rectX = width / 4; 
  rectY = height / 2.75;
}

function draw() {
  // Sets up for future text
  textAlign(LEFT);
  // Timer for each second, useful for each function
  if (millis() > waitTime) {
    timer += 1;
    waitTime += 1000;
  }
  // Fullscreen Verification Ongoing
  if (!window.screenTop && !window.screenY && gameState !== "veri" && gameState !== "no") {
    gameStated = gameState;
    gameState = "no";
  }
  if (gameState === "no") {
    youLeft();
  }
  // Fullscreen Verification State
  if (gameState === "veri") {
    fsVerification();
  }
  // title screen
  else if (gameState === "title") {
    titleScreen();
  }
  // Info Game
  else if (gameState === "info") {
    infoGame();
  }
  // browser settings
  else if (gameState === "browser") {
    browser();
  }

  // neighbour game draw
  if (tab === "browser2") {
    background("white");
    image(neighbour, 0, 0, width, height);
    // score and level text
    fill("black");
    textSize(37);
    textAlign(LEFT);
    text("Score: " + gridNumber, width / 20, height / 2);
    // reads state of grid
    if (state === "moving") {
      moveGrid();
    }
    else if (state === "not moving") {
      displayGrid();
    }
    // eslint-disable-next-line no-undef
    let resetButton = new Clickable();
    resetButton.x = width - width/5;
    resetButton.y = height / 2;
    resetButton.width = width/7;
    resetButton.height = 100;
    resetButton.color = "white"; //Background color of the clickable (hex number as a string)
    resetButton.stroke = "black"; //Border color of the clickable (hex number as a string)
    resetButton.text = "Reset"; //Text of the clickable (string)
    resetButton.textColor = "black"; //Color of the text (hex number as a string)
    resetButton.textSize = 50; //Size of the text (integer)
    resetButton.onPress = function() {
      gridNumber = 0;
      rows = floor(gridNumber/2) + 3;
      cols = floor(gridNumber/2) + 3;
      cellWidth = width / 2 / cols;
      cellHeight = height / 2 / rows;
      gridToWin = createWinningGrid(rows, cols);
      grid = createRandomGrid(rows, cols);
      state = "moving";
    };
    resetButton.draw();
  }
}

// If they exit Fullscreen
function youLeft() {
  if (!window.screenTop && !window.screenY) {
    timer = 0;
    fill("black");
    background("white");
    textSize(70);
    textAlign(CENTER);
    text("hey don't do that, go back", width / 2, height / 2);
  }
  // After they re-enter fullscreen
  else if (window.screenTop && window.screenY) {
    background("white");
    textAlign(CENTER);
    text("thanks, sending you back now.", width / 2, height / 2);
    if (timer === 3) {
      timer = 0; //Might need to change this based off text game
      gameState = gameStated;
    }
  }
}

// Tells the player to enter fullscreen
function fsVerification() {
  // Text that pops up at the beginning of the game
  fill("black");
  textAlign(LEFT);
  if (timer === 1) {
    textSize(100);
    text("Hey!", width / 2 - 100, height / 2 - 200);
  }
  if (timer === 2) {
    textSize(50);
    text("It seems like you chose to play my game!", 30, height / 2 - 150, width, height / 2 - 100);
  }
  if (timer === 4) {
    textSize(25);
    text("I'm very grateful.", width / 2 - 100, height / 2 - 50);
  }
  if (timer === 5) {
    textSize(50);
    text("But, to get this game to work, I'm gonna have to get you to go into fullscreen", 30, height / 2 - 25, width, height / 2 - 100);
  }
  if (timer === 8) {
    textSize(50);
    text("so... if you could press that f11 button I would be very happy", 30, height / 2 + 200);
  }
  if (timer === 10) {
    textSize(30);
    text("you might need to click on the game first", 30, height / 2 + 300);
  }
  //Fullscreen Verification
  if (keyIsDown(122)) {
    background("white");
    textSize(100);
    textAlign(CENTER);
    text("Thank you!", width / 2, height / 2 - 100);
    text("let us begin.", width / 2, height / 2);
    timer = -100;
  }
  // Send you to the title screen
  if (timer === -97) {
    timer = 0;
    createCanvas(displayWidth, displayHeight);
    gameState = "title";
  }
}

// the title screen
function titleScreen() {
  let timer;
  background("black");
  //Title
  textAlign(CENTER);
  fill("white");
  textSize(100);
  textStyle(ITALIC);
  text("Information Presenter!", width / 2, height / 2 - 275);
  //Subtitle
  textSize(width / 50);
  text("share your information and have it presented on screen!", width / 2, height / 2 - 175);
  //The play button
  // eslint-disable-next-line no-undef
  let playButton = new Clickable();
  playButton.x = (width - 750) / 2;
  playButton.y = (height + 200) / 2;
  playButton.width = 750;
  playButton.height = 100;
  playButton.color = "black"; //Background color of the clickable (hex number as a string)
  playButton.stroke = "white"; //Border color of the clickable (hex number as a string)
  playButton.text = "Insert Information!"; //Text of the clickable (string)
  playButton.textColor = "white"; //Color of the text (hex number as a string)
  playButton.textSize = 70; //Size of the text (integer)
  playButton.draw();
  //Hidden Text whilst Hovering the Button
  playButton.onHover = function() {
    textSize(width / 60);
    text("you can trust me :)", width / 2, height / 2 - 100);
    timer = millis();
    if (millis() > timer) {
      fill("red");
      text("You have so much information, don't you?", width / 2, height / 2);
    }
    //changes the color of the button when hovering
    playButton.x = (width - 750) / 2;
    playButton.y = (height + 200) / 2;
    playButton.width = 750;
    playButton.height = 100;
    playButton.color = "white"; //Background color of the clickable (hex number as a string)
    playButton.stroke = "black"; //Border color of the clickable (hex number as a string)
    playButton.text = "Insert Information!"; //Text of the clickable (string)
    playButton.textColor = "black"; //Color of the text (hex number as a string)
    playButton.textSize = 70; //Size of the text (integer)
    playButton.draw();
  };
  // Changing game state when clicked
  playButton.onPress = function() {
    background("red");
    fill("black");
    text("thank you", width / 2, height / 2);
    gameState = "info";
    timer = 0;
  };
}

// Fake game asking the player for information about themselves
function infoGame() {
  // sets up answered
  if (answered === undefined) {
    answered = 1;
    background("white");
    textSize(50);
  }
  // first page of text
  if (answered === 1 && timer < 3) {
    textAlign(CENTER);
    background("white");
    text("Welcome to the Information Presenter!", width / 2, height / 2);
  }
  // second page
  else if (answered === 1) {
    textAlign(CENTER);
    background("white");
    textSize(50);
    text("I'm going to be asking you a few questions", width / 2, height / 2 - 200);
    text("and your answers will appear on screen!", width / 2, height / 2 - 100 );
    textSize(20);
    text("type \"nah\" if you do not want to answer a question" , width / 2, height / 2);
    textSize(50);
    // eslint-disable-next-line no-undef
    let infoButton = new Clickable();
    infoButton.x = (width - 750) / 2;
    infoButton.y = (height + 200) / 2;
    infoButton.width = 750;
    infoButton.height = 100;
    infoButton.color = "white"; //Background color of the clickable (hex number as a string)
    infoButton.stroke = "black"; //Border color of the clickable (hex number as a string)
    infoButton.text = "Ready?"; //Text of the clickable (string)
    infoButton.textColor = "black"; //Color of the text (hex number as a string)
    infoButton.textSize = 70; //Size of the text (integer)
    infoButton.draw();
    // when hovering the button
    infoButton.onHover = function() {
      infoButton.x = (width - 750) / 2;
      infoButton.y = (height + 200) / 2;
      infoButton.width = 750;
      infoButton.height = 100;
      infoButton.color = "black"; //Background color of the clickable (hex number as a string)
      infoButton.stroke = "white"; //Border color of the clickable (hex number as a string)
      infoButton.text = "Ready?"; //Text of the clickable (string)
      infoButton.textColor = "white"; //Color of the text (hex number as a string)
      infoButton.textSize = 70; //Size of the text (integer)
      infoButton.draw();
    };
    infoButton.onPress = function() {
      // switches to asking questions
      background("white");
      timer = 0;
      answered = 2;
    };
  }
  // asking and answering questions
  else if (answered === 2) {
    textAlign(CENTER);
    background("white");
    for (let i = 0; i < amountOfQuestionPerPage; i++) {
      numberOfQuestionsAsked = i + 1;
      // checks which questions are shown
      if (i > numberOfQuestionsAnswered) {
        fill("white");
      }
      else {
        fill("black");
      }
      // the question that is shown
      text(savedInfo.get(page * 10 + i), width/2, numberOfQuestionsAsked * height / 6 - height / 10);
      if (keyIsPressed) {
        // if you press enter
        if (keyCode === 13) {
          for(let i = 0; i < letters.length; i++) {
            answer += letters[i];
          }
          savedInfo.set(page * 10 + numberOfQuestionsAnswered, answer);
          letters = [];
          numberOfQuestionsAnswered++;
          numberOfQuestionsAnsweredTotal++;
          if (answer === "nah") {
            numberOfQuestionsAnsweredTotal = savedInfo.size;
          }
          timer = 0;
          answer = "";
        }
        // if you press backspace
        else if (keyCode === 8) {
          letters.pop();
        }
        // normal typing (ignoring shift)
        else if (key !== "Shift") {
          letters.push(key);
        }
        keyIsPressed = false;
      }
      // checks which letters are shown whilst typing
      if (i === numberOfQuestionsAnswered) {
        fill("black");
      }
      else {
        fill("white");
      }
      for (let i = 0; i < letters.length; i++) {   
        // shows letters you type
        text(letters[i], width/2 + i * width/25 - letters.length * width/52, numberOfQuestionsAsked * height / 6); 
      }
    }
    // checks if there are questions left to answer
    if (numberOfQuestionsAnswered === amountOfQuestionPerPage && page < amountOfPages) {
      page++;
      numberOfQuestionsAnswered = 0;
    }
    // if there are no questions left to answer
    else if (numberOfQuestionsAnsweredTotal === savedInfo.size) {
      background("white");
      textSize(50);
      textAlign(CENTER);
      fill("black");
      text("Welp, that's it!", width/2, height/2 - 100);
      text("Hope you enjoyed my game!", width/2, height/2);
      textSize(20);
      text("goodbye", width/2, height/2 + 100);
      if (timer > 5) {
        gameState = "browser";
        tab = "browser1";
      }
    }
  }   
}

// browser setting
function browser() {
  // sets up button for switching tabs
  // eslint-disable-next-line no-undef
  browser1 = new Clickable();
  browser1.x = 0;
  browser1.y = 0;
  browser1.width = width/6.7;
  browser1.height = height/25;
  browser1.onPress = function() {
    tab = "browser1";
  };
  // eslint-disable-next-line no-undef
  browser2 = new Clickable();
  browser2.x = width/6;
  browser2.y = 0;
  browser2.width = width/7;
  browser2.height = height/25;
  browser2.onPress = function() {
    tab = "browser2";
  };
  // eslint-disable-next-line no-undef
  browser3 = new Clickable();
  browser3.x = width/4 +  width/14;
  browser3.y = 0;
  browser3.width = width/7;
  browser3.height = height/25;
  browser3.onPress = function() {
    tab = "browser3";
  };
  // eslint-disable-next-line no-undef
  browser4 = new Clickable();
  browser4.x = width/2 - width/45;
  browser4.y = 0;
  browser4.width = width/7;
  browser4.height = height/25;
  browser4.onPress = function() {
    tab = "browser4";
  };
  // top right X button button
  // eslint-disable-next-line no-undef
  Xbutton = new Clickable();
  Xbutton.x = width - width/30;
  Xbutton.y = 0;
  Xbutton.width = width/30;
  Xbutton.height = height/25;
  Xbutton.onPress = function() {
    // eslint-disable-next-line no-undef
    let password = prompt("Sorry, I can't let you do that.", "the password contains 4 letters, no capitals. good luck.");
    if (password === "wifi") {
      // eslint-disable-next-line no-undef
      close();
    }
  };
  Xbutton.draw();
  browser1.draw();
  browser2.draw();
  browser3.draw();
  browser4.draw();
  // shows images for each tab
  if (tab === "browser1") {
    image(browserStart, 0, 0, width, height);
    text("abg.NaN.NaN.a:5500", width/11, height/18);
  }
  else if (tab === "browser3") {
    image(wordPuzzle, 0, 0, width, height);
    image(wordBelow, 0, height/4, width, height - height/4);
  }
  else if (tab === "browser4") {
    image(AIbrowser, 0, 0, width, height);
    image(robot, width/4, height/4, width - width/4, height - height/4);
    textAlign(LEFT);
    textSize(37);
    fill("black");
    text("He's thinking of a specific number,", width/30, height/4);
    text("can you guess what it is?", width/30, height/4 + height/15);
    // eslint-disable-next-line no-undef
    let guessButton = new Clickable();
    guessButton.x = width/15;
    guessButton.y = height/2;
    guessButton.width = width/7;
    guessButton.height = 100;
    guessButton.color = "white"; //Background color of the clickable (hex number as a string)
    guessButton.stroke = "black"; //Border color of the clickable (hex number as a string)
    guessButton.text = "Guess"; //Text of the clickable (string)
    guessButton.textColor = "black"; //Color of the text (hex number as a string)
    guessButton.textSize = 50; //Size of the text (integer)
    guessButton.onPress = function() {
      // eslint-disable-next-line no-undef
      guess = prompt("What do you think it is?");
    };
    guessButton.draw();
    textSize(37);
    textAlign(LEFT);
    fill("black");
    // checks if you're close to the answer
    if (guess === "9") {
      text("you got it!", width/15, height/2 + height/5);
    }
    else if (guess < 9) {
      text("too low :(", width/15, height/2 + height/5);
    }
    else if (guess > 9) {
      text("too high :(", width/15, height/2 + height/5);
    }
    else {
      text("Guess!", width/15, height/2 + height/5);
    }
  }
  // texts that is shown on every broswer
  fill("black");
  textAlign(LEFT, TOP);
  textSize(width/127);
  text("Information Presenter!", width/33, height/65.75);
  //top right profile || if they have a short name detecting the 3 spots breaks probably
  if (savedInfo.get(0).length > 3) {
    text(savedInfo.get(0)[0] + savedInfo.get(0)[1] + savedInfo.get(0)[2] + "...", width - width/18, height/17.5);
  }
  else {
    text(savedInfo.get(0) + "...", width - width/18, height/17.5);
  }
}

// everything below is for tab 2 - the neighbour game

// generates the grid you must make
function createWinningGrid(cols, rows) {
  let emptyGrid = [];
  for (let y = 0; y<rows; y++) {
    emptyGrid.push([]);
    for (let x=0; x<cols; x++) {
      emptyGrid[y].push(1);
    }
  }
  return emptyGrid;
}

// generates new grids upon winning
function createRandomGrid(cols, rows) {
  let emptyGrid = [];
  for (let y = 0; y<rows; y++) {
    emptyGrid.push([]);
    for (let x=0; x<cols; x++) {
      emptyGrid[y].push(round(random(0, 1)));
    }
  }
  return emptyGrid;
}

function displayGrid() {
  text("Level: " + (rows - 2), width / 20, height / 2 + 50);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else {
        fill("black");
      }
      rect(x * cellWidth + rectX, y * cellHeight + rectY, cellWidth, cellHeight);
      // checks to grid is all black (if you won) & sets variables to match potential new size of grid
      if (JSON.stringify(grid) === JSON.stringify(gridToWin)) {
        gridNumber++;
        rows = floor(gridNumber/2) + 3;
        cols = floor(gridNumber/2) + 3;
        cellWidth = width / 2 / cols;
        cellHeight = height / 2 / rows;
        gridToWin = createWinningGrid(rows, cols);
        grid = createRandomGrid(rows, cols);
        state = "moving";
      }
    }      
  } 
}

function moveGrid() {
  text("Letter: " + "+" + (23 - (rows - 2)), width / 20, height / 2 + 50);
  // creation and movement of grid looking rectangles
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
        rect(rectX + x * cellWidth + width, rectY + y * cellHeight, cellWidth, cellHeight);
      }
      else if (grid[y][x] === 1) {
        fill("black");
        rect(rectX + x * cellWidth + width, rectY + y * cellHeight, cellWidth, cellHeight);
      }
      fill("black");
      rect(rectX + x * cellWidth, rectY + y * cellHeight, cellWidth, cellHeight);
    }
  }
  // moves grid
  if (frameCount % 1 === 0) {
    rectX -= 6;
  }
  //checks if grid is now in position
  if (rectX < rectXC - width) {
    rectX = rectXC;
    rectY = rectYC;
    state = "not moving";
  }
}

function mousePressed() {
  // determine if the mouse is in the middle 
  let mouseXx = mouseX - rectX;
  let mouseYy = mouseY - rectY;
  let x = Math.floor(mouseXx / cellWidth);
  let y = Math.floor(mouseYy / cellHeight);
  toggleCell(x, y);   //self
  toggleCell(x, y + 1);
  toggleCell(x + 1, y);
  toggleCell(x, y - 1);
  toggleCell(x - 1, y);
  // variables that must be activated only once
  if (state === "not moving") {
    rectXC = rectX;
    rectYC = rectY;
    gridToWin = createWinningGrid(rows, cols);
  }
}

function toggleCell(x, y) {
  //check that the coordinates are in the array
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }
}