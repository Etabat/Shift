var stressLog = document.getElementById('populate');
stressLog.addEventListener('click',  function(event) {
  populateForm(event);
  newRecord();
}, true);

function populateForm(event) {
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './worksheets.json', true);
  xhr.send();
  xhr.addEventListener('load', function (event) {
    if ((xhr.status === 200) || (xhr.status === 304)) {
      var response = xhr.responseText;
      var sections = JSON.parse(response);
      var setting = sections.stressLog;
      addWorksheets(setting);
    }
    else {
      alert(event.target.responseText + 'xhr didnt load shift 2');
    }
  });
  xhr.addEventListener("error", function () {
    alert('Something went wrong.');
  });
}

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

function newRecord() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', './emotions.json', true);
  xhr.send();
  xhr.addEventListener('load', function (event) {
    if ((xhr.status === 200) || (xhr.status === 304)) {
      var emotionsList = xhr.responseText;
      loadSuggestions(emotionsList);
      event.preventDefault();
    }
    else {
      alert(event.target.responseText + 'shift xhr didnt load 1');
    }
  });
  xhr.addEventListener("error", function () {
    alert('Something goes wrong.');
  });
}

function loadSuggestions(emotionsList) {
  $('#tokenfield').tokenfield({
    autocomplete: {
      source: JSON.parse(emotionsList),
      delay: 100,
      minLength: 2,
      limit: 5,
      beautify: false,
      active: true
    },
    showAutocompleteOnFocus: false
  });
}
(function () {
  $('#tokenfield')
    .on('tokenfield:createdtoken', function () {
      function setAttributes (element, attrs) {
        for(var key in attrs) {
          element.setAttribute(key, attrs[key]);
        }
      }
      showEmotions(setAttributes);
    }).on('tokenfield:createtoken', function (event) {
        var existingTokens = $(this).tokenfield('getTokens');
        $.each(existingTokens, function (index, token) {
          if (token.value === event.attrs.value)
            event.preventDefault();
        });
    }).on('tokenfield:removedtoken', function (event) {
        var lastEmotion = document.querySelector('.form-group' + event.attrs.value);
        lastEmotion.parentNode.removeChild(lastEmotion);
    });
})();

function showEmotions(setAttributes) {
  var emotion = $('#tokenfield').tokenfield('getTokensList').split(', ');
  var lastEmotion = emotion[emotion.length - 1];
  var collection = document.createElement('div');
  collection.className = 'form-group' + lastEmotion;
  document.getElementById('emotions').appendChild(collection);
  var label = document.createElement('label');
  setAttributes(label, {
    "for": "percent-" + lastEmotion,
    "class": "range"
  });
  label.textContent = lastEmotion;
  collection.appendChild(label);
  showRange(collection, lastEmotion, setAttributes);
}

function showRange(collection, lastEmotion, setAttributes) {
  var addRange = document.createElement('input');
  setAttributes(addRange, {
    "id": "percent-" + lastEmotion,
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
    "id": "resultOf" + lastEmotion
  });
  collection.appendChild(intensity);
  (function(last) {
    var range = document.getElementById('percent-' + last);
    var output = document.getElementById('resultOf' + last);
    output.innerText = '50%';
    range.addEventListener('input', function() {
      output.innerText = range.value + '%';
    }, false);
  })(lastEmotion);
}

var thoughtForm = document.getElementById('thoughts');
thoughtForm.addEventListener('click', function(event){
  event.preventDefault();
  editEntry(event);
}, false);

function editEntry(event) {
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

var submitLog = document.getElementById('submit');
submitLog.addEventListener('click', function(event) {
  console.log(event.target);
  validateLog(event)
}, true);

function validateLog(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/secureFormData/answers/5000/stress-logs', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(catalogLog());
  xhr.addEventListener('load', function (event) {
    if ((xhr.status === 200) || (xhr.status === 304)) {
      alert('Yeah! Data sent and response loaded.');
    }
    else {
      alert(event.target.responseText + 'xhr didnt load shift 3');
    }
  });
  xhr.addEventListener("error", function () {
    alert('Something went wrong.');
  });
  event.preventDefault();
}

function catalogLog() {
  var entries = new Object();
  entries.eventDate = document.getElementById('period').value;
  entries.eventDescription = document.getElementById('description').value;
  entries.emotionsAndRange = {};
  var emotions = document.getElementById('tokenfield').value.split(', ');
  for(var item = 0; item < emotions.length; item++){
    var range = document.getElementById('percent-' + emotions[item]);
    entries.emotionsAndRange[emotions[item]] = range.value;
  }
  entries.automaticNegativeThoughts = [];
  var thoughts = document.querySelectorAll('#thoughts .catalog-group p');
  for(var index = 0; index < thoughts.length; index++) {
    entries.automaticNegativeThoughts.push(thoughts[index].innerText);
  }
  return JSON.stringify(entries);
}

//var list = document.getElementsByClassName('thoughts-list');