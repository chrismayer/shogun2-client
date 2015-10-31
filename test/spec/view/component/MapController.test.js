/*eslint max-len: [0, 80, 4]*/
Ext.Loader.syncRequire(['ShogunClient.view.component.MapController']);

describe('ShogunClient.view.component.MapController', function() {
    var mapController;

    beforeEach(function() {
        mapController = Ext.create('ShogunClient.view.component.MapController');
    });

    afterEach(function() {
        mapController.destroy();
    });

    describe('Basics', function() {
        it('is defined', function() {
            expect(ShogunClient.view.component.MapController).to.not.be(undefined);
        });
        it('can be instantiated', function() {
            expect(mapController).to.be.a(ShogunClient.view.component.MapController);
        });
    });

    describe('Methods', function() {
        describe('#setMap', function() {
            it('is defined', function() {
                expect(mapController.setMap).to.be.a('function');
            });
        });
        describe('#setControls', function() {
            it('is defined', function() {
                expect(mapController.setControls).to.be.a('function');
            });
        });
    });
});
