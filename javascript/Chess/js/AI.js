var AI = function (chess) {
	var chessmans = chess.getChessmans();
	var WIDTH = chess.getWidth();
	var HEIGHT = chess.getHeight();
	var step = 0;
	var ai = {
		getListener: function () {
			return function () {
				ai.start();
				return true;
			};
		},
		start: function () {
			setTimeout(function () {
				var mapGrids = chess.getMapGrids();
				var pickGrid = null;
				var secondGrid = null;
				var currentColor = chess.getCurrentColor();
				var willMoveGrids = [];

				function testPick() {
					var x = 0;
					var y = 0;
					do {
						x = Math.floor(Math.random() * (WIDTH));
						y = Math.floor(Math.random() * (HEIGHT));
						pickGrid = mapGrids[y][x];
					} while (!(pickGrid.chessman && pickGrid.chessman.color == currentColor));
				}

				function testNext() {
					var i = 0;
					do {
						x = Math.floor(Math.random() * (WIDTH));
						y = Math.floor(Math.random() * (HEIGHT));
						secondGrid = mapGrids[y][x];
						if (secondGrid.chessman && secondGrid.chessman.moveRule == 4
							&& chess.checkMoveRule(pickGrid, secondGrid)) {
							break;
						}
						if (i > 5) {
							testPick();
							i = 0;
						}
						i++;
					} while (!chess.checkMoveRule(pickGrid, secondGrid));
				}

				function checkLose() {
					var generalChessman = null;
					for (var i = 0; i < chessmans.length; i++) {
						if (chessmans[i] != null) {
							if (chessmans[i].moveRule == 4 && chessmans[i].color == currentColor) {
								generalChessman = chessmans[i];
								break;
							}
						}
					}
					var generalGrid = mapGrids[generalChessman.location.y][generalChessman.location.x];
					for (var i = 0; i < chessmans.length; i++) {
						if (chessmans[i] != null) {
							if (chessmans[i].color != currentColor) {
								var chessman = chessmans[i];
								var grid = mapGrids[chessman.location.y][chessman.location.x];
								if (chess.checkMoveRule(grid, generalGrid)) {
									return true;
								}
							}
						}
					}
					return false;
				}

				function countChessman() {
					var enemys = [];
					var mates = [];
					var result = {};
					for (var i = 1; i < chessmans.length; i++) {
						var chessman = chessmans[i];
						if (chessman.color == currentColor) {
							mates.push(chessman);
						} else {
							enemys.push(chessman);
						}
					}
					mates.sort(function (a, b) {
						return b.combatScore - a.combatScore;
					});
					enemys.sort(function (a, b) {
						return b.combatScore - a.combatScore;
					});
					result.mates = mates;
					result.enemys = enemys;
					return result;
				}

				function getCanMoveGrid(pickGrid) {
					var canMoveGrid = [];
					for (var i = 0; i < mapGrids.length; i++) {
						var mapGridLines = mapGrids[i];
						for (var j = 0; j < mapGridLines.length; j++) {
							var grid = mapGridLines[j];
							if (chess.checkMoveRule(pickGrid, grid)) {
								canMoveGrid.push(grid);
							}
						}
					}
					return canMoveGrid;
				}

				//				function pick(){
				//					var result =countChessman();
				//					var mates = result.mates;
				//					var enemys = result.enemys;
				//					for(var enemyIndex=0;enemyIndex<enemys.length;enemyIndex++){
				//						var enemy = enemys[enemyIndex];
				//						var enemyGrid = mapGrids[enemy.location.y][enemy.location.x];
				//					}
				//					for(var mateIndex =0;mateIndex<mates.length;mateIndex++){
				//						var mate = mates[mateIndex];
				//						
				//					}
				//				}
				//				function next(){
				//					
				//				}

				testPick();
				testNext();
				pickGrid.uiObject.click();
				secondGrid.uiObject.click();
				step++;
				mapGrids = null;
				pickGrid = null;
				secondGrid = null;
			}, 500);
		}
	};
	return ai;
};