//Problem: No user interaction causes no change to application
//Solution: When user interacts, cause changes appropiately
var $color = $(".selected").css("background-color");
var $colorSelect = $("#colorSelect");
var $canvas = $("canvas");
var context = $("canvas")[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$(".controls").on("click", "li",function(){
  //Deselect sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked element
  $(this).addClass("selected");
  //cache current color
  $color = $(this).css("background-color");
});
  
//When new color is pressed
$("#revealColorSelect").click(function(){
  //Show color select or hide it
  changeColor();
  $colorSelect.toggle();
});

//Update the new color span
function changeColor(){
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color","rgb(" + r + "," + g + "," + b + ")");
}

//When color sliders change
$("input[type=range]").change(function(){
  changeColor();
});
  

//When add color is pressed
$("#addNewColor").click(function(){
   //Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color",$("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click(); 
});

//On mouse events on the canvas
$canvas.mousedown(function(event){
  mouseDown = true;
  lastEvent = event;
}).mousemove(function(event){
  if(mouseDown){
    context.strokeStyle = $color;
    context.beginPath();
    context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
    context.lineTo(event.offsetX,event.offsetY);
    context.stroke();
    lastEvent = event;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
 