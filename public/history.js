function displayLog(logEntry) {
  var stressLogs = document.getElementById('stressLogs');
  var stressLog = document.createElement('tr');
  stressLogs.appendChild(stressLog);

  displayDate(logEntry);
  displaySituation(logEntry);
  displayEmotions(logEntry);
  displayThoughts(logEntry);
  displayRerates(logEntry);

  function displayDate() {
    var dates = document.createElement('td');
    stressLog.appendChild(dates);
    var eventDate = new Date(logEntry.eventDate);
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
    description.innerText = logEntry.eventDescription;
    descriptions.appendChild(description);
    stressLog.appendChild(descriptions);
  }

  function displayEmotions() {
    var emotionsList = document.createElement('td');
    emotionsList.className = 'catalog';
    stressLog.appendChild(emotionsList);

    var ratedEmotions = logEntry.emotionsAndRange;
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

    var negativeThoughts = logEntry.automaticNegativeThoughts;
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

  function displayRerates(logEntry) {
    var ratedEmotions = logEntry.emotionsAndRange;
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
}

var xhr = new XMLHttpRequest();
xhr.open('GET', './secureFormData/answers/5000/stress-logs', true);
xhr.send();

xhr.addEventListener('load', function(event) {
  var response = event.target.responseText;
  var stressLog = JSON.parse(response);
  stressLog.forEach(function(logEntry){
    displayLog(logEntry);
  });
});

xhr.addEventListener("error", function() {
  alert('Something went wrong. Something did not load properly. Check router and server configurations');
});
