var xhr = new XMLHttpRequest();
xhr.open('GET', './secureFormData/answers/5000/stress-logs', true);
xhr.send();
xhr.addEventListener('load', function(event) {
  if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
    displayChallenge();
  }
  else {
    alert(event.target.responseText);
  }
});

function displayChallenge() {
  $(".thoughts-list").click(displayThought);
  function displayThought(event) {
    var target = $(event.target);
    if (target.is("p")) {
      var hotThoughts = document.querySelectorAll('.hot-thought');
      for (var thought = 0; thought < hotThoughts.length; thought++) {
        hotThoughts[thought].textContent = 'Selected hot-thought: ' + event.target.innerText;
        displayEmotions(event)
      }
    }
  }
}

function displayEmotions(event) {
  $('#reassess').on('show.bs.modal', function () {
    console.log('hi');
    var reassess = document.querySelector('#reassess form');
    refreshEmotions(reassess);
    var emotions = event.target.parentNode.previousSibling.childNodes;
    console.log(emotions);
    for (var nodes = 0; nodes < emotions.length; nodes++) {
      if (emotions[nodes].nodeName == 'P') {
        var emotion = emotions[nodes].dataset.emotion;
        var collection = document.createElement('div');
        collection.className = 'form-group' + emotion;
        reassess.appendChild(collection);
        var label = document.createElement('label');
        setAttributes(label, {
          "for": "percent-" + emotion,
          "class": "range"
        });
        label.textContent = emotion;
        collection.appendChild(label);
        displayRange(collection, emotions, emotion, nodes)
      }
    }
  });
}

function refreshEmotions(reassess){
  while (reassess.lastChild) {
    reassess.removeChild(reassess.lastChild);
  }
}

function setAttributes(element, attrs) {
  for (var key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}
function displayRange(collection, emotions, emotion, nodes) {
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
  setAttributes(intensity, {
    "id": "resultOf" + emotion
  });
  collection.appendChild(intensity);
  var scale = emotions[nodes].dataset.range;
  (function (emotion) {
    var range = document.getElementById('percent-' + emotion);
    var output = document.getElementById('resultOf' + emotion);
    range.value = scale;
    output.innerText = range.value + '%';
    range.addEventListener('input', function () {
      output.innerText = range.value + '%';
    }, false);
  })(emotion);
}

var submit = document.getElementById('validate');
submit.addEventListener('click', function(event){
  console.log(event.target);
  event.preventDefault();
  validateChallenge(event);
  clearForm(event)
});

function validateChallenge(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/secureFormData/answers/5000/challenges', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(catalogChallenge(event));
  xhr.addEventListener("error", function () {
    alert('Something went wrong.');
  });
}

function catalogChallenge(event) {
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

var clear = document.getElementById('cancel');
clear.addEventListener('click', function () {
  clearForm();
});

function clearForm(){
  document.getElementById('evidence').value = "";
  document.getElementById('evidence-against').value = "";
  document.getElementById('alternative').value = "";
}