Ext.define('ShogunClient.view.component.MapController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.component.map',

    /**
     *
     */
    setMap: function() {
        var me = this;
        var view = me.getView();

        if (!view.getMap()) {
            var appCtxUtil = ShogunClient.util.ApplicationContext;
            // TODO: move setupMap() to mapController?
            var olMap = appCtxUtil.setupMap();
            view.setMap(olMap);
        }
    },

    /**
     *
     */
    setControls: function() {
        var me = this;
        var view = me.getView();
        var map = view.getMap();
        var attribution = new ol.control.Attribution({
            collapsible: false,
            logo: false
        });
        map.addControl(attribution);
    }
});
