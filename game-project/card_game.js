const readlineSync = require("readline-sync");

function getInput(prompt) {
  return readlineSync.question(`${prompt}: `);
}

// YOUR CODE STARTS HERE!!

function buildDeck() {
  let suits = ["spades", "hearts", "clubs", "diamonds"];
  let ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
  let deck = [];

  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      deck.push({ suits: suits[j], ranks: ranks[i], value: i });
    }
  }
  return deck;
}

buildDeck();

function shuffle(deck) {
  let shuffledDeck = deck
  let currentIndex = deck.length -1;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * (currentIndex)); // randomizing the index of all the cards in the deck (ie uo to the nuber 52 (number of cards in the deck));
    temporaryValue = shuffledDeck[currentIndex]; // card value of the card chosen, due to the randomized index that was given in the randomIndex variable above.
    shuffledDeck[currentIndex] = shuffledDeck[randomIndex]; //takes the card index selected from randomized card deck shuffling, and assigns it as the current card that you have. 
    shuffledDeck[randomIndex] = temporaryValue; //gives your chosen card the value of your randonmly selected card, after shuffling. 

    currentIndex --; //dashes mean subtract from currentIndex one index value
  }

  return shuffledDeck;
}
  

  
function greet() {
  let name = getInput("Welcome to the game! What is your name?");
  console.log(name);
  return name;

}

function compare(card1, card2) {
  return card1.value - card2.value;

} 

function guess(card1, card2) {
  console.log(`Current card: ${card1.rank} of ${(card2.suits)}`)
  let input = getInput(`Do you think the next card will be higher or lower than the current card that you have? If higher, answer: H. For lower, answer L.`).toLowerCase();
  //used .toLowerCase to account for any case sensitive discrepencies in user input answer.

  switch (input) {
    case 'h':
      return compare(card1, card2) < 0; 
      //checks if result of comparison is negative
      break;
    case 'l':
      return compare(card1, card2) > 0;
      //checks if result of comparison is positive
      break;
    default:
      console.log('You need to guess either higher (H) or lower (L). For now, you get no points for this round. Please answer higher or lower for the next round.');
  }
}

function playGame() {
  let deck = shuffle(buildDeck()),
    playerName = greet(),
    score = 0,
    currentCard = deck.pop();

  //while loop that states score is less than 5, and less than the amount of items still in the deck
  while (score < 5 && score < deck.length) {
    let nextCard = deck.pop(); //removes the last object and assigns this value to the variable nextCard

    if (guess(currentCard, nextCard) === true) {
      score++; //when the guess is correct (true), the player's score increases by 1
      console.log(`Congratulations, your score is now ${score}!`)
    } else {
      console.log(`Sorry, your answer was wrong and you did not gain any points in this round. Your score stayed the same at ${score}.`)
    }
    currentCard = nextCard;
  }

  // ternary statement for checking if the legth of the deck array has reached zero
  deck.length <= 0 ?
    console.log(`Sorry ${playerName}, you've ran out of cards and lost the game.`) :
    console.log(`Congratulations ${playerName}, you've won the game!`);
}
  
playGame();
