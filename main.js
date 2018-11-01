// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
// 构造函数定义每个小球需要的参数
function Ball(x, y, velX, velY, color, size) {
    this.x = x;  // x 坐标
    this.y = y;  // y 坐标
    this.velX = velX; // 水平速度
    this.velY = velY; // 垂直速度
    this.color = color; // 小球颜色
    this.size = size; // 小球的大小 半径
}
 // drow()方法画小球
  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
// 创建一个小球的实例
var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
testBall.x
testBall.size
testBall.color
testBall.draw()
// 更新小球的数据
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX)
  }
  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX)
  }
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY)
  }
  this.x += this.velX;
  this.y += this.velY;
}
// 增加撞击侦查
Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255)+ ')';
      }
    }
  }
}
var balls = []; //存储小球
// 球动起来
function loop() {
  // 设置画布颜色为半透明的黑色
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
 // fillRect()画出充满整个画布的矩形
  ctx.fillRect(0, 0, width, height);
  // 当小球数量小于35时， 将random（）函数产生的数字传入新的小球实例，从而创建新的小球
  while (balls.length < 35) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
  }
  // 遍历数组中的所有小球， 每个都调用drown()和update()函数
  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  // 使用requestAnimationFrame()方法在运行一次函数，当一个函数正在运行时传递相同的函数名，从未每个一小段时间都会运行一次这个函数
 // 这主要是通过递归完成的。
  requestAnimationFrame(loop);
}
loop();