# Project Reflection

## Problem 1
### Creating my own custom typing thing that displays what you're currently typing as well as your response when you press enter:
- When typing the letters you type would not stay on screen, they would also be typed multiple times per press instead of just once causing one tap of a to appear as "aaaaaaaaaaaaa" for about a frame before disappearing. This was solved by creating a for loop and array that would store the letters you type inside an array and use a for loop to display them; causing all the letters to be constantly displayed, but this still left the problem of the multiple letters per press. That particular problem was solved by using keyPress and keyIsPressed = false. By using this when you tap the key you want to type it only push the code out once before being unable to interate again due to keyIsPressed = false. 
- the next problem concerning this was making the questions appear in order as well as your answers being written on screen and saved if you were to tab out and tab back in (due to my game requiring fullscreen to function). Whilst displaying the questions they would all appear at the same time which wasn't good because the user wouldn't know which question they were currently answering. To solve this i made a variable that determined which question we are currently on, and every question afterwards were filled in white instead of black so they were not shown to the user. Typing also utilised this feature, whe nyou're typing the letters appear below every question, but only are filled in black under the one you are currently on. To solve the answers being saved and used later on in the game i used maps to first display the question then replace that question with your answer so your answer would be displayed instead. This would also save your answer in the map and therefore could be used later on the in game.
- Too many questions would result in the questions going past the bottom of the screen. This is also the reason I needed to use maps because to solve this I used a page system that would display a new page of questions if you were to finish answering the last one on the previous page. in doing so i was able to map the questions to each page and their position in the page, making displaying questions in specific positions very easy.

## Problem 2
### Integrating the nieghbour game I created into this version of the game as a minigame.
This wasn't as difficult but i learnt a lesson that functions can only be called to in the function they are defined in and therefore a draw function cannot be called twice. This required me to create the functions of the neighbour game inside the original sketch.js which i disliked due to it looking bad and slightly affecting readability, but it is what it is.

## What advice would you give to yourself if you were to start a project like this again?
Work on it whenever you can. Although I completed my "needs to have" list and comepletely finished my short puzzle game, there are a lot of aesthetics and little details i could've added if i had worked on it more. Doing so would make me very happy as it would look very cool. Other than that not much else i would say. I worked through my problems and was able to solve every single one of them with little bugs that at least i know of. There are things such as a type limit with Infogame that i could've created. But it's those small things i would want to improve on.

What was the hardest part of the project?

Were there any problems you could not solve?
