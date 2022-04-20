let previousTimeStamp = 0

let settings = document.querySelector(".settings")

let board = document.querySelector(".board")

let number = document.querySelector(".number")

let optionSettings = document.querySelectorAll(".level > div")

let mainloop;

////Grid 30*30
let width = 30

////  very slow 7 slow 13 Normal 18  fast 25  very fast 35
let speed;

let direction = { x: 0, y: 0 }

let foodSound = new Audio("music/food.mp3")

let movieSound = new Audio("music/move.mp3")

let start = false

let snakePos = [
    { x: 14, y: 14 },
    { x: 13, y: 14 }
]

let foodPos = { x: 26, y: 26 }



optionSettings.forEach((element, index) => {

    element.addEventListener("click", function () {

        if (index === 0) {
            speed = 8;
        }
        else if (index === 1) {
            speed = 13
        }
        else if (index === 2) {
            speed = 18
        }
        else if (index === 3) {
            speed = 25
        }
        else if (index === 4) {
            speed = 35
        }

        console.log(333)
        document.querySelector(".settings").style.display = "none"


        window.requestAnimationFrame(step);
        board.innerHTML = ""
        number.innerHTML = 0
        displayFood()


    })


});



function step(timestamp) {
    mainloop = window.requestAnimationFrame(step);

    if ((timestamp - previousTimeStamp) / 1000 < 1 / speed) {
        return;
    }


    previousTimeStamp = timestamp
    gameEngine()



}


function gameEngine() {

    //board.innerHTML=""

    clear()

    displaySnake()



    if (collideWithFood()) {


        upadateFoodPos()
        snakePos.push({ x: snakePos[snakePos.length - 1].x, y: snakePos[snakePos.length - 1].y })
        updateSnakePos()
        document.querySelector(".food").remove()
        displayFood()


        number.innerHTML = +number.innerHTML + 1


    }

    if (hittAtheWall() || hitByItself()) {

        console.log(snakePos)
        InstallOnTheLastPlace()
        cancelAnimationFrame(mainloop)
        playAgain()




    }

    if (start) {
        updateSnakePos()
    }



}



function playAgain() {
    start = false
    direction = { x: 0, y: 0 }
    snakePos = [
        { x: 14, y: 14 },
        { x: 13, y: 14 }
    ]

    foodPos = { x: 26, y: 26 }


    document.querySelector(".settings").style.display = "block"

}




function displaySnake() {

    snakePos.forEach((element, index) => {

        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = element.y
        snakeElement.style.gridColumnStart = element.x
        /////This Head Of Snake
        if (index === 0) {
            snakeElement.classList.add("head")
        }
        ///Body Of Snake
        else {
            snakeElement.classList.add("body")
        }
        board.appendChild(snakeElement)
    });
}

function displayFood() {
    let food = document.createElement("div")
    food.classList.add("food")
    food.style.gridRowStart = foodPos.y
    food.style.gridColumnStart = foodPos.x

    board.appendChild(food)


}

function upadateFoodPos() {

    let randx = Math.floor(Math.random() * (width - 1)) + 1

    foodPos.x = randx



    let randY = Math.floor(Math.random() * (width - 1)) + 1

    foodPos.y = parseInt(randY)



}


function InstallOnTheLastPlace() {

    function loopOnPos(number, coordinates) {
        for (let i = 0; i < snakePos.length; i++) {
            snakePos[i][coordinates] = snakePos[i][coordinates] + number
        }
    }


    if (snakePos[0].x === 0) {
        loopOnPos(1, "x")
    }
    else if (snakePos[0].y === 0) {
        loopOnPos(1, "y")
    }
    else if (snakePos[0].x > width) {
        loopOnPos(-1, "x")
    }

    else if (snakePos[0].y > width) {
        loopOnPos(-1, "y")
    }


    direction = { x: 0, y: 0 }
    clear()
    displaySnake()
    start = false

}

function hitByItself() {

    for (let i = 1; i < snakePos.length; i++) {
        if ((snakePos[0].x === snakePos[i].x) && (snakePos[0].y === snakePos[i].y)) {

            return true
        }



    }


}

function collideWithFood() {
    if (snakePos[0].x === foodPos.x && snakePos[0].y === foodPos.y) {
        return true
    }

}

function hittAtheWall() {
    if (snakePos[0].x >= 31 || snakePos[0].y >= 31 || snakePos[0].x <= 0 || snakePos[0].y <= 0) {
        return true
    }
}


function updateSnakePos() {

    for (let i = snakePos.length - 1; i >= 1; i--) {
        snakePos[i] = { ...snakePos[i - 1] }

    }
    if (snakePos[0].x < 1 || snakePos[0].y > width) {


    }
    else {
        console.log(snakePos)
        snakePos[0] = { x: snakePos[0].x + direction.x, y: snakePos[0].y + direction.y }
    }

}


function clear() {

    let all = document.querySelectorAll(".board > div")
    all.forEach(element => {

        if (element.classList.contains("body") || element.classList.contains("head")) {
            element.remove()
        }

    });

}



window.addEventListener("keydown", function (e) {


    if (checkIfiCanStartGame(e)) {
        if (start === false) {
            start = true
        }
    }

    if (e.key === 'ArrowUp' && direction.y != 1) {
        movieSound.play()
        direction.y = -1
        direction.x = 0


    }
    if (e.key === "ArrowRight" && direction.x != -1) {
        movieSound.play()

        direction.x = 1
        direction.y = 0


    }
    if (e.key === "ArrowLeft" && direction.x != 1) {
        movieSound.play()

        direction.x = -1
        direction.y = 0


    }
    if (e.key === "ArrowDown" && direction.y != -1) {
        movieSound.play()

        direction.y = 1
        direction.x = -0

    }


})


function checkIfiCanStartGame(e) {

    if ((e.key === 'ArrowUp' || e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowDown") && settings.style.display === "none") {
        return true
    }

}