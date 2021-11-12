// Rock = 1, Paper = 2, Scissors = 3

// Declare consts for messages
const youWonMessage = "\n=== Y O U   W O N ! ===\n Congratulations, go grab a beer!";
const youLostMessage = "\n=== Y O U   L O S T ! ===\n Poor you, go cry in the corner...";
const youAreTiedMessage = "\n=== I T ' S   A   T I E ! ===\n Not bad, not bad..."

let playerScore = 0;
let computerScore = 0;

randomizeComp();

const buttons = document.querySelectorAll('.playerBtn');
buttons.forEach(playerBtn =>
    playerBtn.addEventListener('click',
        function () { playRound(playerBtn.getAttribute('data-selection'), computerPlay()) }));

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
    showCompSelection(computerSelection);

    buttons.forEach(playerBtn => playerBtn.classList.remove('selected'));
    const button = document.querySelector(`.playerBtn[data-selection="${playerSelection}"]`);
    button.classList.add('selected');


    displayResult(playerSelection, computerSelection);
}

// Show computer selection image
function showCompSelection(computerSelection) {
    let compSelection = document.querySelector('.compSelection');
    compSelection.firstChild.src = `img/${computerSelection}.png`;
    compSelection.style.setProperty('transform', 'scale(0.8)');
    compSelection.style.setProperty('filter', 'brightness(50%)');
    setTimeout(function () {
        compSelection.style.setProperty('filter', 'brightness(100%)');
        compSelection.style.setProperty('transform', 'scale(1.15)');
    },
        100);
}

// Display result text
function displayResult(playerSelection, computerSelection) {
    const scoreText = document.querySelector('#roundScore');

    if (isTie(playerSelection, computerSelection)) {
        playerScore++;
        computerScore++;
        let verb = playerSelection === 'scissors' ? 'match' : 'matches'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(playerSelection)} ${verb} ${computerSelection}.\nYou are tied!`;
        scoreText.style.setProperty('color', 'indigo');
    }
    else if (playerWins(playerSelection, computerSelection)) {
        playerScore += 2;
        let verb = (playerSelection === 'scissors') ? 'beat' : 'beats'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(playerSelection)} ${verb} ${computerSelection}.\nYou win!`;
        scoreText.style.setProperty('color', 'lawngreen');
    }
    else {
        computerScore += 2;
        let verb = (computerSelection === 'scissors') ? 'beat' : 'beats'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(computerSelection)} ${verb} ${playerSelection}.\nYou lose!`;
        scoreText.style.setProperty('color', 'orangered');
    }

    scoreText.classList.add('roundScoreAnimation');
    setTimeout(function () { scoreText.classList.remove('roundScoreAnimation'); }, 200)

    document.querySelector('.computerScore').innerText = computerScore + 'p';
    document.querySelector('.playerScore').innerText = playerScore + 'p';
}

// Capitalize first letter
function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
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

// Randomize images 
function randomizeComp() {
    const images = document.querySelectorAll('.randomImg');
    setInterval(function () { images.forEach(randomImg => randomImg.src = `img/${computerPlay()}.png`) }, 300);
}