
window.onload = function() {
    console.log($(".tdNegativeThoughts"));
};
$(".tdNegativeThoughts").click(handler);
console.log($(".tdNegativeThoughts"));
function handler(event) {
    var target = $( event.target );
    console.log(target);
    if ( target.is( "p" ) ) {
        console.log(target);
        var hotThoughts = document.querySelectorAll('.hotThought');
        for(var thought = 0; thought < hotThoughts.length; thought++) {
            hotThoughts[thought].innerHTML = 'Selected Hot Thought: ' + event.target.innerText;
        }
        var thoughtChallengeRateEmotions = document.querySelector('#thoughtChallengeRateEmotions form');
        console.log(event.target);
        console.log($(this));
        var tdLoggedEmotions = event.target.parentNode.previousSibling.previousSibling.childNodes;
        console.log(tdLoggedEmotions);
        console.log(tdLoggedEmotions.length);
        //console.log(eventtargetTd.childNodes.length);
        function setAttributes(element, attrs) {
            for(var key in attrs) {
                element.setAttribute(key, attrs[key]);
            }
        }
        for (var nodes = 0; nodes < tdLoggedEmotions.length; nodes++) {
           // console.log(tdLoggedEmotions[nodes].getAttributeNode('data-emotion'));
            if(tdLoggedEmotions[nodes].nodeName == 'P'){
                var emotionData = tdLoggedEmotions[nodes].dataset.emotion;
                var emotionRangeData = tdLoggedEmotions[nodes].dataset.range;
                console.log(emotionData);
                console.log(emotionRangeData)
                if(tdLoggedEmotions[nodes].dataset.emotion != undefined) {
                    var formGroup = document.createElement('div');
                    formGroup.className = 'form-group' + emotionData;
                    thoughtChallengeRateEmotions.appendChild(formGroup);
                    var newLabel = document.createElement('label');
                    setAttributes(newLabel, {"for": "percentageOf" + emotionData, "class": "range"});
                    newLabel.textContent = emotionData;
                    formGroup.appendChild(newLabel);
                    var newInput = document.createElement('input');
                    setAttributes(newInput, {
                        "id": "percentageOf" + emotionData,
                        "type": "range",
                        "name": "range",
                        "min": "0",
                        "max": "100",
                        "value": "50",
                        "step": "5"
                    });
                    formGroup.appendChild(newInput);
                    var newOutput = document.createElement('output');
                    setAttributes(newOutput, {"id": "resultOf" + emotionData});
                    formGroup.appendChild(newOutput);
                    (function (emotion) {
                        var range = document.getElementById('percentageOf' + emotion);
                        var output = document.getElementById('resultOf' + emotion);
                        range.value = emotionRangeData;
                        output.innerHTML = '<b>' + range.value + '%</b>';
                        range.addEventListener('input', function () {
                            output.innerHTML = '<b>' + range.value + '%</b>';
                        }, false);
                    })(emotionData);
                }
            }
        }
        console.log(event.target.innerText);
    }
}
