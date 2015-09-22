window.onload = function() {
    loadStressLogHistory();
};
function loadStressLogHistory(){
    function addStressLogSections(stressLogSections){
        var tableBody = document.createElement('tbody');
        document.querySelector('.table.table-bordered').appendChild(tableBody);
        var tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);
        var tdEventDate = document.createElement('td');
        tableRow.appendChild(tdEventDate);
        var fetchEventDate = new Date(stressLogSections.eventDate);
        console.log(fetchEventDate);
        tdEventDate.innerHTML = '<p>' + fetchEventDate + '</p>';
        var tdEventDescription = document.createElement('td');
        tdEventDescription.innerHTML = '<p>' + stressLogSections.eventDescription + '</p>';
        tableRow.appendChild(tdEventDescription);
        var emotionsAndRange = stressLogSections.emotionsAndRange;
        var tdEmotionsAndRange = document.createElement('td');
        tableRow.appendChild(tdEmotionsAndRange);
        console.log(emotionsAndRange);
        console.log(emotionsAndRange.emotion0);
        var emotionsAndRangeTemp = [];
        for (var key in emotionsAndRange) {
            if (emotionsAndRange.hasOwnProperty(key)) {
                emotionsAndRangeTemp.push(emotionsAndRange[key]);
                console.log(emotionsAndRangeTemp)
            }
        }
            console.log(emotionsAndRangeTemp);
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        if((xhr.status === 200) || (xhr.status === 304)) {
            var response = xhr.responseText;
            var stressLogSections = JSON.parse(response);
            addStressLogSections(stressLogSections);
        }
        else {
            alert(e.target.responseText);
        }
    });
    xhr.addEventListener("error", function() {
        alert('Something goes wrong.');
    });
    xhr.open('GET', './secureFormData/formData.json', true);
    xhr.send();
}