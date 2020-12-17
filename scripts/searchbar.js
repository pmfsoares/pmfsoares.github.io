currEngine = 0;
//Engine list -- Use a link that includes the beginning of his query request at the end
engines=[
    {name:"Google", url:"https://www.google.pt/search?q=", icon:"styles/icons/google.png"},
    {name:"Duckduckgo", url:"https://duckduckgo.com/?q=", icon:"styles/icons/duckduckgo.png"},
    {name:"Wiki", url:"https://en.wikipedia.org/w/index.php?search=", icon:"styles/icons/wikipedia.png"},
    {name:"GitHub", url:"https://github.com/search?utf8=✓&q=", icon:"styles/icons/github.png"},
    {name:"ArchWiki", url:"https://wiki.archlinux.org/index.php?search=", icon:"styles/icons/Arch-linux.png"},
    {name:"Reddit", url:"https://www.reddit.com/search?q=", url2:"&include_over_18=on&sort=relevance&t=all",icon:"styles/icons/reddit.png"}


];
months=["January","February","March","April","May","June","July","August","September","October","November", "December"];

var links1, links2, links3, BinTimeout, DigTimeout;
var ClockBin = true;
links1 =[
    { name:"reddit", url:"https://www.reddit.com"},
    { name:"google", url:"https://www.google.com"},
];
links2 =[
    {name: "Tweetdeck", url:"https://www.tweetdeck.com"}
    {name: "Youtube", url:"https://www.youtube.com/subscription"},
    {name: "Instagram", url:"https://www.instagram.com"},

];
links3 =[
    { name:"Gmail", url:"https://www.gmail.com"},
    { name:"Keep", url:"https://keep.google.com"},
];
//Update clock every 1/2 sec.
function startTime() {
    if(!ClockBin){
        document.getElementById("clock-date").innerHTML = `<div class="text-center" id="clock"></div><div class"text-center" id="date"></div>`;
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var month = today.getMonth();
        var weekDay = today.getDay();
        var day = today.getDate();
        if(m==0 && s==0)
            writeDate();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
        writeDate();
    }
    DigTimeout = setTimeout(function(){startTime();}, 1000);
}
//Return a properly formatted day number, like 1st, 3rd ...
function dayToString(day){
    switch(day){
        case 1:
        case 21:
        case 31:
            return day+"st";
        case 2:
            return day+"nd";
        case 3:
            return day+"rd";
        default:
            return day+"th";
    }
}
//Update the date every time you load/reload the page or after midnight
function writeDate() {
    MonthsArray=["January","February","March","April","May","June","July","August","September","October","November","December"];
    WeekdaysArray=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var today = new Date();
    var month = today.getMonth();
    month < 12 ? monthString = MonthsArray[month] : monthString = "Error in month conversion, number=" + month ;
    var weekDay = today.getDay();
    var WeekdayString;
    weekDay < 7 ? WeekdayString = WeekdaysArray[weekDay] : WeekdayString = "Error: weekDay number "+ today.getDay();
    var day = today.getDate();
    var year = today.getFullYear();
    document.getElementById("date").innerHTML = WeekdayString + ", " + dayToString(day) + " of " + monthString + ", " + year;
} 
// add zero in front of numbers < 10
function checkTime(i) {
    if (i < 10) {i = "0" + i;};
    return i;
}
//Update the current engine
function changeEngine(n){
    if(n<engines.length){
        $("#dropdown-btn").html(engines[n].name);
    }
    currEngine=n;
    setDefaultEngine(n, 30);
    $("#search-btn").empty();
    $("#search-btn").html($("#search-btn").html()+'<img src="'+engines[currEngine].icon+'"/>');
}
//Generate the dropdown list from the engines array
function generateEngines(){
    for(var i = 0; i < engines.length; i++){
        $("#engine-list").html($("#engine-list").html()+'<a class="dropdown-item" href="#" onclick="changeEngine('+i+')">'+engines[i].name+'</a>');
    }
}
function generateLinks(){
    for(var j = 1; j <= 3; j++){
        var temp;
        switch(j){
        case 1:
            temp = links1;
            break;
        case 2:
            temp = links2;
            break;
        case 3:
            temp = links3;
            break;
        }
        $(`#column${j}`).empty();
        for(var i = 0; i < temp.length; i++){
            $(`#column${j}`).html($(`#column${j}`).html()+'<p><a class="links" href=\"' + temp[i].url + '\">' + temp[i].name+'</a></p>');
        }
    }
}
//Save an engine choice as a cookie
function setDefaultEngine(cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "defaultEngine=" + cvalue + ";" + expires + ";path=/";
}
//Get the last used engine from the cookies
function getDefaultEngine() {
    var name = "defaultEngine=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}










//Open a new tab with the generated link
function newSearch(){
    var text=document.getElementById('SearchField').value;
    if(text.substring(0,1) == "!"){
        if(text.substring(1,6) == "timer"){
            start();
            ClockBin = false;
            document.body.addEventListener("keydown", function(e){
                switch(e.keyCode){
                case 32:
                    stop();
                    console.log("Stopped Timer");
                    break;
                }
            }, false);
            console.log("started timer");
        }
        if(text.substring(1,9) == "calendar"){
            if($('#calendar').html() == ''){
                handleClientLoad();
                console.log("Sucessuful");
            }
            else{
                if($('#calendar').is(':visible')){
                    $('#calendar').hide();
                }
                else if(!$('#calendar').is(':visible')){
                    $('#calendar').show();
                }
            }
        }
        if(text.substring(1,6) == "clock"){
            //TODO Add cookies to remember the last clock
            $("#clock-date").empty();
            if(ClockBin){
                ClockBin = false;
                startTime();
            }else if(!ClockBin){
                ClockBin = true;
                BinClockDivs();
            }
            document.getElementById('SearchField').value='';
            return;
        }
        switch(text.substring(1,2)){
        case("1"):
            var ntext = text.replace(/![0-9]/gi, "");
            links1.push({name: `${ntext}`, url:"https://www.google.com"});
            generateLinks();
            break;
        case('2'):

            break;
        }
    }
    else{
        if(engines[currEngine].name === "Reddit"){
            window.open(engines[currEngine].url+text+engines[currEngine].url2, "_newtab");
        }
        else{
            window.open(engines[currEngine].url+text,"_newtab");
        }
    }
    document.getElementById('SearchField').value=''; 
}
function BinClockDivs(){
    var div = "";
    $("#clock-date").append(`<div class="d-inline-flex centered bin-clock"></div>`);
    for(var x=1; x <= 6; x++){
        div += `<div class="digit digit-${x}">`;
        for(var z=4; z >= 1; z--){
            div += `<div class="led bin-clock-${x}-${z}"></div>`;
        }
        div += `</div>`;
    }
    $(".bin-clock").append(div);
}
function displayDigit(digit, col){
    for(var l = 1; l <= 4; l++){
        if(digit & 1 == 1){
            TurnOn(col, l);
        }
        else{
            TurnOff(col, l);
        }
        digit = digit >> 1;
    }
}
function displayNumber(number, position){
    var str = number.toString();
    if(number == 0){
        for(var l=1; l<=4; l++){
            TurnOff(position, l);
        }
    }
    displayDigit(parseInt(str[str.length-1]), position+1);
    if(str.length > 1){
        displayDigit(parseInt(str[str.length-2]), position);
    }
}
function displayTime(){
    if(ClockBin){
        var date = new Date();
        displayNumber(date.getSeconds(), 5);
        displayNumber(date.getMinutes(), 3);
        displayNumber(date.getHours(), 1);
    }
    BinTimeout = setTimeout(function(){displayTime();}, 500);
}
function TurnOn(col, row){
    var led = $(".bin-clock").find(`.bin-clock-${col}-${row}`);
    led.addClass("LedLit");
}
function TurnOff(col, row){
    var led = $(".bin-clock").find(`.bin-clock-${col}-${row}`);
    led.removeClass("LedLit");
}
//Function executed after the loading of the page
$(document).ready(function(){
    if(ClockBin){
        BinClockDivs();
        displayTime();
    }
    else if(!ClockBin){
        startTime();
    }
    generateEngines();
    generateLinks();
    var defEngine=getDefaultEngine();
    if(defEngine == ""){
        changeEngine(0);
    }
    else{
        changeEngine(defEngine);
    }
    //Allows to use return to start a new search
    if(document.getElementById('SearchField')){
        document.getElementById('SearchField').addEventListener("keydown", function(e) {
            switch(e.keyCode){
            case 13: //Enter
                document.getElementById("search-btn").click();
                break;
            }
        }, false);
        document.getElementById('SearchField').focus();
    }
    //Sets Alt key to change between search engines
    document.body.addEventListener("keydown", function(e){
        switch(e.keyCode){
        case 18: //alt
            RaiseEngine();
            break;
        }

    }, false);
});
function RaiseEngine(){
    if(currEngine == engines.length-1){
        currEngine = 0;
    }
    else if(currEngine < engines.length-1){
        currEngine++;
    }
    changeEngine(currEngine);
}
var startTime, interval;

function start(){
    startTime = Date.now();
    interval = setInterval(function(){
        updateDisplay(Date.now() - startTime);
    });
    document.getElementById("clock-date").innerHTML = `<div class="text-center" id="clock"></div><div class"text-center" id="date"></div>`;
}

function stop(){
    document.body.removeEventListener("keydown", function(e){
        switch(e.keyCode){
        case 32:
            stop();
            console.log("Stopped Timer");
            break;
        }
    }, false);
    $("#SearchField").attr('placeholder', interval);
    clearInterval(interval);
}

function updateDisplay(currentTime){
    console.log(currentTime);
    // do your stuff
    document.getElementById("clock").innerHTML = currentTime;
}
