/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let y = 0; y < HEIGHT; y++){
    board.push(Array.from({length : WIDTH}))
  }
}
  /*logic:
    using Array.from() I created an array that is 7(WIDTH) elements long
    that is then pushed into the empty board array.
    the for loop lets me continue to do so, as long as 
    y is less that 6 (WIDTH)
  */


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  const top = document.createElement("tr"); // created a top table row
  top.setAttribute("id", "column-top"); // gave the tr element an ID of "column-top" 
  top.addEventListener("click", handleClick); //added an event listener to listen for clicks
  //each time we click on elements in the top row, function handleClick gets executed                                      

  for (let x = 0; x < WIDTH; x++) { // for each element in the top row
    const headCell = document.createElement("td");// we create a data cell 
    headCell.setAttribute("id", x);// and add an ID attribute of the given cell number (0-7(WIDTH))
    headCell.classList.add("cell-top");
    top.append(headCell);// and this gets added to the top table row 
  }
  htmlBoard.append(top); // adds the top table row to the htmlBoard

  // TODO: add comment for this code
  //using for loop to create individual rows and cells to add into board
  for (let y = 0; y < HEIGHT; y++) { //for each row array, a table row is created
    const row = document.createElement("tr"); 
    for (let x = 0; x < WIDTH; x++) { //for each element within the row array; a table data cell is created
      const cell = document.createElement("td");
      cell.classList.add("cell");
      cell.setAttribute("id", `${y}-${x}`); // each cell has an id of the given HEIGHT (0-6) index hyphen WIDTH index (0-7)
      row.append(cell); // the cell gets added to the row
    }
    htmlBoard.append(row); // and the row is then added to the html board
  }
}


/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT - 1; y >= 0; y--){ // for loop lets us iterate through each row of column (x) starting from the bottom
    if(!board[y][x]){ //checks if the cell at row y and column x is empty
      return y; // if its empty then we return the given row index 
    }
  } 
  return null; //if the cell is not empty (filled) then we will return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //making our token 
  const piece = document.createElement("div");// created a div 
  piece.classList.add("piece"); //add the class of piece
  piece.classList.add(`p${currPlayer}`); // add the class of the p and the value of the currPlayer variable
  piece.style.top = -50 * (y + 2);

  const cellSelected = document.getElementById(`${y}-${x}`);// selects the cell using the given y-x id 
  cellSelected.append(piece); //add the piece to the selected cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert (msg);
  }


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
    board[y][x] = currPlayer;
    placeInTable(y, x);
 
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
if (board.every(row => row.every(cell => cell))) {
  return endGame ('Tie');
}

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
  //invoke player one function
  playersTurn();
  // TODO: switch currPlayer 1 <-> 2
};

//selected the player divs from html file
const playerOne = document.getElementById("player1");
const playerTwo = document.getElementById("player2");
//initialized player one
playerOne.classList.add("selected");
//background color changes as player turn changes
function playersTurn (){
  if(currPlayer === 1){
    playerOne.classList.add("selected");
    playerTwo.classList.remove("selected");
  }
  else{
    playerTwo.classList.add("selected");
    playerOne.classList.remove("selected");
  }
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

//restart the game 
function restartGame(){
const restartBtn = document.querySelector("button");
restartBtn.addEventListener("click", function(e){
  location.reload();
})
};

restartGame();
makeBoard();
makeHtmlBoard();
