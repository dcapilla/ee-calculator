'use strict';

var SCREEN_ERROR_MESSAGE = 'Error';

angular.module('app').component('calculator', {
  controller: function(calculatorService) {
    this.$onInit = function() {
      this.setInitialValues();
    };

    this.setInitialValues = function() {
      this.screenValue = '';
      this.previousScreenValue = null;
      this.previousButtonPressed = null;
    }

    this.toggleSymbol = function() {
      this.screenValue = this.screenValue ? String(-this.screenValue) : this.screenValue;
    }

    this.calculatePercentage = function() {
      this.screenValue = this.screenValue ? String(calculatorService.calculatePercentage(this.screenValue)) : '';
    }

    this.updateValue = function(newValue) {
      if (newValue === '.' && this.screenValue.indexOf('.') > -1) {
        return;
      }

      if (calculatorService.isOperator(this.previousButtonPressed)) {
        this.previousScreenValue = this.screenValue;
        this.screenValue = newValue;
      } else {
        this.screenValue += newValue;
      }

      this.previousButtonPressed = newValue;
    }

    this.handleError = function() {
      this.screenValue = SCREEN_ERROR_MESSAGE;
      this.previousScreenValue = null;
      this.previousButtonPressed = null;
    }

    this.updateOperator = function(newOperator) {
      if (calculatorService.isOperator(this.previousButtonPressed)) {
        this.operator = newOperator;
        return;
      } 
      
      if (this.operator && this.previousScreenValue) {
        try {          
          this.screenValue = String(calculatorService.calculate(this.previousScreenValue, this.screenValue, this.operator));
        } catch (e) {
          this.handleError();
        }
      }

      this.previousButtonPressed = newOperator;
      this.operator = newOperator;
    }
  },
  controllerAs: 'vm',
  templateUrl: '/app/components/calculator/calculator.view.html'
});