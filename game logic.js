let winCount = 0;
let lossCount = 0;
let playerHistory = [];
const historyDiv = document.getElementById('history');

function playerChoice(choice) {
    playerHistory.push(choice);
    const computerChoice = getComputerChoice();
    showComputerChoice(computerChoice);
    document.getElementById('computer-choice-text').innerText = `Computer chose: ${computerChoice.toUpperCase()}`;
    determineWinner(choice, computerChoice);
}

function getComputerChoice() {
    const difficulty = document.getElementById('difficulty').value;
    if (difficulty === 'easy') return randomChoice();
    if (difficulty === 'medium') return patternBasedChoice();
    return adaptiveAIChoice();
}

function randomChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function patternBasedChoice() {
    if (playerHistory.length === 0) return randomChoice();
    let moveCount = { rock: 0, paper: 0, scissors: 0 };
    playerHistory.forEach(move => moveCount[move]++);
    let mostPlayedMove = Object.keys(moveCount).reduce((a, b) => moveCount[a] > moveCount[b] ? a : b);
    return mostPlayedMove === 'rock' ? 'paper' : mostPlayedMove === 'paper' ? 'scissors' : 'rock';
}

function adaptiveAIChoice() {
    if (Math.random() > 0.5) return patternBasedChoice();
    return randomChoice();
}

function showComputerChoice(choice) {
    document.querySelectorAll('.choice-container img').forEach(img => img.classList.remove('active'));
    document.getElementById(`computer-${choice}`).classList.add('active');
}

function determineWinner(player, computer) {
    let resultText = '';
    if (player === computer) {
        resultText = "It's a tie!";
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        resultText = "You win!";
        winCount++;
    } else {
        resultText = "Computer wins!";
        lossCount++;
    }
    
    document.getElementById('result').innerText = resultText;
    document.getElementById('win-count').innerText = winCount;
    document.getElementById('loss-count').innerText = lossCount;
    showTaunt(resultText);
    addToHistory(resultText);
}

function showTaunt(result) {
    const taunts = {
        win: ["You got lucky! 😠", "Nice one! But can you do it again? 🤨", "I'll get you next time! 😎"],
        lose: ["Hah! Easy win! 😆", "Too predictable! 🤖", "Try again, human! 😜"]
    };
    
    const tauntText = result.includes("You win") 
        ? taunts.win[Math.floor(Math.random() * taunts.win.length)] 
        : taunts.lose[Math.floor(Math.random() * taunts.lose.length)];
    
    document.getElementById('ai-taunt').innerText = tauntText;
}

function addToHistory(result) {
    const entry = document.createElement('div');
    entry.textContent = `${new Date().toLocaleString()}: ${result}`;
    historyDiv.prepend(entry);
}
