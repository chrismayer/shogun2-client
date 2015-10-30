/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('ShogunClient.Application', {
    extend: 'Ext.app.Application',

    name: 'ShogunClient',

    stores: [],

    appContextUrl: './resources/appContext.json',

    errorMsgTitle: '٩(͡๏̯͡๏)۶',

    appContextErrorMsg: 'Fehler beim Laden des ApplicationContext:<p><code>{0}</code>',

    init: function() {
        var me = this;

        // load the application context
        me.loadApplicationContext();

        // build the application on success
        me.on({
            appcontextloaded: me.createViewport
        });
    },

    /**
     *
     */
    loadApplicationContext: function() {
        var me = this;

        // load the application context
        Ext.Ajax.request({
            url: me.appContextUrl,
            method: 'GET',
            success: function(response, opts) {
                if (response && response.responseText) {
                    try {
                        var reponseObj = Ext.JSON.decode(response.responseText);
                    } catch(err) {
                        Ext.Msg.alert(
                            me.errorMsgTitle,
                            Ext.String.format(me.appContextErrorMsg, err)
                        );
                        return false;
                    }
                    var appConf = me.getValueByKey(reponseObj, 'application');
                    me.fireEvent('appcontextloaded', appConf);
                } else {
                    Ext.Msg.alert(
                        me.errorMsgTitle,
                        Ext.String.format(me.appContextErrorMsg)
                    );
                }
            },
            failure: function(response, opts) {
                var errorMsg;
                if (response && response.responseText) {
                    errorMsg = response.responseText;
                }
                Ext.Msg.alert(
                    me.errorMsgTitle,
                    Ext.String.format(me.appContextErrorMsg, errorMsg)
                );
            }
        });
    },

    /**
     *
     */
    getValueByKey: function(queryObject, queryKey) {
        var me = this,
            queryMatch;

        if (!queryObject || !queryKey) {
            Ext.Logger.error('Missing input parameter(s): queryObject and ' +
                    'queryKey are required.')
            return false;
        }

        if (!Ext.isObject(queryObject)) {
            Ext.Logger.error('First parameter has to be an object');
            return false;
        }

        if (!Ext.isString(queryKey)) {
            Ext.Logger.error('Second parameter has to be a string');
            return false;
        }

        // iterate over the input object
        for (var key in queryObject) {

            // get the current value
            var value = queryObject[key];

            // if the given key is the queryKey, let's return the
            // corresponding value
            if (key === queryKey) {
                return value;
            }

            // if the value is an object, let's call ourself recursively
            if (Ext.isObject(value)) {
                queryMatch = me.getValueByKey(value, queryKey);
                if (queryMatch) {
                    return queryMatch;
                }
            }

            // if the value is an array and the array contains an object as
            // well, let's call ourself recursively for this object
            if (Ext.isArray(value)) {
                Ext.each(value, function(val) {
                    if (Ext.isObject(val)) {
                        queryMatch = me.getValueByKey(val, queryKey);
                        if (queryMatch) {
                            return queryMatch;
                        }
                    }
                });
            }
        }

        // if we couldn't find any match, return false
        return false;
    },

    /**
     *
     */
    createViewport: function(appConf) {
        var me = this;
        var viewportLayout = me.getValueByKey(appConf, 'layout');
        var viewportLayoutType = me.getValueByKey(viewportLayout, 'type');
        var viewportLayoutPlacements = me.getValueByKey(viewportLayout, 'regions');
        var viewportModules = me.getValueByKey(appConf, 'subModules');
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
