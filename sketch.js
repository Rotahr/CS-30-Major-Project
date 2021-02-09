// State variable
let gameState = "veri";
let gameStated;

let answered;



// Adding timers using millis()
let waitTime = 1000;
let timer = 0;



// Questions it asks you in infoGame()
let questions = ["What is your name?", "What is your age?", "What is your hair color?"];
let onScreen = [];
let numberOfQuestionsAsked = 1;

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
  if (gameState === "title") {

    titleScreen();

  }



  // Info Game
  if (gameState === "info") {

    infoGame();

  }
  
  
  // Temporary End Screen
  if (gameState === "end") {
    
    end();
    
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

  if (answered === 1 && timer > 3) {
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

  else if (answered === 1) {
    textAlign(CENTER);
    background("white");
    text("Welcome to the Information Presenter!", width / 2, height / 2);
  }



  // if (numberOfQuestionsAsked === 1 && timer > 2) {

  //   info.base = info.name;

  // }

  // if (numberOfQuestionsAsked === 2 && timer > 2) {

  //   info.base = info.age;
    
  //   gameState = "end";
    
  // }

  if (answered === 2 && numberOfQuestionsAsked < questions.length) {

    for (let i = 0; i < questions.length && timer > 2; i++) {

      // eslint-disable-next-line no-undef
      onScreen[i] = prompt(questions[i]);
      if (onScreen[i] !== null) {
        text(onScreen[i], 20, numberOfQuestionsAsked * 100);
        timer = 0;
        numberOfQuestionsAsked += 1;
      }
      
    }

    // eslint-disable-next-line no-undef
    // info.text = prompt(info.base);

    // if (info.base !== null) {
    //   text(info.text, 20, numberOfQuestionsAsked * 100);
    //   timer = 0;
    //   numberOfQuestionsAsked += 1;
    // }

  }
  
}


// temp end screen
function end() {
  
  background("white");
  textAlign(CENTER);
  text("that's it goodbye", width / 2, height / 2);
  
}