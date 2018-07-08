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
  // data = JSON.parse(data);
  return data;
}

function test() {
  var tableCont = document.getElementById('table-cont');
  tableCont.appendChild(makeTable(parseInput()));

}

function parseInput() {
  var demo2 = document.getElementById('demo2');
  var journalText = document.getElementById('journal-text');
  var journal = document.getElementById('journal').value;
  journalText.innerHTML = journal;
  var parsed = journal.split('.');
  return parsed;
}
function makeTable(parsed) {
  var width = Math.ceil(Math.sqrt(parsed.length));
  var table = document.createElement('div');
  table.id = 'table';
  var tableWidth = document.getElementById('table-cont').offsetWidth;
  var cellWidth = String(1 / width * 100 - 2) + '%';
  console.log(tableWidth);

  var count = 0;
  for (var i=0; i<width; i++) {
    if (count == parsed.length) {
      break;
    }
    var row = document.createElement('div');
    row.id = 'row' + i.toString();
    row.className = 'row';
    for (var j=0; j<width; j++) {
      var cell = document.createElement('div');
      cell.id = 'cell' + count.toString();
      cell.className = 'cell';

      var color = 'rgb(255, 255, 255)';
      // color
      var prob = JSON.parse(getData(parsed[count]));
      console.log(parsed[count]);
      console.log(prob);
      // var r = 255 * String(prob['probability']['neg']);
      // var g = 255 * String(prob['probability']['neutral']);
      // var b = 255 * String(prob['probability']['pos']);
      // var color = 'rgb('+r+','+g+','+b+','+')';
      $(cell).css({
        'width': cellWidth,
        'padding-bottom': cellWidth,
        'background': color
      });

      row.appendChild(cell);
      count += 1;
      if (count == parsed.length) {
        break;
      }
    }
    table.appendChild(row);
  }

  //testing
  var demo2 = getDemo();
  demo2.innerHTML = '<br>';
  demo2.innerHTML += 'count : '+ parsed.length.toString();
  demo2.innerHTML += '<br>';
  demo2.innerHTML += 'width : '+ width.toString();
  demo2.innerHTML += '<br>';
  demo2.innerHTML += cellWidth;
  return table;
}

function populateTable(table) {

}
//tesitng
function getDemo() {
  return document.getElementById('demo2');
}
///
$(document).ready(function() {
  $('#send').click (
    function() {
      $('#input').toggleClass('display');
      $('#output').toggleClass('display');
    });
});
