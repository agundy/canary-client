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

function refreshSources(){
    var myTable = document.getElementById("dash_table");
    while (myTable.firstChild) { 
        myTable.removeChild(myTable.firstChild);
    }
    loadTable();
}

function loadTable(){
    table = document.getElementById("dash_table");
    sources = document.getElementById("sources");
    data = sources.children;
    if(data.length == 0) {
        numRows = 0;
    }
    else if(data.length%4 == 0){
        numRows = data.length/4;
    }
    else {
        numRows = Math.floor(data.length/4)+1;
    }
    var k = 0;
    for(var i = 0; i<numRows; i++) {
        var row = table.insertRow(table.rows.length)
        for(var j = 0; j<4 && data.item(k); j++) {
            row.insertCell(j).innerHTML = data.item(k).children[data.item(k).selectedIndex].text;
            row.cells[j].style.backgroundColor = colors[k%7];
            k++;
        }
    }
}

var source_array = [
    {value: "404", text: "404"},
    {value: "d404", text: "404 Rate"},
    {value: "lod", text: "Page Loads"},
    {value: "dlod", text: "Page Load Rate"},
    {value: "lat", text: "Latency"},
    {value: "usr0", text: "API 1"},
    {value: "usr1", text: "API 2"},
    {value: "usr2", text: "API 3"}
]

var numRows = 0;
var colors = ["red","orange","yellow","green","blue","indigo","violet"]

document.getElementById("plus").addEventListener('click', function() {
    addSource();
}, false);

document.getElementById("minus").addEventListener('click', function() {
    popSource();
}, false);

document.getElementById("gear").addEventListener('click', function() {
    refreshSources();
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