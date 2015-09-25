function newRecord(event){
  function fetch(catalog) {
    $('#tokenfield').tokenfield({
      autocomplete: {
        source: JSON.parse(catalog),
        delay: 100,
        minLength: 2,
        limit: 5,
        beautify: false,
        active: true
      },
      showAutocompleteOnFocus: false
    }).on('tokenfield:createdtoken', function () {
      var emotion = $('#tokenfield').tokenfield('getTokensList').split(', ');
      var lastEmotion = emotion[emotion.length-1];
      function setAttributes(element, attrs) {
        for(var key in attrs) {
          element.setAttribute(key, attrs[key]);
        }
      }
      var collection = document.createElement('div');
      collection.className = 'form-group' + lastEmotion;
      document.getElementById('emotions').appendChild(collection);
      var label = document.createElement('label');
      setAttributes(label, {"for": "percent-" + lastEmotion, "class": "range"});
      label.textContent = lastEmotion;
      collection.appendChild(label);
      var addRange = document.createElement('input');
      setAttributes(addRange, {"id": "percent-" + lastEmotion, "type": "range", "name": "range", "min": "0", "max": "100", "value": "50", "step": "5"});
      collection.appendChild(addRange);
      var intensity = document.createElement('output');
      setAttributes(intensity, {"id": "resultOf" + lastEmotion});
      collection.appendChild(intensity);
      (function(last){
        var range = document.getElementById('percent-' + last);
        var output = document.getElementById('resultOf' + last);
        output.innerHTML = '<b>50%</b>';
        range.addEventListener('input', function() {
          output.innerHTML = '<b>' + range.value + '%</b>';
        }, false);
      })(lastEmotion);
    }).on('tokenfield:createtoken', function (event) {
      var existingTokens = $(this).tokenfield('getTokens');
      $.each(existingTokens, function (index, token) {
        if (token.value === event.attrs.value)
          event.preventDefault();
      });
    }).on('tokenfield:removedtoken', function(e){
      var lastEmotion = document.querySelector('.form-group' + e.attrs.value);
      lastEmotion.parentNode.removeChild(lastEmotion);
    });
  }
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function(e) {
    if((xhr.status === 200) || (xhr.status === 304)){
      var catalog = xhr.responseText;
      fetch(catalog);
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
  newRecord(event);
}, true);
function editEntry(event){
  if(event.target == document.getElementById('append')) {
    var list = document.querySelector('.catalog-group');
    var item = document.createElement('div');
    item.className = 'catalog-item';
    list.appendChild(item);
    var collection = document.createElement('div');
    collection.className = 'input-group';
    item.appendChild(collection);
    var thought = document.getElementById('thought');
    var passage = document.createElement('p');
    passage.textContent = thought.value;
    collection.appendChild(passage);
    var removeWrap = document.createElement('span');
    removeWrap.className = 'input-group-btn';
    collection.appendChild(removeWrap);
    var remove = document.createElement('button');
    remove.className = 'btn btn-danger btn-xs';
    remove.setAttribute('id', 'remove');
    remove.setAttribute('type', 'button');
    remove.textContent = 'x';
    removeWrap.appendChild(remove);
    thought.value = '';
  }
  if(event.target == document.getElementById('remove')){
    var removeItem = event.target.parentNode.parentNode.parentNode;
    removeItem.parentNode.removeChild(removeItem);
  }
}
var thoughtForm = document.getElementById('thoughts');
thoughtForm.addEventListener('click', function(event){
  event.preventDefault();
  editEntry(event);
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
  xhr.open('POST','/secureFormData/answers/5000', true);
  xhr.setRequestHeader("Content-type","application/json");
  xhr.send(formData());
  function formData() {
    var entries = new Object();
    entries.eventDate = document.getElementById('period').value;
    entries.eventDescription = document.getElementById('description').value;
    entries.emotionsAndRange = {};
    var emotions = document.getElementById('tokenfield').value.split(', ');
    console.log(emotions);
    for(var item = 0; item < emotions.length; item++){
      var range = document.getElementById('percent-' + emotions[item]);
      entries.emotionsAndRange[emotions[item]] = range.value;
    }
    entries.automaticNegativeThoughts = [];
    var thoughts = document.querySelectorAll('#thoughts .catalog-group p');
    console.log(thoughts);
    for(var index = 0; index < thoughts.length; index++) {
      entries.automaticNegativeThoughts.push(thoughts[index].innerText);
    }
    return JSON.stringify(entries);
  }
  e.preventDefault();
}
var button = document.getElementById('submit');
button.addEventListener('click', function(e) {
  validateData(e)
}, true);
