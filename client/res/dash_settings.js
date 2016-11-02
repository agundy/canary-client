/*******************************************
Adds new data source selection in settings
********************************************/
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
/*******************************************
Pops last data source selection from settings
*******************************************/
function popSource(){
    sources = document.getElementById("sources");
    toPop = sources.lastElementChild;
    sources.removeChild(toPop);
}

/*******************************************
Refreshes table to match changes to selection
*******************************************/
function refreshSources(){
    var myTable = document.getElementById("dash_table");
    while (myTable.firstChild) { 
        myTable.removeChild(myTable.firstChild);
    }
    loadTable();
}

/*******************************************
Loads table based on data source selections
*******************************************/
function loadTable(){
    table = document.getElementById("dash_table");
    sources = document.getElementById("sources");
    var data = sources.children;
    var numRows = Math.ceil(Math.sqrt(data.length));
    var k = 0;
    for(var i = 0; i<numRows; i++) {
        var row = table.insertRow(table.rows.length)
        for(var j = 0; j<numRows && data.item(k); j++) {
            row.insertCell(j).innerHTML = data.item(k).children[data.item(k).selectedIndex].text;
            row.cells[j].style.backgroundColor = colors[k%7];
            k++;
        }
    }
}

//Array for data source selection options
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

//Array for base colors of Cells
var colors = ["red","orange","yellow","green","blue","indigo","violet"]

//Click event listener for add data source selection button
document.getElementById("plus").addEventListener('click', function() {
    addSource();
}, false);

//Click event listener for remove data source selection button
document.getElementById("minus").addEventListener('click', function() {
    popSource();
}, false);

//Click event listener for refresh table button
document.getElementById("gear").addEventListener('click', function() {
    refreshSources();
}, false);

//Click event listener for viewing other projects
document.getElementById("more").addEventListener('click', function() {
    alert("Access Denied. Please contact your project administrator.");
}, false);

//Greeting User
var greeting = document.getElementById("name");
var name = "User"; //we can probably get the name from th
(new Date().getHours() > 12) ? greeting.innerHTML = "Good Afternoon, "+name+"!" : greeting.innerHTML = "Good Morning, "+name+"!";

//Loads default data source selections to settings
for (var i = 0; i < source_array.length; i += 1) { 
    addSource(); document.getElementById("sources").lastChild.selectedIndex = i; 
}