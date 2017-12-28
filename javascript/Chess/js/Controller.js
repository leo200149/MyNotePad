var chess = null;
var score = { red: 0, black: 0 };

var showCurrentColor = function (currentColor) {
	$('#resetBtn').attr('class', currentColor);
};

function start1P() {
	if (chess != null) {
		chess.destroy();
	}
	chess = new Chess.Controller({ showCurrentColor: showCurrentColor });
	var ai1 = new AI(chess);
	chess.init(ai1.getListener());
}
function start2P() {
	if (chess != null) {
		chess.destroy();
	}
	chess = new Chess.Controller({ showCurrentColor: showCurrentColor });
	chess.init();
}

function startAI() {
	if (chess != null) {
		chess.destroy();
	}
	chess = new Chess.Controller({ showCurrentColor: showCurrentColor });
	var ai1 = new AI(chess);
	var ai2 = new AI(chess);
	chess.init(ai1.getListener(), ai2.getListener());
	ai2.start();
}

function resetAll() {
	score = { red: 0, black: 0 };
	$('#resetBtn').attr('class', '');
	start2P();
}

function addScore(winner) {
	score[winner]++;
	$('#score').text('RED:' + score.red + ',BLACK:' + score.black);
}
