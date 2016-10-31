function addSource(){
    sources = document.getElementById("sources");
    var selector = document.createElement("select");
    selector.classList = ["source"];
    source_count = source_array.length;

    for (var i = 0; i < source_count; i += 1) {
        option = document.createElement('option');
        option.setAttribute('value', source_array[i].value);
        option.appendChild(document.createTextNode(source_array[i].text));
        selector.appendChild(option);
    }
    sources.appendChild(selector);
}

function popSource(){
    sources = document.getElementById("sources");
    toPop = sources.lastElementChild;
    sources.removeChild(toPop);
}

var source_array = [
    {value: "404", text: "404"},
    {value: "d404", text: "404 rate"},
    {value: "lod", text: "Page Loads"},
    {value: "dlod", text: "Page Load Rate"},
    {value: "lat", text: "Latency"},
    {value: "usr0", text: "API 1"},
    {value: "usr1", text: "API 2"},
    {value: "usr2", text: "API 3"}
]

document.getElementById("plus").addEventListener('click', function() {
    addSource();
}, false);

document.getElementById("minus").addEventListener('click', function() {
    popSource();
}, false);

document.getElementById("gear").addEventListener('click', function() {
    alert("Access Denied. Please contact your project administrator.");
}, false);

document.getElementById("more").addEventListener('click', function() {
    alert("Access Denied. Please contact your project administrator.");
}, false);

var greeting = document.getElementById("name");
var name = "User"; //we can probably get the name from th
(new Date().getHours() > 12) ? greeting.innerHTML = "Good Afternoon, "+name+"!" : greeting.innerHTML = "Good Morning, "+name+"!";

for (var i = 0; i < source_array.length; i += 1) { 
    addSource(); document.getElementById("sources").lastChild.selectedIndex = i; 
}