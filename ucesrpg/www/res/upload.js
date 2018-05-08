function startDataUpload() {
      alert ("start data upload");
      // now get the radio button values

    var score = document.querySelector('input[name="answer"]:checked').value;
    var postString="entered="+score;
      // now get the checkbox values - separate them with a | so that they can be
      // split later on if necessary
      processData(postString);

      }
      var client;
      function processData(postString) {
       client = new XMLHttpRequest();
       client.open('POST','http://developer.cege.ucl.ac.uk:30286/uploadData',true);
       client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       client.onreadystatechange = dataUploaded;
       client.send(postString);
      }

      function dataUploaded() {
       // this function listens out for the server to say that the data is ready - i.e.
       if (client.readyState == 4) {
       // change the DIV to show the response
       document.getElementById("dataUploadResult").innerHTML = client.responseText;
       }
      }
