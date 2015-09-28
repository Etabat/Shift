var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(e) {
  if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
    console.log('hihih');
    var response = xhr.responseText;
    console.log(response);
    var stressLog = JSON.parse(response);
    console.log(stressLog);
    stressLog.forEach(function(entry){
      getLog(entry);
    });
    alert('Yeah! Data sent and response loaded.');
    loadChallenge();
  }
  else {
    alert(e.target.responseText);
  }
});
xhr.open('GET', './secureFormData/answers/5000/stress-logs', true);
xhr.send();
function loadChallenge() {
  $(".thoughts-list").click(handler);
  function handler(event) {
    var target = $(event.target);
    var emotions = event.target.parentNode.previousSibling.childNodes;
    if (target.is("p")) {
        var hotThoughts = document.querySelectorAll('.hot-thought');
      for (var thought = 0; thought < hotThoughts.length; thought++) {
        hotThoughts[thought].textContent = 'Selected hot-thought: ' + event.target.innerText;
      }
      $('#reassess').on('show.bs.modal', function(){
        var reassess = document.querySelector('#reassess form');
        while (reassess.lastChild) {
          reassess.removeChild(reassess.lastChild);
        }
        function setAttributes(element, attrs) {
          for (var key in attrs) {
            element.setAttribute(key, attrs[key]);
          }
        }
        for (var nodes = 0; nodes < emotions.length; nodes++) {
          if (emotions[nodes].nodeName == 'P') {
            var emotion = emotions[nodes].dataset.emotion;
            var scale = emotions[nodes].dataset.range;
            if (emotions[nodes].dataset.emotion != undefined) {
              var collection = document.createElement('div');
              collection.className = 'form-group' + emotion;
              reassess.appendChild(collection);
              var label = document.createElement('label');
              setAttributes(label, {"for": "percent-" + emotion, "class": "range"});
              label.textContent = emotion;
              collection.appendChild(label);
              var addRange = document.createElement('input');
              setAttributes(addRange, {
                "id": "percent-" + emotion,
                "type": "range",
                "name": "range",
                "min": "0",
                "max": "100",
                "value": "50",
                "step": "5"
              });
              collection.appendChild(addRange);
              var intensity = document.createElement('output');
              setAttributes(intensity, {"id": "resultOf" + emotion});
              collection.appendChild(intensity);
              (function (emotion) {
                var range = document.getElementById('percent-' + emotion);
                var output = document.getElementById('resultOf' + emotion);
                range.value = scale;
                output.innerHTML = '<b>' + range.value + '%</b>';
                range.addEventListener('input', function () {
                  output.innerHTML = '<b>' + range.value + '%</b>';
                }, false);
              })(emotion);
            }
          }
        }
      })
    }
  }
}
var clear = document.getElementById('cancel');
clear.addEventListener('click', function () {
  clearForm();
});
var submit = document.getElementById('validate');
submit.addEventListener('click', function(event){
  event.preventDefault();
  validateChallenge(event);
  clearForm(event)
});
var logArray = [];
function getLog(entry){
  console.log(entry);
  console.log(entry.eventDate);
  logArray.push(entry.logEntry);
}
function validateChallenge(event) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
      alert('Yeah! Data sent and response loaded.');
    }
    else {
      alert(e.target.responseText);
    }
  });
  xhr.addEventListener("error", function() {
    alert('Something went wrong.');
  });
  xhr.open('POST','/secureFormData/answers/5000/challenges', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(formData());
  function formData() {
    var who = logArray[3];
    console.log(who);
    var entries = {};
    entries.submissionDate = Date.now();
    entries.hotThought = event.target.parentNode.parentNode.childNodes[1].childNodes[5].innerText;
    entries.evidence = document.getElementById('evidence').value;
    entries.evidenceAgainst = document.getElementById('evidence-against').value;
    entries.alternative = document.getElementById('alternative').value;
    var reassess = document.querySelector('#reassess form').childNodes;
    entries.emotionsAndRange = {};
    for (var index = 0; index < reassess.length; index++) {
      var emotion = reassess[index].childNodes[0].innerText;
      var range = reassess[index].childNodes[2].value;
      entries.emotionsAndRange[emotion] = range;
    }
    return JSON.stringify(entries);
  }
}
function clearForm(){
  document.getElementById('evidence').value = "";
  document.getElementById('evidence-against').value = "";
  document.getElementById('alternative').value = "";
}