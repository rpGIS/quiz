
//creates an array to fill with data sourced from the geoJSON later
var quiz_array =[];
// gets the questions using an XMLHttpRequest
function getQuestions() {
  client = new XMLHttpRequest();
//specifies the database to get data from
client.open('GET','http://developer.cege.ucl.ac.uk:30286/getGeoJSON/quiz/geom');
  client.onreadystatechange = questionResponse;
  client.send();
}
function questionResponse() {
//checks to see if the server is ready
if (client.readyState == 4) {
  // once the data is ready, process the data
  var questiondata = client.responseText;
  loadquestionlayer(questiondata);
  }
}

// convert the received data - which is text - to JSON format and add it to the map
function loadquestionlayer(questiondata) {
  // convert the text received from the server to JSON
  var questionjson = JSON.parse(questiondata );
  // load the geoJSON layer
  var questionlayer = L.geoJson(questionjson,
  {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.question+'<br> <form onsubmit="return (getScore()&& startDataUpload());"> <input type="radio" name="answer", id="1", value="Answer1">'+feature.properties.answer1+ '<br> <input type="radio" name="answer", id="2" value="Answer2">'+feature.properties.answer2+ '<br> <input type="radio" name="answer", id="3", value="Answer3">'+feature.properties.answer3+ '<br> <input type="radio" name="answer", id="4", value="Answer4">' + feature.properties.answer4 +'<br> <input type="submit",name="submit", id="submit", value="Submit"> <input id="hidden" name="hidden" type="hidden" value='+feature.properties.correct+'><input id="question" name="question" type="hidden" value="'+feature.properties.question+'"></form>');
          },

    // use point to layer to create the points
    pointToLayer: function (feature, latlng) {

// creates markers from the coordinates and adds them to the array
        question_point = L.marker(latlng, {icon:testMarkerBlue});
        quiz_array.push(question_point);
        return question_point

    },

//adds all the points to the map
}).addTo(mymap);
mymap.fitBounds(questionlayer.getBounds());
}
