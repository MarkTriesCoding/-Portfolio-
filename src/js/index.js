//////IMPORTS WEBPACK STYLESHEET AND LOADING ANIMATION

import '../scss/portfolio.scss';
import Loading from './shared/loading.js'


var front = document.querySelector(".front");
var sky = document.querySelector(".sky")

//LOADING ANIMATION ON LOAD
window.addEventListener("load", Loading())

//TYPED JS ANIMATION AFTER LOADING ANIMATION.
window.addEventListener("load", function() {
  var type = new Typed('#typed', {
    strings: ["Web Developer.", "Problem Solver.", "React Developer.",
      "Full-Stack Developer.", "Consultant."
    ],
    typeSpeed: 50,
    startDelay: 100,
    backDelay: 500,
    backspeed: 10,
    loop: true,
    fadeIn: true,
    contentType: 'html'
  })
}, {
  once: true
})

//
//// DECLARE ELEMENT VARIABLES FOR CLICK EVENTS
//
var menu = document.querySelector(".menu")
var menuList = document.querySelector(".menuList")
var nav = document.querySelector("nav");
var burg = document.querySelector(".burg");
var burgElement = menu.firstChild.nextSibling;
var name = nav.firstChild.nextSibling;
var about = document.querySelector(".about");
var list = document.querySelector(".menuList");
var modal = document.querySelector('.modal');
var body = document.querySelector("body");
var contact = document.querySelector(".contact-section");
var creations = document.querySelector(".creations");
var footer = document.querySelector(".footer");
var modalList = document.querySelector(".modalList")
var main = [front, about, creations, contact, footer];
var project = document.querySelector(".projectName");
// project.style.paddingTop = window.screenWidth

//
// CLICK EVENT ON MENU
//
menu.addEventListener("click", toggleModal);

//
// MODAL TOGGLE
//
function toggleModal() {

  // TOGGLE MENU CLASS
  menu.classList.toggle("menu-active");
  // TOGGLE MODAL CLASS
  modal.classList.toggle("modal-active");

  //  SET MENU BURG COLOR BASED ON MODAL CONDITION
  if (menu.firstChild.nextSibling.classList[0] !== "burg-light") {
    burgElement.classList.toggle("burg-light")
  }

  //  BLUR/DEFAULT BACKGROUND SECTIONS
  main.map((el) => {
    el.classList.toggle("blur-background")
  })
  var posY = window.pageYOffset;

  // IF MODAL ACTIVE
  if (menu.classList[2] == "menu-active" || posY > 0) {
    nav.firstChild.nextSibling.className = "name-vertical";
    document.body.style.top = posY;
    burgElement.className = "burg-light";
  }

  //
  ////ELSE MODAL INACTIVE
  //
  else {
    if(st > (frontHeight + aboutHeight + creationsHeight)){
      burgElement.className = "burg";
    }
    else{
      nav.firstChild.nextSibling.className = "name"
      burgElement.className = "burg-light";
    }
  };
};
//<--end click event listener

//
// EVENT LISTENERS FOR BURG/MODAL ON/OFF
//

modalList.addEventListener("click", toggleModal);

//DEFAULT SCROLL POSITION
var lastScrollTop = 0;

//
// FUNCTION TRIGGERED ON SCROLL EVENT
//
const scrollFunc = function(e) {
    //
    // DECLARE VARIABLES RELATES TO SECTION TOPS/HEIGHTS FOR
    //
    let st = this.pageYOffset-10 || this.scrollTop || 0;
    let frontHeight = front.clientHeight;
    let aboutHeight = about.clientHeight;
    let creationsHeight = creations.clientHeight;

    //
    //TOGGLE BURG COLOR BASED ON SECTION SCROLLED
    //logic:  scrollTop/pageYoffset is greater than the height of top section,
    //but less than total height of top and about OR menu is active
    //
    if (  (st < (frontHeight + aboutHeight + creationsHeight)) || (menu.classList[2] == "menu-active")) {
      burgElement.classList.add("burg-light")
      burgElement.classList.remove("burg")
      menu.style.transition = "background-color 0.4s ease";
      name.classList.remove("name-dark");

    }
    else if( st > (frontHeight + aboutHeight + creationsHeight )){
      burgElement.classList.add("burg-light");
      burgElement.classList.remove("burg");
      name.classList.remove("name-dark");
    }
    else if( st > frontHeight ){
      burgElement.classList.remove("burg-light");
      burgElement.classList.add("burg");
      name.classList.add("name-dark");
    }
    else {
      burgElement.classList.add("burg")
      burgElement.classList.remove("burg-light")
      name.classList.add("name-dark");

    }

    //
    //// CASE: SCROLL UP AND TOP
    //
    if (st < lastScrollTop) {
      if ((this.pageYOffset == 0 || this.pageYOffset < 350) && menu.classList[2] !== "menu-active") {
        name.classList.add("name");
        name.classList.remove("name-vertical");
        list.classList.add("menuList");
        list.classList.remove("menuList-vertical");
        burgElement.classList.add("burg")
        burgElement.classList.remove("burg-light")
      }
    }

    //
    //// SCROLL DOWN && >350PX
    //
    else {

    //
    // NAME/LIST ROTATE AND SOFTEN COLOR
    //
      name.classList.add("name-vertical");
      name.classList.remove("name")
      list.classList.add("menuList-vertical");
      list.classList.remove("menuList");
    }

    // AT END OF SCROLL, SET lastScrollTop TO TOP OF WINDOW
    lastScrollTop = window.scrollY;

    //
    // FOR TYPED.JS and ARROW FADEOUT ON SCROLLDOWN
    //
    let y = window.scrollY;
    let h = front.clientHeight;
    let ratio = 1 - y / h * 3;
    let ratioArrow = 1 - y / h * 1.5
    if (1 - y / h * 2 < 0) {
      ratio = 0;
    }
    //CHANGE ARROW AND TYPED.JS OPACITY BASED ON SCROLL POS
    document.querySelector(".arrowDown").style.opacity = ratioArrow
    me.style.opacity = ratio;


    //======================================
    //
    //Skill bar animation
    //
    //======================================


window.addEventListener("scroll", function(e){

  var techPerc = document.getElementsByClassName("tech-per");

  for(let i=0;i<techPerc.length;i++){
    let per = techPerc[i].getAttribute("per");
    techPerc[i].style.width="0%";
    if( this.pageYOffset > front.clientHeight *0.8 ){
    setInterval(function(){
    techPerc[i].style.width = per+"%";

    },0)
  }
}
},{once:true})
    //======================================
    //
    //END Skill bar animation
    //
    //======================================

  } //<--end scroll function

//THROTTLE SCROLL EVENT
window.addEventListener("scroll", _.throttle(scrollFunc, 100), {
  capture: false,
  passive: true
})


//=================
//
// Button Events for App Load / Github link.
//
//=================
