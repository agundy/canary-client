function greeting(myid) {
    var greeting = document.getElementById(myid);
    (new Date().hours > 12) ? greeting.innerHTML = "Good Afternoon!" : greeting.innerHTML = "Good Morning!";
}