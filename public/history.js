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
        var ratedEmotions = sections.ratedEmotions;
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
                var passageTwo = document.createElement('p');
                passageTwo.className = 'thoughts';
                passageTwo.setAttribute('data-toggle', 'modal');
                passageTwo.setAttribute('data-target', '#affirm');
                thoughtsList.appendChild(passageTwo);
                passageTwo.textContent = negativeThoughts[thoughts];
            }
        }
        var emotionsListTwo = document.createElement('td');
        row.appendChild(emotionsListTwo);
        for (var property in ratedEmotions) {
            if (ratedEmotions.hasOwnProperty(key)) {
                var passageTwo = document.createElement('p');
                emotionsListTwo.appendChild(passageTwo);
                passageTwo.textContent = property + ' ( __%)';
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