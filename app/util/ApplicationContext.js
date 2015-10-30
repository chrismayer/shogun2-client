Ext.define('ShogunClient.util.ApplicationContext', {

    statics: {

        // i18n
        errorMsgTitle: '٩(͡๏̯͡๏)۶',
        appContextErrorMsg: 'Fehler beim Laden des ApplicationContext:<p><code>{0}</code>',
        // i18n

        /**
         *
         */
        pathConfig: {
            appContextUrl: './resources/appContext.json'
        },

        /**
         *
         */
        loadApplicationContext: function(cbFn) {
            var me = this;

            // load the application context
            Ext.Ajax.request({
                url: me.pathConfig.appContextUrl,
                method: 'GET',
                success: function(response) {
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

                        if (cbFn && Ext.isFunction(cbFn)) {
                            cbFn(appConf);
                        }
                    } else {
                        Ext.Msg.alert(
                            me.errorMsgTitle,
                            Ext.String.format(me.appContextErrorMsg)
                        );
                    }
                },
                failure: function(response) {
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
                        'queryKey are required.');
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
                    for (var i = 0; i < value.length; i++) {
                        var val = value[i];
                        if (Ext.isObject(val)) {
                            queryMatch = me.getValueByKey(val, queryKey);
                            if (queryMatch) {
                                return queryMatch;
                            }
                        }
                    }
                }
            }

            // if we couldn't find any match, return false
            return false;
        }
    }
});
