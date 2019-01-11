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

        // Initialize the map plugin
        var map = plugin.google.maps.Map.getMap(mapDiv, {
            camera: {
                target: target,
                zoom: zoom
            }
        });

        // The MAP_READY event notifies the native map view is fully ready to use.
        map.one(plugin.google.maps.event.MAP_READY, this.onMapInit);

        plugin.google.maps.LocationService.getMyLocation({
            enableHighAccuracy: true // use GPS as much as possible
        }, function (location) {
            Project.Maps.addMarker(map, location.latLng);
            map.moveCamera({
                target: location.latLng
            });
        });

        $("#chk-only-active").on('click', function () {
            localStorage.setItem('filters', JSON.stringify({actives: $(this).prop('checked')}));
            location.reload();
        });
    },
    onMapInit: function (map) {
        Project.Maps.addMarkers(map);
    },
    addMarker: function (map, position) {
        map.addMarker({
            position: position,
            title: "Estas Aquí"
        })
    },
    addMarkers: async function (map) {
        var data = await Project.Maps.getMarkers();
        // Add markers
        data.map(function (options) {
            var marker = map.addMarker(options);
            var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();

            var html = `<div style="white-space: nowrap" class="gasolinera">${options.id} - ${options.name}<br>
Compañia: ${options.company}<br>
Fila: ${options.size}<br>
Tiempo de Espera: ${options.time}<br>
Actualizado por: ${options.rep}<br>
${options.updated}<br>
<button onclick='Project.Maps.showEditModal(` + JSON.stringify(options) + `)' class="btn btn-sm btn-success"><i class="material-icons">edit</i></button>
</div>
`;
            htmlInfoWindow.setContent(html);
            marker.on(plugin.google.maps.event.MARKER_CLICK, function () {
                htmlInfoWindow.open(marker);
            });
            return marker;
        });
    },
    showEditModal: function (options) {
        $("#edit-modal .modal-title").html(options.name);
        $("#edit-modal form [name=id]").val(options.id);
        $("#edit-modal form [name=responsable]").val(localStorage.getItem('gas_name'));
        $(`#edit-modal form [name=status][value='${options.active}']`).prop('checked', 1);
        $("#edit-modal").modal('show');
    },
    getMarkers: async function () {
        let markers = [];
        const response = (await Project.request('maps/getData')).response;
        console.log(response);
        if (JSON.parse(localStorage.getItem('filters') || '{}').actives) {
            $("#chk-only-active").prop('checked', true);
        }
        $.each(response.data, function (i, marker) {
            var status = {1: "active", 0: 'inactive'}[marker.active];
            $("#markers-list").append(`<li class="list-group-item ${status}">${marker.id} - ${marker.name}</li>`);
            if (JSON.parse(localStorage.getItem('filters') || '{}').actives && marker.active == 0) {
                return true;
            }
            markers.push({
                id: marker.id,
                name: marker.name,
                company: marker.company,
                size: marker.size,
                time: marker.time,
                rep: marker.rep,
                updated: marker.updated,
                active: marker.active,
                icon: icon[marker.active],
                position: {lat: marker.position.lat, lng: marker.position.lng}
            });
        });
        return markers;
    }
};