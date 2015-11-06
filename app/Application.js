/**
 * The main application class. An instance of this class is created by app.js
 * when it calls Ext.application(). This is the ideal place to handle
 * application launch and initialization details.
 */
Ext.define('ShogunClient.Application', {
    extend: 'Ext.app.Application',

    requires: [
        'ShogunClient.util.ApplicationContext',
        'ShogunClient.util.URL'
    ],

    name: 'ShogunClient',

    stores: [],

    config: {
        applicationContext: null,
        propertyBlackList: [
            'id',
            'created',
            'modified'
        ]
    },

    /**
     *
     */
    init: function() {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var urlUtil = ShogunClient.util.URL;

        // get the current application ID
        var appId = urlUtil.getUrlQueryParameter('id');

        // load the application context and build the application on success
        appCtxUtil.loadApplicationContext(appId, function() {
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
            // get the subModule for the given placement
            var item = appViewportModules[idx];

            // if we could find any module...
            if (item) {

                // check the given item properties and respond with a simple
                // log message if not
                me.checkItemProperties(item);

                // set the region to the item
                item['region'] = placement;

                // iterate over all given item key-value pairs and:
                //    * remove any key that didn't contain any value or
                //      is black listed
                Ext.iterate(item, function(key, val) {
                    if (!val || Ext.Array.contains(
                            me.getPropertyBlackList(), key)) {
                        delete item[key];
                    }
                });

                items.push(item);

            } else {
                // ...show warning otherwise
                Ext.Logger.warn('Could not find any item for placement ' +
                        'property: ' + placement);
            }
        });

        // create the viewport
        Ext.create('ShogunClient.view.container.Viewport', {
            layout: appViewportType,
            items: items
        });

        // and set it to the application
        me.setMainView('ShogunClient.view.container.Viewport');

    },

    /**
     *
     */
    checkItemProperties: function(item) {
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var appViewportPropHints = appCtxUtil.getValue('propertyHints');
        var appViewportPropMusts = appCtxUtil.getValue('propertyMusts');

        Ext.each(appViewportPropMusts, function(prop) {
            if (!Ext.Array.contains(Ext.Object.getKeys(item), prop)) {
                Ext.Logger.warn('Item ' + item.name + ' has not ' +
                        'set the required value ' + prop);
            }
        });

        Ext.each(appViewportPropHints, function(prop) {
            if (!Ext.Array.contains(Ext.Object.getKeys(item), prop)) {
                Ext.Logger.log('Item ' + item.name + ' has not ' +
                        'set the recommended value ' + prop);
            }
        });
    },

    /**
     *
     */
    launch: function () {
        // TODO - Launch the application
    },

    /**
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
