  //rock papper scissors //////////////////////

  let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, loses: 0, ties: 0}
  document.querySelector('.score').innerHTML = `${score.wins} wins, ${score.loses} loses, ${score.ties} ties!`
  
  function playGame(playerMove) {
    let computerMoveResult = computerMove(); // Stocați rezultatul returnat de computerMove într-o variabilă
    const moves = document.querySelector('.moves')
    const result = document.querySelector('.result')
    const scoreP = document.querySelector('.score')
    console.log(computerMoveResult);
    // Restul codului pentru joc poate fi adăugat aici, folosind rezultatul computerMove
    if (playerMove === 'rock') {
        if (computerMoveResult ==='rock') {
            result.innerHTML = 'Tie!'
            score.ties+=1
        } else if (computerMoveResult ='scissors') {
            result.innerHTML = 'You win!'
            score.wins+=1
        } else {
            result.innerHTML = 'You lose!'
            score.loses+=1
        }
    }

    if (playerMove === 'scissors') {
        if (computerMoveResult ==='rock') {
            result.innerHTML = 'You lose!'
            score.loses+=1
        } else if (computerMoveResult ='scissors') {
            result.innerHTML = 'Tie!'
            score.ties+=1
        } else {
            result.innerHTML = 'You win!'
            score.wins+=1
        }
    }

    if (playerMove === 'paper') {
        if (computerMoveResult ==='rock') {
            result.innerHTML = 'You win!'
            score.wins+=1
        } else if (computerMoveResult ='scissors') {
            result.innerHTML = 'You lose!'
            score.loses+=1
        } else {
            result.innerHTML = 'Tie!'
            score.ties+=1
        }
    }
    localStorage.setItem('score',JSON.stringify(score))
    moves.innerHTML = `You picked ${playerMove} and the Computer picked ${computerMoveResult}!`
    scoreP.innerHTML = `${score.wins} wins, ${score.loses} loses, ${score.ties} ties!`

  }

  function resetScore () {
    localStorage.clear()
    score = {wins:0, loses:0, ties:0}
    document.querySelector('.score').innerHTML = `${score.wins} wins, ${score.loses} loses, ${score.ties} ties!`
    }
  
  function computerMove() {
    let move = Math.random();
    let moveString = ''; 
    if (move < 1/3) {
      moveString = 'rock';
    } else if (move >= 1/3 && move < 2/3) {
      moveString = 'scissors';
    } else {
      moveString = 'paper'; // Aici ați corectat "papper" la "paper"
    }
    return moveString; // Returnați valoarea calculată
  }


  // my api program ///////////////////////
  const getActivityButton = document.querySelector('.activity')

  async function getRandomActivity() {
    const url = 'http://www.boredapi.com/api/activity/'

    try {
        const response = await fetch(url);
        const data = await response.json();
        document.querySelector('.show-activity').innerHTML = `You could ${data.activity}. The nature of activity: ${data.type}!`
    } catch (err) {
        throw err
    }
}

getActivityButton.addEventListener('click', () => {
    getRandomActivity()
})

  
  

