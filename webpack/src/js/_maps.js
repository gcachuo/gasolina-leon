const
    api_key = {
        release: 'AIzaSyBFMFeQ5dKQYaILCAY0kxoACcftBHlsjfI',
        debug: 'AIzaSyBQg1lHyydFoB2Sxwud1GgIQTFnXzaO_wg'
    },
    /** Leon Guanajuato */
    target = {
        lat: 21.1228352,
        lng: -101.6755628
    },
    zoom = 13,
    icon = {
        activo: {
            url: 'assets/dist/img/icon-station-active.png',
            size: {
                width: 30,
                height: 30
            }
        },
        inactivo: {
            url: 'assets/dist/img/icon-station-inactive.png',
            size: {
                width: 30,
                height: 30
            }
        }
    };

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
    onMapInit: function (map) {
        Project.Maps.addMarkers(map);
    },
    addMarkers: function (map) {
        var data = Project.Maps.getMarkers();
        // Add markers
        data.map(function (options) {
            return map.addMarker(options);
        });
    },
    addMarker: function (map) {
        // Add a marker
        map.addMarker({
            'position': target,
            'title': "Hello GoogleMap for Cordova!"
        });
    },
    getMarkers: function () {
        let markers = [
            {
                icon: icon.activo,
                snippet: "SI hay",
                position: {lat: 21.1413763, lng: -101.6602022},
                title: "Oxxo Gas"
            },
            {
                icon: icon.inactivo,
                snippet: "NO hay",
                position: {lat: 21.1439166, lng: -101.6586434},
                title: "Pemex"
            }
        ];
        return markers;
    }
};