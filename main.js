var SIZE = 540;

var full = $('#full');

full.canvas = $('#full canvas');
full.img = $('#full-img');
full.zoom = $('#full-zoom');
full.alpha = $('#full-alpha');
full.save = $('#full .save');

full.canvas.width = SIZE;
full.canvas.height = SIZE;
full.ctx = full.canvas.getContext('2d');

full.centerX = SIZE / 2;
full.centerY = SIZE / 2;

full.draw = function () {
  var ctx = full.ctx;
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, SIZE, SIZE);

  if (full.image && full.image.src) {
    ctx.globalAlpha = full.alpha.value;
    var actualWidth = full.image.width * full.zoom.value;
    var actualHeight = full.image.height * full.zoom.value;
    ctx.drawImage(full.image, full.centerX - actualWidth / 2, full.centerY - actualHeight / 2, actualWidth, actualHeight);
  }

  ctx.globalAlpha = 1;
  ctx.drawImage(mask, 0, 0, SIZE, SIZE);
};

full.img.addEventListener('change', function () {
  var reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.onload = function (e) {
    full.centerX = SIZE / 2;
    full.centerY = SIZE / 2;
    full.image = new Image();
    full.image.addEventListener('load', full.draw);
    full.image.src = e.target.result;
  };
});
full.zoom.addEventListener('input', full.draw);
full.alpha.addEventListener('input', full.draw);

full.canvas.addEventListener('mousedown', function (e) {
  full.lastX = e.clientX - this.getBoundingClientRect().left + pageXOffset;
  full.lastY = e.clientY - this.getBoundingClientRect().top + pageYOffset;
  full.pressed = true;
  full.draw();
});
full.canvas.addEventListener('mouseup', function () {
  full.pressed = undefined;
});
full.canvas.addEventListener('mouseleave', function () {
  full.pressed = undefined;
});
full.canvas.addEventListener('mousemove', function (e) {
  if (full.pressed) {
    var x = e.clientX - this.getBoundingClientRect().left + pageXOffset;
    var y = e.clientY - this.getBoundingClientRect().top + pageYOffset;
    full.centerX += (x - full.lastX);
    full.centerY += (y - full.lastY);
    full.lastX = x;
    full.lastY = y;
    full.draw();
  }
});
full.canvas.addEventListener('touchstart', function (e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    var touch = e.touches[0];
    full.lastX = touch.clientX - this.getBoundingClientRect().left + pageXOffset;
    full.lastY = touch.clientY - this.getBoundingClientRect().top + pageYOffset;
    full.draw();
  }
});
full.canvas.addEventListener('touchmove', function (e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    var touch = e.touches[0];
    var x = touch.clientX - this.getBoundingClientRect().left + pageXOffset;
    var y = touch.clientY - this.getBoundingClientRect().top + pageYOffset;
    full.centerX += (x - full.lastX);
    full.centerY += (y - full.lastY);
    full.lastX = x;
    full.lastY = y;
    full.draw();
  }
});

full.save.addEventListener('click', function () {
  full.canvas.toBlob(function (blob) {
    window.saveAs(blob, 'avatar.png');
  });
});

var divide = $('#divide');

divide.canvas = $('#divide canvas');
divide.leftImg = $('#divide-left-img');
divide.leftZoom = $('#divide-left-zoom');
divide.leftAlpha = $('#divide-left-alpha');
divide.rightImg = $('#divide-right-img');
divide.rightZoom = $('#divide-right-zoom');
divide.rightAlpha = $('#divide-right-alpha');
divide.save = $('#divide .save');

divide.canvas.width = SIZE;
divide.canvas.height = SIZE;
divide.ctx = divide.canvas.getContext('2d');

divide.leftCenterX = SIZE / 4;
divide.leftCenterY = SIZE / 2;
divide.rightCenterX = 3 * SIZE / 4;
divide.rightCenterY = SIZE / 2;

divide.draw = function () {
  var ctx = divide.ctx;
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, SIZE, SIZE);

  if (divide.leftImage && divide.leftImage.src) {
    ctx.globalAlpha = divide.leftAlpha.value;
    var leftActualWidth = divide.leftImage.width * divide.leftZoom.value;
    var leftActualHeight = divide.leftImage.height * divide.leftZoom.value;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, SIZE / 2, SIZE);
    ctx.clip();
    ctx.drawImage(divide.leftImage, divide.leftCenterX - leftActualWidth / 2, divide.leftCenterY - leftActualHeight / 2, leftActualWidth, leftActualHeight);
    ctx.restore();
  }

  if (divide.rightImage && divide.rightImage.src) {
    ctx.globalAlpha = divide.rightAlpha.value;
    var rightActualWidth = divide.rightImage.width * divide.rightZoom.value;
    var rightActualHeight = divide.rightImage.height * divide.rightZoom.value;
    ctx.save();
    ctx.beginPath();
    ctx.rect(SIZE / 2, 0, SIZE / 2, SIZE);
    ctx.clip();
    ctx.drawImage(divide.rightImage, divide.rightCenterX - rightActualWidth / 2, divide.rightCenterY - rightActualHeight / 2, rightActualWidth, rightActualHeight);
    ctx.restore();
  }

  ctx.globalAlpha = 1;
  ctx.drawImage(mask, 0, 0, SIZE, SIZE);
};

divide.leftImg.addEventListener('change', function () {
  var reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.onload = function (e) {
    divide.leftCenterX = SIZE / 4;
    divide.leftCenterY = SIZE / 2;
    divide.leftImage = new Image();
    divide.leftImage.addEventListener('load', divide.draw);
    divide.leftImage.src = e.target.result;
  };
});
divide.leftZoom.addEventListener('input', divide.draw);
divide.leftAlpha.addEventListener('input', divide.draw);

divide.rightImg.addEventListener('change', function () {
  var reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.onload = function (e) {
    divide.rightCenterX = 3 * SIZE / 4;
    divide.rightCenterY = SIZE / 2;
    divide.rightImage = new Image();
    divide.rightImage.addEventListener('load', divide.draw);
    divide.rightImage.src = e.target.result;
  };
});
divide.rightZoom.addEventListener('input', divide.draw);
divide.rightAlpha.addEventListener('input', divide.draw);

divide.canvas.addEventListener('mousedown', function (e) {
  divide.lastX = e.clientX - this.getBoundingClientRect().left + pageXOffset;
  divide.lastY = e.clientY - this.getBoundingClientRect().top + pageYOffset;
  if (divide.lastX < divide.canvas.clientWidth / 2) {
    divide.pressed = 'left';
  } else {
    divide.pressed = 'right';
  }
  divide.draw();
});
divide.canvas.addEventListener('mouseup', function () {
  divide.pressed = undefined;
});
divide.canvas.addEventListener('mouseleave', function () {
  divide.pressed = undefined;
});
divide.canvas.addEventListener('mousemove', function (e) {
  if (divide.pressed) {
    var x = e.clientX - this.getBoundingClientRect().left + pageXOffset;
    var y = e.clientY - this.getBoundingClientRect().top + pageYOffset;
    divide[divide.pressed + 'CenterX'] += (x - divide.lastX);
    divide[divide.pressed + 'CenterY'] += (y - divide.lastY);
    divide.lastX = x;
    divide.lastY = y;
    divide.draw();
  }
});
divide.canvas.addEventListener('touchstart', function (e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    var touch = e.touches[0];
    divide.lastX = touch.clientX - this.getBoundingClientRect().left + pageXOffset;
    divide.lastY = touch.clientY - this.getBoundingClientRect().top + pageYOffset;
    if (divide.lastX < divide.canvas.clientWidth / 2) {
      divide.pressed = 'left';
    } else {
      divide.pressed = 'right';
    }
    divide.draw();
  }
});
divide.canvas.addEventListener('touchmove', function (e) {
  e.preventDefault();
  if (e.touches.length === 1) {
    var touch = e.touches[0];
    var x = touch.clientX - this.getBoundingClientRect().left + pageXOffset;
    var y = touch.clientY - this.getBoundingClientRect().top + pageYOffset;
    divide[divide.pressed + 'CenterX'] += (x - divide.lastX);
    divide[divide.pressed + 'CenterY'] += (y - divide.lastY);
    divide.lastX = x;
    divide.lastY = y;
    divide.draw();
  }
});

divide.save.addEventListener('click', function () {
  divide.canvas.toBlob(function (blob) {
    window.saveAs(blob, 'avatar.png');
  });
});

var mask = new Image();
mask.addEventListener('load', function () {
  full.draw();
  divide.draw();
});
mask.setAttribute('crossOrigin', 'anonymous');
mask.src = 'mask.png';

var intro = $('#intro');

$('#choice-full').addEventListener('click', function () {
  full.style.display = 'block';
  divide.style.display = 'none';
  intro.className = 'chosen';
});
$('#choice-divide').addEventListener('click', function () {
  divide.style.display = 'block';
  full.style.display = 'none';
  intro.className = 'chosen';
});
$('#return-intro').addEventListener('click', function () {
  intro.className = '';
});

function $(selector) {
  return document.querySelector(selector);
}
