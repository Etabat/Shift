function addOrRemoveEmotionsList(event){
  function fetchEmotions(list) {
    $('#tokenfield').tokenfield({
      autocomplete: {
        source: JSON.parse(list),
        delay: 100,
        minLength: 2,
        limit: 5,
        beautify: false,
        active: true
      },
      showAutocompleteOnFocus: false
    }).on('tokenfield:createdtoken', function () {
      var emotionInputs = $('#tokenfield').tokenfield('getTokensList').split(', ');
      var lastEmotionInput = emotionInputs[emotionInputs.length-1];
      function setAttributes(element, attrs) {
        for(var key in attrs) {
          element.setAttribute(key, attrs[key]);
        }
      }
      var formGroup = document.createElement('div');
      formGroup.className = 'form-group' + lastEmotionInput;
      document.getElementById('emotions').appendChild(formGroup);
      var newLabel = document.createElement('label');
      setAttributes(newLabel, {"for": "percent-" + lastEmotionInput, "class": "range"});
      newLabel.textContent = lastEmotionInput;
      formGroup.appendChild(newLabel);
      var newInput = document.createElement('input');
      setAttributes(newInput, {"id": "percent-" + lastEmotionInput, "type": "range", "name": "range", "min": "0", "max": "100", "value": "50", "step": "5"});
      formGroup.appendChild(newInput);
      var newOutput = document.createElement('output');
      setAttributes(newOutput, {"id": "resultOf" + lastEmotionInput});
      formGroup.appendChild(newOutput);
      (function(emotion){
        var range = document.getElementById('percent-' + emotion);
        var output = document.getElementById('resultOf' + lastEmotionInput);
        output.innerHTML = '<b>50%</b>';
        range.addEventListener('input', function() {
          output.innerHTML = '<b>' + range.value + '%</b>';
        }, false);
      })(lastEmotionInput);
    }).on('tokenfield:createtoken', function (event) {
      var existingTokens = $(this).tokenfield('getTokens');
      $.each(existingTokens, function (index, token) {
        if (token.value === event.attrs.value)
          event.preventDefault();
      });
    }).on('tokenfield:removedtoken', function(e){
      var lastEmotionInput = document.querySelector('.form-group' + e.attrs.value);
      lastEmotionInput.parentNode.removeChild(lastEmotionInput);
    });
  }
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    if((xhr.status === 200) || (xhr.status === 304)){
      var list = xhr.responseText;
      fetchEmotions(list);
      event.preventDefault();
    }
    else {
      alert(e.target.responseText);
    }
  });
  xhr.addEventListener("error", function() {
    alert('Something goes wrong.');
  });
  xhr.open('GET', './emotions.json', true);
  xhr.send();
}
function populateForm(event){
  event.preventDefault();
  function addWorksheets(setting) {
    var subtitles = document.querySelectorAll('form h3');
    subtitles[0].textContent = setting.subtitle;
    subtitles[1].textContent = setting.subtitle2;
    subtitles[2].textContent = setting.subtitle3;
    subtitles[3].textContent = setting.subtitle4;
    var descriptions = document.querySelectorAll('form p');
    descriptions[0].textContent = setting.description;
    descriptions[1].textContent = setting.description2;
    descriptions[2].textContent = setting.description3;
  }
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    if((xhr.status === 200) || (xhr.status === 304)){
      var response = xhr.responseText;
      var sections = JSON.parse(response);
      var setting = sections.stressLog;
      addWorksheets(setting);
    }
    else {
      alert(e.target.responseText);
    }
  });
  xhr.addEventListener("error", function() {
    alert('Something goes wrong.');
  });
  xhr.open('GET', './worksheets.json', true);
  xhr.send();
}
var stressLog = document.getElementById('populate');
stressLog.addEventListener('click',  function(event) {
  populateForm(event);
  addOrRemoveEmotionsList(event);
}, true);
function addOrRemoveThoughts(event){
  if(event.target == document.getElementById('append')) {
    var thoughtList = document.querySelector('.list-group');
    var thoughtItem = document.createElement('div');
    thoughtItem.className = 'list-group-item';
    thoughtList.appendChild(thoughtItem);
    var inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    thoughtItem.appendChild(inputGroup);
    var thought = document.getElementById('thought');
    var listItem = document.createElement('p');
    listItem.textContent = thought.value;
    inputGroup.appendChild(listItem);
    var removeItemWrapper = document.createElement('span');
    removeItemWrapper.className = 'input-group-btn';
    inputGroup.appendChild(removeItemWrapper);
    var removeThought = document.createElement('button');
    removeThought.className = 'btn btn-danger btn-xs';
    removeThought.setAttribute('id', 'removeThought');
    removeThought.setAttribute('type', 'button');
    removeThought.textContent = 'x';
    removeItemWrapper.appendChild(removeThought);
    thought.value = '';
  }
  if(event.target == document.getElementById('removeThought')){
    var removeItem = event.target.parentNode.parentNode.parentNode;
    removeItem.parentNode.removeChild(removeItem);
  }
}
var thoughtForm = document.getElementById('thoughts');
thoughtForm.addEventListener('click', function(event){
  event.preventDefault();
  addOrRemoveThoughts(event);
}, false);
function validateData(e) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    if((xhr.status === 200) || (xhr.status === 304)){
      alert('Yeah! Data sent and response loaded.');
    }
    else {
      alert(e.target.responseText);
    }
  });
  xhr.addEventListener("error", function() {
    alert('Something went wrong.');
  });
  //xhr.open('GET', './secureFormData/answers:777', true);
  xhr.open('POST','/secureFormData/answers/5000', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(formData());
  function formData() {
    var userInputs = new Object();
    userInputs.eventDate = document.getElementById('period').value;
    userInputs.eventDescription = document.getElementById('description').value;
    userInputs.emotionsAndRange = {};
    var userEmotions = document.getElementById('tokenfield').value.split(', ');
    console.log(userEmotions);
    for(var emotionIndex = 0; emotionIndex < userEmotions.length; emotionIndex++){
      var range = document.getElementById('percent-' + userEmotions[emotionIndex]);
      userInputs.emotionsAndRange[userEmotions[emotionIndex]] = range.value;
    }
    userInputs.automaticNegativeThoughts = [];
    var allThoughts = document.querySelectorAll('#thoughts .list-group p');
    console.log(allThoughts);
    for(var thoughtIndex = 0; thoughtIndex < allThoughts.length; thoughtIndex++) {
      userInputs.automaticNegativeThoughts.push(allThoughts[thoughtIndex].innerText);
    }
    return JSON.stringify(userInputs);
  }
  e.preventDefault();
}
var button = document.getElementById('submit');
button.addEventListener('click', function(e) {
  validateData(e)
}, true);
