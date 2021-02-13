
const express = require('express');

const User = require('../js/snake/models/userSchema')
const router = express.Router()

let currentUser = "";
let currentUserHighScore = 1;

// app.get('/snake',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/snake.html' );
// });

  router.get("/snake", async(req,res)=>{
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
  if(currentUser.length < 1){
    res.redirect('/snake/login')
  }
  else{
    res.render(process.cwd()+"/dist/snake", { highScore: currentUserHighScore,
      username:currentUser,
      leader1:highScoreLeaders[0],score1:leaderBoardScores[0],
      leader2:highScoreLeaders[1],score2:leaderBoardScores[1],
      leader3:highScoreLeaders[2],score3:leaderBoardScores[2],
      leader4:highScoreLeaders[3],score4:leaderBoardScores[3],
      leader5:highScoreLeaders[4],score5:leaderBoardScores[4],
    })
  }

  })


  //==========================================
  //
  //  Update DB on gameover.
  //
  //==========================================


  router.post("/snake/save", async(req,res)=>{
    currentUser =  req.body.username;
    currentUserHighScore = (currentUserHighScore > req.body.highScore) ? currentUserHighScore : req.body.highScore
    console.log("SAVING:"+currentUser+currentUserHighScore);
       await User.findOne({username:currentUser},(err,data)=>{
         currentUserHighScore = (data.highScore > req.body.highScore) ? data.highScore :req.body.highScore

       })
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
//   router.get("/save",async (req,res)=>{
//     console.log("5herehere",currentUser);
//     await User.findOne({username:currentUser},(err,data)=>{
// console.log("6data"+data);
//       return data
//     })
//     // res.render(process.cwd()+"/public/views/index", { highScore: req.body.highScore, username:req.body.username})
//       res.redirect('/');
//      // res.render(process.cwd()+"/public/views/index", { highScore: req.body.highScore, username:req.body.username})
//   })




  router.get("/snake/login", async(req,res)=>{
    await res.render('login',{displayMessage:"Choose your Snek's name and play!"}  )

  })
  router.post('/snake/login',checkUser,async(req,res)=>{
    var newUser = await new User({username:req.body.username})
    currentUser = req.body.username
    newUser.save(async (err,user)=>{
      console.log(" saving user: ",user);


    })

     res.redirect('/snake')
  }


  //
  //  passport.authenticate('local',{
  //   successRedirect:'/snake',
  //   failureRedirect:'/snake/login',
  //   failureFlash:true
  // })


  )

  // router.get("/snake/register",(req,res)=>{
  //     res.render('register',{displayMessage:"REGISTER"})
  // })
  // router.post('/snake/register', function (req,res,next){
  //
  //   User.register(new User({username: req.body.username}), req.body.password, function(err) {
  //   if (err) {
  //     let errMessage = err.message
  //       res.render('register',{displayMessage:errMessage})
  //     return next(err);
  //   }
  //   console.log('user registered!');
  //   res.redirect('/snake');
  // });
  //
  // })

  router.get('/snake/logout',async(req,res)=>{
  await  req.logOut()
  await res.redirect('/snake/login')
  })


  // async function checkAuthenticated(req,res,next){
  //   if (req.isAuthenticated()){
  //     return next()
  //   }
  //   await res.redirect('/snake/login')
  // }

  async function checkUser(req,res,next){
//check validating conditions


    await User.findOne({username:req.body.username},(err,doc)=>{

      if(err){ console.error("Error  :  ", err);
      res.render('login',{displayMessage:err.message})
      return next()
    }
      if(doc){
        if(doc.username == req.body.username){
          return  res.render('login',{displayMessage:"choose different name"})

        }
        // currentUser = doc.username;
        // currentUserHighScore = doc.highScore;
      }


      next()
    })
  }

  // async function loginMiddleware(req,res,next){
  //   // await User.findOne( { username:req.body.username},(err,doc)=>{
  //   //   if(err ||res.status == 405) {
  //   //     res.render('login',{displayMessage:err.message})
  //   //     return next(err)
  //   //   };
  //   //
  //   //   if(!doc){
  //   //     res.render('login',{displayMessage:"no user found"})
  //   //     return next()
  //   //   }
  //   //   currentUser = doc.username;
  //   //   currentUserHighScore = doc.highScore;
  //   //   next()
  //   })
  // }
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
