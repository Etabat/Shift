loadStressLogHistory();
function loadStressLogHistory(){
    function addStressLogSections(stressLogSections){
          var tableBody = document.createElement('tbody');
        document.querySelector('.table.table-bordered').appendChild(tableBody);
        var tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);
        var tdEventDate = document.createElement('td');
        tableRow.appendChild(tdEventDate);
        console.log(stressLogSections.eventDate);
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        var fetchEventDate = new Date(stressLogSections.eventDate);
        var localeEventDate = fetchEventDate.toLocaleString('en-US', options);
        console.log(localeEventDate);
        tdEventDate.innerHTML = '<p>' + localeEventDate + '</p>';
        var tdEventDescription = document.createElement('td');
        tdEventDescription.innerHTML = '<p>' + stressLogSections.eventDescription + '</p>';
        tableRow.appendChild(tdEventDescription);
        var emotionsAndRange = stressLogSections.emotionsAndRange;
        var tdEmotionsAndRange = document.createElement('td');
        tdEmotionsAndRange.className = 'loggedEmotions';
        tableRow.appendChild(tdEmotionsAndRange);
        var tdNegativeThoughts = document.createElement('td');
        tdNegativeThoughts.className = 'tdNegativeThoughts';
        tableRow.appendChild(tdNegativeThoughts);
        for (var key in emotionsAndRange) {
            if (emotionsAndRange.hasOwnProperty(key)) {
                var emotionsParagraph = document.createElement('p');
                emotionsParagraph.setAttribute('data-emotion', key);
                emotionsParagraph.setAttribute('data-range', emotionsAndRange[key]);
                tdEmotionsAndRange.appendChild(emotionsParagraph);
                emotionsParagraph.textContent = key + ' ' + '(' + emotionsAndRange[key] + '%' + ')';
            }
        }
        var negativeThoughts = stressLogSections.automaticNegativeThoughts;
        for (var thoughts in negativeThoughts) {
            if (negativeThoughts.hasOwnProperty(thoughts)) {
                var thoughtsParagraph = document.createElement('p');
                thoughtsParagraph.className = 'negativeThoughts';
                thoughtsParagraph.setAttribute('data-toggle', 'modal');
                thoughtsParagraph.setAttribute('data-target', '#thoughtChallengeEvidenceFor');
                tdNegativeThoughts.appendChild(thoughtsParagraph);
                thoughtsParagraph.textContent = negativeThoughts[thoughts];
            }
        }
        var tdEmotionsAndRangeTwo = document.createElement('td');
        tableRow.appendChild(tdEmotionsAndRangeTwo);
        for (var property in emotionsAndRange) {
            if (emotionsAndRange.hasOwnProperty(key)) {
                var emotionsParagraphTwo = document.createElement('p');
                tdEmotionsAndRangeTwo.appendChild(emotionsParagraphTwo);
                emotionsParagraphTwo.textContent = property + ' ( __%)';
            }
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        if((xhr.status === 200) || (xhr.status === 304)) {
            var response = xhr.responseText;
            var stressLog = JSON.parse(response);
            stressLog.forEach(function(stressLogSection){
                addStressLogSections(stressLogSection);
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