Project.Maps = {
    init: function () {
        // Define a div tag with id="map_canvas"
        var mapDiv = document.getElementById("map_canvas");

        // Initialize the map plugin
        var map = plugin.google.maps.Map.getMap(mapDiv);

        // The MAP_READY event notifies the native map view is fully ready to use.
        map.one(plugin.google.maps.event.MAP_READY, this.onMapInit);
    },
    onMapInit: function () {

    }
};