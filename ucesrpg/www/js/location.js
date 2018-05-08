function Within(){
	questions_within(quiz_array);
}

function questions_within(array) {
	//gets the latitude and longitude of the users current position
  latlng=current_position.getLatLng();
for (var i=0; i<array.length;i++) {
	//gets the latitude and longitude of the points
  point=array[i].getLatLng();

//calls the distance function
  var distance = getDistanceFromLatLonInM(point.lat,point.lng,latlng.lat,latlng.lng);
// defines the cutoff distance in m for question proximity
  if (distance <= 25) {
// sets markers to green if user is within range
    array[i].setIcon(testMarkerGreen);
  } else {
// sets marker to red and issues a new popup if user is out of range
    array[i].setIcon(testMarkerRed) .bindPopup("This question is too far away");
  }
}
}
//works out the distance from user location to the point (code from https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)
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
  var d = (R * c)*1000; // Distance in m
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
//this function checks if the entered answer is equal to the correct answer
function getScore(){
// creates a variable from the value of the checked answer
        var score = document.querySelector('input[name="answer"]:checked').value;
// takes the value of the answer from the hidden input
				var correct = document.getElementById("hidden").value;
//alerts the user telling them they are right if the input matches the correct answer
        if(score==correct){
          alert('Correct! Well Done!');
          return true;
        }
//alerts the user telling them they are wrong if the input does not match the correct answer
        else{
          alert('Incorrect!');
          return true;
        }
      }
