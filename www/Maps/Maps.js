require(['jquery', 'org.tts.js.lodash', 'leaflet', 'turf', 'org.tts.js.Maps', 'style!@css/leaflet', 'style!@css/Maps.css'], ($, _, L, Turf, Maps) => {
	let ellenPeak = {lat: 38.12262, lng: -110.81344}
	let feature = {type:'Feature',id:'way/bd5ec3e3-2ed4-48e9-a023-03d85546b97c',properties:{type:'way',id:'bd5ec3e3-2ed4-48e9-a023-03d85546b97c',tags:{},relations:[],meta:{}},geometry:{type:'LineString',coordinates:[[-110.79842,38.121096,0],[-110.797149,38.119732,0],[-110.796432,38.11922,0],[-110.795767,38.118449,0],[-110.794813,38.117306,0],[-110.794712,38.116768,0],[-110.795769,38.116222,0],[-110.797084,38.116037,0],[-110.796773,38.11557,0],[-110.796238,38.115246,0],[-110.795894,38.114944,0],[-110.795441,38.114518,0],[-110.79459,38.113972,0],[-110.794543,38.113835,0],[-110.794598,38.11348,0],[-110.794618,38.113451,0],[-110.794795,38.113144,0],[-110.794825,38.113106,0],[-110.795124,38.11289,0],[-110.795138,38.112771,0],[-110.794425,38.112748,0],[-110.793895,38.112849,0],[-110.793301,38.112775,0],[-110.793027,38.112884,0],[-110.79237,38.113289,0],[-110.792102,38.113276,0],[-110.791699,38.113202,0],[-110.791613,38.113104,0],[-110.791522,38.113065,0],[-110.791152,38.113042,0],[-110.791086,38.113021,0],[-110.790845,38.112854,0],[-110.790815,38.112672,0],[-110.790646,38.112549,0],[-110.790478,38.112606,0],[-110.790278,38.112731,0],[-110.790045,38.112766,0],[-110.789277,38.112719,0],[-110.78917,38.112791,0],[-110.789204,38.112864,0],[-110.789405,38.113021,0],[-110.789421,38.113174,0],[-110.789388,38.113313,0],[-110.789195,38.113358,0],[-110.789034,38.113374,0],[-110.788807,38.113319,0],[-110.788716,38.113277,0],[-110.788177,38.112937,0],[-110.788071,38.112828,0],[-110.787832,38.112783,0],[-110.78777,38.112728,0],[-110.787664,38.112661,0],[-110.787609,38.112617,0],[-110.786432,38.111862,0],[-110.786235,38.111985,0],[-110.78608,38.112119,0],[-110.785728,38.112176,0],[-110.785503,38.112131,0],[-110.785314,38.112177,0],[-110.784725,38.112397,0],[-110.784478,38.112227,0],[-110.784437,38.111948,0],[-110.784181,38.112092,0],[-110.784123,38.112235,0],[-110.783838,38.112033,0],[-110.7836,38.111639,0],[-110.783354,38.111426,0],[-110.783291,38.111252,0],[-110.783063,38.111123,0],[-110.782766,38.111153,0],[-110.782284,38.1116,0],[-110.781787,38.112086,0],[-110.781469,38.112521,0],[-110.780665,38.112652,0],[-110.780185,38.113059,0],[-110.779654,38.112967,0],[-110.779702,38.112469,0],[-110.77942,38.112571,0],[-110.778314,38.113245,0],[-110.778138,38.111978,0],[-110.777809,38.111928,0],[-110.77751,38.11204,0],[-110.777372,38.111712,0],[-110.776965,38.111462,0],[-110.776748,38.111336,0]]}}

	let mapboxKey = 'pk.eyJ1IjoidHRzZGVzaWduIiwiYSI6ImNrc2lnd2k4aTA3MXkybnFtZGdrYnV1b2cifQ.Mo1cEgeaPgrP22w24rsBcA'
	let mapboxTileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}'
	//let mapboxStyle = 'mapbox/satellite-v9'
	let mapboxStyle = 'satellite-v9'

	let map = L.map('map', {center: [38.12262, -110.81344], zoom: 13})

	let tileOutlineStyle = JSON.parse('{"color":"#ff0000","opacity":0.8,"weight":5,"fillColor":"#ffffff","fillOpacity":0.0}')
	let tileOutlines = []
	function DrawTileOutlines (zoom) {
		tileOutlines.forEach(layer => {map.removeLayer(layer)})
		let centerTile = new Maps.Tile([map.getCenter().lng, map.getCenter().lat], zoom)
		for (let i=-10; i<=10; i++) {
			for (let j=-10; j<=10; j++) {
				let tile = new Maps.Tile(centerTile.slippy[0], centerTile.slippy[1]+i, centerTile.slippy[2]+j)
				let _tile = Turf.bboxPolygon([tile.bounds.minlon, tile.bounds.minlat, tile.bounds.maxlon, tile.bounds.maxlat])
				let tileLayer = L.geoJSON(_tile, {style: () => {return tileOutlineStyle}}).addTo(map)
				tileLayer.on('click', (e) => {
					e.originalEvent.preventDefault()
					e.originalEvent.stopPropagation()
					tileLayer.setStyle({fillOpacity: 0.3})
				})
				tileLayer.on('dblclick', (e) => {
					alert(tile.key)
				})
				tileOutlines.push(tileLayer)
			}
		}
	}

	DrawTileOutlines(15)

	//map.on('zoom', DrawTileOutlines)
	//map.on('move', DrawTileOutlines)



	//L.tileLayer(mapboxTileUrl+'?access_token='+mapboxKey, {
	L.tileLayer('http://maps.ttscloud.net/tiles/{id}/{z}/{x}/{y}', {
		maxZoom: 18,
		//attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		//	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: mapboxStyle,
		tileSize: 512,
		zoomOffset: -1
	}).addTo(map)

	let l = L.geoJSON(feature).addTo(map)
	$(l).data('feature-id', feature.id)
	l.on('click', (e) => {
		log($(e.target).data('feature-id'))
		log('hello')
	})

	L.geoJSON({type:'Feature',id:'way/6ab3018d-ac6a-41e6-ab22-211bba25f3f0',properties:{type:'way',id:'6ab3018d-ac6a-41e6-ab22-211bba25f3f0',tags:{style:'#Road_Trail',highway:'track',source:'TTT',surface:'dirt'},relations:[],meta:{}},geometry:{type:'LineString',coordinates:[['-110.8039399115641','38.13125167400723','0'],['-110.804096104978','38.13128105839284','0'],['-110.8046120734488','38.1310592003992','0'],['-110.8049976224912','38.13086019090997','0'],['-110.8056013353036','38.13046964037009','0'],['-110.8059391372836','38.13052312536552','0'],['-110.8065616188684','38.13079930256411','0'],['-110.8067418472558','38.13102438965527','0'],['-110.8071261344882','38.13130143051161','0'],['-110.8073927850783','38.13148479747628','0'],['-110.8075993646543','38.13166284842666','0'],['-110.8075555299712','38.13220320180633','0']]}}).addTo(map)



/*
	L.marker([51.5, -0.09]).addTo(map)
		.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();


	L.polygon([
		[51.509, -0.08],
		[51.503, -0.06],
		[51.51, -0.047]
	]).addTo(map).bindPopup("I am a polygon.");

*/
	var popup = L.popup();

	function onMapClick(e) {
		log(e.target)
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(map);
	}

	//map.on('click', onMapClick);

	L.circle([-110.8039399115641, 38.13125167400723], 500, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(map).bindPopup("I am a circle.");


	window.map = map

	$(() => {

	})
})


