
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const LINE_SIZE = 3;
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT= 700;
const DEFAULT_PIN_SIZE = 15;
const DEFAULT_TARGET_SIZE = 150;
const DEFAULT_HAVE_PIN_Y = 570;
const DEFAULT_PIN_LINE_SIZE = 30;
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
var WIDTH = DEFAULT_WIDTH;
var HEIGHT = DEFAULT_HEIGHT;
var SCALE = HEIGHT / DEFAULT_HEIGHT;
var TARGET_CENTER = { x: WIDTH/2, y: HAVE_PIN_Y/2 };
var PIN_SIZE = DEFAULT_PIN_SIZE * SCALE;
var TARGET_SIZE = DEFAULT_TARGET_SIZE * SCALE;
var HAVE_PIN_Y = DEFAULT_HAVE_PIN_Y * SCALE;
var PIN_LINE_SIZE = DEFAULT_PIN_LINE_SIZE * SCALE;


function startRotate() {
    for (var i in pinLocation) {
        pinLocation[i] = (pinLocation[i] + 1) % 360;
    }
    if (!isGameOver) {
        paintTarget();
        setTimeout(startRotate, 100 / LEVEL[currentLevel].speed);
    }
}

function paintTarget(event) {
    var location = pinLocation.slice();
    ctx.clearRect(0, 0, WIDTH, HAVE_PIN_Y);

    paintArc(TARGET_CENTER.x, TARGET_CENTER.y, PIN_SIZE, 5, 'black', true);
    for (var i = 0; i < location.length; i++) {
        var radian = Math.PI * 2 / 360 * ((location[i]) % 360);
        var pinX = TARGET_SIZE * Math.cos(radian) + TARGET_CENTER.x;
        var pinY = TARGET_SIZE * Math.sin(radian) + TARGET_CENTER.y;
        var lineX = (TARGET_SIZE - PIN_SIZE) * Math.cos(radian) + TARGET_CENTER.x;
        var lineY = (TARGET_SIZE - PIN_SIZE) * Math.sin(radian) + TARGET_CENTER.y;
        paintArc(pinX, pinY, PIN_SIZE, LINE_SIZE, 'black', false);
        paintLine(TARGET_CENTER.x, TARGET_CENTER.y, lineX, lineY, 'black', LINE_SIZE);
    }
    if (event != null) {
        setTimeout(event, 100);
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
    ctx.clearRect(0, HAVE_PIN_Y, WIDTH, HEIGHT-HAVE_PIN_Y);
    if (havePinCount > 0) {
        paintLine(TARGET_CENTER.x, HAVE_PIN_Y, TARGET_CENTER.x, HAVE_PIN_Y+PIN_LINE_SIZE, 'black', LINE_SIZE);
    }
    for (var i = 0; i < havePinCount; i++) {
        paintArc(TARGET_CENTER.x, HAVE_PIN_Y+PIN_LINE_SIZE + (i * PIN_SIZE * 2), PIN_SIZE, LINE_SIZE, 'black', false);
    }
}

function initDefaultPin() {
    var level = LEVEL[currentLevel];
    pinLocation = level.defaultLocation.slice();
    havePinCount = level.pinCount;
    isGameOver = false;
}

function checkPinPass() {
    var location = pinLocation.slice();
    location = location.sort(function (a, b) { return a - b; });
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
                //console.log('(' + currentPin + ',' + pin + '),' + '(' + currentPinX + ',' + currentPinY + '),' + '(' + pinX + ',' + pinY + ')' + ',result:' + l);
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
    paintHavePin();
    if (!checkPinPass()) {
        isGameOver = true;
        clearAllTimeout();
        paintTarget(function () {
            document.getElementsByTagName('body')[0].onclick = null;
            alert('GAME OVER!');
            init();
        });
    } else if (havePinCount <= 0) {
        isGameOver = true;
        clearAllTimeout();
        paintTarget(function () {
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

function resizeCanvas() {
    WIDTH = canvas.width = window.innerWidth;
    HEIGHT = canvas.height = window.innerHeight;
    SCALE = HEIGHT / DEFAULT_HEIGHT;
    if(WIDTH < DEFAULT_WIDTH){
        SCALE *= WIDTH/DEFAULT_WIDTH;
    }
    PIN_SIZE = DEFAULT_PIN_SIZE * SCALE;
    TARGET_SIZE = DEFAULT_TARGET_SIZE * SCALE;
    HAVE_PIN_Y = DEFAULT_HAVE_PIN_Y * SCALE;
    PIN_LINE_SIZE = DEFAULT_PIN_LINE_SIZE * SCALE;
    TARGET_CENTER.x = WIDTH / 2;
    TARGET_CENTER.y = HAVE_PIN_Y / 2;
    console.log(TARGET_CENTER);
}

function init() {
    clearAllTimeout();
    window.removeEventListener('resize', resizeCanvas, false);
    window.addEventListener('resize', resizeCanvas, false);
    document.getElementsByTagName('body')[0].onclick = click;
    resizeCanvas();
    initDefaultPin();
    paintTarget();
    paintHavePin();
    startRotate();
}

init();


