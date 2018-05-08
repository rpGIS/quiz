
// load the map
var mymap = L.map('mapid').setView([51.5245, -0.1339], 14);
// load the tiles
L.tileLayer('https://api.mapbox.com/styles/v1/rpgis/cjdg3ldlug2552skafmvwpmoh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnBnaXMiLCJhIjoiY2pkZzNqNnFpMGV2dDMzcmw5dmdxZWJvdCJ9.ma-X-QU8z-LjUdLr1mMqQw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'
  +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'

}).addTo(mymap);

var current_position, current_accuracy;

function onLocationFound(e) {
  // if position defined, then remove the existing position marker and accuracy circle from the map
  if (current_position) {
      mymap.removeLayer(current_position);
      mymap.removeLayer(current_accuracy);
  }

  var radius = e.accuracy / 2;

  current_position = L.marker(e.latlng).addTo(mymap)


  current_accuracy = L.circle(e.latlng, radius).addTo(mymap);
}

function onLocationError(e) {
  alert(e.message);
}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

// wrap map.locate in a function
function locate() {
  mymap.locate({setView: false, maxZoom: 20});
}

// call locate every 3 seconds... forever
setInterval(locate, 3000);

var testMarkerRed = L.AwesomeMarkers.icon({
      icon: 'play',
      markerColor: 'red'
    });

    var testMarkerGreen = L.AwesomeMarkers.icon({
      icon: 'play',
      markerColor: 'green'
    });

    var testMarkerBlue = L.AwesomeMarkers.icon({
      icon: 'play',
      markerColor: 'blue'
    });
