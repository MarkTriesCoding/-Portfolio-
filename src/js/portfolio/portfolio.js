//////LIBRARIES (TYPED AND SCROLLREVEAL)
////
import '../scss/portfolio.scss';
// import './js/portfolio/scrollreveal.js'
// import simpleParallax from 'simple-parallax-js';
// const simpleParallax = require('simple-parallax-js');
 // const Typed = require('typed.js')
  // const ScrollReveal = require('scrollreveal');
//////TYPED JS
var typer = document.querySelector("#typed");
//LOAD TYPED.JS ON LOAD EVENT, ONCE
window.addEventListener("load",function(){
 var type=new Typed('#typed',{
    strings:["Web Developer.", "Problem Solver.","React Developer.","Full-Stack Developer.","Available for hire."],
    typeSpeed: 50,
    startDelay:5000,backDelay:5000,
    backspeed:5000,
    loop: true,
    fadeIn:true,
    contentType: 'html'
  })

  // var background = document.getElementsByClassName("about")
  // new simpleParallax(background,{
  //   delay: .6,
  // 	transition: 'cubic-bezier(0,0,0,1)'
  //
  // });

},{once:true})

//// SCROLLREVEAL.JS
// SCROLL REVEAL OPTIONS

//// ELEMENT VARIABLES
//
var menu        = document.querySelector(".menu")
var menuList    = document.querySelector(".menuList")
var nav         = document.querySelector("nav");
var burg        = document.querySelector(".burg");
var burgElement = menu.firstChild.nextSibling;
var name        = nav.firstChild.nextSibling;
var front       = document.querySelector(".front");
// var seperator   = document.querySelector('.seperator')
var about       = document.querySelector(".about");
var list        = document.querySelector(".menuList");
var modal       = document.querySelector('.modal');
var body        = document.querySelector("body");
var creations   = document.querySelector(".creations");
var footer      = document.querySelector(".footer");
var modalList = document.querySelector(".modalList")
var main        = [front,about,creations,footer];








// var arrow = document.querySelector(".arrowDown");
// var frontHeight = front.clientHeight
// arrow.style.top = frontHeight - 100
// console.log(arrow.style.top)
//

// name.addEventListener('click',function(e){
//   e.preventDefault();
//   console.log(window.pageYOffset)
//   //window.pageYOffset = 0;
// })
//// CLICK EVENT ON MENU
//

menu.addEventListener("click",toggleModal);

function toggleModal(){

    //PREVENT CLICK EVENT BUBBLING
//  e.preventDefault();

    //
    ////MODAL TOGGLE
    //
    // modalList.addEventListener("click",function(e)=>{
    //     modal.classList.toggle("modal-active");
    // },false)
    //NORMAL/X MENU
  menu.classList.toggle("menu-active");
    //SHOW/HIDE MODAL
  modal.classList.toggle("modal-active");

   if(menu.firstChild.nextSibling.classList[0]!=="burg-light"){burgElement.classList.toggle("burg-light")}

    //BLUR/DEFAULT BACKGROUND SECTIONS
  main.map((el)=>{
    el.classList.toggle("blur-background")
  })
  //me.classList.toggle("visible")
  var posY = window.pageYOffset;
  console.log(posY);
  //
  //// IF MODAL ACTIVE
  //
  console.log(menu.classList[2])
  if(menu.classList[2]=="menu-active" || posY>0){
    nav.firstChild.nextSibling.className = "name-vertical";

    document.body.style.top = posY;
    burgElement.className="burg-light";

  }
  //
  ////IF MODAL INACTIVE
  //
  else{
    nav.firstChild.nextSibling.className="name"

    document.body.style.position = '';
    document.body.style.top = '';

       burgElement.className = "burg"
  };


};//<--end click event listener
//]



menu.addEventListener("click",toggleModal);

// modalListItem.map((e)=>{
//   e.addEventListener("click",toggleModal)
// })
modalList.addEventListener("click",toggleModal);

//DEFAULT SCROLL POSITION
var lastScrollTop = 0;
//FUNCTION TRIGGERED ON SCROLL EVENT
const scrollFunc = function(e){

  //
  //// DECLARE VARIABLES RELATES TO SECTION TOPS/HEIGHTS FOR
  //
  let st = this.pageYOffset || this.scrollTop || 0;
  let frontHeight = front.clientHeight;
  let aboutHeight = about.clientHeight;
  // let seperatorHeight = seperator.clientHeight;
console.log("st:"+st,"frontheight:"+frontHeight,"aboutHeight:"+aboutHeight)
  //
  ////TOGGLE BURG COLOR BASED ON SECTION SCROLLED
  //
  if((st>(frontHeight) && st<(frontHeight+aboutHeight))|| (menu.classList[2]=="menu-active") ){
   // burg.style.backgroundColor = "beige";
    burgElement.classList.add("burg-light")
    burgElement.classList.remove("burg")
    menu.style.transition = "background-color 0.4s ease";
  }
  else{
    burgElement.classList.add("burg")
    burgElement.classList.remove("burg-light")
  }


    //
    //// CASE: SCROLL UP AND TOP
    //
  if(st<lastScrollTop ){
    if(( this.pageYOffset == 0 ||this.pageYOffset < 350) && menu.classList[2]!=="menu-active"){


      name.classList.add("name");
      name.classList.remove("name-vertical");
      // name.innerHTML = "mh.<strong>dev</strong>"
      list.classList.add("menuList");
      list.classList.remove("menuList-vertical");
      name.addEventListener("mouseover",function(ev){
           name.innerHTML = "markhalstead.<strong>dev</strong>";
      });
      name.addEventListener("mouseout",function(ev){
           name.innerHTML = "mh.<strong>dev</strong>";
      })
        //
      menuList.style.color = "rgba(10,10,100,0.95)"
    }
       //
       ////DUMMY CASE FOR POS>350 SCROLL UP
       //
  }
    //
    //// SCROLL DOWN && >350PX
    //
  else {
    name.addEventListener("mouseover",function(ev){
         name.innerHTML = "mh.<strong>dev</strong>";

    });
    name.addEventListener("mouseout",function(ev){
         name.innerHTML = "mh.<strong>dev</strong>";

    })

    //
    //// NAME/LIST ROTATE AND SOFTEN COLOR
    ///
    name.classList.add("name-vertical");
    name.classList.remove("name")
    // name.innerHTML = "markhalstead.<strong>dev</strong>"
    list.classList.add("menuList-vertical");
    list.classList.remove("menuList");
    menuList.style.color = "rgba(50,50,100,0.7)"
  }
    // AT END OF SCROLL, SET lastScrollTop TO TOP OF WINDOW
  lastScrollTop =  window.scrollY;
  console.log(lastScrollTop)

    ////
    //     FOR TYPED.JS and ARROW FADEOUT ON SCROLLDOWN
    ////
  let y = window.scrollY;
  let h = front.clientHeight;
  let ratio = 1-y/h*3;
  let ratioArrow = 1-y/h*1.5
  if (1-y/h*2 < 0){
    ratio = 0;
  }

    //CHANGE ARROW AND TYPED.JS OPACITY BASED ON SCROLL POS
  document.querySelector(".arrowDown").style.opacity = ratioArrow
  me.style.opacity = ratio;
}//<--end scroll function

//THROTTLE SCROLL EVENT
window.addEventListener("scroll",_.throttle(scrollFunc,33)
,{capture:false,passive:true})

// modules.export = main.js
