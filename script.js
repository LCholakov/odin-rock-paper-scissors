// Rock = 1, Paper = 2, Scissors = 3

// Declare consts for messages
const youWonMessage = "=== YOU WIN! ===\nCongratulations, you're the master of luck!";
const youLostMessage = "=== YOU LOSE! ===\nTime for revenge!";
const youAreTiedMessage = "=== IT'S A TIE! ===\nNot bad, not bad at all."

let playerScore = 0;
let computerScore = 0;
let comboWinMultiplier = 1;
let previousWinner = -1; // -1 = no winner, 0 = computer, 1 = human

let finalScore = 5000;

randomizeComp();

const buttons = document.querySelectorAll('.playerBtn');
buttons.forEach(playerBtn =>
    playerBtn.addEventListener('click',
        function () { playRound(playerBtn.getAttribute('data-selection'), computerPlay()) }));

// console.log("Refresh the page to try again.");

// FUNCTIONS //

// Play one round
function playRound(playerSelection, computerSelection) {
    showCompSelection(computerSelection);

    buttons.forEach(playerBtn => playerBtn.classList.remove('selected'));
    const button = document.querySelector(`.playerBtn[data-selection="${playerSelection}"]`);
    button.classList.add('selected');


    displayRoundScore(playerSelection, computerSelection);


    checkEndGame();
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

// One round score text - display, color, animate
function displayRoundScore(playerSelection, computerSelection) {
    const scoreText = document.querySelector('.roundScore');
    const computerPoints = document.querySelector('.computerScore');
    const playerPoints = document.querySelector('.playerScore');

    if (isTie(playerSelection, computerSelection)) {
        resetCombo();

        playerScore += 100;
        computerScore += 100;
        let verb = playerSelection === 'scissors' ? 'match' : 'matches'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(playerSelection)} ${verb} ${computerSelection}.\nYou are tied!`;
        scoreText.style.setProperty('color', 'indigo');

        computerPoints.classList.add('pointsAnimation');
        setTimeout(function () { computerPoints.classList.remove('pointsAnimation'); }, 200);
        playerPoints.classList.add('pointsAnimation');
        setTimeout(function () { playerPoints.classList.remove('pointsAnimation'); }, 200);
    }
    else if (playerWins(playerSelection, computerSelection)) {
        showHumanCombo();

        playerScore += 200 * comboWinMultiplier;
        let verb = (playerSelection === 'scissors') ? 'beat' : 'beats'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(playerSelection)} ${verb} ${computerSelection}.\nYou score!`;
        scoreText.style.setProperty('color', 'aqua');
        playerPoints.classList.add('pointsAnimation');
        playerPoints.style.setProperty('color', 'aqua');
        setTimeout(function () { playerPoints.classList.remove('pointsAnimation'); 
                                    playerPoints.style.setProperty('color', 'black'); }, 
                                    200);
        previousWinner = 1;
    }
    else {
        showComputerCombo();
        computerScore += 200 * comboWinMultiplier;
        let verb = (computerSelection === 'scissors') ? 'beat' : 'beats'; // This is an ugly hack for plural
        scoreText.innerText = `${capitalize(computerSelection)} ${verb} ${playerSelection}.\nComputer scores!`;
        scoreText.style.setProperty('color', 'red');
        computerPoints.classList.add('pointsAnimation');
        computerPoints.style.setProperty('color', 'aqua');
        setTimeout(function () { computerPoints.classList.remove('pointsAnimation'); 
                                    computerPoints.style.setProperty('color', 'black');}, 
                                    200);
    }

    scoreText.classList.add('roundScoreAnimation');
    setTimeout(function () { scoreText.classList.remove('roundScoreAnimation'); }, 200)

    document.querySelector('.computerScore').innerText = computerScore + 'p';
    document.querySelector('.playerScore').innerText = playerScore + 'p';
}

// Check if max points is reached and display text accordingly
function checkEndGame () {
    const gameScoreText = document.querySelector('.game-score');

    if (computerScore >= finalScore && playerScore >= finalScore && computerScore === playerScore) {
        gameScoreText.innerText = youAreTiedMessage;
        toggleModal();
    }    
    else if (computerScore >= finalScore) {
        gameScoreText.innerText = youLostMessage;
        toggleModal();
    }
    else if (playerScore >= finalScore) {
        gameScoreText.innerText = youWonMessage;
        toggleModal();
    }
}

// Capitalize first letter
function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

// Reset vars and text keeping track of winning streak
function resetCombo() {
    previousWinner = -1;
    comboWinMultiplier = 1;

    const computerCombo = document.querySelector('.computer-combo');
    const humanCombo = document.querySelector('.human-combo');
    computerCombo.innerText = "";
    humanCombo.innerText = "";    
}

// Display text and reevaluate vars keeping track of a winning streak for human player
function showHumanCombo() {
    if(previousWinner !== 1)
    {
        previousWinner = 1;
        const computerCombo = document.querySelector('.computer-combo');
        computerCombo.innerText =  '';
        return;
    }
    comboWinMultiplier += 1;
    const humanCombo = document.querySelector('.human-combo');
    humanCombo.innerText =  `x${comboWinMultiplier} COMBO!`;
}

// Display text and reevaluate vars keeping track of a winning streak for computer player
function showComputerCombo() {
    if(previousWinner !== 0)
    {
        previousWinner = 0;
        const humanCombo = document.querySelector('.human-combo');
        humanCombo.innerText =  '';
        return;
    }
    comboWinMultiplier += 1;
    const computerCombo = document.querySelector('.computer-combo');
    computerCombo.innerText =  `x${comboWinMultiplier} COMBO!`;
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

// Randomize images 
function randomizeComp() {
    const images = document.querySelectorAll('.randomImg');
    setInterval(function () { images.forEach(randomImg => randomImg.src = `img/${computerPlay()}.png`) }, 300);
}

// modal popup and game reset
const modal = document.querySelector(".modal");
const tryAgainBtn = document.querySelector('.tryAgainBtn');
const continuePlayBtn = document.querySelector('.continuePlayBtn');

function toggleModal() {
    modal.classList.toggle("show-modal");
    continuePlayBtn.innerText = `Test your luck\nto ${finalScore * 2}...`
}

function tryAgain () {
    toggleModal();
    computerScore = 0;
    playerScore = 0;
}

function continuePlay () {
    toggleModal();
    finalScore *= 2;
}

tryAgainBtn.addEventListener('click', tryAgain);
continuePlayBtn.addEventListener('click', continuePlay);



