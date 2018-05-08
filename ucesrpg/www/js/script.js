function Within(){
	questions_within(quiz_array);
}

function questions_within(array) {
  latlng=current_position.getLatLng();
for (var i=0; i<array.length;i++) {
  point=array[i].getLatLng();


  var distance = getDistanceFromLatLonInM(point.lat,point.lng,latlng.lat,latlng.lng);
  if (distance <= 50000) {
    array[i].setIcon(testMarkerGreen);
  } else {
    array[i].setIcon(testMarkerRed) .bindPopup("Too Far");
  }
}
}
function getDistanceFromLatLonInM(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = (R * c)*1000; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
function getScore(){
        var score = document.querySelector('input[name="answer"]:checked').value;
				var correct = document.getElementById("hidden").value;
        if(score==correct){
          alert('You Win');
          return true;
        }
        else{
          alert('You Lose');
          return true;
        }
      }
