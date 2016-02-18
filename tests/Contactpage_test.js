/**
 * Created by Lenovo on 1/19/16.
 */
describe('contactPageController', function(){
    beforeEach(module('hospitalModule'));

    var contactpageController,
        scope;

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        contactpageController = $controller('contactPageController', {
            $scope: scope
        });
    }));

    it('Check', function () {
        expect(scope.MobileID).toEqual('BZMNBZCNXSHDKSD6565');
    });

    it('Check', function () {
        expect(scope.errorField).toEqual(false);
    });
    it('Check!', function () {
        expect(scope.PatientFirstName).toEqual('');
    });
    it('Check', function () {
        expect(scope.PatientGender).toEqual('');
    });
    it('Check', function () {
        expect(scope.PatientAge).toEqual('');
    });
    it('Check', function () {
        expect(scope.PatientLastName).toEqual('');
    });

});