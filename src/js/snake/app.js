import '../../scss/snake/snake.scss';


import { SNAKE_SPEED, snake, draw as drawSnakeBody, update as updateSnakeBody, snakeLead, checkSnakeIntersection} from './snake.js'
import { draw as drawFruit, update as updateFruit} from './fruit.js'
import {checkBoundary} from './grid.js'


 let latestRenderTime = 0;
 let checkGameOver = false;

 const board = document.getElementById('game-box')
 const modalState = document.getElementById("login")












 const dialog = document.getElementById('game-dialog');
 const play = document.getElementById('play-button');

 const title = document.getElementById('title');
 const game = document.getElementById('game-box');

  async function app(time) {
    if (checkGameOver){
    await saveHighScore()
    // console.log("saved");


    // setTimout(()=>{
    //     title.innerHTML="OH NOES!"
    // },1000)


      // await alert("Game Over. Try again!")
      // await function(){
      //   return
      // }
      let messages=["OH NOES!","BOOP!","WALL!","BONK!"]
      let message = messages[Math.floor(Math.random()*4)]
       title.innerHTML=message

       title.style.left="calc(50% - 2ch)";
      // title.style.fontSize="2rem"
       game.style.backgroundImage="url('https://www.dictionary.com/e/wp-content/uploads/2018/06/snek.jpeg')";
       game.style.background="rgba(100,60,60,0.5)"; //disrupt current background for 200ms
      setTimeout(function(){

        window.location='/snake'
      }, 1000);

    // title.innerHTML="snek"


      return
    }

    window.requestAnimationFrame(app)
    const sinceLastRender = (time - latestRenderTime) / 1000;
    if (sinceLastRender < 1 / SNAKE_SPEED) return
    latestRenderTime = time;

    update()
    draw()

  }

  window.requestAnimationFrame(app)

 function updateBackground(board,snake){
  const countAttribute = document.createAttribute("count")
  countAttribute.value = snake.length;
  board.setAttributeNode(countAttribute);
}

function update(){
  checkConditions()
  updateSnakeBody()
  updateBackground(board,snake)
  updateFruit()
}

function draw(){
  board.innerHTML = ''
  drawSnakeBody(board)
  drawFruit(board)
}
   function saveHighScore(){
    var existingHighScore = document.getElementById('highScore').innerHTML;
    var username = document.getElementById('currentUser').innerHTML
    var newHighScore = ( existingHighScore >= snake.length)  ? existingHighScore : snake.length ;
    fetch('/snake/save',{ method:'POST',  headers: {'Content-Type': 'application/json'},  body: JSON.stringify({username:username, highScore:newHighScore})})
    .then((response)=>{
      if(response.ok) {
        return response.json();
    }
      console.log("save score response error");
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((err)=>{
      console.log("POST err",err);
    })

// fetch('/save',{method:'GET'})
// .then((response)=>{
//   console.log("4get response");
//   return response.json()})
// .then((data)=>{
//   //DOESN"T REACH HERE
//
//     console.log("4get data");
//      document.getElementById('highScore').innerHTML = newHighScore;
// })    .catch((err)=>{
//       // ERROR HERE
//        console.log("4err",err);
//     })

// .catch((err)=>console.log("5",err);)
  // fetch('/user')
  //   .then(req,res)
}


function checkConditions(){
   checkGameOver = checkBoundary(snakeLead())||checkSnakeIntersection()

}
