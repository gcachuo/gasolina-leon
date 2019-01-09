Project.Maps = {
    init: function () {
        plugin.google.maps.environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBFMFeQ5dKQYaILCAY0kxoACcftBHlsjfI',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBQg1lHyydFoB2Sxwud1GgIQTFnXzaO_wg'
        });
        // Define a div tag with id="map_canvas"
        var mapDiv = $("#map_canvas").get()[0];

        // Initialize the map plugin
        var map = plugin.google.maps.Map.getMap(mapDiv);

        // The MAP_READY event notifies the native map view is fully ready to use.
        map.one(plugin.google.maps.event.MAP_READY, this.onMapInit);
    },
    onMapInit: function () {

    }
};