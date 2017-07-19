(function () {

    function getExponent(binaryStr, exponentCenter) {
        var exponent = binaryStr.indexOf('.') - 1;
        var exponentSize = Math.log2(exponentCenter + 1) + 1;
        exponent == -2 ? exponent = binaryStr.length - 1 + exponentCenter : exponent += exponentCenter;
        var exponentBinary = exponent.toString(2);
        var loseLength = exponentSize - exponentBinary.length;
        for (var i = 0; i < loseLength; i++)exponentBinary = '0' + exponentBinary;
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

    function parseToBinary(number, exponentCenter, fractionSize) {
        var binary = '';
        number >= 0 ? binary += '0' : binary += '1';
        var binaryStr = new Number(Math.abs(number)).toString(2);
        var exponentBinary = getExponent(binaryStr, exponentCenter);
        var fractionBinary = getFraction(binaryStr, fractionSize);
        binary += exponentBinary;
        binary += fractionBinary;
        return binary;
    }

    function parseToNumber(binary, exponentCenter, fractionSize) {
        var fixed = Math.floor(Math.log10(Math.pow(2, fractionSize + 1)));
        var exponentSize = Math.log2(exponentCenter + 1) + 1;
        var sign = binary.charAt(0);
        var exponent = binary.substr(1, exponentSize);
        var fraction = binary.substr(exponentSize + 1);
        fraction = '1' + fraction;
        exponent = parseInt(exponent, 2) - exponentCenter;
        var number = 0;
        for (var i = 0; i < fraction.length; i++) {
            number += fraction.charAt(i) * Math.pow(2, exponent);
            exponent--;
        }
        number = number * (sign==0?1:-1);
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
        var board = $('#' + boardName);
        var exponentCenter = new Number(Math.pow(2, board.find('th[class="exponent"]').attr('colspan') - 1) - 1);
        var exponentSize = Math.log2(exponentCenter + 1) + 1;
        var fractionSize = new Number(board.find('th[class="fraction"]').attr('colspan'));
        var numInput = board.find('.numberInput');
        var binaryInput = board.find('.binaryInput');
        var toBinaryBtn = board.find('.toBinaryBtn');
        var toNumberBtn = board.find('.toNumberBtn');
        var resultPad = board.find('.resultPad');
        var tds = board.find('.bit-td');
        numInput.bind('keyup', function (event) {
            var number = $(this).val();
            if (number == 0 || (number != '-' && isNaN(number))) {
                numInput.val(number.slice(0, -1));
            }
        });
        binaryInput.bind('keyup', function (event) {
            var binary = $(this).val();
            var notBinary = /[^10]/g.exec(binary) !== null;
            if (isNaN(binary) || notBinary) {
                binaryInput.val(binary.slice(0, -1));
            }
        });
        toBinaryBtn.bind('click', function (event) {
            var number = numInput.val();
            if (!isNaN(number) && number != 0) {
                var binary = parseToBinary(number, exponentCenter, fractionSize);
                var sign = binary.charAt(0);
                var isPositive = sign == 0;
                var exponent = binary.substr(1, exponentSize);
                var fraction = binary.substr(exponentSize + 1);
                var realExponent = parseInt(exponent, 2) - exponentCenter;
                var numberBinary = new Number(number).toString(2);
                var showNumberBinary = numberBinary.length > fractionSize + 1 ? numberBinary.substr(0, fractionSize + 1) + '...' : numberBinary;
                var resultStrs = [];
                resultStrs.push('$' + number + '_{(10)}=' + showNumberBinary + '_{(2)}$');
                resultStrs.push('浮點小數表示法為 $' + (isPositive ? '' : '-') + '1.' + rmZero(fraction) + '*2^{' + realExponent + '}$');
                resultStrs.push('$' + number + (isPositive ? '$為正數' : '$為負數') + '故Sign(符號)為 $' + (isPositive ? 0 : 1) + '$');
                resultStrs.push('Exponent(指數)為 $' + realExponent + '_{(10)}+' + exponentCenter + '_{(10)}=' + exponent + '_{(2)}$');
                resultStrs.push('Fraction(尾數)去掉首碼，補零後為 $' + fraction + '$');
                resultStrs.push('結果為 $' + binary + '$');
                for (var i = 0; i < tds.length; i++) {
                    var td = $(tds[i]);
                    td.text(binary.charAt(i));
                }
                binaryInput.val(binary);
                appendResult(resultPad, resultStrs);
            }
        });
        toNumberBtn.bind('click', function (event) {
            var binary = binaryInput.val();
            if (binary.length > 0) {
                var number = parseToNumber(binary, exponentCenter, fractionSize);
                numInput.val(rmZero(number));
                var sign = binary.charAt(0);
                var isPositive = sign == 0;
                var exponent = binary.substr(1, exponentSize);
                var fraction = binary.substr(exponentSize + 1);
                var realExponent = parseInt(exponent, 2) - exponentCenter;
                var numberBinary = new Number(number).toString(2);
                var showNumberBinary = numberBinary.length > fractionSize + 1 ? numberBinary.substr(0, fractionSize + 1) + '...' : numberBinary;
                var resultStrs = [];
                resultStrs.push('Sign(符號)為 $' + sign + '$ 故數字' + (isPositive ? '為正數' : '為負數') + '');
                resultStrs.push('Exponent(指數)為 $' + exponent + '_{(2)}=' + parseInt(exponent, 2) + '_{(10)}=' + exponentCenter + '_{(10)}+' + realExponent + '_{(10)}$');
                resultStrs.push('Fraction(尾數)為 $' + fraction + '$');
                resultStrs.push('尾數補首碼，去零後浮點小數表示法為' + (isPositive ? '' : '-') + '$1.' + rmZero(fraction) + '*2^{' + realExponent + '}$');
                resultStrs.push('還原為普通二進位 $' + showNumberBinary + '_{(2)}$');
                resultStrs.push('二進位轉十進位結果為 $' + rmZero(number) + '_{(10)}$');
                appendResult(resultPad, resultStrs);
            }
        });
    }

    function rmZero(number) {
        return number.replace(/0{2,}$/g, '');
    }

    function appendResult(resultPad, strs) {
        resultPad.empty();
        for (var i = 0; i < strs.length; i++) {
            var p = $('<p>');
            p.text(strs[i]);
            resultPad.append(p);
        }
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    initBoard('floatBoard');
    initBoard('doubleBoard');
})();