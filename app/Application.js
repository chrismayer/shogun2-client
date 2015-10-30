/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('ShogunClient.Application', {
    extend: 'Ext.app.Application',

    name: 'ShogunClient',

    stores: [],

    init: function() {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;

        // load the application context and build the application on success
        appCtxUtil.loadApplicationContext(function(appConf) {
            me.createViewport(appConf);
        });

    },

    /**
     *
     */
    createViewport: function(appConf) {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var viewportLayout = appCtxUtil.getValueByKey(appConf, 'layout');
        var viewportLayoutType = appCtxUtil.getValueByKey(viewportLayout, 'type');
        var viewportLayoutPlacements = appCtxUtil.getValueByKey(viewportLayout, 'regions');
        var viewportModules = appCtxUtil.getValueByKey(appConf, 'subModules');
        var items = [];

        // iterate over each placement property and find the corresponding
        // viewport modules
        Ext.Array.each(viewportLayoutPlacements, function(placement, idx) {
            var item = viewportModules[idx];
            item['region'] = placement;
            items.push(item);
        });

        Ext.create('ShogunClient.view.container.Viewport', {
            layout: viewportLayoutType,
            items: items
        });

        me.setMainView('ShogunClient.view.container.Viewport');

    },

    launch: function () {
        // TODO - Launch the application
    },

    /*
     *
     */
    onAppUpdate: function () {
        Ext.Msg.confirm(
            'Application Update',
            'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
