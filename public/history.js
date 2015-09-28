appendHistory();
function appendHistory(){
    function appendLog(sections){
        console.log(sections.logEntry);
        var display = document.createElement('tbody');
        document.querySelector('.table.table-bordered').appendChild(display);
        var row = document.createElement('tr');
        display.appendChild(row);
        var dates = document.createElement('td');
        row.appendChild(dates);
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var eventDate = new Date(sections.eventDate);
        var localeTime = eventDate.toLocaleString('en-US', options);
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
            console.log(response);
            var stressLog = JSON.parse(response);
            stressLog.forEach(function(section){
                appendLog(section);
            });
        }
        else {
            alert(e.target.responseText);
        }
    });
    xhr.addEventListener("error", function() {
        alert('Something went wrong. Something did not load properly. Check router and server configurations');
    });
    xhr.open('GET', './secureFormData/answers/5000/stress-logs', true);
    xhr.send();
}