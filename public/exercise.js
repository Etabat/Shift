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
    var hotThoughts = document.querySelectorAll('.hot-Thought');
    for(var thought = 0; thought < hotThoughts.length; thought++) {
      hotThoughts[thought].innerHTML = 'Selected Hot Thought: ' + event.target.innerText;
    }
    var reassess = document.querySelector('#reassess form');
    console.log(event.target);
    console.log($(this));
    var emotions = event.target.parentNode.previousSibling.previousSibling.childNodes;
    console.log(emotions);
    console.log(emotions.length);
    //console.log(eventtargetTd.childNodes.length);
    function setAttributes(element, attrs) {
      for(var key in attrs) {
        element.setAttribute(key, attrs[key]);
      }
    }
    for (var nodes = 0; nodes < emotions.length; nodes++) {
      // console.log(emotions[nodes].getAttributeNode('data-emotion'));
      if(emotions[nodes].nodeName == 'P'){
        var emotion = emotions[nodes].dataset.emotion;
        var scale = emotions[nodes].dataset.range;
        console.log(emotion);
        console.log(scale);
        if(emotions[nodes].dataset.emotion != undefined) {
          var collection = document.createElement('div');
          collection.className = 'form-group' + emotion;
          reassess.appendChild(collection);
          var label = document.createElement('label');
          setAttributes(label, {"for": "percent-" + emotion, "class": "range"});
          label.textContent = emotion;
          collection.appendChild(label);
          var addRange = document.createElement('input');
          setAttributes(addRange, {
            "id": "percent-" + emotion,
            "type": "range",
            "name": "range",
            "min": "0",
            "max": "100",
            "value": "50",
            "step": "5"
          });
          collection.appendChild(addRange);
          var intensity = document.createElement('output');
          setAttributes(intensity, {"id": "resultOf" + emotion});
          collection.appendChild(intensity);
          (function (emotion) {
            var range = document.getElementById('percent-' + emotion);
            var output = document.getElementById('resultOf' + emotion);
            range.value = scale;
            output.innerHTML = '<b>' + range.value + '%</b>';
            range.addEventListener('input', function () {
              output.innerHTML = '<b>' + range.value + '%</b>';
            }, false);
          })(emotion);
        }
      }
    }
    console.log(event.target.innerText);
  }
}
