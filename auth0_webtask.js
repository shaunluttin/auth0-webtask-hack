// This webtask is probably live here
// https://wt-f6cb6a37625ca2da5d447cb19f4b4a27-0.run.webtask.io/Auth0ShaunLuttin

var jwtDecode = require("jwt-decode");

module.exports = function(context, cb) {

  var decoded = jwtDecode(context.token);
  var webtaskName = decoded.jtn;
  var message = `The webtask name is ${webtaskName}. `;

  try {

    chosenSuit = extractSuitFromQuery(context.query);
    chosenValue = extractValueFromQuery(context.query);

    var card = {
      suit: chosenSuit || randomFromArray(deck.allSuits),
      value: chosenValue || randomFromArray(deck.allValues),
    };

    message += `You chose the ${card.value} of ${card.suit}. `;

    if (!chosenSuit && !chosenValue) {
      message += `(Note: You can select a suit or a value using 'suit' or 'value' query parameters.)`;
    }

    cb(undefined, message);
  } catch (error) {
    cb(error, undefined);
  }
};

const deck = {
  allSuits: [
    "Spades",
    "Diamonds",
    "Hearts",
    "Clubs",
  ],

  allValues: [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
  ],
};

const findStringInArray = (needle, haystack) => {
  return needle && haystack.find((s) =>
    s.toLowerCase() === needle.toLowerCase());
};

const extractSuitFromQuery = (query) => {
  var inputSuit = query.suit;
  chosenSuit = findStringInArray(inputSuit, deck.allSuits);
  if (inputSuit && !chosenSuit) {
    throw new Error(`Suit query param '${inputSuit}' must be one of ${deck.allSuits.join(", ")}`);
  }

  return chosenSuit;
}

const extractValueFromQuery = (query) => {
  var inputValue = query.value;
  chosenValue = findStringInArray(inputValue, deck.allValues);
  if (inputValue && !chosenValue) {
    throw new Error(`Value query param '${inputValue}' must be one of ${deck.allValues.join(", ")}`);
  }

  return chosenValue;
}

const randomFromArray = (array) => {
  var index = getRandomInt(0, array.length);
  return array[index];
};

// The maximum is exclusive and the minimum is inclusive
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

