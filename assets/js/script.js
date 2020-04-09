var calendarEvents = [];
var currentDateEl = moment().format('dddd, MMMM Do YYYY');

//print current day to page
function setCurrentTime() {
    $("#currentDay").html(currentDateEl);
};

$(".save-btn").on("click", function() {
    var text = $(this).siblings("textarea").val().trim();
    var time = $(this).siblings("textarea").attr("id");

    //previously used if(text) to ensure empty values weren't stored but events couldn't easily be deleted 
    var tempArray= [];
    tempArray.push({
        text: text,
        date: currentDateEl,
        time: time
    });
    saveEvents(tempArray);   
});

var saveEvents = function(tempArray) {
    //check if array is not empty
    if (calendarEvents && calendarEvents.length) {

        //store result of for loop
        var forLoopResult = false;

        //check if day and time is already in array. if so, splice to same position in array and delete.
        for(var i = 0; i < calendarEvents.length; i++) {
            if(calendarEvents[i].time === tempArray[0].time
            && calendarEvents[i].date === tempArray[0].date) {
                calendarEvents.splice(i, 1, tempArray[0]);
                forLoopResult = true;
                break;
            }
        }
        //if array is not empty but this is not replacing an existing object, push instead of splicing
        if (!forLoopResult) {
            calendarEvents.push(tempArray[0]);
        }
    }
    //if array is empty, can push to array
    else {
        calendarEvents.push(tempArray[0]);
    }
    localStorage.setItem("events", JSON.stringify(calendarEvents));
};

var loadEvents = function() {
    calendarEvents = JSON.parse(localStorage.getItem("events"));
  
    //initialize empty array if nothing in localstorage
    if (!calendarEvents) {
        calendarEvents = [];
    }

    //if today is date value stored in array object, select textarea by id(calendarEvents.time) and set value to text of array object
    for (var i = 0; i < calendarEvents.length; i++) {
        if (currentDateEl === calendarEvents[i].date) {
            $("#" + calendarEvents[i].time).val(calendarEvents[i].text);
        }
    }
};

var changeColors = function() {
    for (var i = 9; i <= 17; i++) {
        if(moment(i, 'HH').format('HH') < moment().format('HH')) {
            $("#" + i).removeClass("bg-light");
            $("#" + i).addClass("bg-secondary");
        }
        else if (moment(i, 'HH').format('HH') > moment().format('HH')) {
            $("#" + i).removeClass("bg-light");
            $("#" + i).addClass("bg-success");
        }
        else {
            $("#" + i).removeClass("bg-light");
            $("#" + i).addClass("bg-danger");
        }
    }  
};

setInterval(setCurrentTime, 1000*60*15);
setInterval(changeColors, 1000*60*15);

setCurrentTime();
loadEvents();
changeColors();