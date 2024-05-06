let player1;
let player2;

const Gameboard = (() => {
    let board = [0, 1, 2,
                3, 4, 5,
                6, 7, 8];
    
    function addMarker(index, player) {
        if (board[index] === player1.marker || board[index] === player2.marker) {
            return 'Please choose an empty space to place your marker on';
        } else {
            board[index] = player.marker;
            gamePlay.round++;
            return `${player.name} has placed their marker.`
        }
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
            if (board[4] === player1.marker) {
                player1.increaseWins();
                return `${player1.name} has won!`;
            } else {
                player2.increaseWins();
                return `${player2.name} has won!`;
            }
            //next check top or left win
        } else if ((board[0] === board[1] && board[1] === board[2]) || (board[0] === board[3] && board[3] === board[6])) {
            if (board[0] === player1.marker) {
                player1.increaseWins();
                return `${player1.name} has won!`;
            } else {
                player2.increaseWins();
                return `${player2.name} has won!`;
            }
            //next check right or bottom win
        } else if ((board[2] === board[5] && board[5] === board[8]) || (board[6] === board[7] && board[7] === board[8])) {
            if (board[8] === player1.marker) {
                player1.increaseWins();
                return `${player1.name} has won!`;
            } else {
                player2.increaseWins();
                return `${player2.name} has won!`;
            }
        } else {
            return false;
        }
    };

    function getSpaceMarker(index) {
        return board[index];
    }

    return {addMarker, showBoard, clearBoard, checkForWinner, getSpaceMarker};
})();

function createPlayer(name, marker) {
    let wins = 0

    function increaseWins() {
        this.wins++;
    }

    return {name, marker, wins, increaseWins}
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

    let round = 1;

    function increaseRound() {
        round++;
    }

    function resetRound() {
        this.round = 1;
    }

    return {declareWinner, round, increaseRound, resetRound};
})();

//start game button
document.getElementById("get-player-info").addEventListener("submit", function (e) {
    e.preventDefault();
    let form = document.getElementById("get-player-info");
  
    let formData = new FormData(form);
    let playerInfo = Object.fromEntries(formData);

    player1 = createPlayer(playerInfo.p1name, playerInfo.p1mark);
    player2 = createPlayer(playerInfo.p2name, playerInfo.p2mark);

    updatePlayerDisplays();
    updateMiddleInfo();
    allowAddMarkers();
  });

function updatePlayerDisplays() {
    let p1Info = document.getElementById("p1-info");
    let p2Info = document.getElementById("p2-info");

    p1Info.innerHTML = `<div id="player1Stats"><p>${player1.name}</p>
        <p>Marker: ${player1.marker}</p>
        <p>Wins: ${player1.wins}</p></div>`;

    p2Info.innerHTML = `<div id="player2Stats"><p>${player2.name}</p>
        <p>Marker: ${player2.marker}</p>
        <p>Wins: ${player2.wins}</p></div>`;
}

function updateMiddleInfo() {
    let middleInfo = document.getElementById("middle-info");

    middleInfo.innerHTML = `<h1>Round ${gamePlay.round}</h1>`;
    if (gamePlay.round%2 == 0) {
        middleInfo.innerHTML += `${player2.name}'s turn!`;
    } else {
        middleInfo.innerHTML += `${player1.name}'s turn!`;
    }
}

function allowAddMarkers() {
    let gamesquares = document.getElementsByClassName('gamesquare');

    for (space of gamesquares) {
        let e = space.target;
        space.addEventListener("click", addMarkerAndUpdate, {once : true})
    }
}

function addMarkerAndUpdate(e) {
    let gamesquares = document.getElementsByClassName('gamesquare');

    let number = parseInt(e.target.dataset.square);
            if (gamePlay.round%2 === 0) {
                Gameboard.addMarker(number, player2);
                gamesquares[number].innerHTML = Gameboard.getSpaceMarker(number);
            } else {
                Gameboard.addMarker(number, player1);
                gamesquares[number].innerHTML = Gameboard.getSpaceMarker(number);
            }
            gamesquares[number].classList.remove("empty");
            updateMiddleInfo();
            let isWinner = Gameboard.checkForWinner();
            if (isWinner) {
                for (space of gamesquares) {
                    space.removeEventListener("click", addMarkerAndUpdate);
                    space.classList.remove("empty");
                }
                updatePlayerDisplays();
                let newMiddleInfo = document.getElementById("middle-info");
                newMiddleInfo.innerHTML = `<span>${isWinner}</span>
                <button id="another-game" type="button">Another Game?</button>`;
                let startGameButton = document.getElementById("another-game");
                startGameButton.addEventListener("click", function() {
                    newGame();
                })
            } else if (gamePlay.round == 10) {
                for (space of gamesquares) {
                    space.removeEventListener("click", addMarkerAndUpdate);
                    space.classList.remove("empty");
                }
                updatePlayerDisplays();
                let newMiddleInfo = document.getElementById("middle-info");
                newMiddleInfo.innerHTML = `<span>It's a tie!</span>
                <button id="another-game" type="button">Another Game?</button>`;
                let startGameButton = document.getElementById("another-game");
                startGameButton.addEventListener("click", function() {
                    newGame();
                })
            }
}

function newGame() {
    let gamesquares = document.getElementsByClassName('gamesquare');
    Gameboard.clearBoard();
    gamePlay.resetRound();
    for (space of gamesquares) {
        space.innerHTML = "";
        space.classList.add("empty");
    }
    updatePlayerDisplays();
    updateMiddleInfo();
    allowAddMarkers();
}