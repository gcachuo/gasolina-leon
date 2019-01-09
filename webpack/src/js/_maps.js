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
        1: {
            url: 'assets/dist/img/icon-station-active.png',
            size: {
                width: 30,
                height: 30
            }
        },
        0: {
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

        plugin.google.maps.LocationService.getMyLocation({
            enableHighAccuracy: true // use GPS as much as possible
        }, function (location) {
            console.log(location);
            Project.Maps.addMarker(map, location.latLng);
        });
    },
    onMapInit: function (map) {
        Project.Maps.addMarkers(map);
    },
    addMarker: function (map, position) {
        var marker = map.addMarker({
            position: position,
            title: "Hello Cordova Google Maps for iOS and Android",
            snippet: "This plugin is awesome!"
        })
    },
    addMarkers: async function (map) {
        var data = await Project.Maps.getMarkers();
        // Add markers
        data.map(function (options) {
            return map.addMarker(options);
        });
    },
    getMarkers: async function () {
        let markers = [];
        const response = (await Project.request('maps/getData')).response;
        $.each(response.data, function (i, marker) {
            markers.push({
                icon: icon[marker.active],
                snippet: {1: "SI hay", 0: 'NO hay'}[marker.active],
                position: {lat: marker.position.lat, lng: marker.position.lng},
                title: [marker.name, marker.company].join("\n - ")
            });
        });
        return markers;
    }
};