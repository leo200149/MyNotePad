var Constants = function () {
    var config = {
        floatBoard: {
            exponentCenter: 127,
            fractionSize: 23
        },
        doubleBoard: {
            exponentCenter: 1023,
            fractionSize: 52
        }
    };
    return {
        getExponentCenter: function (boardName) {
            return config[boardName].exponentCenter;
        },
        getExponentSize: function (boardName) {
            return config[boardName].exponentCenter;
        },
        getFractionSize: function (boardName) {
            return config[boardName].fractionSize;
        }
    }
}();


function getExponent(binaryStr, exponentCenter) {
    var exponent = binaryStr.indexOf('.') - 1;
    exponent == -2 ? exponent = binaryStr.length - 1 + exponentCenter : exponent += exponentCenter;
    var exponentBinary = exponent.toString(2);
    return exponentBinary;
}

function getFraction(binaryStr, fractionSize) {
    var fraction = binaryStr.replace('.', '');
    fraction = fraction.substr(1);
    var addLength = fractionSize - fraction.length;
    for (var i = 0; i < addLength; i++)fraction += '0';
    fraction = fraction.substr(0, fractionSize);
    return fraction;
}

function parseToBinary(num, exponentCenter, fractionSize) {
    var binary = '';
    num >= 0 ? binary += '0' : binary += '1';
    var binaryStr = new Number(num).toString(2);
    binary += getExponent(binaryStr, exponentCenter);
    binary += getFraction(binaryStr, fractionSize);
    return binary;
}

function parseToNumber(binary, exponentCenter, fractionSize) {
    var fixed = Math.floor(Math.log10(Math.pow(2, fractionSize + 1)));
    var exponentSize = Math.log2(exponentCenter + 1);
    var exponent = binary.substr(1, exponentSize + 1);
    var fraction = binary.substr(exponentSize + 2);
    fraction = '1' + fraction;
    exponent = parseInt(exponent, 2) - exponentCenter;
    var number = 0;
    for (var i = 0; i < fraction.length; i++) {
        number += fraction.charAt(i) * Math.pow(2, exponent);
        exponent--;
    }
    var intSize = ('' + number).indexOf('.');
    if (intSize == -1) {
        fixed = 0;
    } else {
        fixed = fixed - intSize;
    }
    return number.toFixed(fixed);
}

function initBoard(boardName) {
    initTable(boardName);
    initEvent(boardName);
}

function initTable(boardName) {
    var board = $('#' + boardName);
    var table = board.find('.bitsBoard');
    var ths = table.find('th');
    var tr = $('<tr>');
    for (var i = 0; i < ths.length; i++) {
        var th = $(ths[i]);
        var className = th.attr('class');
        var tdCount = th.attr('colspan');
        for (var j = 0; j < tdCount; j++) {
            var td = $('<td>');
            td.addClass('bit-td');
            td.addClass(className);
            td.text(0);
            tr.append(td);
        }
    }
    table.append(tr);
}

function initEvent(boardName) {
    var board = $('#'+boardName);
    var numInput = board.find('.numberInput');
    var binaryInput = board.find('.binaryInput');
    var toBinaryBtn = board.find('.toBinaryBtn');
    var toNumberBtn = board.find('.toNumberBtn');
    var resultPad = board.find('.resultPad');
    var tds = board.find('.bit-td');
    numInput.bind('keyup', function (event) {
        var number = $(this).val();
        if (isNaN(number)) {
            numInput.val(number.slice(0, -1));
        }
    });
    binaryInput.bind('keyup', function (event) {
        var binary = $(this).val();
        var notBinary = /[^10.]/g.exec(binary) !== null;
        if (isNaN(binary) || notBinary) {
            binaryInput.val(binary.slice(0, -1));
        }
    });
    toBinaryBtn.bind('click', function (event) {
        var number = numInput.val();
        if (!isNaN(number) && number != 0) {
            var binary = parseToBinary(number, Constants.getExponentCenter(boardName), Constants.getFractionSize(boardName));
            for (var i = 0; i < tds.length; i++) {
                var td = tds[i];
                td.textContent = binary.charAt(i);
            }
            binaryInput.val(binary);
            resultPad.text(binary);
        }
    });
    toNumberBtn.bind('click', function (event) {
        var binary = binaryInput.val();
        if (binary.length > 0) {
            var number = parseToNumber(binary, Constants.getExponentCenter(boardName), Constants.getFractionSize(boardName));
            numInput.val(number);
            resultPad.text(number);
        }
    });
}

initBoard('floatBoard');
initBoard('doubleBoard');