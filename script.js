// Rock = 1, Paper = 2, Scissors = 3

// Declare consts for messages
const youWonMessage = "\n=== Y O U   W O N ! ===\n Congratulations, go grab a beer!";
const youLostMessage = "\n=== Y O U   L O S T ! ===\n Poor you, go cry in the corner...";
const youAreTiedMessage = "\n=== I T ' S   A   T I E ! ===\n Not bad, not bad..."

let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('.playerBtn');
buttons.forEach(playerBtn =>
    playerBtn.addEventListener('click',
        function () { playRound(playerBtn.getAttribute('data-index'), computerPlay()) }));

// console.log("Refresh the page to try again.");

// FUNCTIONS //

function game() {
    const playerSelection = normalizeInput(prompt("What do you choose? Rock, Paper or Scissors?"));
    const computerSelection = computerPlay();

    console.log(`R O U N D   ${i}`);
    console.log(playRound(playerSelection, computerSelection));
    console.log("--------------------------");

    console.log("--------------------------");
    console.log(score());
}

// Play one round
function playRound(playerSelection, computerSelection) {
    console.log(`Computer chose ${computerSelection}`);
    console.log(`You chose ${playerSelection}`);
    const scoreText = document.querySelector('#roundScore');

    if (isTie(playerSelection, computerSelection)) {
        playerScore++;
        computerScore++;
        let verb = playerSelection === 'scissors' ? 'match' : 'matches'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(playerSelection)} ${verb} ${computerSelection}.\nYou are tied!`;
    }
    else if (playerWins(playerSelection, computerSelection)) {
        playerScore += 2;
        let verb = playerSelection === 'scissors' ? 'beat' : 'beats'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(playerSelection)} ${verb} ${computerSelection}.\nYou win!`;
    }
    else {
        computerScore += 2;
        let verb = computerSelection === 'scissors' ? 'beat' : 'beats'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(computerSelection)} ${verb} ${playerSelection}.\nYou lose!`;
    }
    document.querySelector('.computerScore').innerText = computerScore + 'p';
    document.querySelector('.playerScore').innerText = playerScore + 'p';

    // Reset before fade effect
    scoreText.style.display = 'block';
    scoreText.style.opacity = 1;
    setTimeout(function(){ fade(scoreText); }, 1500);
}

// Capitalize first letter
function capitalize (str) {
    return str.slice(0,1).toUpperCase() + str.slice (1);
}

// Computer Play. Returns a random rps word
function computerPlay() {
    switch (Math.floor(Math.random() * 3 + 1)) {
        case 1: 
            return 'rock';
            break;
        case 2:
            return 'paper';
            break;
        case 3:
            return 'scissors';
            break;
        default: return null;
    }; // Random number between 1 and 3 converted to rps word
}

// Return true if it's a tied score
function isTie(playerSelection, computerSelection) {
    return playerSelection === computerSelection;
}

// Return true if player wins
function playerWins(playerSelection, computerSelection) {
    if (playerSelection === 'rock' && computerSelection === 'scissors') {
        return true;
    }
    else if (playerSelection === 'paper' && computerSelection === 'rock') {
        return true;
    }
    else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        return true;
    }
    else return false;
}

// Display overall winner
function score() {
    let scoreTable = (`Y O U\t\tCOMPUTER\n  ${playerScore}\t\t   ${computerScore}\n`);
    if (playerScore === computerScore) {
        return scoreTable + youAreTiedMessage;
    }
    else if (playerScore > computerScore) {
        return scoreTable + youWonMessage;
    }
    else {
        return scoreTable + youLostMessage;
    }
}

// Fade out
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.3){
            clearInterval(timer);
            // element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.01;
    }, 20);
}
