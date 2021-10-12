
require(['jquery', 'org.tts.js.lodash', 'style!@Maps/Maps.Google.css'], ($, _) => {
	let ellenPeak = {lat: 38.12262, lng: -110.81344}

	window.initMap = function () {
		let paths = {
			current: new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FF00FF", strokeOpacity: 1.0, strokeWeight: 5}),
			selecting: new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FF0000", strokeOpacity: 0.75, strokeWeight: 5}),
			selected: new google.maps.Polyline({path: [], geodesic: true, strokeColor: "#FFFF00", strokeOpacity: 0.5, strokeWeight: 5})
		}

		map = new google.maps.Map(document.getElementById("map"), {
			center: { lat: 38.174984186, lng: -110.81176163 },
			zoom: 8,
		  });


		paths.current.setMap(map)
		paths.selecting.setMap(map)
		paths.selected.setMap(map)

	}

	//window.InitMap = function () {
		$(document.head).append($('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC2HJJeEeMMgy0qd5c6O7CrjN9O68QfIcQ&libraries=drawing&callback=initMap&v=weekly" async></script>'))
	//}
})


