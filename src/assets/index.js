/***************************** Global variables ******************************+*/

// get the buttons
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');

// get the start button
const btnSatrt = document.getElementById('start');

// get the sound and the turn
const sound = document.getElementById('sound');
const turnCard = document.getElementById('turn');

// put them in an array
const buttons = [ btn1, btn2, btn3, btn4 ];

// the shadows colors
const shadows = [ '#00C1FF' , '#2EFF7B', '#FF0A27', '#9A63FF' ];

// the light background colors and normal colors
const lightColors = [ '#4bc7f7', '#34ff80', '#ff1631', '#8d5de8' ];
const defaultColors = [ '#00acee', '#25d366', '#bd081c', '#6441a5' ];

/***************************** Private variables ******************************+*/

// function for init the game stats, usign clousres or "private methods and variables"
function initGameState() {
  // the arrays for the secuence numbers and player tags
  let secuence = [];
  let tags = [];
  // the score
  let score = 0;
  // started game, it starts in false
  let startedGame = false;
  // the score card
  const scoreCard = document.getElementById('score-box');

  // return functions to know and set the game state
  return {
    // add to secuence
    addSecuence : function(n) { secuence.push(n); },
    // get the secuence
    getSecuence : function() { return secuence; },
    // reset the secuence
    resetSecuence : function() { secuence = []; },
    // add to tags and get the tags
    addTags : function(n) { tags.push(n); },
    // get the tags
    getTags : function() { return tags; },
    // reset the tags
    resetTags : function() { tags = []; },
    // increase the score
    sumScore : function() { score += 1; scoreCard.innerHTML = score; },
    // reset the score
    resetScore : function() { score = 0; scoreCard.innerHTML = score; },
    // get the score
    getScore : function() { return score; },
    // know if the game is started
    getStartedGame : function() { return startedGame; },
    // set the game to stated
    start : function() { startedGame = true; },
    // set the game to ended or not started
    end : function() { startedGame = false; }
  }
}

// inicialize the game state
let game = initGameState();

/********************************** Secondary functions *******************************/
// secondary functions do not use other functions defined in the scope

// function for press the buttons, btn ~ 1,2,3,4
const pressBtn = (btn) => {
  // select te button
  let target = buttons[btn-1];
  // the shadow color
  let shadow = shadows[btn-1];
  // the light color
  let lightColor = lightColors[btn-1];
  // and the default color
  let defaultColor = defaultColors[btn-1];
  // change the box shadow and background to a light color
  target.style.boxShadow = `0px 0px 20px -1px ${shadow}`;
  target.style.backgroundColor = lightColor;
  // play the press sound
  sound.play();
  // wait and change the shadow and background to default
  setTimeout(() => {
    target.style.boxShadow = 'none';
    target.style.backgroundColor = defaultColor;
  }, 500);
}

// function to set or allow the turn, turn ~ true || false
const setTurn = (turn) => {
  if(turn){
    // the player can play
    turnCard.innerHTML = 'Tuyo';
    // set the text in color green
    turnCard.style.color = '#25d366';
  } else {
    // the player cant play machines turn
    turnCard.innerHTML = 'Máquina';
    // set the text in color red
    turnCard.style.color = '#bd081c';
  }
}

// function for compare arrays
const compareArray = (arr1, arr2) => {
  // if the arrays have diferent sizes
  if(arr1.length !== arr2.length) {
    // send error
    return false;
    // if the arrays have the same size
  } else {
    // compare each array element *in order* for the game
    for(let i = 0; i < arr1.length; i++) {
      // if the i elment is not the same
      if(arr1[i] !== arr2[i]){
        // send error
        return false;
      }
    }
    // if the function ends here, the arrays are the same
    return true;
  }
}

// function for check that the n tag is correct
const checkTag = (number) => {
  // true if the n tag and secuence is the same
  return game.getSecuence()[number] === game.getTags()[number];
}

/********************************** Primary functions *******************************/
// Primary functions use secondary functions, and Private variables

// function for start the game
const startGame = () => {
  // set the game started for allow the player and machine play
  game.start();
  // set the turn to machine
  setTurn(false);
  // let the machine start the game
  playMachine();
}

// function for end the game
const endGame = () => {
  // the game has ended
  game.end();
  // reset the tags and secuence
  game.resetSecuence();
  game.resetTags();
  // nobody has the turn, the game has ended
  turnCard.innerHTML = 'Nadie';
  turnCard.style.color = '#fff';
  // send an alert with the final score
  alert(`Buen intento, tu puntaje fue de ${game.getScore()}`);
  // reset the score
  game.resetScore();
}

// function for let the player play and save the tag
const playerPlay = (btn) => {
  // press the btn
  pressBtn(btn);
  // if the game has started
  if(game.getStartedGame()){
    // add the tag to tags
    game.addTags(btn);
    // if the player has ended the secuence
    if(game.getTags().length == game.getSecuence().length) {
      // if the tags and secuence is correct, the player play correctly
      if(compareArray(game.getTags(), game.getSecuence())) {
        // the player has play correctly, let the machine play, and sum to score
        // is +1 because this if is only for the last tag
        game.sumScore();
        // set a time for performance
        setTimeout(() => {
          // let the machine play to continue
          playMachine();
        }, 500);
      }
      // the player has not play correctly
      else {
        // end the game
        endGame();
      }
    } 
    // the sizes are diferent
    else {
      // verify that the player tag is correct
      let tag = game.getTags().length - 1;
      // if the new tag is incorrect
      if(!checkTag(tag)) {
        // end the game
        endGame();
      }
      // if the tag is correct
      else {
        // sum to score
        game.sumScore();
      }
    }
  }
}

// function for press btns automaticly for the secuence and add numbers to this
const playMachine = () => {
  if(game.getStartedGame()){
    // set the turn of machine
    setTurn(false);
    // get a random number ~ 1,2,3,4
    let newNumber = Math.floor(Math.random() * 4) + 1;
    // add the number to the secuence
    game.addSecuence(newNumber)
    // then the machine will play the new secuence
    for(let i = 1; i <= game.getSecuence().length; i++){
      // press the secuence in diferent times
      setTimeout(() => pressBtn(game.getSecuence()[i-1]), i * 800);
    }
    // let the player play, the time number is:
    // for the interval ends before the press of the secuence
    setTimeout(() => setTurn(true), game.getSecuence().length * 1000);
    // reset the player tags to continue
    game.resetTags();
  }  
}

/**** THE GAME START AT ****/
btnSatrt.onclick = () => {
  startGame();
}