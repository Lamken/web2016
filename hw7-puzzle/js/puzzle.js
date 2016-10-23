var isStart = false;  // if the game have started
/*make it can use event of clicking puzzle block to break the puzzle's order*/
var inBreakingOrder = false;
var moveNumbers = 0;  // write down the times of moving puzzle blocks
var usingTime = 0;  // write down the time to complete the puzzle
var timeCounter;  // save the time counter event
/*save the blank block in puzzle and the rows and cols is begin at 0*/
var blankPos = {
    row: 3,
    col: 3
};

/*check whether the puzzle is complete by using id to check their cols and rows*/
function ifWin() {
    for (var i = 0; i < 15; ++i) {
        var puzzleBlock = document.getElementById("block" + i);
        if (puzzleBlock.className != "block " + "row" + Math.floor(i / 4) +
            " col" + Math.floor(i % 4))
            return false;
    }
    return true;
}

/*if the puzzle block is next to black block, change its columns and rows by
 * changing its class
 * then check whether the puzzle is complete
 * at last add the move times and synchronize it*/
function clickPuzzleBlock(event) {
    if (isStart || inBreakingOrder) {
        var puzzleOnclick = event.target;
        if (puzzleOnclick.className == "block row" + (blankPos.row - 1) + " col" + (blankPos.col)) {
            puzzleOnclick.className = "block row" + blankPos.row + " col" + blankPos.col;
            blankPos.row -= 1;
            ++moveNumbers;
        } else if (puzzleOnclick.className == "block row" + (blankPos.row + 1) + " col" + (blankPos.col)) {
            puzzleOnclick.className = "block row" + blankPos.row + " col" + blankPos.col;
            blankPos.row += 1;
            ++moveNumbers;
        } else if (puzzleOnclick.className == "block row" + (blankPos.row) + " col" + (blankPos.col - 1)) {
            puzzleOnclick.className = "block row" + blankPos.row + " col" + blankPos.col;
            blankPos.col -= 1;
            ++moveNumbers;
        } else if (puzzleOnclick.className == "block row" + (blankPos.row) + " col" + (blankPos.col + 1)) {
            puzzleOnclick.className = "block row" + blankPos.row + " col" + blankPos.col;
            blankPos.col += 1;
            ++moveNumbers;
        }

        /*synchronize the move times*/
        if (isStart) {
            document.getElementById("tryNumberScreen").textContent = moveNumbers + "";
        }

        /*check whether the puzzle is complete*/
        if (ifWin() && isStart) {
            alert("congratulation! single dog");
            isStart = false;
            window.clearInterval(timeCounter);
        }
    }
}

/*create puzzle blocks and give them an id to identify their background
 * give them two class to config their rows and columns*/
function createPuzzle() {
    var gameArea = document.getElementById("gameArea");
    for (var i = 0; i < 15; ++i) {
        var puzzleBlock = document.createElement("div");
        puzzleBlock.setAttribute("id", "block" + i);
        puzzleBlock.classList.add("block");
        puzzleBlock.classList.add("row" + Math.floor(i / 4));
        puzzleBlock.classList.add("col" + (i % 4));
        puzzleBlock.addEventListener("click", clickPuzzleBlock);
        gameArea.appendChild(puzzleBlock);
    }
}

/*click the puzzle blocks next to the blank block to break puzzle's order
 * the bool variable makes the puzzle block can move before the game stop
 * and make the variable false when finishs breaking order to avoid player move
 * the puzzle before game start*/
function breakOrder() {
    inBreakingOrder = true;
    for (var i = 0; i < 100; ++i) {
        var random = Math.round(Math.random() * 37 % 4);
        if (random == 0 && blankPos.row - 1 >= 0) {
            $(".row" + (blankPos.row - 1) + ", .col" + (blankPos.col)).click();
        } else if (random == 1 && blankPos.row + 1 < 4) {
            $(".row" + (blankPos.row + 1) + ", .col" + (blankPos.col)).click();
        } else if (random == 2 && blankPos.col - 1 >= 0) {
            $(".row" + (blankPos.row) + ", .col" + (blankPos.col - 1)).click();
        } else if (random == 3 && blankPos.col + 1 < 4) {
            $(".row" + (blankPos.row) + ", .col" + (blankPos.col + 1)).click();
        }
    }
    inBreakingOrder = false;
}

/*break puzzle's order and init variables before game start*/
function startGame() {
    breakOrder();
    isStart = true;
    moveNumbers = 0;
    usingTime = 0;
    document.getElementById("timeScreen").textContent = usingTime + "";
    document.getElementById("tryNumberScreen").textContent = moveNumbers + "";
    if (timeCounter != undefined)
        window.clearInterval(timeCounter);
    timeCounter = window.setInterval(function () {
        ++usingTime;
        document.getElementById("timeScreen").textContent = usingTime + "";
    }, 1000);
}

window.onload = function () {
    createPuzzle();
    document.getElementById("startButton").onclick = startGame;
};
