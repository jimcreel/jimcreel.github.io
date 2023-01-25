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

function clearAvail() {
	var childDivs = document
		.getElementById("card-display")
		.getElementsByTagName("div");
	for (i = 0; i < childDivs.length; i++) {
		currentDiv = childDivs[i];
		const divStatus = currentDiv.classList.contains("hidden");
		if (!divStatus) {
			currentDiv.classList.toggle("hidden");
		}
	}
}

/* changes date to mm/dd/yyyy */
function displayDate(date) {
	strDay = date.slice(5, 7);
	strMonth = date.slice(-2);
	strYear = date.slice(2, 4);
	modDate = `${strDay}/${strMonth}/${strYear}`;
	return modDate;
}
/*hide and reveal contextual menus depending on resort*/
function testResort(val) {
	clearAvail();
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
	const weekStatus = document
		.getElementById("weekCalendar")
		.classList.contains("hidden");
	if (!weekStatus) {
		document.getElementById("weekCalendar").classList.toggle("hidden");
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
	const weekStatus = document
		.getElementById("weekCalendar")
		.classList.contains("hidden");
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
	const cardStatus = document
		.getElementById("cardStatus")
		.classList.contains("hidden");
	if (cardStatus) {
		document.getElementById("cardStatus").classList.toggle("hidden");
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
function getWeekData(url, pass) {
	
	fetch(url) /* grab array from disney site */
		.then((response) => response.json())
		.then((result) => {
			var weekArray = [];
			listLength = 28;
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
						if (date < 130) {
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
				}
			}
		});
}

function getResortData(url, pass, park, parkDate) {
	fetch(url) /* grab array from disney site */
		.then((response) => response.json())
		.then((result) => {
			var weekArray = [];
			listLength = 28;
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
										cardNotification(matchObject);
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
					}
				}
			}
		});
}

/* function to display weekly data on the right third*/
function displayWeek(weekArray) {
	document.querySelector("#weekDates").innerHTML = "";
	for (element in weekArray) {
		var weekDate = displayDate(weekArray[element].date);
		var day = weekArray[element].date;
		var weekDay = new Date(`${day}T00:00`).toLocaleDateString("en-US", {
			weekday: "long",
		});

		var formatDate = `${weekDay} ${weekDate}`;

		var weekText = `week${element}Text`;
		var weekDiv = document.createElement("div");
		weekDiv.classList = "week";
		weekDiv.id = `weekContainer${element}`;
		var dayDiv = document.createElement("h5");
		dayDiv.classList = "date";
		dayDiv.id = `week${element}Title`;
		dayDiv.innerHTML = formatDate;
		var dayDivText = document.createElement("div");

		dayDivText.id = `week${element}Text`;
		dayDivText.classList = "date";

		document.getElementById("weekDates").appendChild(weekDiv);
		document.getElementById(`weekContainer${element}`).appendChild(dayDiv);
		document.getElementById(`weekContainer${element}`).appendChild(dayDivText);

		parkArray = weekArray[element].slot;
		for (iterPark in parkArray) {
			var displayPark = parkArray[iterPark].park;
			var displayReason = parkArray[iterPark].reason;
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
			var dayDivText = document.createElement("div");
			dayDivText.id = `week${element}Text${iterPark}`;
			dayDivText.classList = "date";
			document
				.getElementById(`weekContainer${element}`)
				.appendChild(dayDivText);
			dispResort = document.getElementById("weekSelectResort").value;
			const img = document.createElement("img");
			img.src = `/img/${displayPark}.jpeg`;
			img.className = `park-icon`;
			addReason = document.createElement("p");
			addReason.innerHTML = textReason;

			currentDivId = `week${element}Text${iterPark}`;
			console.log(currentDivId);

			document.getElementById(currentDivId).appendChild(img);
			document.getElementById(currentDivId).appendChild(addReason);
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
	if (weekUrl != null && weekPass != null){
		getWeekData(weekUrl, weekPass);
	}
}

/* this function creates the middle third card with notification data */
function cardNotification(notificationObject) {
	const notifColumn = document.getElementById("card-display");
	notifColumn.innerHTML = "";
	let notifPark = notificationObject.facilityId;
	notifAvail = notificationObject.slots[0].available;
	reason = notificationObject.slots[0].unavailableReason;
	notifDate = notificationObject.date;
	var reasonText = "";
	switch (reason) {
		case "BLOCKED":
			reasonText = "- Blocked Out";
			titleText = "Date Blocked Out";
			break;
		case "NO_INV":
			reasonText = "- At Capacity";
			titleText = "Sorry, we're full!";
			break;
		case "EXCEED_SOFT_LIMIT":
			reasonText = "- At Capacity";
			titleText = "Sorry, we're full!";
			break;
		case "NONE":
			reasonText = "- AVAILABLE";
	}

	if (notifAvail == true) {
		const img = document.createElement("img");
		img.src = `/img/${notifPark}.jpeg`;
		img.className = `park-icon`;
		newReason = document.createElement("p");
		newReason.innerHTML = reasonText;

		console.log(reasonText);
		const newDiv = document.createElement("div");
		newDiv.classList = "avail-icons";
		const currentDivId = "card-display";
		newDiv.id = `${currentDivId}1`;
		const newDivId = newDiv.id;
		document.getElementById("card-display").appendChild(newDiv);
		const dateDiv = document.createElement("div");
		dateDiv.classList = "avail-icons";
		dateDiv.innerHTML = notifDate;

		document.getElementById(newDivId).appendChild(img);
		document.getElementById(newDivId).appendChild(newReason);
		document.getElementById("card-title").innerHTML = "Come on Down!";
	} else {
		const img = document.createElement("img");
		img.src = `/img/${notifPark}.jpeg`;
		img.className = `park-icon`;
		newReason = document.createElement("p");
		newReason.innerHTML = reasonText;
		console.log(reasonText);
		const newDiv = document.createElement("div");
		newDiv.classList = "avail-icons";
		const currentDivId = "card-display";
		newDiv.id = `${currentDivId}1`;
		const newDivId = newDiv.id;
		document.getElementById("card-display").appendChild(newDiv);

		document.getElementById(newDivId).appendChild(img);
		document.getElementById(newDivId).appendChild(newReason);
		document.getElementById("card-title").innerHTML = titleText;
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
