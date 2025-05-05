// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Loop through keypoints and draw circles
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          // Color-code based on left or right hand
          if (hand.handedness == "Left") {
            fill(255, 0, 255);
          } else {
            fill(255, 255, 0);
          }

          noStroke();
          circle(keypoint.x, keypoint.y, 16);
        }

        // Connect keypoints 0 to 4 with lines
        if (hand.keypoints.length > 4) {
          if (hand.handedness == "Left") {
            stroke(255, 0, 255); // Left hand color
          } else {
            stroke(255, 255, 0); // Right hand color
          }
          strokeWeight(2);

          for (let i = 0; i < 4; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Connect keypoints 5 to 8 with lines
        if (hand.keypoints.length > 8) {
          for (let i = 5; i < 8; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Connect keypoints 9 to 12 with lines
        if (hand.keypoints.length > 12) {
          for (let i = 9; i < 12; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Connect keypoints 13 to 16 with lines
        if (hand.keypoints.length > 16) {
          for (let i = 13; i < 16; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Connect keypoints 17 to 20 with lines
        if (hand.keypoints.length > 20) {
          for (let i = 17; i < 20; i++) {
            let start = hand.keypoints[i];
            let end = hand.keypoints[i + 1];
            line(start.x, start.y, end.x, end.y);
          }
        }

        // Connect keypoints 5 to 0 and 17 to 0
        if (hand.keypoints.length > 17) {
          if (hand.handedness == "Left") {
            stroke(255, 0, 255); // Left hand color
          } else {
            stroke(255, 255, 0); // Right hand color
          }
          strokeWeight(2);

          // Connect keypoint 5 to 0
          let start5 = hand.keypoints[5];
          let end0 = hand.keypoints[0];
          line(start5.x, start5.y, end0.x, end0.y);

          // Connect keypoint 17 to 0
          let start17 = hand.keypoints[17];
          line(start17.x, start17.y, end0.x, end0.y);
        }
      }
    }
  }
}
