let x_row = [];
let y_row = [];

let m, b;

// optimizer
const learningRate = 0.2;
const optimizer = tf.train.sgd(learningRate);

//loss function, predictor;

function setup() {
  createCanvas(400, 400);

  m = tf.variable(tf.scalar(random(1)));
  b = tf.variable(tf.scalar(random(1)));
}

function predict(x) {
  const xs = tf.tensor1d(x);
  // y = mx + b
  const ys = xs.mul(m).add(b);

  return ys;
}

//mean square error
function loss(pred, labels) {
  return pred.sub(labels).square().mean();
}

function mousePressed() {
  //mapping the vector let the left corner become (0, 0) point.
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
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

  //return the mapping in mousePressed();
  for (let i = 0; i < x_row.length; i++) {
    let px = map(x_row[i], 0, 1, 0, width);
    let py = map(y_row[i], 0, 1, height, 0);
    point(px, py);
  }

  // draw a line for visulilation.
  const lineX = [0, 1];
  const ys = tf.tidy(() => predict(lineX));
  let lineY = ys.dataSync();
  ys.dispose();
  
  let x1 = map(lineX[0], 0, 1, 0, width);
  let x2 = map(lineX[1], 0, 1, 0, width);

  
  let y1 = map(lineY[0], 0, 1, height, 0);
  let y2 = map(lineY[1], 0, 1, height, 0);
  strokeWeight(2);
  line(x1, y1, x2, y2);
}
