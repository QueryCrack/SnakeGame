// vairables
let inputDir = { x: 0, y: 0 }
let speed = 9;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 6 }

]
food = { x: 17, y: 8 };
let score = 0;


// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }

    if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 25 || snake[0].y <= 0) {
        return true;
    }
    return false;


}
function gameEngine() {
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press Enter or Ok!!!");
        snakeArr = [{ x: 13, y: 6 }];
        score = 0;


    }


    //eaten food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if (score > HighScoreval) {
            HighScoreval = score;
            localStorage.setItem("HighScore", JSON.stringify(HighScoreval));
            HighScoreBox.innerHTML = "HighScore : " + HighScoreval;

        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 3;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // move snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;













    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');

        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// logic of game starts here
let HighScore = localStorage.getItem("HighScore");
if (HighScore === null) {
    HighScoreval = 0;
    localStorage.setItem("HighScore", JSON.stringify(HighScoreval))

}
else {
    HighScoreval = JSON.parse(HighScore);
    HighScoreBox.innerHTML = "HighScore : " + HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});