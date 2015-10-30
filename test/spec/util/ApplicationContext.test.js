Ext.Loader.syncRequire(['ShogunClient.util.ApplicationContext']);

describe('ShogunClient.util.ApplicationContext', function() {

    var clazz = ShogunClient.util.ApplicationContext;

    describe('Basics', function() {
        it('is defined', function() {
            expect(clazz).to.not.be(undefined);
        });
    });

    describe('has all necessary parameters set', function() {
        it('#appContextUrl', function() {
            expect(clazz.pathConfig.appContextUrl).to.be.a('string');
        });
    });

    describe('Static methods', function() {
        describe('#loadApplicationContext', function() {
            var fn = clazz.loadApplicationContext;
            it('is defined', function() {
                expect(fn).to.not.be(undefined);
            });
            it('is a function', function(){
                expect(fn).to.be.a('function');
            });
        });
        describe('#getValueByKey', function() {
            it('is defined', function() {
                expect(clazz.getValueByKey).to.not.be(undefined);
            });
            it('is a function', function(){
                expect(clazz.getValueByKey).to.be.a('function');
            });
            it('returns a key by a query key', function() {
                expect(clazz.getValueByKey({'key': 'value'}, 'key')).to.be('value');
            });
            it('returns a nested key by a query key', function() {
                expect(clazz.getValueByKey({'rootkey': {'key': 'value'}}, 'key')).to.be('value');
            });
            it('returns a nested key inside an array by a query key', function() {
                expect(clazz.getValueByKey({'rootkey': [{'key1': 'value1'}, {'key2': 'value2'}]}, 'key2')).to.be('value2');
            });
        });
    });
});
