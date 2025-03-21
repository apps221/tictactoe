const allSquares = document.querySelectorAll('.board__square')
const title = document.querySelector('.board__title')
let currentPlayer ='X'
let gameOver = false;
let board = new Array(9)
allSquares.forEach((square, index) => {
    square.addEventListener("click", ()=> {
        if (square.innerHTML || gameOver) {
            return //if someone tries to click an empty square after game is won it doesn't play
        }
        //for each square add eventlistener onclick, and then below is what happens onclick
        square.innerHTML = currentPlayer;
        board[index] = currentPlayer;

        if(checkWin()) { //if checkWin returns a truthy value
            title.innerHTML = `${currentPlayer} Wins!`
            gameOver = true;
          return; //this return statement is needed so that the title.innerHTML doesn't change on the bottom and the player resets 
        }
        if (checkDraw()) {
            title.innerHTML = 'Draw!'
            gameOver = true;
            return;
        }

        if (currentPlayer === 'X') {
            currentPlayer = 'O';
        } else {
            currentPlayer = 'X';
        }
        title.innerHTML = `${currentPlayer}'s Turn`
    })
})
function checkDraw() {
   for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
        return false; //if not all the squares have values then the game is still going so return false, because it runs this after it checks for wins too
    }
   }
   return true;
}
function restartGame() {
   allSquares.forEach(square => {
    square.innerHTML = ''
    board = new Array(9)
    gameOver = false; //reset gameover to false so it exits the first if statement
   })
}
function checkWin() {
    const winningIndexes = [
        //Horizontal wins
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //Vertical Wins
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //Diagonal Wins
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i <winningIndexes.length; i++ ) {
        const matchingIndexes = winningIndexes[i]; //goes through each array apart of winningIndexes array
        let symbol1 = board[matchingIndexes[0]];
        let symbol2 = board[matchingIndexes[1]];
        let symbol3 = board[matchingIndexes[2]];

        if (!symbol1 || !symbol2 || !symbol3) { //if the square is empty you do not want to check for wins, only if they are filled
            continue;
        }

        if (symbol1 === symbol2 && symbol2 === symbol3) {
            console.log('winner at', matchingIndexes)
            return true;
        }
    }
 
}