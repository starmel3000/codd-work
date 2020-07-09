mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleG1lbC1kb3QiLCJhIjoibVdadkRYayJ9.PwCVjmEcHIX2VA1H1ca4iw';
let map = new mapboxgl.Map({
container: 'map', // container id
//style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
style: 'https://basemap.ru/mcm/api/rpc/get_style?style_number=1',
center: [37.618, 55.751], // starting position [lng, lat]
zoom: 11, // starting zoom
maxZoom: 17,
minZoom: 9
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.ScaleControl());
map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
positionOptions: {enableHighAccuracy: true},
trackUserLocation: true})
);


map.on('load', function() {
map.loadImage('https://raw.githubusercontent.com/starmel3000/codd-ideas/master/126-railway_station.png',
function(error, image) {
  if (error) throw error;
  map.addImage('train', image);
  map.addSource('rw_stations', {
      'type': 'geojson',
      'data': 'https://raw.githubusercontent.com/starmel3000/codd-ideas/master/railway_stations.geojson'
      });
map.addLayer({
'id': 'stations',
'type': 'symbol',
'source': 'rw_stations',
'layout': {
'icon-image': 'train',
'icon-size': 0.5
}});
});
});

map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['stations'] // replace this with the name of the layer
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.name_ru + '</h3><p>' +'Название станции: '+ feature.properties.name_ru + '</p>')
    .addTo(map);
});
