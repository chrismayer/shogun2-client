/**
 * The main application class. An instance of this class is created by app.js
 * when it calls Ext.application(). This is the ideal place to handle
 * application launch and initialization details.
 */
Ext.define('ShogunClient.Application', {
    extend: 'Ext.app.Application',

    requires: [
       'ShogunClient.util.ApplicationContext'
    ],

    name: 'ShogunClient',

    stores: [],

    config: {
        applicationContext: null
    },

    init: function() {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;

        // load the application context and build the application on success
        appCtxUtil.loadApplicationContext(function() {
            me.createViewport();
        });

    },

    /**
     *
     */
    createViewport: function() {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var appViewport = appCtxUtil.getValue('viewport');
        var appViewportType = appCtxUtil.getValue('type', appViewport);
        var appViewportPlacements = appCtxUtil.getValue('regions', appViewport);
        var appViewportModules = appCtxUtil.getValue('subModules');
        var items = [];

        // iterate over each placement property and find the corresponding
        // viewport modules
        Ext.Array.each(appViewportPlacements, function(placement, idx) {
            var item = appViewportModules[idx];
            item['region'] = placement;
            items.push(item);
        });

        Ext.create('ShogunClient.view.container.Viewport', {
            layout: appViewportType,
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
