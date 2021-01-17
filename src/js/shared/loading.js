const Loading = () => {
  var loadcontainer = document.querySelector(".loader-container");
  loadcontainer.style.transition="opacity 4s ease-in backgroundColor 3s ease-in";
  console.log(1);
setTimeout(function(){
  loadcontainer.style.opacity="0";
  // loadcontainer.style.backgroundColor="rgba(255,255,255,0)";
  setTimeout(function(){
    loadcontainer.style.zIndex = "0";
  },1000)
},2000)
};
export default Loading;
