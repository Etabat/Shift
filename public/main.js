function drawWorksheet(worksheet) {
    document.write(worksheet);
    // this code would get alot more complicated
    // each time the user interacts with the page, you can call the xmlrequest to grab the right 'worksheet'
    // once you do that, you can do very complicated things with the data retrieved
}
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function(e) {
    if((xhr.status === 200) || (xhr.status === 304)){
        var questions = JSON.parse(xhr.responseText);
        drawWorksheet(questions);
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
