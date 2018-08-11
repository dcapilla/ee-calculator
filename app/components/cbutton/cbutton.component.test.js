describe('cbutton component', function() {
    var $componentController;
  
    beforeEach(module('app'));
    beforeEach(inject(function(_$componentController_) {
      $componentController = _$componentController_;
    }));
  
    describe('click', function() {
        it('should call the `onClick` binding with the right value, when button is clicked', function() {
            var onClickSpy = jasmine.createSpy('onClick');
            var bindings = {hero: {}, onClick: onClickSpy};
            var ctrl = $componentController('cbutton', null, bindings);

            ctrl.bValue = 3;

            ctrl.click();
            expect(onClickSpy).toHaveBeenCalledWith({value: 3});
        });
    });
    
});