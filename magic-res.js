let dlrUrl = "https://jctnqgdxx6.us-west-2.awsapprunner.com/DLR";

let wdwUrl = "https://jctnqgdxx6.us-west-2.awsapprunner.com/WDW";

$(document).ready(function () {
  var date_input = $('input[name="date"]'); //our date input has the name "date"
  var container =
    $(".bootstrap-iso form").length > 0
      ? $(".bootstrap-iso form").parent()
      : "body";
  var options = {
    format: "yyyy-mm-dd",
    container: container,
    todayHighlight: true,
    autoclose: true,
    startDate: "+0d",
    endDate: "+90d",
  };
  date_input.datepicker(options);
});

/* changes date to mm/dd/yyyy */
function displayDate(date){
  strDay = date.slice(5,7)
  strMonth= date.slice (-2)
  strYear = date.slice(2,4)
  modDate = `${strDay}/${strMonth}/${strYear}`
  return modDate;
}
/*hide and reveal contextual menus depending on resort*/
function testResort(val) {
  const cardStatus = document.getElementById("cardStatus").classList.contains("hidden")
  if (!cardStatus) {
    document.getElementById("cardStatus").classList.toggle("hidden")
  }
  if (val == "DLR") {
    document.getElementById("DLRdrops").classList.remove("hidden");
    document.getElementById("WDWdrops").classList.add("hidden");
  } else if (val == "WDW") {
    document.getElementById("WDWdrops").classList.remove("hidden");
    document.getElementById("DLRdrops").classList.add("hidden");
  } else {
    document.getElementById("WDWdrops").classList.add("hidden");
    document.getElementById("DLRdrops").classList.add("hidden");
  }
}

/* hide and remove contextual menus depending on resort */
function weekResortCheck(val) {
  const weekStatus = document.getElementById("weekCalendar").classList.contains("hidden")
  if (!weekStatus) {
    document.getElementById("weekCalendar").classList.toggle("hidden");
  }
  
  let listLength = 7;
  for (let x = 0; x < listLength; x++) {
    delTxt = `week${x}Text`;
    document.getElementById(delTxt).innerHTML=""
  }
  if (val == "DLR") {
    document.getElementById("weekDLR").classList.remove("hidden");
    document.getElementById("weekWDW").classList.add("hidden");
  } else if (val == "WDW") {
    document.getElementById("weekWDW").classList.remove("hidden");
    document.getElementById("weekDLR").classList.add("hidden");
  } else {
    document.getElementById("weekWDW").classList.add("hidden");
    document.getElementById("weekDLR").classList.add("hidden");
  }
}

/* aggregate data from the form to send to the park checker */
function submitForm() {
  resort = document.querySelector("#selectResort").value;
  const weekStatus = document.getElementById("weekCalendar").classList.contains("hidden")
  if (!weekStatus) {
    document.getElementById("weekCalendar").classList.toggle("hidden");
  }
  if (resort == "DLR") {
    pass = document.querySelector("#selectDLRkey").value;
    park = document.querySelector("#selectDLRpark").value;

    url = dlrUrl;
  } else if (resort == "WDW") {
    pass = document.querySelector("#selectWDWpass").value;
    park = document.querySelector("#selectWDWpark").value;
    url = wdwUrl;
  }
  const cardStatus = document.getElementById("cardStatus").classList.contains("hidden")
  if (cardStatus) {
    document.getElementById("cardStatus").classList.toggle("hidden")
  }
  parkDate = document.querySelector("#date").value;
  
  
  getResortData(url, pass, park, parkDate);
}

/* constructor function for user objects */

function userData(resort, pass, park, parkDate) {
  this.resort = resort;
  this.pass = pass;
  this.park = park;
  this.date = parkDate;
}

/* fetches and sorts data into arrays for processing */
function getWeekData(url, pass){
  fetch(url) /* grab array from disney site */
    .then((response) => response.json())
    .then((result) => {
      var weekArray = [];
      listLength = 7;
      for (let i = 0; i < listLength; i++) {
        itemDate = new Date();
        itemDate.setDate(itemDate.getDate() + i);
        itemDate = itemDate.toISOString().split("T")[0];

        emptyList = [];
        dateFill = new dateObject(itemDate, emptyList);

        weekArray.push(dateFill);
      }

      for (const key in result) {
        currentPass =
          result[key]
            .passType; /*iterate through pass type arrays to find the one that matches selected pass */
        if (currentPass == pass) {
          currentPass = result[key].availabilities;
          for (const date in currentPass) {
              if(date<28){
                
              /* this function drives the weekly calendar on the right third. */
              weekPark = currentPass[date].facilityId;
              weekAvailable = currentPass[date].slots[0].available;
              weekReason = currentPass[date].slots[0].unavailableReason;
              weekAvail = new parkObject(weekPark, weekAvailable, weekReason);
              for (element in weekArray) {
                if (weekArray[element].date == currentPass[date].date) {
                  weekPush = weekArray[element].slot;
                  weekPush.push(weekAvail);
                }
              }
            }
          }
          displayWeek(weekArray);
          console.log(weekArray)
          }
          
        }
      
    });
  }


function getResortData(url, pass, park, parkDate) {
  fetch(url) /* grab array from disney site */
    .then((response) => response.json())
    .then((result) => {
      var weekArray = [];
      listLength = 7;
      for (let i = 0; i < listLength; i++) {
        itemDate = new Date();
        itemDate.setDate(itemDate.getDate() + i);
        itemDate = itemDate.toISOString().split("T")[0];

        emptyList = [];
        dateFill = new dateObject(itemDate, emptyList);

        weekArray.push(dateFill);
      }

      for (const key in result) {
        currentPass =
          result[key]
            .passType; /*iterate through pass type arrays to find the one that matches selected pass */
        if (currentPass == pass) {
          currentPass = result[key].availabilities;
          for (const date in currentPass) {
            /*iterate through dates to find the selected date*/
            if (park !== null) {
              switch (park) {
                case "ANY" /* will return all available parks for the day at selected resort, but only displays last available park in card*/:
                  if (currentPass[date].date == parkDate) {
                    const matchObject = currentPass[date];
                    cardNotification(matchObject, pass);
                  }
                default: /*returns availability for selected park only*/
                  if (
                    currentPass[date].date == parkDate &&
                    currentPass[date].facilityId == park
                  ) {
                    const matchObject = currentPass[date];
                    cardNotification(matchObject, pass);
                  }
              }
          }
          displayWeek(weekArray);
          console.log(weekArray)
        }
      
    }
  }
  });
}

/* function to display weekly data on the right third*/
function displayWeek(weekArray) {
  
  for (element in weekArray) {
    
    var weekDate = displayDate(weekArray[element].date);
    var weekDay = new Date(weekArray[element].date).toLocaleDateString("en-US", { weekday: "long"});
    
    var formatDate = `${weekDay} ${weekDate}`
    
    var weekCard = `week${element}Title`
    var weekText = `week${element}Text`
    console.log(weekText)
    document.getElementById(weekCard).innerHTML = `${formatDate}`

    parkArray = weekArray[element].slot;
    for (iterPark in parkArray) {
      var displayPark = parkArray[iterPark].park;
      var displayAvailable = parkArray[iterPark].available;
      var displayReason = parkArray[iterPark].reason;
      displayPark = switchParkName(displayPark);
      console.log(displayReason);
      switch (displayReason) {
        case "BLOCKED":
          textReason = "BLOCKED OUT";
          break;

        case "NO_INV":
          textReason = "SOLD OUT";
          break;

        default:
          textReason = "AVAILABLE";
          break;
      }
      newLine = "\n"
      cardText = document.getElementById(weekText).innerHTML
      addText = `${displayPark} - ${textReason}`      
      newText = cardText + newLine + addText
      console.log(newText)
      document.getElementById(weekText).innerHTML = newText
    }
  }
}
/* constructor function for outer array element, listed by date */
function dateObject(date, slot) {
  this.date = date;
  this.slot = slot;
}
/* constructor function for inner array element, aggregating park data by date for the week */
function parkObject(weekPark, weekAvailable, weekReason) {
  this.park = weekPark;
  this.available = weekAvailable;
  this.reason = weekReason;
}


function weekCalendar() {
  let listLength = 7;
  for (let x = 0; x < listLength; x++) {
    delTxt = `week${x}Text`;
    document.getElementById(delTxt).innerHTML=""
  }
  weekResort = document.querySelector("#weekSelectResort").value;
  document.getElementById("weekCalendar").classList.toggle("hidden");
  
  

  if (weekResort == "DLR") {
    weekPass = document.querySelector("#weekSelectDLRkey").value;
    weekPark = null;
    weekDate = null;
    weekUrl = dlrUrl;
  } else if (weekResort == "WDW") {
    weekPass = document.querySelector("#weekSelectWDWpass").value;
    weekPark = null;
    weekDate = null;
    weekUrl = wdwUrl;
  }
  parkDate = document.querySelector("#date").value;

  getWeekData(weekUrl, weekPass);
}
/* this function creates the middle third card with notification data */
function cardNotification(notificationObject, pass) {
  let notifPark = notificationObject.facilityId;
  let notifDate = notificationObject.date;
  let textDate = displayDate(notifDate);
  notifAvail = notificationObject.slots[0].available;
  reason = notificationObject.slots[0].unavailableReason;
  
  var passText = "";
  var reasonText = "";

  notifPark = switchParkName(notifPark);
  switch (pass) {
    case "inspire-key-pass":
      passText = "Inspire keys";
      break;
    case "imagine-key-pass":
      passText = "Imagine keys";
      break;
    case "believe-key-pass":
      passText = "Believe keys";
      break;
    case "enchant-key-pass":
      passText = "Enchant keys";
      break;
    case "disney-incredi-pass":
      passText = "Incredi-pass";
      break;
    case "disney-sorcerer-pass":
      passText = "Sorcerer pass";
      break;
    case "disney-pirate-pass":
      passText = "Pirate pass";
      break;
    case "disney-pixie-dust-pass":
      passText = "Pixie Dust pass";
      break;
  }

  switch (reason) {
    case "BLOCKED":
      reasonText = "you are blocked out";
      titleText = "Date Blocked Out";
      break;
    case "NO_INV":
      reasonText = "reservations are sold out";
      titleText = "Sorry, we're full!";
      break;
    case "EXCEED_SOFT_LIMIT":
      reasonText = "the park is at capacity";
      titleText = "Sorry, we're full!";
      break;
  }

  if (notifAvail == true) {
    notificationObject.facilityId;
    document.getElementById(
      "card-text"
    ).innerHTML = `Reservations are available for ${notifPark} on ${textDate} for ${passText}`;
    document.getElementById("card-title").innerHTML = "Come on Down!";
  } else {
    reason = notificationObject.slots[0].unavailableReason;
    document.getElementById(
      "card-text"
    ).innerHTML = `Reservations are not available for ${notifPark} on ${textDate} because ${reasonText}`;
    document.getElementById("card-title").innerHTML = titleText;
    document.getElementById("card-button").innerHTML = `Sorry`;
  }
}

/* function to take park codes and match them with the appropriate string*/
function switchParkName(parkName) {
  switch (parkName) {
    case "DLR_DP":
      parkText = "Disneyland";
      break;
    case "DLR_CA":
      parkText = "California Adventure";
      break;
    case "WDW_MK":
      parkText = "Magic Kingdom";
      break;
    case "WDW_MK":
      parkText = "Magic Kingdom";
      break;
    case "WDW_HS":
      parkText = "Hollywood Studios";
      break;
    case "WDW_EP":
      parkText = "EPCOT";
      break;
    case "WDW_AK":
      parkText = "Animal Kingdom";
      break;
  }
  return parkText;
}
