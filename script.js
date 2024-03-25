const Gameboard = (() => {
    let board = [0, 1, 2,
                3, 4, 5,
                6, 7, 8];
    
    function addMarker(index, marker) {
        board[index] = marker;
    }

    function showBoard() {
        console.log(board);
    }

    function clearBoard() {
        board = [0, 1, 2,
                3, 4, 5,
                6, 7, 8];
    }

    function checkForWinner() {
        //check wins going through middle
        if ((board[0] === board[4] && board[4] === board[8]) || (board[1] === board[4] && board[4] === board[7]) || (board[2] === board[4] && board[4] === board[6]) || (board[3] === board[4] && board[4] === board[5])) {
            return board[4];
            //next check top or left win
        } else if ((board[0] === board[1] && board[1] === board[2]) || (board[0] === board[3] && board[3] === board[6])) {
            return board[0];
            //next check right or bottom win
        } else if ((board[2] === board[5] && board[5] === board[8]) || (board[6] === board[7] && board[7] === board[8])) {
            return board[8];
        } else {
            return false;
        }
    };

    return {addMarker, showBoard, clearBoard, checkForWinner};
})();

function createPlayer(name, marker) {
    return {name, marker}
}

const gamePlay = (() => {
    function declareWinner() {
        let winnerMark = Gameboard.checkForWinner()
        if (!winnerMark) {
            return;
        } else if (winnerMark === player1.marker) {
            console.log(`${player1.name} wins!`)
        } else if (winnerMark === player2.marker) {
            console.log(`${player2.name} wins!`)
        }
    }

    return {declareWinner};
})();

const player1 = createPlayer('Betty1', 'X');
const player2 = createPlayer('Jessica2', 'O');

Gameboard.showBoard();
Gameboard.addMarker(1, player1.marker);
Gameboard.addMarker(2, player2.marker);
gamePlay.declareWinner();
Gameboard.addMarker(4, player1.marker);
Gameboard.addMarker(7, player1.marker);
Gameboard.showBoard();
gamePlay.declareWinner();