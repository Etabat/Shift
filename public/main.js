var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(e) {
    if((xhr.status === 200) || (xhr.status === 304)){
        var questions = JSON.parse(xhr.responseText);
        document.getElementById('serveQ').innerHTML = questions.id1[0];
        alert('Yeah!');
    }
    else {
        alert(e.target.responseText);
    }
});
xhr.addEventListener("error", function() {
    alert('Something goes wrong.');
});
xhr.open('GET', './questions', true);
xhr.send();
