'use strict';

angular.module('app').factory('calculatorService', function () {
    var OPERATORS = ['+', '-', '=', '/', '*'];

    var isNumber = function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    }

    var isOperator = function(value) {
        return OPERATORS.indexOf(value) > -1;
    }

    var calculatePercentage = function(value) {
        return value / 100;
    }

    var calculate = function(valueA, valueB, operator) {
        var result;
        switch (operator) {
            case '+': 
                result = parseFloat(valueA) + parseFloat(valueB);
            break;
            case '-': 
                result = parseFloat(valueA) - parseFloat(valueB);
            break;
            case '/': 
                if (valueB == 0) {
                    throw new Error("Can't divide by zero");
                }
                result = parseFloat(valueA) / parseFloat(valueB);
            break;
            case '*': 
                result = parseFloat(valueA) * parseFloat(valueB);
            break;
            default: 
                throw new Error("Invalid operator") 
        }

        if (!isNumber(result)) {
            throw new Error("Calculation error");
        }

        return result;
    };

    return {
        calculate: calculate,
        calculatePercentage: calculatePercentage,
        isOperator: isOperator,
        isNumber: isNumber
    };

});
