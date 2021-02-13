const passport = require('passport');
const express = require('express');

const User = require('../models/userSchema')
const router = express.Router()

let currentUser = "";
let currentUserHighScore = 1;


  router.get("/snake",checkAuthenticated, async(req,res)=>{
  var highScoreLeaders;
  var leaderBoardScores;
  await User.find({highScore:{$gte:1}}).sort({highScore: -1}).limit(5).then((data)=>{
    highScoreLeaders = data.map((d)=>{
      return d.username;
    })
    leaderBoardScores = data.map((d)=>{
      return d.highScore;
    })

  })
    res.render(process.cwd()+"/dist/snake", { highScore: currentUserHighScore,
      username:currentUser,
      leader1:highScoreLeaders[0],score1:leaderBoardScores[0],
      leader2:highScoreLeaders[1],score2:leaderBoardScores[1],
      leader3:highScoreLeaders[2],score3:leaderBoardScores[2],
      leader4:highScoreLeaders[3],score4:leaderBoardScores[3],
      leader5:highScoreLeaders[4],score5:leaderBoardScores[4],
    })
  })


  //==========================================
  //
  //  Update DB on gameover.
  //
  //==========================================


  router.post("/snake/save", async(req,res)=>{
    currentUser = req.body.username;
    currentUserHighScore = req.body.highScore

     await User.findOneAndUpdate({username:currentUser},{highScore:currentUserHighScore},{new:true, useFindAndModify:false},(err,data)=>{
      if(err){
        console.log("update err");
      }
      return data
    })
     await User.find({highScore:{$gte:1}}).sort({highScore: -1}).limit(5).then((data)=>{
       highScoreLeaders = data.map((d)=>{
       return d.username;
     })

   }).catch((err)=>{
      console.log("leaderboard error");
   })
       await res.redirect('/snake');
  })

  router.get("/snake/login", async(req,res)=>{
    await res.render('login',{displayMessage:"Choose your Snek's name to play!"}  )

  })
  router.post('/snake/login',async(req,res)=>{
    var newUser = new User({username:req.body.username})
    newUser.save((err,user)=>{
      if (err) return console.error(err);
      console.log(user.username + "is now doing a snek.");
    })
  }



  )


  router.get('/snake/logout',async(req,res)=>{
  await  req.logOut()
  await res.redirect('/snake/login')
  })



  router.get('/',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/index.html' );
  });
  router.get('/d3',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/d3.html' );
  });
  router.get('/stocklists',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/stocklists.html' );
  });

  router.get('/simon',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/simon.html' );
  });
  router.get('/calculator',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/calculator.html' );
  });
  router.get('/timer',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/timer.html' );
  });
  router.get('/tictactoe',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/tictactoe.html' );
  });
  router.get('/drums',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/drums.html' );
  });
  router.get('/markdown',(req,res)=>{
    res.sendFile(process.cwd() + '/dist/markdown.html' );
  });
module.exports = {router}
