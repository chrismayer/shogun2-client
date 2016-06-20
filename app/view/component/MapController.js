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
            var olMap = me.createOlMap();
            view.setMap(olMap);
        }
    },

    /**
     *
     */
    createOlMapControls: function(mapControls) {
        var mapCtrls = [];

        // iterate over all control configurations
        Ext.each(mapControls, function(mapControl) {
            // create the ol3 control
            var mapCtrl = new ol.control[mapControl.mapControlName](
                    mapControl.mapControlProperties);
            mapCtrls.push(mapCtrl);
        });

        return mapCtrls;
    },

    /**
     * load the default interactions only, specific interactions
     * should be loaded and added by single modules.
     */
    createOlMap: function() {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var mapConfig = appCtxUtil.getMapConfig();
        var mapControls = appCtxUtil.getMapControls();
        var map;

        if (!mapConfig) {
            Ext.Logger.error('No mapConfig object found!');
            return false;
        }

        map = new ol.Map({
            controls: me.createOlMapControls(mapControls),
            logo: false,
            renderer: me.createOlMapRenderer(),
            view: me.createOlMapView(mapConfig)
        });

        var layerGroup = new ol.layer.Group({layers: me.createOlLayers()});
        map.setLayerGroup(layerGroup);

        return map;
    },

    /**
     * Returns the map renderer to use.
     */
    createOlMapRenderer: function() {
        return 'canvas';
    },

    /**
     *
     */
    createOlMapView: function(mapConfig) {
        var me = this;
        var olMapView;

        olMapView = new ol.View({
            center: [
                mapConfig.center.x,
                mapConfig.center.y
            ],
            zoom: mapConfig.zoom || 2,
            maxResolution: mapConfig.maxResolution,
            minResolution: mapConfig.minResolution,
            extent: [
                mapConfig.extent.lowerLeft.x,
                mapConfig.extent.lowerLeft.y,
                mapConfig.extent.upperRight.x,
                mapConfig.extent.upperRight.y
            ],
            projection: me.getProjectionString(),
            resolutions: mapConfig.resolutions,
            rotation: mapConfig.rotation || 0
        });

        return olMapView;
    },

    /**
     *
     */
    createOlLayers: function() {
        var me = this;
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var mapLayers = appCtxUtil.getValue('mapLayers');
        var olLayers = [];

        // reverse the layers array to obtain the given order by the
        // context
        Ext.each(mapLayers.reverse(), function(mapLayer) {
            olLayers.push(me.createOlLayer(mapLayer));
        });

        return olLayers;
    },

    /**
     *
     */
    createOlLayer: function(mapLayer) {
        var me = this;
        var mapLayerAppearance = mapLayer.appearance;

        // check for required options
        if (!mapLayer.type) {
            Ext.Logger.warn('Could not create the ol.layer. Missing ' +
                    'property type');
            return false;
        }

        var olLayer = new ol.layer[mapLayer.type]({
            name: mapLayer.name || 'UNNAMED LAYER',
            opacity: mapLayerAppearance.opacity,
            visible: mapLayerAppearance.visible,
            minResolution: mapLayerAppearance.minResolution,
            maxResolution: mapLayerAppearance.maxResolution,
            source: me.createOlLayerSource(mapLayer)
        });

        return olLayer;
    },

    /**
     * based on ol.source.TileWMS
     */
    createOlLayerSource: function(mapLayer) {
        var me = this;
        var mapLayerAppearance = mapLayer.appearance;
        var mapLayerSource = mapLayer.source;
        var olLayerSource;

        olLayerSource = new ol.source[mapLayerSource.type]({
            attributions: me.createOlLayerAttribution(
                    mapLayerAppearance.attribution),
            params: {
                'LAYERS': mapLayerSource.layerNames,
                'VERSION': mapLayerSource.version,
                'TILED': true,
                'STYLES': mapLayerSource.layerStyles || null
            },
            crossOrigin: mapLayerSource.crossOrigin || null,
            gutter: mapLayerSource.gutter || 0,
            logo: {
                href: mapLayerSource.logoHref || "",
                src: mapLayerSource.logoSrc || ""
            },
            tileGrid: me.createOlLayerTileGrid(
                    mapLayerSource.tileGrid),
            url: mapLayerSource.url
        });

        return olLayerSource;
    },

    /**
     *
     */
    createOlLayerTileGrid: function(tileGridConfig) {
        var olLayerTileGrid;
        var tileGridOrigin;
        var tileGridExtent;

        // check for required options
        if (!tileGridConfig.type || !tileGridConfig.tileGridResolutions) {
            Ext.Logger.warn('Could not create the ol.tilegrid for the ' +
                    'current layer. Missing properties type and/or ' +
                    'tileGridResolutions');
            return false;
        }

        if (tileGridConfig.tileGridOrigin) {
            tileGridOrigin = [
                tileGridConfig.tileGridOrigin.x,
                tileGridConfig.tileGridOrigin.y
            ];
        }

        if (tileGridConfig.tileGridExtent) {
            tileGridExtent = [
                tileGridConfig.tileGridExtent.lowerLeft.x,
                tileGridConfig.tileGridExtent.lowerLeft.y,
                tileGridConfig.tileGridExtent.upperRight.x,
                tileGridConfig.tileGridExtent.upperRight.y
            ];
        }

        olLayerTileGrid = new ol.tilegrid[tileGridConfig.type]({
            extent: tileGridExtent,
            origin: tileGridOrigin,
            resolutions: tileGridConfig.tileGridResolutions,
            tileSize: tileGridConfig.tileSize || 256
        });

        return olLayerTileGrid;
    },

    /**
     *
     */
    createOlLayerAttribution: function(attributionConfig) {
        var olLayerAttributions = [];

        var olLayerAttribution = new ol.Attribution({
            html: attributionConfig
        });

        olLayerAttributions.push(olLayerAttribution);

        return olLayerAttributions;
    },

    /**
     *
     */
    getProjectionString: function() {
        var appCtxUtil = ShogunClient.util.ApplicationContext;
        var mapConfig = appCtxUtil.getMapConfig();
        var mapConfigProjection = mapConfig.projection;

        if (!mapConfigProjection) {
            Ext.Logger.error('No map projection found in mapConfig!');
        }

        if (mapConfigProjection.indexOf('EPSG') > -1) {
            return mapConfigProjection;
        } else {
            return Ext.String.format('EPSG:{0}', mapConfigProjection);
        }
    }

});
