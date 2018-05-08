function startDataUpload() {
      alert ("start data upload");
      // now get the radio button values
      var question = document.getElementById("question").value;
      var correct = document.getElementById("hidden").value;
      var score = document.querySelector('input[name="answer"]:checked').value;
      var postString = "question="+question+"&entered="+score+"&correct="+correct;
      alert(score);
      // now get the checkbox values - separate them with a | so that they can be
      // split later on if necessary
      processData(postString);

      }
      var client;
      function processData(postString) {
       client = new XMLHttpRequest();
       client.open('POST','http://developer.cege.ucl.ac.uk:30286/uploadAnswer',true);
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
