
// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable var client;

// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on var questionlayer;
var quiz_array =[];
// create the code to get the questions data using an XMLHttpRequest
function getQuestions() {
  client = new XMLHttpRequest();

client.open('GET','http://developer.cege.ucl.ac.uk:30286/getGeoJSON/quiz/geom');
  client.onreadystatechange = questionResponse;
  // note don't use questionResponse() with brackets as that doesn't work
  client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function questionResponse() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
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
    layer.bindPopup(feature.properties.question+'<br> <form onsubmit="return (getScore()&& startDataUpload());"> <input type="radio" name="answer", id="1", value="Answer1">'+feature.properties.answer1+ '<br> <input type="radio" name="answer", id="2" value="Answer2">'+feature.properties.answer2+ '<br> <input type="radio" name="answer", id="3", value="Answer3">'+feature.properties.answer3+ '<br> <input type="radio" name="answer", id="4", value="Answer4">' + feature.properties.answer4 +'<br> <input type="submit",name="submit", id="submit", value="Submit"> <input id="hidden" name="hidden" type="hidden" value='+feature.properties.correct+'><input id="question" name="question" type="hidden" value='+feature.properties.question+'></form>');
          },

    // use point to layer to create the points
    pointToLayer: function (feature, latlng) {


        question_point = L.marker(latlng, {icon:testMarkerRed});
        quiz_array.push(question_point);
        return question_point

    },


}).addTo(mymap);
mymap.fitBounds(questionlayer.getBounds());
}

var xhr; // define the global variable to process the AJAX request
function callDivChange() {
xhr = new XMLHttpRequest();
var filename = document.getElementById("filename").value;
xhr.open("GET", filename, true);
xhr.onreadystatechange = processDivChange;
try {
 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
}
catch (e) {
}
xhr.send();
}
function processDivChange() {
if (xhr.readyState < 4) // while waiting response from server
 document.getElementById('ajaxtest').innerHTML = "Loading...";
 else if (xhr.readyState === 4) { // 4 = Response from server has been completely loaded.
 if (xhr.status == 200 && xhr.status < 300)
// http status between 200 to 299 are all successful
 document.getElementById('ajaxtest').innerHTML = xhr.responseText;
 }
}
