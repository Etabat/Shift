appendHistory();
function appendHistory(){
    function appendLog(sections){
        var display = document.createElement('tbody');
        document.querySelector('.table.table-bordered').appendChild(display);
        var row = document.createElement('tr');
        display.appendChild(row);
        var dates = document.createElement('td');
        row.appendChild(dates);
        console.log(sections.eventDate);
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var eventDate = new Date(sections.eventDate);
        var localeTime = eventDate.toLocaleString('en-US', options);
        console.log(localeTime);
        dates.innerHTML = '<p>' + localeTime + '</p>';
        var descriptions = document.createElement('td');
        descriptions.innerHTML = '<p>' + sections.eventDescription + '</p>';
        row.appendChild(descriptions);
        var ratedEmotions = sections.emotionsAndRange;
        var emotionsList = document.createElement('td');
        emotionsList.className = 'catalog';
        row.appendChild(emotionsList);
        var thoughtsList = document.createElement('td');
        thoughtsList.className = 'thoughts-list';
        row.appendChild(thoughtsList);
        for (var key in ratedEmotions) {
            if (ratedEmotions.hasOwnProperty(key)) {
                var passage = document.createElement('p');
                passage.setAttribute('data-emotion', key);
                passage.setAttribute('data-range', ratedEmotions[key]);
                emotionsList.appendChild(passage);
                passage.textContent = key + ' ' + '(' + ratedEmotions[key] + '%' + ')';
            }
        }
        var negativeThoughts = sections.automaticNegativeThoughts;
        for (var thoughts in negativeThoughts) {
            if (negativeThoughts.hasOwnProperty(thoughts)) {
                var newThought = document.createElement('p');
                newThought.className = 'thoughts';
                newThought.setAttribute('data-toggle', 'modal');
                newThought.setAttribute('data-target', '#affirm');
                thoughtsList.appendChild(newThought);
                newThought.textContent = negativeThoughts[thoughts];
            }
        }
        var ratedList = document.createElement('td');
        row.appendChild(ratedList);
        for (var property in ratedEmotions) {
            if (ratedEmotions.hasOwnProperty(property)) {
                var passageThree = document.createElement('p');
                ratedList.appendChild(passageThree);
              passageThree.textContent = property + ' ( __%)';
            }
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        if((xhr.status === 200) || (xhr.status === 304)) {
            var response = xhr.responseText;
            var stressLog = JSON.parse(response);
            stressLog.forEach(function(logSection){
                appendLog(logSection);
            });
        }
        if (xhr.readyState == 4 && xhr.status == 200){
          var list = document.getElementsByClassName('thoughts-list');
          console.log(list);
          loadChallenge();
        }
        else {
            alert(e.target.responseText);
        }
    });
    xhr.addEventListener("error", function() {
        alert('Something goes wrong.');
    });
    xhr.open('GET', './secureFormData/answers/5000', true);
    xhr.send();
}
function loadChallenge() {
  $(".thoughts-list").click(handler);
  function handler(event) {
    var target = $(event.target);
    var emotions = event.target.parentNode.previousSibling.childNodes;
    console.log(target);
    if (target.is("p")) {
      var hotThoughts = document.querySelectorAll('.hot-thought');
      for (var thought = 0; thought < hotThoughts.length; thought++) {
        hotThoughts[thought].textContent = 'Selected hot-thought: ' + event.target.innerText;
      }
      console.log(target['p']);
      console.log(emotions);
      //$('#affirm').on('hide.bs.modal', function(){
      //  var evidence = document.getElementById('evidence').value;
      //  console.log(evidence);
      //  submitChallenge(evidence);
      //});
      $('#reassess').on('show.bs.modal', function(){
        var reassess = document.querySelector('#reassess form');
        while (reassess.lastChild) {
          reassess.removeChild(reassess.lastChild);
        }
        console.log(emotions.length);
        function setAttributes(element, attrs) {
          for (var key in attrs) {
            element.setAttribute(key, attrs[key]);
          }
        }
        for (var nodes = 0; nodes < emotions.length; nodes++) {
          if (emotions[nodes].nodeName == 'P') {
            var emotion = emotions[nodes].dataset.emotion;
            var scale = emotions[nodes].dataset.range;
            console.log(emotion);
            console.log(scale);
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
      }).on('hide.bs.modal', function(){

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
  validateData(event);
  clearForm(event)
  });
function validateData(event) {
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
      console.log(emotion);
      console.log(range)
    }
    console.log(entries);
    return JSON.stringify(entries);
  }
function clearForm(){
  document.getElementById('evidence').value = "";
  document.getElementById('evidence-against').value = "";
  document.getElementById('alternative').value = "";
}