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
    for(var i = 0; i<numRows; i++) {
        var row = table.insertRow(table.rows.length)
        for(var j = 0; j<numRows; j++) {
            source_text = data[k].children[data[k].selectedIndex].value;
            row.insertCell(j).innerHTML = source_text;
            row.cells[j].className = (' ' + source_text).slice(1);
            row.cells[j].dataset.inOn = "0";
            row.cells[j].dataset.colorIndex = String(k%9);
						row.cells[j].addEventListener("click", function() {
                            blink_source(source_text);
                        },false);
            if (!todayWeLie){ 
                row.cells[j].style.backgroundColor = colors[Number(row.cells[j].dataset.colorIndex)][Number(row.cells[j].dataset.inOn)];
            } else{
                if (Math.random()<.2) {
                    row.cells[j].style.backgroundColor = colors[Number(row.cells[j].dataset.colorIndex)][1];
                } else{
                    row.cells[j].style.backgroundColor = colors[Number(row.cells[j].dataset.colorIndex)][0];
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

/*******************************************
Blinks the "light" (color) of Cells in 
the Table for a given data source
********************************************/
function blink_source(e) {
    source_light_on(e);
    setTimeout(source_light_off(e),1000);
}

/*******************************************
Sets the color of a Cell to its on state for
a given data source
********************************************/
function source_light_on(someClass) {
    var cells = document.getElementsByClassName(someClass);
    console.log(someClass + cells.length)
    for (var i = 0; i < cells.length; i++) { 
        cells[i].style.backgroundColor = colors[Number(cells[i].dataset.colorIndex)][1];
    }
}

/*******************************************
Sets the color of a Cell to its off state for
a given data source
********************************************/
function source_light_off(someClass) {
    var cells = document.getElementsByClassName(someClass);
    for (var i = 0; i < cells.length; i++) { 
        cells[i].style.backgroundColor = colors[Number(cells[i].dataset.colorIndex)][0];
    }
}

//Array for projects selection options
var project_array = [{value: 0, text: "Canary"}]

//Array for data source selection options
var source_array = [
    {value: "lod", text: "Page Load"},
    {value: "400", text: "400: Bad Request"},
    {value: "403", text: "403: Access Denied"},
    {value: "404", text: "404: Not Found"},
    {value: "500", text: "500: Server Error"},
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



var todayWeLie = false;
document.getElementById("logo").addEventListener('click', function() {
    todayWeLie = !todayWeLie;
    if (todayWeLie) { setInterval(function() { refreshSources(); }, 500); }
})

//Greeting User
var greeting = document.getElementById("name");
var name = "User"; //we can probably get the name from th
(new Date().getHours() > 12) ? greeting.innerHTML = "Good Afternoon, "+name+"!" : greeting.innerHTML = "Good Morning, "+name+"!";

//Loads default data source selections to settings
for (var i = 0; i < source_array.length-1; i += 1) { 
    addSource(); document.getElementById("sources").lastChild.selectedIndex = i; 
}
