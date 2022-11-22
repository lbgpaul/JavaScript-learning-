let x_row = [];
let y_row = [];

let m, b;

// optimizer
const learningRate = 0.1;
const optimizer = tf.train.adam(learningRate);

//loss function, predictor;

function setup() {
  createCanvas(600, 600);

  a = tf.variable(tf.scalar(random(-1, 1)));
  b = tf.variable(tf.scalar(random(-1, 1)));
  c = tf.variable(tf.scalar(random(-1, 1)));
}

function predict(x) {
  const xs = tf.tensor1d(x);
  // y = mx + b
  //const ys = xs.mul(m).add(b);
  // y = ax^2 + bx + c
  const ys = xs.square().mul(a).add(xs.mul(b)).add(c);

  return ys;
}

//mean square error
function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function mousePressed() {
  //mapping the vector let the left corner become (0, 0) point.
  let x = map(mouseX, 0, width, -1, 1);
  let y = map(mouseY, 0, height, 1, -1);
  x_row.push(x);
  y_row.push(y);
}

function draw() {
  // Train the model.
  // optimizer.minimize(function train() {
  //   loss(predict(x_row), ys);
  // });
  tf.tidy(() => {
    if (x_row.length > 0) {
      const ys = tf.tensor1d(y_row);
      optimizer.minimize(() => loss(predict(x_row), ys));
    }
  });

  background(0);
  stroke(255);
  strokeWeight(6);
  
  //randomly adding point
  
  //using fomula for curve 
  //x**2 - y**2 = -1
  if(random(1) < 0.05){
    let y = random(0, height);
    //if(random(1) < 0.5){
      //y *= -1;
    //}
    
    let x = sqrt(y**2 - 1);
    x += random(10, 200)
    if(random(1) < 0.5){
      x *= -1
    }
    
    x = map(x, -width, width, -1, 1);
    y = map(y, height, 0, -1, 1);
    x_row.push(x);
    y_row.push(y);
  }
  
  //return the mapping in mousePressed();
  for (let i = 0; i < x_row.length; i++) {
    let px = map(x_row[i], -1, 1, 0, width);
    let py = map(y_row[i], -1, 1, height, 0);
    point(px, py);
  }

  // draw a line for visulilation.
  const curveX = [];
  for(let x = -1; x < 1; x += 0.05){
    curveX.push(x);
  }
  
  const ys = tf.tidy(() => predict(curveX));
  let curveY = ys.dataSync();
  ys.dispose();
  
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);
  for(let i = 0; i < curveX.length; i++){
    let x = map(curveX[i], -1, 1, 0, width);
    let y = map(curveY[i], -1, 1, height, 0);
    vertex(x,y);
  }
  endShape();
  
  let tt = 0;
  while (tt < 9000){
    if (random(1)< 0.03){
      tt += 1;
    }
  }
  
}
