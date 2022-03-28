let bubbles = [];

function setup() {
  createCanvas(600, 400);
  bubble1 = new Bubble(200, 300, 40);
  bubble2 = new Bubble(400, 100, 10);
  
}  
function mousePressed(){
  let r = random(10, 50);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
}

function draw() {
  background(0);
  for (let bubble of bubbles){
    bubble.move();
    bubble.show();
  }
//   for(let i = 0; i < bubbles.length; i++){
//     bubbles[i].move();
//     bubbles[i].show();
    
//   }
}
