var greeting = document.getElementById("name");
var name = "User"; //we can probably get the name from th
(new Date().getHours() > 12) ? greeting.innerHTML = "Good Afternoon, "+name+"!" : greeting.innerHTML = "Good Morning, "+name+"!";