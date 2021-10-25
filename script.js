// Rock = 1, Paper = 2, Scissors = 3

// Declare consts for messages
const youWonMessage = "\n=== Y O U   W O N ! ===\n Congratulations, go grab a beer!"
const youLostMessage = "\n=== Y O U   L O S T ! ===\n Poor you, go cry in the corner..."
const youAreTiedMessage = "\n=== I T ' S   A   T I E ! ===\n Not bad, not bad..."

let playerResult = 0
let computerResult = 0

game()
console.log("Refresh the page to try again.")

// FUNCTIONS //

function game() {
    for (let i = 1; i <= 5; ++i) {
        const playerSelection = normalizeInput(prompt("What do you choose? Rock, Paper or Scissors?"))
        const computerSelection = computerPlay()

        console.log(`R O U N D   ${i}`)
        console.log(playRound(playerSelection, computerSelection))
        console.log("--------------------------")
    }

    console.log("--------------------------")
    console.log(score())
}

// Display overall winner
function score() {
    let scoreTable = (`Y O U\t\tCOMPUTER\n  ${playerResult}\t\t   ${computerResult}\n`)
    if (playerResult === computerResult) {
        return scoreTable + youAreTiedMessage
    }
    else if (playerResult > computerResult) {
        return scoreTable + youWonMessage
    }
    else {
        return scoreTable + youLostMessage
    }
}


// Computer Play. Returns a random number 1 - 3
function computerPlay() {
    return Math.floor(Math.random() * 3 + 1) // Random number between 1 and 3
}

// Verify input. 
// If valid input -> compare with computer and display result.
// If bad input message.
function playRound(playerSelection, computerSelection) {
    // Input safety check

    if (isValidSelection(playerSelection)) {
        playerSelection = wordToInt(playerSelection)
        console.log(`Computer chose ${intToWord(computerSelection)}`)
        console.log(`You chose ${intToWord(playerSelection)}`)

        if (isTie(playerSelection, computerSelection)) {
            playerResult++
            computerResult++
            return (`You are tied! ${intToWord(playerSelection)} matches ${intToWord(computerSelection)}.`)
        }
        else if (playerWins(playerSelection, computerSelection)) {
            playerResult += 2
            return `You win! ${intToWord(playerSelection)} beats ${intToWord(computerSelection)}.`
        }
        else {
            computerResult += 2
            return `You lose! ${intToWord(computerSelection)} beats ${intToWord(playerSelection)}.`
        }
    }
    else {
        return ("I didn't understand that =/")
    }
}

// Convert word to integer
function wordToInt(string) {
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

// Convert integer to word
function intToWord(number) {
    switch (number) {
        case 1:
            return "Rock"
            break
        case 2:
            return "Paper"
            break
        case 3:
            return "Scissors"
            break
        default:
            return null // something went wrong
    }
}

// Normalize player input (convert to lowercase and remove spaces)
function normalizeInput(string) {
    if (string !== null)
        return string.replace(/\s+/g, '').toLowerCase()
}

// Verify user input and return bool
function isValidSelection(string) {
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

// Return true if it's a tied score
function isTie(playerSelection, computerSelection) {
    return playerSelection === computerSelection
}

// Return true if player wins
function playerWins(playerSelection, computerSelection) {
    if (playerSelection === 1 && computerSelection === 3) {
        return true
    }
    else if (playerSelection === 3 && computerSelection === 1) {
        return false
    }
    else return (playerSelection > computerSelection)
}