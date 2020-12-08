document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    {
      row: 0,
      col: 0,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    },
    {
      row: 0, 
      col: 1,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0

    },
    {
      row: 0,
      col: 2,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    },
    {
      row: 1, 
      col: 0,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    },
    {
      row: 1,
      col: 1,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    },
    {
      row: 1, 
      col: 2,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    },
    {
      row: 2, 
      col: 0,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    },
    {
      row: 2, 
      col: 1,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    },
    {
      row: 2, 
      col: 2,
      isMine: false,
      isMarked: false,
      hidden: true,
      surroundingMines: 0
    }
  ],
  numberOfMines: 2
};




function startGame () {
  generateRandomMine();
  
  // loop will check how many mines surround each cell
  for(let i = 0; i < board.cells.length; i++) {
    // the current cell is given a value from the output of the following function
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  
  
  
  const boardDisplay = document.getElementsByClassName('board')[0];
  boardDisplay.addEventListener('click', checkForWin);
  boardDisplay.addEventListener('contextmenu', checkForWin);
  
  lib.initBoard()
}

function generateRandomMine () {
  let randomIndex = [];
  while(randomIndex.length < board.numberOfMines) {
    let randomNum = Math.floor(Math.random() * board.cells.length);
    if(!randomIndex.includes(randomNum)) {
      randomIndex.push(randomNum);
    }
  }

  for(let i = 0; i < board.numberOfMines; i++) {
    board.cells[randomIndex[i]].isMine = true;
  }
}



let rightGuess = [];
let rightMark = [];
function checkForWin () {

  for(let i = 0; i < board.cells.length; i++) {
    
    // check if left click was correct guess
    if(board.cells[i].isMine == false && board.cells[i].hidden == false && !rightGuess.includes(board.cells[i])) {
      rightGuess.push(board.cells[i]);
    } 

    // check if right click was correct guess
    if(board.cells[i].isMine == true && board.cells[i].hidden == true && board.cells[i].isMarked == true ) {
      rightMark.push(board.cells[i]);
    }

    // check if the user won by selecting all non mines or by marking the mines correctly
    if( rightGuess.length == (board.cells.length - board.numberOfMines) || rightMark.length == board.numberOfMines ) {
      lib.displayMessage('You win!')
    }
  }

}


function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  let count = 0;

  // this loop counts how many mines are arround an individual cell
  for(let i = 0; i < surroundingCells.length; i++) {
    if(surroundingCells[i].isMine == true) {
      count++;
    }
  }
  return count;
}
