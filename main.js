x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
to_num = "";
speak_data = "";
apple = "";
draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
 console.log(event); 

 content = event.results[0][0].transcript;
 document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

 to_num = Number(content);
 if (Number.isInteger(to_num)){
  document.getElementById("status").innerHTML = "Started Drawing Apple(s)";
  draw_apple = "set";
 }
 else{
  document.getElementById("status").innerHTML = "The speech has not recognized a number";
 }

}

function preload(){
  apple = loadImage("apple.png");
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
 canvas = createCanvas(screen_width, screen_height - 150);
 canvas.position(0, 150);
}

function draw() {
  if(draw_apple == "set")
  {
    for (i = 0; i <= to_num; i++){
      x = Math.floor(Math.random * 700);
      y = Math.floor(Math.random * 400);
      image(apple, x, y, 50, 50);
      console.log("apples drawn");
      document.getElementById("status").innerHTML = to_num + " Apples drawn";
    draw_apple = "";
    }
  }
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data = to_num + "Apple Drawn";

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}
