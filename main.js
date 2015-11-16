var SIZE = 540

var mask = new Image()
mask.src = 'mask.png'



var full = document.getElementById('full')

full.canvas = document.querySelector('#full canvas')
full.img = document.querySelector('#full-img')
full.zoom = document.querySelector('#full-zoom')
full.alpha = document.querySelector('#full-alpha')
full.save = document.querySelector('#full .save')

full.canvas.width = SIZE
full.canvas.height = SIZE
full.ctx = full.canvas.getContext('2d')

full.centerX = SIZE / 2
full.centerY = SIZE / 2

full.draw = function () {
  var ctx = full.ctx
  ctx.globalAlpha = 1
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, SIZE, SIZE)

  if (full.image && full.image.src) {
    ctx.globalAlpha = full.alpha.value
    var actualWidth = full.image.width * full.zoom.value
    var actualHeight = full.image.height * full.zoom.value
    ctx.drawImage(full.image, full.centerX - actualWidth / 2, full.centerY - actualHeight / 2, actualWidth, actualHeight)
  }

  ctx.globalAlpha = 1
  ctx.drawImage(mask, 0, 0, SIZE, SIZE)
}

full.img.addEventListener('change', function () {
  var reader = new FileReader()
  reader.readAsDataURL(this.files[0])
  reader.onload = function (e) {
    full.image = new Image()
    full.image.src = e.target.result
    full.centerX = SIZE / 2
    full.centerY = SIZE / 2
    full.draw()
  }
})
full.zoom.addEventListener('input', full.draw)
full.alpha.addEventListener('input', full.draw)

full.canvas.addEventListener('mousedown', function (e) {
  full.lastX = e.clientX - this.getBoundingClientRect().left + pageXOffset
  full.lastY = e.clientY - this.getBoundingClientRect().top + pageYOffset
  full.pressed = true
  full.draw()
})
full.canvas.addEventListener('mouseup', function () {
  full.pressed = undefined
})
full.canvas.addEventListener('mouseleave', function () {
  full.pressed = undefined
})
full.canvas.addEventListener('mousemove', function (e) {
  if (full.pressed) {
    var x = e.clientX - this.getBoundingClientRect().left + pageXOffset
    var y = e.clientY - this.getBoundingClientRect().top + pageYOffset
    full.centerX += (x - full.lastX)
    full.centerY += (y - full.lastY)
    full.lastX = x
    full.lastY = y
    full.draw()
  }
})

full.save.addEventListener('click', function () {
  open(full.canvas.toDataURL())
})




var divide = document.getElementById('divide')

divide.canvas = document.querySelector('#divide canvas')
divide.leftImg = document.querySelector('#divide-left-img')
divide.leftZoom = document.querySelector('#divide-left-zoom')
divide.leftAlpha = document.querySelector('#divide-left-alpha')
divide.rightImg = document.querySelector('#divide-right-img')
divide.rightZoom = document.querySelector('#divide-right-zoom')
divide.rightAlpha = document.querySelector('#divide-right-alpha')
divide.save = document.querySelector('#divide .save')

divide.canvas.width = SIZE
divide.canvas.height = SIZE
divide.ctx = divide.canvas.getContext('2d')

divide.leftCenterX = SIZE / 4
divide.leftCenterY = SIZE / 2
divide.rightCenterX = 3 * SIZE / 4
divide.rightCenterY = SIZE / 2

divide.draw = function () {
  var ctx = divide.ctx
  ctx.globalAlpha = 1
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, SIZE, SIZE)

  if (divide.leftImage && divide.leftImage.src) {
    ctx.globalAlpha = divide.leftAlpha.value
    var leftActualWidth = divide.leftImage.width * divide.leftZoom.value
    var leftActualHeight = divide.leftImage.height * divide.leftZoom.value
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, SIZE / 2, SIZE)
    ctx.clip()
    ctx.drawImage(divide.leftImage, divide.leftCenterX - leftActualWidth / 2, divide.leftCenterY - leftActualHeight / 2, leftActualWidth, leftActualHeight)
    ctx.restore()
  }

  if (divide.rightImage && divide.rightImage.src) {
    ctx.globalAlpha = divide.rightAlpha.value
    var rightActualWidth = divide.rightImage.width * divide.rightZoom.value
    var rightActualHeight = divide.rightImage.height * divide.rightZoom.value
    ctx.save()
    ctx.beginPath()
    ctx.rect(SIZE / 2, 0, SIZE / 2, SIZE)
    ctx.clip()
    ctx.drawImage(divide.rightImage, divide.rightCenterX - rightActualWidth / 2, divide.rightCenterY - rightActualHeight / 2, rightActualWidth, rightActualHeight)
    ctx.restore()
  }

  ctx.globalAlpha = 1
  ctx.drawImage(mask, 0, 0, SIZE, SIZE)
}

divide.leftImg.addEventListener('change', function () {
  var reader = new FileReader()
  reader.readAsDataURL(this.files[0])
  reader.onload = function (e) {
    divide.leftImage = new Image()
    divide.leftImage.src = e.target.result
    divide.leftCenterX = SIZE / 4
    divide.leftCenterY = SIZE / 2
    divide.rightCenterX = 3 * SIZE / 4
    divide.rightCenterY = SIZE / 2
    divide.draw()
  }
})
divide.leftZoom.addEventListener('input', divide.draw)
divide.leftAlpha.addEventListener('input', divide.draw)

divide.rightImg.addEventListener('change', function () {
  var reader = new FileReader()
  reader.readAsDataURL(this.files[0])
  reader.onload = function (e) {
    divide.rightImage = new Image()
    divide.rightImage.src = e.target.result
    divide.draw()
  }
})
divide.rightZoom.addEventListener('input', divide.draw)
divide.rightAlpha.addEventListener('input', divide.draw)

divide.canvas.addEventListener('mousedown', function (e) {
  divide.lastX = e.clientX - this.getBoundingClientRect().left + pageXOffset
  divide.lastY = e.clientY - this.getBoundingClientRect().top + pageYOffset
  if (divide.lastX < SIZE / 2)
    divide.pressed = 'left'
  else
    divide.pressed = 'right'
  divide.draw()
})
divide.canvas.addEventListener('mouseup', function () {
  divide.pressed = undefined
})
divide.canvas.addEventListener('mouseleave', function () {
  divide.pressed = undefined
})
divide.canvas.addEventListener('mousemove', function (e) {
  if (divide.pressed) {
    var x = e.clientX - this.getBoundingClientRect().left + pageXOffset
    var y = e.clientY - this.getBoundingClientRect().top + pageYOffset
    divide[divide.pressed + 'CenterX'] += (x - divide.lastX)
    divide[divide.pressed + 'CenterY'] += (y - divide.lastY)
    divide.lastX = x
    divide.lastY = y
    divide.draw()
  }
})

divide.save.addEventListener('click', function () {
  open(divide.canvas.toDataURL())
})



full.draw()
divide.draw()


var intro = document.getElementById('intro')

document.getElementById('choice-full').addEventListener('click', function () {
  full.style.display = 'block'
  divide.style.display = 'none'
  intro.className = 'chosen'
})
document.getElementById('choice-divide').addEventListener('click', function () {
  divide.style.display = 'block'
  full.style.display = 'none'
  intro.className = 'chosen'
})
document.getElementById('return-intro').addEventListener('click', function () {
  intro.className = ''
})