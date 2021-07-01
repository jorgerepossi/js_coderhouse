function initMap() {
	//set your google maps parameters
	var latitude = -34.6168364,
		longitude = -58.5791748,
		map_zoom = 16;

	//define the basic color of your map, plus a value for saturation and brightness
	var main_color = "#E2B755",
		saturation_value = -20,
		brightness_value = 5;

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
						color: "#f7f8fd",
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
						color: "#bdbdbd",
					},
				],
			},
			{
				featureType: "poi",
				elementType: "geometry",
				stylers: [
					{
						color: "#eeeeee",
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "geometry",
				stylers: [
					{
						color: "#e5e5e5",
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#9e9e9e",
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
						color: "#9e9e9e",
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
						color: "#c9c9c9",
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

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		visible: true,
		icon: "http://www.carpinteriabless.com.ar/cd-icon-location.png",
	});
}

//add custom buttons for the zoom-in/zoom-out on the map
function CustomZoomControl(controlDiv, map) {
	//grap the zoom elements from the DOM and insert them in the map
	var controlUIzoomIn = document.getElementById("cd-zoom-in"),
		controlUIzoomOut = document.getElementById("cd-zoom-out");
	controlDiv.appendChild(controlUIzoomIn);
	controlDiv.appendChild(controlUIzoomOut);

	// Setup the click event listeners and zoom-in or out according to the clicked element
	google.maps.event.addDomListener(controlUIzoomIn, "click", function () {
		map.setZoom(map.getZoom() + 1);
	});
	google.maps.event.addDomListener(controlUIzoomOut, "click", function () {
		map.setZoom(map.getZoom() - 1);
	});
}

var zoomControlDiv = document.createElement("div");
var zoomControl = new CustomZoomControl(zoomControlDiv, map);
