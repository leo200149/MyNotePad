window.Chess = function (OldChess) {
    var Chess = {
        noConflict: noConflict
    };
    return Chess;

    function noConflict() {
        if (window.Chess === Chess) {
            window.Chess = OldChess;
        }
        return Chess;
    }
}(window.Chess);

Chess.Config = function () {
    var Setting = {
        WIDTH: 9,
        HEIGHT: 10,
        BLACK: 'black',
        RED: 'red',
        RULE_MAPPING: {
            CAR: 0,
            HORSE: 1,
            MINISTER: 2,
            KNIGHT: 3,
            GENERAL: 4,
            GUN: 5,
            SOLDIER: 6
        },
        ChessmanSetting: function () {
            var setting = [
                {
                    "id": "1",
                    "name": "車",
                    "moveRule": Setting.RULE_MAPPING.CAR,
                    "color": Setting.BLACK,
                    "location": { "x": "0", "y": "9" },
                    "combat": [[5, 5, 5, 8, 8, 8, 5, 5, 5], [8, 8, 8, 5, 5, 5, 5, 5, 5, 5]]
                },
                {
                    "id": "2",
                    "name": "車",
                    "moveRule": Setting.RULE_MAPPING.CAR,
                    "color": Setting.BLACK,
                    "location": { "x": "8", "y": "9" },
                    "combat": [[5, 5, 5, 8, 8, 8, 5, 5, 5], [8, 8, 8, 5, 5, 5, 5, 5, 5, 5]]
                },
                {
                    "id": "3",
                    "name": "馬",
                    "moveRule": Setting.RULE_MAPPING.HORSE,
                    "color": Setting.BLACK,
                    "location": { "x": "1", "y": "9" },
                    "combat": [[4, 4, 7, 7, 7, 7, 7, 4, 4], [7, 7, 7, 4, 4, 4, 4, 4, 4, 4]]
                },
                {
                    "id": "4",
                    "name": "馬",
                    "moveRule": Setting.RULE_MAPPING.HORSE,
                    "color": Setting.BLACK,
                    "location": { "x": "7", "y": "9" },
                    "combat": [[4, 4, 7, 7, 7, 7, 7, 4, 4], [7, 7, 7, 4, 4, 4, 4, 4, 4, 4]]
                },
                {
                    "id": "5",
                    "name": "象",
                    "moveRule": Setting.RULE_MAPPING.MINISTER,
                    "color": Setting.BLACK,
                    "location": { "x": "2", "y": "9" },
                    "combat": [[2, 2, 4, 4, 4, 4, 4, 2, 2], [2, 2, 2, 2, 2, 2, 2, 4, 4, 4]]
                },
                {
                    "id": "6",
                    "name": "象",
                    "moveRule": Setting.RULE_MAPPING.MINISTER,
                    "color": Setting.BLACK,
                    "location": { "x": "6", "y": "9" },
                    "combat": [[2, 2, 4, 4, 4, 4, 4, 2, 2], [2, 2, 2, 2, 2, 2, 2, 4, 4, 4]]
                },
                {
                    "id": "7",
                    "name": "士",
                    "moveRule": Setting.RULE_MAPPING.KNIGHT,
                    "color": Setting.BLACK,
                    "location": { "x": "3", "y": "9" },
                    "combat": [[2, 2, 2, 4, 4, 4, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 4, 4, 4]]
                },
                {
                    "id": "8",
                    "name": "士",
                    "moveRule": Setting.RULE_MAPPING.KNIGHT,
                    "color": Setting.BLACK,
                    "location": { "x": "5", "y": "9" },
                    "combat": [[2, 2, 2, 4, 4, 4, 2, 2, 2], [2, 2, 2, 2, 2, 2, 2, 4, 4, 4]]
                },
                {
                    "id": "9",
                    "name": "包",
                    "moveRule": Setting.RULE_MAPPING.GUN,
                    "color": Setting.BLACK,
                    "location": { "x": "1", "y": "7" },
                    "combat": [[4, 4, 4, 7, 7, 7, 4, 4, 4], [7, 7, 7, 4, 4, 4, 4, 4, 4, 4]]
                },
                {
                    "id": "10",
                    "name": "包",
                    "moveRule": Setting.RULE_MAPPING.GUN,
                    "color": Setting.BLACK,
                    "location": { "x": "7", "y": "7" },
                    "combat": [[4, 4, 4, 7, 7, 7, 4, 4, 4], [7, 7, 7, 4, 4, 4, 4, 4, 4, 4]]
                },
                {
                    "id": "11",
                    "name": "卒",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.BLACK,
                    "location": { "x": "0", "y": "6" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [6, 6, 6, 6, 3, 3, 6, 3, 3, 3]]
                },
                {
                    "id": "12",
                    "name": "卒",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.BLACK,
                    "location": { "x": "2", "y": "6" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [6, 6, 6, 6, 3, 3, 6, 3, 3, 3]]
                },
                {
                    "id": "13",
                    "name": "卒",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.BLACK,
                    "location": { "x": "4", "y": "6" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [6, 6, 6, 6, 3, 3, 6, 3, 3, 3]]
                },
                {
                    "id": "14",
                    "name": "卒",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.BLACK,
                    "location": { "x": "6", "y": "6" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [6, 6, 6, 6, 3, 3, 6, 3, 3, 3]]
                },
                {
                    "id": "15",
                    "name": "卒",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.BLACK,
                    "location": { "x": "8", "y": "6" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [6, 6, 6, 6, 3, 3, 6, 3, 3, 3]]
                },
                {
                    "id": "16",
                    "name": "將",
                    "moveRule": Setting.RULE_MAPPING.GENERAL,
                    "color": Setting.BLACK,
                    "location": { "x": "4", "y": "9" },
                    "combat": [[10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]]
                },
                {
                    "id": "17",
                    "name": "俥",
                    "moveRule": "0",
                    "color": Setting.RED,
                    "location": { "x": "0", "y": "0" },
                    "combat": [[5, 5, 5, 8, 8, 8, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 8, 8, 8]]
                },
                {
                    "id": "18",
                    "name": "俥",
                    "moveRule": "0",
                    "color": Setting.RED,
                    "location": { "x": "8", "y": "0" },
                    "combat": [[5, 5, 5, 8, 8, 8, 5, 5, 5], [5, 5, 5, 5, 5, 5, 5, 8, 8, 8]]
                },
                {
                    "id": "19",
                    "name": "傌",
                    "moveRule": Setting.RULE_MAPPING.HORSE,
                    "color": Setting.RED,
                    "location": { "x": "1", "y": "0" },
                    "combat": [[4, 4, 7, 7, 7, 7, 7, 4, 4], [4, 4, 4, 4, 4, 4, 4, 7, 7, 7]]
                },
                {
                    "id": "20",
                    "name": "傌",
                    "moveRule": Setting.RULE_MAPPING.HORSE,
                    "color": Setting.RED,
                    "location": { "x": "7", "y": "0" },
                    "combat": [[4, 4, 7, 7, 7, 7, 7, 4, 4], [4, 4, 4, 4, 4, 4, 4, 7, 7, 7]]
                },
                {
                    "id": "21",
                    "name": "相",
                    "moveRule": Setting.RULE_MAPPING.MINISTER,
                    "color": Setting.RED,
                    "location": { "x": "2", "y": "0" },
                    "combat": [[2, 2, 4, 4, 4, 4, 4, 2, 2], [4, 4, 4, 2, 2, 2, 2, 2, 2, 2]]
                },
                {
                    "id": "22",
                    "name": "相",
                    "moveRule": Setting.RULE_MAPPING.MINISTER,
                    "color": Setting.RED,
                    "location": { "x": "6", "y": "0" },
                    "combat": [[2, 2, 4, 4, 4, 4, 4, 2, 2], [4, 4, 4, 2, 2, 2, 2, 2, 2, 2]]
                },
                {
                    "id": "23",
                    "name": "仕",
                    "moveRule": Setting.RULE_MAPPING.KNIGHT,
                    "color": Setting.RED,
                    "location": { "x": "3", "y": "0" },
                    "combat": [[2, 2, 2, 4, 4, 4, 2, 2, 2], [4, 4, 4, 2, 2, 2, 2, 2, 2, 2]]
                },
                {
                    "id": "24",
                    "name": "仕",
                    "moveRule": Setting.RULE_MAPPING.KNIGHT,
                    "color": Setting.RED,
                    "location": { "x": "5", "y": "0" },
                    "combat": [[2, 2, 2, 4, 4, 4, 2, 2, 2], [4, 4, 4, 2, 2, 2, 2, 2, 2, 2]]
                },
                {
                    "id": "25",
                    "name": "炮",
                    "moveRule": Setting.RULE_MAPPING.GUN,
                    "color": Setting.RED,
                    "location": { "x": "1", "y": "2" },
                    "combat": [[4, 4, 4, 7, 7, 7, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 7, 7, 7]]
                },
                {
                    "id": "26",
                    "name": "炮",
                    "moveRule": Setting.RULE_MAPPING.GUN,
                    "color": Setting.RED,
                    "location": { "x": "7", "y": "2" },
                    "combat": [[4, 4, 4, 7, 7, 7, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 7, 7, 7]]
                },
                {
                    "id": "27",
                    "name": "兵",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.RED,
                    "location": { "x": "0", "y": "3" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [3, 3, 3, 6, 3, 3, 6, 6, 6, 6]]
                },
                {
                    "id": "28",
                    "name": "兵",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.RED,
                    "location": { "x": "2", "y": "3" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [3, 3, 3, 6, 3, 3, 6, 6, 6, 6]]
                },
                {
                    "id": "29",
                    "name": "兵",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.RED,
                    "location": { "x": "4", "y": "3" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [3, 3, 3, 6, 3, 3, 6, 6, 6, 6]]
                },
                {
                    "id": "30",
                    "name": "兵",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.RED,
                    "location": { "x": "6", "y": "3" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [3, 3, 3, 6, 3, 3, 6, 6, 6, 6]]
                },
                {
                    "id": "31",
                    "name": "兵",
                    "moveRule": Setting.RULE_MAPPING.SOLDIER,
                    "color": Setting.RED,
                    "location": { "x": "8", "y": "3" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [3, 3, 3, 6, 3, 3, 6, 6, 6, 6]]
                },
                {
                    "id": "32",
                    "name": "帥",
                    "moveRule": Setting.RULE_MAPPING.GENERAL,
                    "color": Setting.RED,
                    "location": { "x": "4", "y": "0" },
                    "combat": [[3, 3, 6, 6, 6, 6, 6, 3, 3], [3, 3, 3, 6, 3, 3, 6, 6, 6, 6]]
                }
            ];
            return setting;
        }
    };
    return Setting;
}();

Chess.Rule = function (config) {
    function car(mapGridOld, mapGridNew, chess) {
        var oldX = mapGridOld.x;
        var oldY = mapGridOld.y;
        var newX = mapGridNew.x;
        var newY = mapGridNew.y;
        var mapGrids = chess.getMapGrids();
        if (!checkIsSameColor(mapGridOld, mapGridNew)) {
            return false;
        };
        if ((newX - oldX) * (newY - oldY) == 0) {
            if (newX - oldX > 0) {
                for (var i = oldX + 1; i < newX; i++) {
                    if (mapGrids[oldY][i].chessman) {
                        return false;
                    }
                }
            } else if (newX - oldX < 0) {
                for (var i = oldX - 1; i > newX; i--) {
                    if (mapGrids[oldY][i].chessman) {
                        return false;
                    }
                }
            } else if (newY - oldY > 0) {
                for (var i = oldY + 1; i < newY; i++) {
                    if (mapGrids[i][oldX].chessman) {
                        return false;
                    }
                }
            } else if (newY - oldY < 0) {
                for (var i = oldY - 1; i > newY; i--) {
                    if (mapGrids[i][oldX].chessman) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
    function horse(mapGridOld, mapGridNew, chess) {
        var oldX = mapGridOld.x;
        var oldY = mapGridOld.y;
        var newX = mapGridNew.x;
        var newY = mapGridNew.y;
        var mapGrids = chess.getMapGrids();
        if (!checkIsSameColor(mapGridOld, mapGridNew)) {
            return false;
        };
        if (Math.abs((newX - oldX) * (newY - oldY)) == 2) {
            if (newX - oldX == 2) {
                if (mapGrids[oldY][oldX + 1].chessman) {
                    return false;
                }
            } else if (newX - oldX == -2) {
                if (mapGrids[oldY][oldX - 1].chessman) {
                    return false;
                }
            } else if (newY - oldY == 2) {
                if (mapGrids[oldY + 1][oldX].chessman) {
                    return false;
                }
            } else if (newY - oldY == -2) {
                if (mapGrids[oldY - 1][oldX].chessman) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    function minister(mapGridOld, mapGridNew, chess) {
        var oldX = mapGridOld.x;
        var oldY = mapGridOld.y;
        var newX = mapGridNew.x;
        var newY = mapGridNew.y;
        var mapGrids = chess.getMapGrids();
        if (!checkIsSameColor(mapGridOld, mapGridNew)) {
            return false;
        };
        if (Math.abs((newX - oldX) * (newY - oldY)) == 4 && Math.abs(newX - oldX) == 2 && Math.abs(newY - oldY) == 2) {
            if ((mapGridOld.chessman.color == config.BLACK && newY >= 5) || (mapGridOld.chessman.color == config.RED && newY <= 4)) {
                if (newX - oldX == 2 && newY - oldY == 2) {
                    if (mapGrids[oldY + 1][oldX + 1].chessman) {
                        return false;
                    }
                } else if (newX - oldX == -2 && newY - oldY == -2) {
                    if (mapGrids[oldY - 1][oldX - 1].chessman) {
                        return false;
                    }
                } else if (newX - oldX == 2 && newY - oldY == -2) {
                    if (mapGrids[oldY - 1][oldX + 1].chessman) {
                        return false;
                    }
                } else if (newX - oldX == -2 && newY - oldY == 2) {
                    if (mapGrids[oldY + 1][oldX - 1].chessman) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    function knight(mapGridOld, mapGridNew) {
        var oldX = mapGridOld.x;
        var oldY = mapGridOld.y;
        var newX = mapGridNew.x;
        var newY = mapGridNew.y;
        if (!checkIsSameColor(mapGridOld, mapGridNew)) {
            return false;
        };
        if (Math.abs((newX - oldX) * (newY - oldY)) == 1) {
            if (newX >= 3 && newX <= 5) {
                if (mapGridOld.chessman.color == config.BLACK && newY >= 7) {
                    return true;
                } else if (mapGridOld.chessman.color == config.RED && newY <= 2) {
                    return true;
                }
            }
        }
        return false;
    }
    function general(mapGridOld, mapGridNew, chess) {
        var oldX = mapGridOld.x;
        var oldY = mapGridOld.y;
        var newX = mapGridNew.x;
        var newY = mapGridNew.y;
        var mapGrids = chess.getMapGrids();
        var eatChessman = mapGridNew.chessman;
        if (!checkIsSameColor(mapGridOld, mapGridNew)) {
            return false;
        };
        if (Math.abs(newX - oldX) == 1 || Math.abs(newY - oldY) == 1) {
            if ((newX - oldX) * (newY - oldY) == 0) {
                if (newX >= 3 && newX <= 5) {
                    if (mapGridOld.chessman.color == config.BLACK && newY >= 7) {
                        return true;
                    } else if (mapGridOld.chessman.color == config.RED && newY <= 2) {
                        return true;
                    }
                }
            }
        } else if (eatChessman != null && eatChessman.moveRule == 4 && newX == oldX) {
            if (oldY > newY) {
                for (var i = oldY - 1; i > newY; i--) {
                    if (mapGrids[i][oldX].chessman) {
                        return false;
                    }
                }
            } else {
                for (var i = oldY + 1; i < newY; i++) {
                    if (mapGrids[i][oldX].chessman) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
    function gun(mapGridOld, mapGridNew, chess) {
        var oldX = mapGridOld.x;
        var oldY = mapGridOld.y;
        var newX = mapGridNew.x;
        var newY = mapGridNew.y;
        var mapGrids = chess.getMapGrids();
        var eatChessman = mapGridNew.chessman;
        if (!checkIsSameColor(mapGridOld, mapGridNew)) {
            return false;
        };
        if ((newX - oldX) * (newY - oldY) == 0) {
            var count = 0;
            if (newX - oldX > 0) {
                for (var i = oldX + 1; i < newX; i++) {
                    if (mapGrids[oldY][i].chessman) {
                        count++;
                    }
                }
            } else if (newX - oldX < 0) {
                for (var i = oldX - 1; i > newX; i--) {
                    if (mapGrids[oldY][i].chessman) {
                        count++;
                    }
                }
            } else if (newY - oldY > 0) {
                for (var i = oldY + 1; i < newY; i++) {
                    if (mapGrids[i][oldX].chessman) {
                        count++;
                    }
                }
            } else if (newY - oldY < 0) {
                for (var i = oldY - 1; i > newY; i--) {
                    if (mapGrids[i][oldX].chessman) {
                        count++;
                    }
                }
            }
            if (count > 0) {
                if (!(count == 1 && eatChessman)) {
                    return false;
                }
            } else {
                if (eatChessman) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    function soldier(mapGridOld, mapGridNew) {
        var oldX = mapGridOld.x;
        var oldY = mapGridOld.y;
        var newX = mapGridNew.x;
        var newY = mapGridNew.y;
        if (!checkIsSameColor(mapGridOld, mapGridNew)) {
            return false;
        };
        if (Math.abs(newX - oldX) == 1 || Math.abs(newY - oldY) == 1) {
            if ((newX - oldX) * (newY - oldY) == 0) {
                if (mapGridOld.chessman.color == config.BLACK && newY <= oldY) {
                    if (Math.abs(newX - oldX) > 0 && newY > 4) {
                        return false;
                    }
                    return true;
                } else if (mapGridOld.chessman.color == config.RED && newY >= oldY) {
                    if (Math.abs(newX - oldX) > 0 && newY < 5) {
                        return false;
                    }
                    return true;
                }
            }
        }
        return false;
    }
    var checkIsSameColor = function (mapGridOld, mapGridNew) {
        try {
            if (mapGridNew.chessman && mapGridNew.chessman.color == mapGridOld.chessman.color) {
                return false;
            }
        } catch (e) {
            return false;
        }
        return true;
    };
    return {
        moveRule: [car, horse, minister, knight, general, gun, soldier],
        checkIsSameColor: checkIsSameColor
    }
}(Chess.Config);

Chess.UIController = function (config) {
    var UIController = function (tableObj, fn_showCurrentColor) {
        if (fn_showCurrentColor == null) {
            fn_showCurrentColor = function (currentColor) {
                $('#showColor').attr('class', currentColor);
            };
        }
        var controller = {
            showCurrentColor: fn_showCurrentColor,
            initTable: function () {
                if (tableObj == null) {
                    $('body').append('<div class="boardDiv"><center><table id="board" class="board" cellspacing="0px"/></center></div>');
                    tableObj = $('#board');
                } else {
                    tableObj.attr('id', 'board');
                    tableObj.addClass('board');
                }
            },
            clearTable: function () {
                tableObj.html('');
                $('.boardDiv').remove();
            },
            chooseUI: function (obj, choose) {
                if (choose) {
                    obj.removeClass('notChoose').addClass('choose');
                } else {
                    obj.removeClass('choose').addClass('notChoose');
                }
            },
            canMoveGird: function (obj, isCanMove) {
                if (isCanMove) {
                    obj.addClass('canMoveGrid');
                } else {
                    obj.removeClass('canMoveGrid');
                }
            },
            initMapUI: function (mapGrids, clickEvent) {
                for (var i = 1; i <= config.HEIGHT; i++) {
                    var vIndex = i - 1;
                    var mapGridLines = mapGrids[vIndex];
                    tableObj.append('<tr class="line" id="' + 'mapGridsLines' + vIndex + '"/>');
                    if (i == config.HEIGHT / 2) {
                        tableObj.append('<tr class="centerline" >' +
                            '<td colspan="3" align="center">觀棋不語真君子</td>' +
                            '<td colspan="3" align="center"><span id="showColor">楚河漢界</span></td>' +
                            '<td colspan="3" align="center">起手無回大丈夫</td>' +
                            '</tr>');
                    }
                    for (var j = 1; j <= config.WIDTH; j++) {
                        var backgroundV = 'div-v';
                        var backgroundH = 'div-h';
                        var hIndex = j - 1;
                        if (j == 1) {
                            backgroundH = 'div-hl';
                        } else if (j == config.WIDTH) {
                            backgroundH = 'div-hr';
                        }
                        if (i == config.HEIGHT / 2 || i == config.HEIGHT) {
                            backgroundV = 'div-vt';
                        } else if (i == config.HEIGHT / 2 + 1 || i == 1) {
                            backgroundV = 'div-vb';
                        }
                        $('#mapGridsLines' + (vIndex)).append(
                            '<td class="mapGrid">' +
                            '<div class="' + backgroundH + '"/>' +
                            '<div class="' + backgroundV + '"/>' +
                            '<div class="div-content" id="' + mapGridLines[hIndex].id + '" x="' + mapGridLines[hIndex].x + '" y="' + mapGridLines[hIndex].y + '"/>' +
                            '</td>'
                        );
                        $('#' + mapGridLines[hIndex].id).bind({
                            click: clickEvent
                        });
                        mapGridLines[hIndex].uiObject = $('#' + mapGridLines[hIndex].id);
                    }
                }
            },
            initChessmanUI: function (chessmans) {
                for (var key in chessmans) {
                    var chessman = chessmans[key];
                    $('#map_grid_' + chessman.location.x + chessman.location.y).append(
                        '<div class="button chessman' + chessman.color + '" id="chessman' + chessman.id + '">' +
                        chessman.name +
                        '</div>');
                    chessman.uiObject = $('#chessman' + chessman.id);
                }
            }
        };
        return controller;
    };
    return UIController;
}(Chess.Config);

Chess.Controller = function (config, rule, ui) {

    var Chess = function (option) {

        var mapGrids = [];
        var chessmans = [];
        var currentColor = config.BLACK;
        var blackPickBox = null;
        var redPickBox = null;
        var ailistener = null;
        var ailistener2 = null;
        var showCurrentColor = option.showCurrentColor;
        var tableObj = option.tableObj;
        var uiController = new ui(tableObj, showCurrentColor);

        var Chessman = function (initData) {
            var id = 0;
            var name = '';
            var color = config.BLACK;
            var moveRule = 0;
            var location = {
                x: 0,
                y: 0
            };
            var combat = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
            var combatScore = 0;
            if (initData != null) {
                id = initData.id;
                name = initData.name;
                color = initData.color;
                moveRule = initData.moveRule;
                location = initData.location;
                combat = initData.combat;
                combatScore = combat[0][location.x] * combat[1][location.y];
            }
            return {
                id: id,
                name: name,
                color: color,
                moveRule: moveRule,
                location: location,
                combat: combat,
                combatScore: combatScore,
                uiObject: null
            };
        };

        var MapGrid = function (initData) {
            var x = 0;
            var y = 0;
            var chessman = null;
            if (initData != null) {
                x = initData.x;
                y = initData.y;
                chessman = initData.chessman;
            }
            return {
                id: 'map_grid_' + x + y,
                x: x,
                y: y,
                chessman: chessman,
                uiObject: null
            };
        };

        var PickBox = function (chess) {

            function checkWin(pickChessman, eatChessman) {
                if (eatChessman.moveRule == config.RULE_MAPPING.GENERAL) {
                    addScore(pickChessman.color);
                    alert(pickChessman.color.toUpperCase() + ' WIN!');
                    chess.destroy();
                }
            }

            return {
                pickGrid: null,
                moveGrid: null,
                eatGrid: null,
                clear: function () {
                    this.pickGrid = null;
                    this.moveGrid = null;
                    this.eatGrid = null;
                },
                start: function () {
                    var action = false;

                    function moveChessman(pickGrid, moveGrid, isEat) {
                        if (isEat) {
                            this.eatGrid = moveGrid;
                            chessmans.splice(eatGrid.chessman.id, 1);
                            moveGrid.uiObject.html('');
                        } else {
                            this.moveGrid = moveGrid;
                        }
                        this.pickGrid = pickGrid;
                        moveGrid.uiObject.append(pickGrid.chessman.uiObject);
                        moveGrid.chessman = pickGrid.chessman;
                        moveGrid.chessman.location.x = moveGrid.x;
                        moveGrid.chessman.location.y = moveGrid.y;
                        var combat = moveGrid.chessman.combat;
                        moveGrid.chessman.combatScore = combat[0][moveGrid.x] * combat[1][moveGrid.y];
                        pickGrid.chessman = null;
                        uiController.chooseUI(moveGrid.chessman.uiObject, false);
                        return true;
                    }
                    if (this.pickGrid) {
                        var pickChessman = this.pickGrid.chessman;
                        if (this.moveGrid && rule.moveRule[pickChessman.moveRule](this.pickGrid, this.moveGrid, chess)) {
                            action = moveChessman(this.pickGrid, this.moveGrid, false);
                            this.clear();
                        } else if (this.eatGrid && rule.moveRule[pickChessman.moveRule](this.pickGrid, this.eatGrid, chess)) {
                            var eatChessman = this.eatGrid.chessman;
                            action = moveChessman(this.pickGrid, this.eatGrid, true);
                            checkWin(pickChessman, eatChessman);
                            this.clear();
                        }
                    }
                    return action;
                }
            };
        };

        var showCanMoveGrid = function (grid) {
            var moveRule = rule.moveRule[grid.chessman.moveRule];
            for (var i = 0; i < mapGrids.length; i++) {
                var mapGridLines = mapGrids[i];
                for (var j = 0; j < mapGridLines.length; j++) {
                    if (moveRule(grid, mapGridLines[j], chess)) {
                        uiController.canMoveGird(mapGridLines[j].uiObject, true);
                    }
                }
            }
        };

        var clearCanMoveGrid = function () {
            for (var i = 0; i < mapGrids.length; i++) {
                var mapGridLines = mapGrids[i];
                for (var j = 0; j < mapGridLines.length; j++) {
                    uiController.canMoveGird(mapGridLines[j].uiObject, false);
                }
            }
        };

        var clickEvent = function () {
            var x = $(this).attr('x');
            var y = $(this).attr('y');
            var grid = mapGrids[y][x];
            var action = false;

            function pickOrEat(chessman, pickBox) {
                if (chessman.color == currentColor) {
                    uiController.chooseUI(chessman.uiObject, true);
                    if (pickBox.pickGrid && pickBox.pickGrid != grid) {
                        clearCanMoveGrid();
                        uiController.chooseUI(pickBox.pickGrid.chessman.uiObject, false);
                    }
                    pickBox.pickGrid = grid;
                    showCanMoveGrid(grid);
                } else {
                    if (pickBox.pickGrid) {
                        pickBox.eatGrid = grid;
                        clearCanMoveGrid();
                    }
                }
                return pickBox.start();
            };

            function move(pickBox) {
                if (pickBox.pickGrid != null) {
                    pickBox.moveGrid = grid;
                    clearCanMoveGrid();
                }
                return pickBox.start();
            };

            function click(pickBox) {
                var action = false;
                if (grid.chessman) {
                    var chessman = grid.chessman;
                    action = pickOrEat(chessman, pickBox);
                } else {
                    action = move(pickBox);
                }
                return action;
            };
            if (currentColor == config.BLACK) {
                if (click(blackPickBox)) {
                    currentColor = config.RED;
                    uiController.showCurrentColor(currentColor);
                    if (ailistener) ailistener();
                }
            } else {
                if (click(redPickBox)) {
                    currentColor = config.BLACK;
                    uiController.showCurrentColor(currentColor);
                    if (ailistener2) ailistener2();
                }
            }
        };

        var chess = {
            initMap: function () {
                uiController.initTable();
                for (var i = 0; i < config.HEIGHT; i++) {
                    var mapGridLines = [];
                    for (var j = 0; j < config.WIDTH; j++) {
                        mapGridLines.push(new MapGrid({
                            x: j,
                            y: i,
                            chessman: null
                        }));
                    }
                    mapGrids.push(mapGridLines);
                }
                uiController.initMapUI(mapGrids, clickEvent);
                uiController.showCurrentColor(currentColor);
            },
            initChessman: function () {
                var result = new config.ChessmanSetting();
                for (var i = 0; i < result.length; i++) {
                    var chessman = new Chessman(result[i]);
                    var x = chessman.location.x;
                    var y = chessman.location.y;
                    mapGrids[y][x].chessman = chessman;
                    chessmans[chessman.id] = chessman;
                }
                uiController.initChessmanUI(chessmans);
            },
            initPlayer: function () {
                blackPickBox = new PickBox(this);
                redPickBox = new PickBox(this);
            },
            init: function (listener, listener2) {
                ailistener = listener;
                ailistener2 = listener2;
                this.initMap();
                this.initChessman();
                this.initPlayer();
            },
            destroy: function () {
                mapGrids = [];
                chessmans = [];
                currentColor = config.BLACK;
                blackPickBox = null;
                redPickBox = null;
                ailistener = null;
                ailistener2 = null;
                uiController.clearTable();
            },
            getMapGrids: function () {
                return mapGrids;
            },
            getChessmans: function () {
                return chessmans;
            },
            getCurrentColor: function () {
                return currentColor;
            },
            getWidth: function () {
                return config.WIDTH;
            },
            getHeight: function () {
                return config.HEIGHT;
            },
            checkMoveRule: function (pickGrid, grid) {
                var moveRule = rule.moveRule[pickGrid.chessman.moveRule];
                return moveRule(pickGrid, grid, this);
            }
        };
        return chess;
    }
    return Chess;
}(Chess.Config, Chess.Rule, Chess.UIController);
