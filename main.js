var draw = document.getElementById('draw');
var context = draw.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(draw)

listenToUser(draw)


var eraserEnabled = false
//铅笔
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
//橡皮擦
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}
//清空
clear.onclick = function(){
  context.clearRect(0, 0, draw.width, draw.height);
}
//下载
download.onclick = function(){
  var url = draw.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '图片'
  a.target = '_blank'
  a.click()
}

//红色画笔
red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
}
//绿色画笔
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  red.classList.remove('active')
  green.classList.add('active')
  blue.classList.remove('active')
}
//蓝色画笔
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  red.classList.remove('active')
  green.classList.remove('active')
  blue.classList.add('active')
}
//画笔粗细
thin.onclick = function(){
  lineWidth = 5
}
thick.onclick = function(){
  lineWidth = 10
}

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  if(document.body.ontouchstart !== undefined){
    canvas.ontouchstart = function(e){
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      console.log(x,y)
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(e){
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      using = false
    }
  }else{
    // 非触屏设备
    canvas.onmousedown = function(e) {
      var x = e.clientX
      var y = e.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(e) {
      var x = e.clientX
      var y = e.clientY

      if (!using) {return}

      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          "x": x,
          "y": y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }

    }
    canvas.onmouseup = function(e) {
      using = false
    }
  }

}
