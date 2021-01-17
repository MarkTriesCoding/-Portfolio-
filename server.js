if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const sass = require('node-sass');
const fs = require('fs');
const path = require('path');
// const ejs = require('ejs');
// const validator = require('validator')
// const bcrypt = require('bcrypt')
 const passport = require('passport')
const bodyParser = require('body-parser')
const flash = require('express-flash')
// const session = require('express-session')
const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID;
// const LocalStrategy = require('passport-local').Strategy;
const {router} = require('./src/routes/routes.js');
  const User = require('./src/js/snake/models/userSchema')

app.set('view engine','ejs')
app.set('views',__dirname+'/dist/')
// app.engine('view engine','ejs')
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized:true
// }))
// app.use(passport.initialize());
// app.use(passport.session())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// passport.use(new LocalStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// app.use(flash())
// var webpack = require('webpack');
// var webpackConfig = require('./webpack.config');
// var compiler = webpack(webpackConfig);
//
// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true, publicPath: webpackConfig.output.publicPath
// }));

//
// var router = express.Router()

app.use(express.static(process.cwd()+'/dist'));
app.use(express.static(process.cwd()+'/public/'));
app.use(cors())

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true
})
mongoose.set('useCreateIndex',true)
db = mongoose.connection;
db.on('error',(error)=> console.error(error))
// var db = mongoose.connection
// db.on('err',console.error.bind(console,'connection error:'))
db.once('open',()=>{
  console.log('connection successful');
})

//
// app.get('/',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/index.html' );
// });
// app.get('/d3',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/d3.html' );
// });
// app.get('/stocklists',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/stocklists.html' );
// });
// app.get('/snake',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/snake.html' );
// });
// app.get('/simon',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/simon.html' );
// });
// app.get('/calculator',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/calculator.html' );
// });
// app.get('/timer',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/timer.html' );
// });
// app.get('/tictactoe',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/tictactoe.html' );
// });
// app.get('/drums',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/drums.html' );
// });
// app.get('/markdown',(req,res)=>{
//   res.sendFile(process.cwd() + '/dist/markdown.html' );
// });
app.use('/',router)

var listener = app.listen(port,()=>{
  console.log("Listening on "+ port)

})
