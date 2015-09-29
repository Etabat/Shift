// like the chaining, on lke 5, it's not consistent with the other
// change the name of dispplay,
function displayLogs(sections){
  // 3-11 could be a function
  // so like "DRAW TABLE"
  // appendLog -> displayLogs
  // simplify code
var stressLogs = document.querySelector('.table');
var display = document.createElement('tbody');
stressLogs.appendChild(display);
var stressLog = document.createElement('tr');
display.appendChild(stressLog);

displayDate();
displaySituation();
displayEmotions();
displayThoughts();

function displayDate() {
  var dates = document.createElement('td');
  stressLog.appendChild(dates);
  var eventDate = new Date(sections.eventDate);
  var options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  var localeTime = eventDate.toLocaleString('en-US', options);
  var entryDate = document.createElement('p');
  entryDate.innerText = localeTime;
  dates.appendChild(entryDate);
}

function displaySituation() {
  var descriptions = document.createElement('td');
  var description = document.createElement('p');
  description.innerText = sections.eventDescription;
  descriptions.appendChild(description);
  stressLog.appendChild(descriptions);
}

function displayEmotions() {
  var emotionsList = document.createElement('td');
  emotionsList.className = 'catalog';
  stressLog.appendChild(emotionsList);

  var ratedEmotions = sections.emotionsAndRange;
  for (var key in ratedEmotions) {
    if (ratedEmotions.hasOwnProperty(key)) {
      var passage = document.createElement('p');
      passage.setAttribute('data-emotion', key);
      passage.setAttribute('data-range', ratedEmotions[key]);
      emotionsList.appendChild(passage);
      passage.textContent = key + ' ' + '(' + ratedEmotions[key] + '%' + ')';
    }
  }
}

function displayThoughts() {
  var thoughtsList = document.createElement('td');
  thoughtsList.className = 'thoughts-list';
  stressLog.appendChild(thoughtsList);
  
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
}

  var ratedList = document.createElement('td');
  stressLog.appendChild(ratedList);
  for (var property in ratedEmotions) {
    if (ratedEmotions.hasOwnProperty(property)) {
      var passageThree = document.createElement('p');
        ratedList.appendChild(passageThree);
        passageThree.textContent = property + ' ( __%)';
    }
  }
}
var xhr = new XMLHttpRequest();
xhr.open('GET', './secureFormData/answers/5000/stress-logs', true);
xhr.send();

xhr.addEventListener('load', function(e) {
  var response = e.target.responseText;
  var stressLog = JSON.parse(response);
  stressLog.forEach(function(section){
    displayLogs(section);
  });
});
xhr.addEventListener("error", function() {
  alert('Something went wrong. Something did not load properly. Check router and server configurations');
});
