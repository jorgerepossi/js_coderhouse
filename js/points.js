function initMap() {
  var map_zoom = 16;

  var map = new google.maps.Map(document.getElementById("mapa"), {
    center: {
      lat: -34.6168364,
      lng: -58.5791748,
    },
    scrollwheel: false,
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    zoom: map_zoom,

    zoom: 15,
    styles: [
      {
        elementType: "geometry",
        stylers: [
          {
            color: "#E8E8E8",
          },
        ],
      },

      {
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#f7f8fd",
          },
        ],
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#EEEEF1",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            color: "#E8E8E8",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#C2E6A7",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },

      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9ca5b3",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#dadada",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#757575",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#1f2835",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
          {
            color: "#dadada",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#616161",
          },
        ],
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#EEEEF1",
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            color: "#e5e5e5",
          },
        ],
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            color: "#A2DBFA",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#9e9e9e",
          },
        ],
      },
    ],
  });
  var icons = {
    white: {
      url: "https://goo.gl/qvLZ4R",
      color: "#58D400",
    },
  };

  var locations = [
    ["$15.000", -34.6168364, -58.5791748, "white", 38, -3],
    ["$18.000", -34.6168364, -58.5691748, "white", 38, -3],
    ["$35.000", -34.6168456, -58.5892345, "white", 38, -3],
    ["$50.000", -34.6168456, -58.5828543, "white", 38, -3],
    ["$40.000", -34.6134721, -58.5828321, "white", 38, -3],
  ];

  for (var i = 0; i < locations.length; i++) {
    var item = locations[i];
    marker = new MarkerWithLabel({
      position: { lat: item[1], lng: item[2] },
      map: map,
      icon: icons[item[3]].url,
      labelContent: item[0],
      labelAnchor: new google.maps.Point(item[4], item[5]),
      labelClass: "label " + item[3],
      labelInBackground: false,
      dataset: {
        id: item[i],
      },
    });
  }
}

function CustomZoomControl(controlDiv, map) {
  var controlUIzoomIn = document.getElementById("cd-zoom-in"),
    controlUIzoomOut = document.getElementById("cd-zoom-out");
  controlDiv.appendChild(controlUIzoomIn);
  controlDiv.appendChild(controlUIzoomOut);

  google.maps.event.addDomListener(controlUIzoomIn, "click", function () {
    map.setZoom(map.getZoom() + 1);
  });
  google.maps.event.addDomListener(controlUIzoomOut, "click", function () {
    map.setZoom(map.getZoom() - 1);
  });
}

google.maps.event.addDomListener(window, "load", initMap());
