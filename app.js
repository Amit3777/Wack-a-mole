const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const getLevels = document.querySelectorAll('.get-level')
const timeLeft = document.getElementById('time-left')
const score = document.getElementById('score')
const highScore = document.getElementById('high-score')
const startgame = document.getElementById('start-game')



let audioTurn =new Audio('ting.mp3')
let hitPosition
let timerId = null
let delay = null
let result = 0
let maxResult = 0
let totalTime = 60
let timeOutTimer


// To change Square.
function randomSquare(){
    squares.forEach(square =>{
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random()*16)]
    randomSquare.classList.add('mole')

    hitPosition = randomSquare.id

} 

getLevels.forEach(level => {
    level.addEventListener('mousedown',()=>{
        
        if (level.id == "easy") {
            delay = 1500

        
        }
        if (level.id == "medium") {
            delay = 900
        
        }
        if (level.id == "hard") {
            delay = 500
        
        }

        level.setAttribute('id','active-level')

        for (const level of getLevels) {
            level.disabled = true;
          }
        
        
    })
    
})
// To set interval.
function moveMole(){
    timerId = setInterval(randomSquare,delay)
}

// Check and Update result
squares.forEach(square => {
    square.addEventListener('mousedown', () =>{
        if(square.id == hitPosition){
            result++
            score.textContent = result
            hitPosition = null
            randomSquare()
            clearInterval(timerId)
            audioTurn.play()
            moveMole()

        }
        if(result > maxResult){
            maxResult = result
            highScore.textContent = maxResult
        }
    })
})




function timeOut(){
    totalTime--
    timeLeft.textContent = totalTime
    

    if(totalTime == 0){

        clearInterval(timerId)
        clearInterval(timeOutTimer)
        alert('GAME OVER! Final Score is '+ result)
        totalTime = 60
        timeLeft.textContent = totalTime
        result = 0
        score.textContent = result
        hitPosition = null
        startgame.disabled = false
        for (const level of getLevels) {
            level.disabled = false
            level.removeAttribute('id')
          }
    }
}



startgame.addEventListener('mousedown',()=>{

    if(delay !=null){
    moveMole()
    timeOutTimer = setInterval(timeOut,1000)
    startgame.disabled = true
   
    }else{
        alert("select level ")
    }
})


 