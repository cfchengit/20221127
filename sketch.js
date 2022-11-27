const isFlipped = true;

let keypointsHand = [];

const videoElement = document.getElementsByClassName("input_video")[0];
videoElement.style.display = "none";



function onHandsResults(results) {
  keypointsHand = results.multiHandLandmarks;

}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});

hands.setOptions({
  selfieMode: isFlipped,
  maxNumHands: 2, // 今回、簡単化のため検出数の最大1つまでに制限
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
  MULTI_HAND_LANDMARKS: 0.5,
});
hands.onResults(onHandsResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
  
});
camera.start();

let videoImage;

function setup() {
  let w=min(1280,windowWidth)
  let h=min(720,windowHeight)
  const canvas = createCanvas(w, h);
  // videoImage = createGraphics(320, 180);
}

function draw() {
  // clear();
  // background("rgba(100, 100, 255, 0.2)");

  // videoImage.drawingContext.drawImage(
  //   videoElement,
  //   0,
  //   0,
  //   videoImage.width,
  //   videoImage.height
  // );

  push();
  if (isFlipped) {
    translate(width, 0);
    scale(-1, 1);
  }
  // displayWidth = width;
  // displayHeight = (width * videoImage.height) / videoImage.width;
  // image(videoImage, 0, 0, displayWidth, displayHeight);
  pop();

  if (keypointsHand.length > 0) {
    // console.log(keypointsHand); // 結果を得る

    const indexTip = keypointsHand[0][8];
    console.log(indexTip);

    ellipse(indexTip.x * displayWidth, indexTip.y * displayHeight, 50);
    if(indexTip.z<-0.18){
      push()
      translate(indexTip.x * displayWidth,indexTip.y * displayHeight);
      drawFlower("#fff2f2")
      pop()
    }
    // const indexTip4 = keypointsHand[0][4];
    // console.log(indexTip4);

    // ellipse(indexTip4.x * displayWidth, indexTip4.y * displayHeight, 50);
  }
}

function drawFlower(clr,size=1){
  push()
    fill(255,211,33)
    ellipse(0, 0, 50);		//目前此圓，仍以圓心為座標點
    ellipseMode(CORNER)   // 設定以左上角為座標點上的座標
    fill(255,90,61)
    if(clr){
      fill(clr); //如果clr不是空的內容，就要設定為傳過來的值
    }
    for(var i =0;i<16;i++){
      ellipse(30, -20, 120*size, 40);  // 設定以左上角為座標點，做一個花瓣
      line(30,0,150,0)
      rotate(PI/8) //180度產生八片，360度產生16片
    }
      
    pop()
  }
  