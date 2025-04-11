let textContent = "💕💕💕👀👀 ";
let slider;
let button;
let isBouncing = false;
let iframe;

function setup() { //這是一個設定函數，只會執行一次
  //產生一個畫布，充滿整個視窗，背景顏色為#c6ac8f(買回來的圖畫紙)
  createCanvas(windowWidth, windowHeight);
  background('#c6ac8f');

  // 使用 DOM 物件產生一個文字框
  let input = createInput(textContent);
  input.position(10, 10); // 設定文字框的位置
  input.size(220); // 調整文字框的寬度
  input.style('font-size', '32px');
  input.input(updateText);

  // 產生一個滑桿物件
  slider = createSlider(12, 30, 24); // 調整滑桿範圍
  slider.position(380, 10); // 設定滑桿的位置
  slider.style('width', '100px'); // 調整滑桿的寬度
  



  // 產生一個按鈕物件
  button = createButton('跳動');
  button.position(600, 10); // 設定按鈕的位置
  button.size(150); // 調整按鈕的寬度
  button.style('font-size', '24px'); // 調整按鈕的字型大小
  button.mousePressed(toggleBounce);

  // 產生一個下拉式選單
  let dropdown = createSelect();
  dropdown.position(800, 10);
  dropdown.size(180);
  dropdown.style('font-size', '24px');
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('20250314筆記');
  dropdown.changed(openLink);

  // 產生一個 iframe 物件
  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
}

function draw() { //這是一個繪圖函數，會一直執行
  background('#c6ac8f'); // 確保每次繪圖時背景顏色一致
  let textSizeValue = slider.value(); // 根據滑桿的值設定文字大小
  textSize(textSizeValue);
  textAlign(LEFT, TOP); // 設定文字對齊方式
  fill('#c9ada7');
  stroke(0);
  strokeWeight(1);

  // 固定顯示 "文字大小"
  textSize(24);
  text('文字大小', 250, 25); // 設定字型

  let spaceWidth = textWidth(" "); // 空格的寬度
  let fullTextWidth = textWidth(textContent) + spaceWidth; // 完整字串的寬度
  let startX = 0;
  let startY = 100; // y 座標在畫布上方空100

  for (let y = startY; y < height; y += textSizeValue) { // 以文字高度為間隔，從上至下繪製字串
    let bounce = isBouncing ? sin(frameCount * 0.1 + y * 0.05) * 5 : 0; // 計算跳動的位移
    for (let x = startX; x < width; x += fullTextWidth) { // 以完整字串的寬度為間隔，從左至右繪製字串
      text(textContent, x, y + bounce); // 繪製字串
    }
  }
}

function updateText() {
  textContent = this.value() + " ";
}

function toggleBounce() {
  isBouncing = !isBouncing; // 切換跳動狀態
}

function openLink() {
  let selected = this.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '20250314筆記') {
    iframe.attribute('src', 'https://hackmd.io/@jO50Bwe2S1mIentFb3Sm8w/20250314');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 70);
}
