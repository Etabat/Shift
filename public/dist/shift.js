function populateForm(e){e.preventDefault();var t=new XMLHttpRequest;t.open("GET","./worksheets.json",!0),t.send(),t.addEventListener("load",function(e){if(200===t.status||304===t.status){var n=t.responseText,o=JSON.parse(n),a=o.stressLog;addWorksheets(a)}else alert(e.target.responseText)}),t.addEventListener("error",function(){alert("Something went wrong.")})}function addWorksheets(e){var t=document.querySelectorAll("form h3");t[0].textContent=e.subtitle,t[1].textContent=e.subtitle2,t[2].textContent=e.subtitle3,t[3].textContent=e.subtitle4;var n=document.querySelectorAll("form p");n[0].textContent=e.description,n[1].textContent=e.description2,n[2].textContent=e.description3}function newRecord(){var e=new XMLHttpRequest;e.open("GET","./emotions.json",!0),e.send(),e.addEventListener("load",function(t){if(200===e.status||304===e.status){var n=e.responseText;loadSuggestions(n),t.preventDefault()}else alert(t.target.responseText)}),e.addEventListener("error",function(){alert("Something goes wrong.")})}function loadSuggestions(e){$("#tokenfield").tokenfield({autocomplete:{source:JSON.parse(e),delay:100,minLength:2,limit:5,beautify:!1,active:!0},showAutocompleteOnFocus:!1})}function showEmotions(e){var t=$("#tokenfield").tokenfield("getTokensList").split(", "),n=t[t.length-1],o=document.createElement("div");o.className="form-group"+n,document.getElementById("emotions").appendChild(o);var a=document.createElement("label");e(a,{"for":"percent-"+n,"class":"range"}),a.textContent=n,o.appendChild(a),showRange(o,n,e)}function showRange(e,t,n){var o=document.createElement("input");n(o,{id:"percent-"+t,type:"range",name:"range",min:"0",max:"100",value:"50",step:"5"}),e.appendChild(o);var a=document.createElement("output");n(a,{id:"resultOf"+t}),e.appendChild(a),function(e){var t=document.getElementById("percent-"+e),n=document.getElementById("resultOf"+e);n.innerText="50%",t.addEventListener("input",function(){n.innerText=t.value+"%"},!1)}(t)}function editEntry(e){if(e.target==document.getElementById("append")){var t=document.querySelector(".catalog-group"),n=document.createElement("div");n.className="catalog-item",t.appendChild(n);var o=document.createElement("div");o.className="input-group",n.appendChild(o);var a=document.getElementById("thought"),r=document.createElement("p");r.textContent=a.value,o.appendChild(r);var s=document.createElement("span");s.className="input-group-btn",o.appendChild(s);var d=document.createElement("button");d.className="btn btn-danger btn-xs",d.setAttribute("id","remove"),d.setAttribute("type","button"),d.textContent="x",s.appendChild(d),a.value=""}if(e.target==document.getElementById("remove")){var i=e.target.parentNode.parentNode.parentNode;i.parentNode.removeChild(i)}}function validateLog(e){var t=new XMLHttpRequest;t.open("POST","/secureFormData/answers/5000/stress-logs",!0),t.setRequestHeader("Content-type","application/json"),t.send(catalogLog()),t.addEventListener("load",function(e){200===t.status||304===t.status?console.log("Data sent and response loaded."):alert(e.target.responseText)}),t.addEventListener("error",function(){alert("Something went wrong.")}),e.preventDefault()}function catalogLog(){var e=new Object;e.eventDate=document.getElementById("period").value,e.eventDescription=document.getElementById("description").value,e.emotionsAndRange={};for(var t=document.getElementById("tokenfield").value.split(", "),n=0;n<t.length;n++){var o=document.getElementById("percent-"+t[n]);e.emotionsAndRange[t[n]]=o.value}e.automaticNegativeThoughts=[];for(var a=document.querySelectorAll("#thoughts .catalog-group p"),r=0;r<a.length;r++)e.automaticNegativeThoughts.push(a[r].innerText);return JSON.stringify(e)}var stressLog=document.getElementById("populate");stressLog.addEventListener("click",function(e){populateForm(e),newRecord()},!0),function(){$("#tokenfield").on("tokenfield:createdtoken",function(){function e(e,t){for(var n in t)e.setAttribute(n,t[n])}showEmotions(e)}).on("tokenfield:createtoken",function(e){var t=$(this).tokenfield("getTokens");$.each(t,function(t,n){n.value===e.attrs.value&&e.preventDefault()})}).on("tokenfield:removedtoken",function(e){var t=document.querySelector(".form-group"+e.attrs.value);t.parentNode.removeChild(t)})}();var thoughtForm=document.getElementById("thoughts");thoughtForm.addEventListener("click",function(e){e.preventDefault(),editEntry(e)},!1);var submitLog=document.getElementById("submit");submitLog.addEventListener("click",function(e){console.log(e.target),validateLog(e)},!0);