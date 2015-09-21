function addEmotionsList(event){
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
            //console.log(lastEmotionInput);
            //console.log(emotionInputs);
            function setAttributes(element, attrs) {
                for(var key in attrs) {
                    element.setAttribute(key, attrs[key]);
                }
            }
            var formGroup = document.createElement('div');
            formGroup.className = 'form-group' + lastEmotionInput;
            document.getElementById('sectionTwo').appendChild(formGroup);
            var newLabel = document.createElement('label');
            setAttributes(newLabel, {"for": "percentageOf" + lastEmotionInput, "class": "range"});
            newLabel.textContent = lastEmotionInput;
            formGroup.appendChild(newLabel);
            var newInput = document.createElement('input');
            setAttributes(newInput, {"id": "percentageOf" + lastEmotionInput, "type": "range", "name": "range", "min": "0", "max": "100", "value": "50", "step": "5"});
            formGroup.appendChild(newInput);
            var newOutput = document.createElement('output');
            setAttributes(newOutput, {"id": "resultOf" + lastEmotionInput});
            formGroup.appendChild(newOutput);
            (function(emotion){
                var range = document.getElementById('percentageOf' + emotion);
                //console.log(range);
                var output = document.getElementById('resultOf' + lastEmotionInput);
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
