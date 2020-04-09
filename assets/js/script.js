var calendarEvents = [];
var currentDateEl = moment().format('MMMM Do YYYY');


$(".save-btn").on("click", function() {
    var text = $(this).siblings("textarea")
      .val()
      .trim();

    var currentDateEl = moment().format('MMMM Do YYYY');
    var time = $(this).siblings("textarea").attr("id");

    var tempArray= [];

    if (text) {
        tempArray.push({
            text: text,
            date: currentDateEl,
            time: time
        });
        saveEvents(tempArray);
    }
});

var saveEvents = function(tempArray) {
    //if item exists in same time slot during same day, clear localstorage and splice into array
    for(var i = 0; i < calendarEvents.length; i++) {
        if(calendarEvents[i].time === tempArray[0].time) {
            calendarEvents.splice(i, 1, tempArray[0]);
        }
    }

    localStorage.setItem("events", JSON.stringify(calendarEvents));
};

function setCurrentTime() {
    $("#currentDay").html(currentDateEl);
};

var loadEvents = function() {
    calendarEvents = JSON.parse(localStorage.getItem("events"));
  
    if (!calendarEvents) {
        calendarEvents = [];
    }

    // if nothing in localStorage, create a new object to track all task status arrays
    // if (!events) {
    //   tasks = {
    //     toDo: [],
    //     inProgress: [],
    //     inReview: [],
    //     done: []
    //   };
    // }
  
    // // loop over object properties
    // $.each(tasks, function(list, arr) {
    //   console.log(list, arr);
    //   // then loop over sub-array
    //   arr.forEach(function(task) {
    //     createTask(task.text, task.date, list);
    //   });
    // });
  };

setInterval(setCurrentTime, 1000*60*30);

setCurrentTime();
loadEvents();