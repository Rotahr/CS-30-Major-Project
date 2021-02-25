// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// State variable
let gameState = "browser";
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
savedInfo.set(2, "What is the color of your hair?");
savedInfo.set(3, "question 4");
savedInfo.set(4, "question 5");
savedInfo.set(10, "question 6");
savedInfo.set(11, "question 7");
savedInfo.set(12, "question 8");
savedInfo.set(13, "question 9");
savedInfo.set(14, "question 10");
savedInfo.set(20, "question 11");
let numberOfQuestionsAsked = 1;
let numberOfQuestionsAnswered = 0;
let answer = "";
// words you type within the program
let letters = [];
let page = 0;
let amountOfPages = Math.ceil(savedInfo.size / 5);
let amountOfQuestionPerPage = 5;
let numberOfQuestionsAnsweredTotal = 0;
// let illegalWords = ["BACKSPACE", DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, OPTION, ALT, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW];

// preload browsers
function preload() {
  browserStart = loadImage("assets/Browser Start.PNG");
  neighbour = loadImage("assets/Neigh.PNG");
  wordPuzzle = loadImage("assets/Words.PNG");
  AIbrowser = loadImage("assets/AIBrowser.PNG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
  // if (!window.screenTop && !window.screenY && gameState !== "veri" && gameState !== "no") {
  //   gameStated = gameState;
  //   gameState = "no";
  // }
  // if (gameState === "no") {
  //   youLeft();
  // }
  // Fullscreen Verification State
  if (gameState === "veri") {
    fsVerification();
  }
  // title screen
  if (gameState === "title") {
    titleScreen();
  }
  // Info Game
  if (gameState === "info") {
    infoGame();
  }
  // browser settings
  if (gameState === "browser") {
    browser();
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
    // After they re-enter fullscreen
  }
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
  if (answered === undefined) {
    answered = 1;
    background("white");
    textSize(50);
  }
  if (answered === 1 && timer < 3) {
    textAlign(CENTER);
    background("white");
    text("Welcome to the Information Presenter!", width / 2, height / 2);
  }
  else if (answered === 1) {
    textAlign(CENTER);
    background("white");
    text("I'm going to be asking you a few questions", width / 2, height / 2 - 200);
    text("and your answers will appear on screen!", width / 2, height / 2 - 100 );
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
      background("white");
      timer = 0;
      answered = 2;
    };
  }
  else if (answered === 2) {
    textAlign(CENTER);
    background("white");
    for (let i = 0; i < amountOfQuestionPerPage; i++) {
      numberOfQuestionsAsked = i + 1;
      if (i > numberOfQuestionsAnswered) {
        fill("white");
      }
      else {
        fill("black");
      }
      text(savedInfo.get(page * 10 + i), width/2, numberOfQuestionsAsked * height / 6 - height / 10); // fixable
      if (keyIsPressed) {
        if (keyCode === 13) {
          for(let i = 0; i < letters.length; i++) {
            answer += letters[i];
          }
          savedInfo.set(page * 10 + numberOfQuestionsAnswered, answer);
          answer = "";
          letters = [];
          numberOfQuestionsAnswered++;
          numberOfQuestionsAnsweredTotal++;
        }
        else {
          letters.push(key);
        }
        keyIsPressed = false;
      }
      if (i === numberOfQuestionsAnswered) {
        fill("black");
      }
      else {
        fill("white");
      }
      for (let i = 0; i < letters.length; i++) {   
        text(letters[i], width/2 + i * width/30 - letters.length * width/84, numberOfQuestionsAsked * height / 6); 
      }
    }
    if (numberOfQuestionsAnswered === amountOfQuestionPerPage && page < amountOfPages) {
      page++;
      numberOfQuestionsAnswered = 0;
    }
    else if (numberOfQuestionsAnsweredTotal === savedInfo.size) {
      gameState = "browser";
      tab = "browser1"
    }
  }   
}

// browser setting
function browser() {
  let browser1 = new Clickable();
  browser1.x = 0;
  browser1.y = 0;
  browser1.width = width/6.7;
  browser1.height = height/25;
  browser1.onPress = function() {
    tab = "browser1"
  }
  let browser2 = new Clickable();
  browser2.x = width/6;
  browser2.y = 0;
  browser2.width = width/7;
  browser2.height = height/25;
  browser2.onPress = function() {
    tab = "browser2"
  }
  let browser3 = new Clickable();
  browser3.x = width/4 +  width/14;
  browser3.y = 0;
  browser3.width = width/7;
  browser3.height = height/25;
  browser3.onPress = function() {
    tab = "browser3"
  }
  let browser4 = new Clickable();
  browser4.x = width/2 - width/45;
  browser4.y = 0;
  browser4.width = width/7;
  browser4.height = height/25;
  browser4.onPress = function() {
    tab = "browser4"
  }
  browser1.draw();
  browser2.draw();
  browser3.draw();
  browser4.draw();
  if (tab === "browser1") {
    image(browserStart, 0, 0, width, height);
  }
  if (tab === "browser2") {
    image(neighbour, 0, 0, width, height);
  }
  if (tab === "browser3") {
    image(wordPuzzle, 0, 0, width, height);
  }
  if (tab === "browser4") {
    image(AIbrowser, 0, 0, width, height);
  }
  // browser 1 requires link
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