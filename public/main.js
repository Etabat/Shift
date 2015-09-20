function addEmotionsList(event){
    function fetchEmotions(list) {
        $('#tokenfield').tokenfield({
            autocomplete: {
                source: JSON.parse(list),
                delay: 100,
                minLength: 2
            },
            showAutocompleteOnFocus: false
        });
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        if((xhr.status === 200) || (xhr.status === 304)){
            var list = xhr.responseText;
            fetchEmotions(list);
            console.log(document.activeElement);
            event.preventDefault();
        }
        else {
            alert(e.target.responseText);
        }
    });
    xhr.addEventListener("error", function() {
        alert('Something goes wrong.');
    });
    xhr.open('GET', './emotionList.json', true);
    xhr.send();
}
function populate(event){
    event.preventDefault();
    function addWorksheets(sectionOne) {
    var subtitles = document.querySelectorAll('form h3');
    subtitles[0].textContent = sectionOne.subtitle;
    subtitles[1].textContent = sectionOne.subtitle2;
    subtitles[2].textContent = sectionOne.subtitle3;
    subtitles[3].textContent = sectionOne.subtitle4;
    var descriptions = document.querySelectorAll('form p');
    descriptions[0].textContent = sectionOne.description;
    descriptions[1].textContent = sectionOne.description2;
    descriptions[2].textContent = sectionOne.description3;
    }
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function(e) {
        if((xhr.status === 200) || (xhr.status === 304)){
            var response = xhr.responseText;
            var sections = JSON.parse(response);
            var sectionOne = sections.stressLog;
            console.log(sectionOne);
            addWorksheets(sectionOne);
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
var toggleStressLog = document.getElementById('toggleStressLog');
toggleStressLog.addEventListener('click',  function(event) {
    populate(event);
    addEmotionsList(event);
}, true);
