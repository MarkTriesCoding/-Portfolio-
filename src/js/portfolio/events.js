var typer = document.querySelector("#typed");

window.addEventListener("load",function(){
 var type=new Typed('#typed',{
    strings:["Web Developer.", "Problem Solver.","React Developer.","Full-Stack Developer.","Available for hire."],
    typeSpeed: 50,
    startDelay:100,backDelay:1500,
    backspeed:10,
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

var front = document.getElementsById("front")

const mouseOverName(){
  
}

window.addEventListener("mouseover",mouseOverName())
