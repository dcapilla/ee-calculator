describe('calculator component', function() {
    var $componentController;
  
    beforeEach(module('app'));
    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_;
    }));
  
    describe('initialization', function() {
        it('should call `setInitialValues` function on init', function() {
            var ctrl = $componentController('calculator');
            spyOn(ctrl, 'setInitialValues');

            ctrl.$onInit();

            expect(ctrl.setInitialValues).toHaveBeenCalled();
        });

        it('should set initial values', function() {
            var ctrl = $componentController('calculator');
            ctrl.$onInit();
            expect(ctrl.screenValue).toEqual('');
            expect(ctrl.previousScreenValue).toEqual(null);
            expect(ctrl.previousButtonPressed).toEqual(null);
        });
        
    });
    
    describe('toggleSymbol', function() {
        it('should toggle the symbol of screen value when called', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '56';
            
            ctrl.toggleSymbol();
            
            expect(ctrl.screenValue).toEqual('-56');
        });

        it('should toggle the symbol multiple times', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '-17';
            
            ctrl.toggleSymbol();
            ctrl.toggleSymbol();
            ctrl.toggleSymbol();
            
            expect(ctrl.screenValue).toEqual('17');
        });

        it('should not toggle symbol of screen value if screen value is 0', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = 0;
            
            ctrl.toggleSymbol();

            expect(ctrl.screenValue).toEqual(0);
        });
    });

    describe('calculatePercentage', function() {
        it('should return value divided by 100', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '56';
            
            ctrl.calculatePercentage();
            
            expect(ctrl.screenValue).toEqual('0.56');
        });

        it('should keep screenValue as empty string if screen value is empty', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '';
            
            ctrl.calculatePercentage();
            
            expect(ctrl.screenValue).toEqual('');
        });


        it('should set screenValue to empty string if screen value is zero', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = 0;
            
            ctrl.calculatePercentage();
            
            expect(ctrl.screenValue).toEqual('');
        });
    });

    describe('handleError', function() {
        it('should set screen value to `Error` and reset the rest of the calculator values', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '24';
            
            ctrl.handleError();
            
            expect(ctrl.screenValue).toEqual('Error');
            expect(ctrl.previousScreenValue).toEqual(null);
            expect(ctrl.previousButtonPressed).toEqual(null);
        });
    });

    describe('updateValue', function() {
        it('should append the latest value to the current existing screen value', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '22';
            
            ctrl.updateValue('5');
            
            expect(ctrl.screenValue).toEqual('225');
        });

        it('should set the latest value to be the current existing screen value if previous button pressed was an operator', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '22';
            ctrl.previousButtonPressed = '*';

            ctrl.updateValue('5');
            
            expect(ctrl.screenValue).toEqual('5');
        });

        it('should do nothing if value is a dot `.` and we already have a present dot on screenValue', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '21.45';
            
            ctrl.updateValue('.');
            
            expect(ctrl.screenValue).toEqual('21.45');
        });
    });

    describe('updateOperator', function(){

        it('should refresh screen value if there is a previous value and operator saved by the calculator and user presses the `=` operator', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '21';
            ctrl.previousScreenValue = '42';
            ctrl.operator = '*';

            ctrl.updateOperator('=');
            
            expect(ctrl.screenValue).toEqual('882');
        });

        it('should refresh screen value if there is a previous value saved by the calculator and user presses an operator which is not `=`', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '5';
            ctrl.previousScreenValue = '30';
            ctrl.operator = '+';

            ctrl.updateOperator('/');
            
            expect(ctrl.screenValue).toEqual('35');
        });


        it('should allow multiple calculations', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '6';
            ctrl.previousScreenValue = '30';
            ctrl.operator = '+';

            ctrl.updateOperator('/');
            
            expect(ctrl.screenValue).toEqual('36');

            ctrl.updateValue('3');
            ctrl.updateOperator('-');

            expect(ctrl.screenValue).toEqual('12');

            ctrl.updateValue('10');
            ctrl.updateOperator('=');

            expect(ctrl.screenValue).toEqual('2');

        });

        it('should print `Error` on screen when dividing by 0', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '0';
            ctrl.previousScreenValue = '42';
            ctrl.operator = '/';

            ctrl.updateOperator('=');
            
            expect(ctrl.screenValue).toEqual('Error');
        });

        it('should refresh operator but ignore calculation if there is no previous value saved by the calculator', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '21.45';
            ctrl.previousScreenValue = null;

            ctrl.updateOperator('/');
            
            expect(ctrl.operator).toEqual('/');
            expect(ctrl.screenValue).toEqual('21.45');
        });

        it('should refresh operator but ignore calculation if previous button pressed was also an operator', function() {
            var ctrl = $componentController('calculator');
            ctrl.screenValue = '21.45';
            ctrl.previousButtonPressed = '*';
            
            ctrl.updateOperator('/');
            
            expect(ctrl.operator).toEqual('/');
            expect(ctrl.screenValue).toEqual('21.45');
        });
    });
  });