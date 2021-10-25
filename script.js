// Rock = 1, Paper = 2, Scissors = 3

// Declare variables for computer choice, player choice, player input
let botRPS = null
let playerRPS = null
let playerInput = ""

// Declare consts for messages
const promptMessage = "The Bot already made up its mind. What do you choose? Rock, Paper or Scissors?"
const youWonMessage = "Y O U   W O N ! \n Congratulations, go grab a beer!"
const youLostMessage = "Y O U   L O S T ! \n Go cry in the corner..."
const youTied = "I T ' S   A   T I E ! \n Not bad, not bad..."

// Store random choice in var
botRPS = randomRPS()

// Ask user for input and store that in variable
playerInput = prompt(promptMessage) 
// Safety check
if (playerInput !== null) {
    playerInput = normalizeInput(playerInput)
}

// Verify input. 
// If valid input -> compare with computer and display result.
// If bad input message.
if (isValidRPS(playerInput)) {
    playerRPS = rpsToInt(playerInput)
    console.log(`Bot chose ${intToRPS(botRPS)}`)
    console.log(`You chose ${playerInput}`)
    if (isTie()) {
        console.log(youTied)
    }
    else if (playerWins()) {
        console.log(youWonMessage)
    }
    else {
        console.log(youLostMessage)
    }
}
else {
    console.log("I didn't understand that =/")
}

console.log("Refresh the page to try again.")

// FUNCTIONS //

// Returns a random number 1 - 3
function randomRPS () {
    return Math.floor(Math.random() * 3 + 1) // Random number between 1 and 3
}

// Convert player input to integer
function rpsToInt (string) {
    switch (string) {
        case "rock": 
            return 1
            break
        case "paper":
            return 2
            break
        case "scissors":
            return 3
            break
        default: 
            return null // something went wrong
    }
}

function intToRPS (number) {
    switch (number) {
        case 1: 
            return "rock"
            break
        case 2:
            return "paper"
            break
        case 3:
            return "scissors"
            break
        default: 
            return null // something went wrong
    }
}

// Normalize player input (convert to lowercase and remove spaces)
function normalizeInput (string) {
    return string.replace(/\s+/g, '').toLowerCase()
}

// Verify user input and return bool
function isValidRPS (string) {
    switch (string) {
        case "rock":
        case "paper":
        case "scissors":
            return true
            break
        default: 
            return false
    }
}

// Return true if it's a tied score (use the global variables, kinda shit)
function isTie () {
    return playerRPS === botRPS
}

// Return true if player wins (use grobal variables, kinda shit)
function playerWins () {
    if (playerRPS === 3 && botRPS === 1) {
        return true
    }
    else if (playerRPS === 1 && botRPS === 3) {
        return false
    }
    else return (playerRPS > botRPS)
}