const
    api_key = {
        release: 'AIzaSyBFMFeQ5dKQYaILCAY0kxoACcftBHlsjfI',
        debug: 'AIzaSyBQg1lHyydFoB2Sxwud1GgIQTFnXzaO_wg'
    },
    target = {
        lat: 21.1228352,
        lng: -101.6755628
    },
    zoom = 13;

Project.Maps = {
    init: function () {
        plugin.google.maps.environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': api_key.release,
            'API_KEY_FOR_BROWSER_DEBUG': api_key.debug
        });
        // Define a div tag with id="map_canvas"
        var mapDiv = $("#map_canvas").get()[0];

        var options = {
            camera: {
                target: target,
                zoom: zoom
            }
        };

        // Initialize the map plugin
        var map = plugin.google.maps.Map.getMap(mapDiv, options);

        // The MAP_READY event notifies the native map view is fully ready to use.
        map.one(plugin.google.maps.event.MAP_READY, this.onMapInit);
    },
    onMapInit: function () {

    }
};