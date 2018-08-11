'use strict';

angular.module('app').component('cbutton', {
  transclude: true, 
    bindings: {
        bValue: '@',
        onClick: '&?'
    },
    controller: function() {
      this.click = function() {
        if (this.onClick) {
          this.onClick({value : this.bValue});
        }
      }
    },
    controllerAs: 'vm',
    templateUrl: './app/components/cbutton/cbutton.view.html'  
  });