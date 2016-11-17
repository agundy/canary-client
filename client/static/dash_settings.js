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
    if (!document.getElementById("sources").lastElementChild) {
        return;
    }
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
		removeSources();
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
    var del_source = [];
    for(var i = 0; i<numRows; i++) {
        var row = table.insertRow(table.rows.length)
        for(var j = 0; j<numRows; j++) {
            source_text = data[k].children[data[k].selectedIndex].text;
            row.insertCell(j).innerHTML = data[k].children[data[k].selectedIndex].text;
            row.cells[j].dataset.inOn = "0";
            if (!todayWeLie){ 
                row.cells[j].style.backgroundColor = colors[k%9][Number(row.cells[j].dataset.inOn)];
            } else{
                if (Math.random()<.2) {
                    row.cells[j].style.backgroundColor = colors[k%9][1];
                } else{
                    row.cells[j].style.backgroundColor = colors[k%9][0];
                }
            }
            k++;
    
        }
    }
}

/*******************************************
Removes sources indicated by user selection
********************************************/
function removeSources() {
    sources = document.getElementById("sources");
    var data = sources.children;
    var del_sources = [];
    for(var i = 0; i<data.length; i++){
        if(data[i].children[data[i].selectedIndex].text == "Delete Source") {
            del_sources.push(data[i]);
        }
    }
		
    for(var j = 0; j<del_sources.length; j++) {
        sources.removeChild(del_sources[j]);
    }			
}

//Array for projects selection options
var project_array = [{value: 0, text: "Canary"}]

//Array for data source selection options
var source_array = [
    {value: "404", text: "404"},
    {value: "d404", text: "404 Rate"},
    {value: "lod", text: "Page Loads"},
    {value: "dlod", text: "Page Load Rate"},
    {value: "lat", text: "Latency"},
    {value: "usr0", text: "API 1"},
    {value: "usr1", text: "API 2"},
    {value: "usr2", text: "API 3"},
    {value: "usr3", text: "API 4"},
    {value: "del", text: "Delete Source"}
]

var colors = [ //[off,on]
	[ "#d27979" , "#ff4d4d" ],
	[ "#d2b579" , "#ffc34d" ],
	[ "#b5d279" , "#c3ff4d" ],
	[ "#79d279" , "#4dff4d" ],
	[ "#79d2b5" , "#4dffc3" ],
	[ "#79b5d2" , "#4dc3ff" ],
	[ "#7979d2" , "#4d4dff" ],
	[ "#b579d2" , "#c44dff" ],
    [ "#d279b5" , "#ff4dc3" ]
    ];

/***************************************************
projects = document.getElementById("projects");
var proj_selector = document.createElement("select")
proj_selector.classList = ["sources"];
for (var i = 0; i < project_array.length; i += 1) {
    option = document.createElement('option');
    option.setAttribute('value', project_array[i].value);
    option.appendChild(document.createTextNode(project_array[i].text));
    proj_selector.appendChild(option);
}
projects.appendChild(proj_selector);
***************************************************/
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


var todayWeLie = false;
document.getElementById("attribution").addEventListener('click', function() {
    todayWeLie = true;
    setInterval(function() { refreshSources(); }, 500);
})

//Greeting User
var greeting = document.getElementById("name");
var name = "User"; //we can probably get the name from th
(new Date().getHours() > 12) ? greeting.innerHTML = "Good Afternoon, "+name+"!" : greeting.innerHTML = "Good Morning, "+name+"!";

//Loads default data source selections to settings
for (var i = 0; i < source_array.length-1; i += 1) { 
    addSource(); document.getElementById("sources").lastChild.selectedIndex = i; 
}
