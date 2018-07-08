var xhttp = new XMLHttpRequest();
var api = "http://text-processing.com/api/sentiment/";
function getData(sentence){
  var data;
  var input = "text="+sentence;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = this.responseText;
    }
  };
  xhttp.open("POST", "http://text-processing.com/api/sentiment/", false);
  xhttp.send(input);
  data = JSON.parse(data);
  return data['label'];
}

function test() {
  var demo = document.getElementById("demo");
  demo.innerHTML = getData("great");
}

function parseInput() {
  var demo2 = document.getElementById('demo2');
  var journal = document.getElementById('journal').value;
  var parsed = journal.split('.');
  for (var i=0; i<parsed.length; i++) {
    demo2.innerHTML += parsed[i];
    demo2.innerHTML += ' : ';
    demo2.innerHTML += getData(parsed[i]);
    demo2.innerHTML += '<br>';
  }
}
