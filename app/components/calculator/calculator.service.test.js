describe('calculator service', function() {

    var calculatorService;

    beforeEach(module('app'));

    beforeEach(function() {
        inject(function($injector) {
            calculatorService = $injector.get('calculatorService');
        });
    });

    describe('isNumber', function(){

        it('should return true for numeric strings', function() {
            expect(calculatorService.isNumber('23')).toEqual(true);
            expect(calculatorService.isNumber('23.42')).toEqual(true);
            expect(calculatorService.isNumber('0')).toEqual(true);
        });

        it('should return true for integers', function() {
            expect(calculatorService.isNumber(23)).toEqual(true);
        });

        it('should return true for floats', function() {
            expect(calculatorService.isNumber(23.49)).toEqual(true);
        });

        it('should return true for negative numeric strings', function() {
            expect(calculatorService.isNumber('-2')).toEqual(true);
            expect(calculatorService.isNumber('-2.49')).toEqual(true);
            expect(calculatorService.isNumber('-.49')).toEqual(true);
        });

        it('should return false for NaN', function() {
            expect(calculatorService.isNumber(NaN)).toEqual(false);
        });


        it('should return false for Infinity', function() {
            expect(calculatorService.isNumber(Infinity)).toEqual(false);
        });
        
        it('should return false for undefined', function() {
            expect(calculatorService.isNumber(undefined)).toEqual(false);
        });

        it('should return false for null', function() {
            expect(calculatorService.isNumber(null)).toEqual(false);
        });

    });

    describe('isOperator', function(){
        it('should return true for `+`, `-`, `/`, `=` and `*`', function() {
            expect(calculatorService.isOperator('+')).toEqual(true);
            expect(calculatorService.isOperator('-')).toEqual(true);
            expect(calculatorService.isOperator('/')).toEqual(true);
            expect(calculatorService.isOperator('=')).toEqual(true);
            expect(calculatorService.isOperator('*')).toEqual(true);
        });

        it('should return false for non-operators or empty values', function() {
            expect(calculatorService.isOperator('')).toEqual(false);
            expect(calculatorService.isOperator(NaN)).toEqual(false);
            expect(calculatorService.isOperator(Infinity)).toEqual(false);
            expect(calculatorService.isOperator(null)).toEqual(false);
            expect(calculatorService.isOperator('6')).toEqual(false);
            expect(calculatorService.isOperator(276)).toEqual(false);
        });
    });

    describe('calculatePercentage', function(){
        it('should divide input by 100', function() {
            expect(calculatorService.calculatePercentage(46)).toEqual(0.46);
            expect(calculatorService.calculatePercentage(0)).toEqual(0);
            expect(calculatorService.calculatePercentage(NaN)).toEqual(NaN);
            expect(calculatorService.calculatePercentage(-59)).toEqual(-0.59);
        });
    });

    describe('calculate', function(){
        it('should divide correctly', function() {
            expect(calculatorService.calculate(25, 400, '/')).toEqual(0.0625);
            expect(calculatorService.calculate(0, 400, '/')).toEqual(0);
            expect(calculatorService.calculate(-100, 20, '/')).toEqual(-5);
        });

        it('should multiply correctly', function() {
            expect(calculatorService.calculate(7, 5, '*')).toEqual(35);
            expect(calculatorService.calculate(14, 0, '*')).toEqual(0);
            expect(calculatorService.calculate(0, 2, '*')).toEqual(0);
            expect(calculatorService.calculate(-17, 3, '*')).toEqual(-51);
        });

        it('should add correctly', function() {
            expect(calculatorService.calculate(17, 40, '+')).toEqual(57);
            expect(calculatorService.calculate(14, 0, '+')).toEqual(14);
            expect(calculatorService.calculate(22, -12, '+')).toEqual(10);
            expect(calculatorService.calculate(1, -100, '+')).toEqual(-99);
        });

        it('should substract correctly', function() {
            expect(calculatorService.calculate(20, 40, '-')).toEqual(-20);
            expect(calculatorService.calculate(14, 2, '-')).toEqual(12);
            expect(calculatorService.calculate(100, -12, '-')).toEqual(112);
            expect(calculatorService.calculate(1, -100, '-')).toEqual(101);
        });

        it('should raise an error when dividing by 0', function() {
            expect(function() { calculatorService.calculate(25, 0, '/') }).toThrow(new Error("Can't divide by zero"));
        });

        it('should raise an error when operator is not valid', function() {
            expect(function() { calculatorService.calculate(25, 0, '&') }).toThrow(new Error("Invalid operator"));
        });

        it('should raise an error when some value is not correct by 0', function() {
            expect(function() { calculatorService.calculate(25, NaN, '/') }).toThrow(new Error("Calculation error"));
            expect(function() { calculatorService.calculate(undefined, NaN, '+') }).toThrow(new Error("Calculation error"));
            expect(function() { calculatorService.calculate(Infinity, 40, '*') }).toThrow(new Error("Calculation error"));
            expect(function() { calculatorService.calculate(23, undefined, '-') }).toThrow(new Error("Calculation error"));
        });
    });
});