
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const PIN_SIZE = 15;
const TARGET_SIZE = 150;
const TARGET_CENTER = { x: 250, y: 275 };
const FPS = 1000 / 60;
const WIDTH = canvas.width;
const HEIGHT = canvas.HEIGHT;
const LEVEL = [
    { speed: 10, pinCount: 5, defaultLocation: [0, 60, 120, 180, 240, 300] },
    { speed: 10, pinCount: 8, defaultLocation: [0, 30, 90, 120, 180, 210, 270, 300] },
    { speed: 10, pinCount: 9, defaultLocation: [0, 20, 40, 120, 140, 160, 240, 260, 280] },
    { speed: 10, pinCount: 6, defaultLocation: [0, 20, 60, 80, 120, 140, 180, 200, 240, 260, 300, 320] },
    { speed: 15, pinCount: 6, defaultLocation: [0, 20, 60, 80, 120, 140, 180, 200, 240, 260, 300, 320] },
    { speed: 15, pinCount: 6, defaultLocation: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] }
];
var currentLevel = 0;
var pinLocation = [];
var havePinCount = 5;
var isGameOver = false;
var events = [];

function startRotate() {
    for (var i in pinLocation) {
        pinLocation[i] = (pinLocation[i] + 1) % 360;
    }
    if (!isGameOver) {
        setTimeout(startRotate, 100 / LEVEL[currentLevel].speed);
    }
}


function paintTarget(event) {
    // 取得 Canvas 元素
    // 建立繪製物件
    var location = pinLocation.slice();
    ctx.clearRect(0, 0, WIDTH, 570);

    paintArc(TARGET_CENTER.x, TARGET_CENTER.y, PIN_SIZE, 5, 'black', true);
    for (var i = 0; i < location.length; i++) {
        var radian = Math.PI * 2 / 360 * ((location[i]) % 360);
        var pinX = TARGET_SIZE * Math.cos(radian) + TARGET_CENTER.x;
        var pinY = TARGET_SIZE * Math.sin(radian) + TARGET_CENTER.y;
        var lineX = (TARGET_SIZE - PIN_SIZE) * Math.cos(radian) + TARGET_CENTER.x;
        var lineY = (TARGET_SIZE - PIN_SIZE) * Math.sin(radian) + TARGET_CENTER.y;
        paintArc(pinX, pinY, PIN_SIZE, 3, 'black', false);
        paintLine(TARGET_CENTER.x, TARGET_CENTER.y, lineX, lineY, 'black', 3);
    }
    paintHavePin();
    if (event == null) {
        event = events.pop();
    } else {
        event();
        event = null;
    }
    if (!isGameOver) {
        setTimeout(function () {
            paintTarget(event);
        }, FPS);
    }
}

function paintArc(x, y, r, l, c, isFill) {
    ctx.lineWidth = l;
    ctx.strokeStyle = c;
    ctx.color = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    isFill ? ctx.fill() : ctx.stroke();
    ctx.closePath();
}

function paintLine(x, y, toX, toY, c, l) {
    ctx.lineWidth = l;
    ctx.strokeStyle = c;
    ctx.color = c;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.closePath();
}

function paintHavePin() {
    ctx.clearRect(0, 570, WIDTH, 200);
    if (havePinCount > 0) {
        paintLine(250, 570, 250, 600, 'black', 3);
    }
    for (var i = 0; i < havePinCount; i++) {
        paintArc(250, 600 + (i * PIN_SIZE * 2 + 10), PIN_SIZE, 3, 'black', false);
    }
}

function initDefaultPin() {
    var level = LEVEL[currentLevel];
    pinLocation = level.defaultLocation.slice();
    console.log(pinLocation);
    havePinCount = level.pinCount;
    isGameOver = false;
}

function checkPinPass() {
    var location = pinLocation.slice();
    location = location.sort(function (a, b) { return a - b; });
    console.log(location);
    var result = true;
    for (var i = 0; i < location.length; i++) {
        var currentPin = location[i];
        var currentRadian = Math.PI * 2 / 360 * currentPin;
        var currentPinX = TARGET_SIZE * Math.cos(currentRadian) + TARGET_CENTER.x;
        var currentPinY = TARGET_SIZE * Math.sin(currentRadian) + TARGET_CENTER.y;
        var pin = location[i + 1];
        if (pin != null) {
            var radian = Math.PI * 2 / 360 * pin;
            var pinX = TARGET_SIZE * Math.cos(radian) + TARGET_CENTER.x;
            var pinY = TARGET_SIZE * Math.sin(radian) + TARGET_CENTER.y;
            if (Math.abs(pinX - currentPinX) < (PIN_SIZE * 2) && Math.abs(pinX - currentPinX) < (PIN_SIZE * 2)) {
                var l = Math.sqrt(Math.pow(pinX - currentPinX, 2) + Math.pow(pinY - currentPinY, 2));
                console.log('(' + currentPin + ',' + pin + '),' + '(' + currentPinX + ',' + currentPinY + '),' + '(' + pinX + ',' + pinY + ')' + ',result:' + l);
                if (l < (PIN_SIZE * 2)) {
                    result = false;
                    break;
                }
            }
        }
    }
    return result;
}

function clearAllTimeout() {
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
        window.clearTimeout(id);
    }
}


function click() {
    havePinCount--;
    pinLocation.push(90);
    if (!checkPinPass()) {
        events.push(function () {
            isGameOver = true;
            document.getElementsByTagName('body')[0].onclick = null;
            alert('GAME OVER!');
            init();
        });
    } else if (havePinCount <= 0) {
        events.push(function () {
            isGameOver = true;
            currentLevel++;
            if (currentLevel <= LEVEL.length) {
                alert('YOU WIN! START NEXT LEVEL!');
                init();
            } else {
                alert('YOU WIN ALL LEVELS! YOU ARE THE KING!');
            }
        });
    }
}

function init() {
    clearAllTimeout();
    document.getElementsByTagName('body')[0].onclick = click;
    initDefaultPin();
    paintTarget();
    startRotate();
}

init();


