'use strict';

angular.module('app').component('cscreen', {
  transclude: true, 
    bindings: {
        sValue: '<'
    },
    controllerAs: 'vm',
    templateUrl: './app/components/cscreen/cscreen.view.html'  
  });