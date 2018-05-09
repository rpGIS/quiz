function startDataUpload() {
      //takes the question from a hidden input
      var question = document.getElementById("question").value;
      //takes the correct answer from another hidden input
      var correct = document.getElementById("hidden").value;
      //takes the entered answer via a query to see which radio button was checked
      var score = document.querySelector('input[name="answer"]:checked').value;
      //creates a poststring with this information
      var postString = "question="+question+"&entered="+score+"&correct="+correct;
    //processes the poststring, uploading it to the database
      processData(postString);

      }
      var client;
      function processData(postString) {
       client = new XMLHttpRequest();
       //calls the correct app.post function in httpServer.js
       client.open('POST','http://developer.cege.ucl.ac.uk:30286/uploadAnswer',true);
       client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       client.onreadystatechange = dataUploaded;
       client.send(postString);
      }

      function dataUploaded() {
       // this function listens out for the server to say that the data is ready - i.e.
       if (client.readyState == 4) {
       // changes a DIV to show server entry
       document.getElementById("dataUploadResult").innerHTML = client.responseText;
       }
      }
