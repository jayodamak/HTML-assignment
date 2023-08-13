//Time slot array for 'Duration' drop down.
let timeSlots = [
  {
    id: 1,
    text: "07.00 am - 08.00 am",
    startTime: "07.00 am",
    endTime: "08.00 am",
    isPeak: false,
  },
  {
    id: 2,
    text: "08.00 am - 09.00 am",
    startTime: "08.00 am",
    endTime: "09.00 am",
    isPeak: false,
  },
  {
    id: 3,
    text: "09.00 am - 10.00 am",
    startTime: "09.00 am",
    endTime: "10.00 am",
    isPeak: false,
  },
  {
    id: 4,
    text: "10.00 am - 11.00 am",
    startTime: "10.00 am",
    endTime: "11.00 am",
    isPeak: true,
  },
  {
    id: 5,
    text: "11.00 am - 12.00 pm",
    startTime: "11.00 am",
    endTime: "12.00 pm",
    isPeak: true,
  },
  {
    id: 6,
    text: "12.00 pm - 01.00 pm",
    startTime: "12.00 pm",
    endTime: "01.00 pm",
    isPeak: true,
  },
  {
    id: 7,
    text: "01.00 pm - 02.00 pm",
    startTime: "01.00 am",
    endTime: "02.00 am",
    isPeak: false,
  },
  {
    id: 8,
    text: "02.00 pm - 03.00 pm",
    startTime: "02.00 pm",
    endTime: "03.00 pm",
    isPeak: false,
  },
  {
    id: 9,
    text: "03.00 pm - 04.00 pm",
    startTime: "03.00 pm",
    endTime: "04.00 pm",
    isPeak: true,
  },
  {
    id: 10,
    text: "04.00 pm - 05.00 pm",
    startTime: "04.00 pm",
    endTime: "05.00 pm",
    isPeak: true,
  },
  {
    id: 11,
    text: "05.00 pm - 06.00 pm",
    startTime: "05.00 pm",
    endTime: "06.00 pm",
    isPeak: true,
  },
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// calendar
//if (window.location.href == "http://127.0.0.1:5500/Tickets.html") {
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  currDay = date.getDate();

let prev = "num" + currDay;
const renderCalendar = (isInitialLoad) => {
  if (localStorage.getItem("selectedDate") != null && isInitialLoad) {
    var parts = localStorage.getItem("selectedDate").split("/");
    date = new Date(parts[2].trim(), parts[1].trim() - 1, parts[0].trim());
    currYear = date.getFullYear();
    currMonth = date.getMonth();
    currDay = date.getDate();
    prev = "num" + currDay;
  }
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
        ? "active"
        : "";

    let isPassedDate =
      i < new Date().getDate() &&
        currMonth <= new Date().getMonth() &&
        currYear <= new Date().getFullYear()
        ? true
        : false;
    if (isPassedDate) liTag += `<li class="inactive" id="num${i}">${i}</li>`;
    else
      liTag += `<li class="${isToday}" id="num${i}" onclick = getSelectedDay(${i})>${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  //mapping local storage data to the tickets page, 'Select Number of Tickets' section
  if (localStorage.getItem("slAdults") != null) {
    document.getElementById("1").innerText =
      "" + localStorage.getItem("slAdults") + "";
  }
  if (localStorage.getItem("slChild") != null) {
    document.getElementById("2").innerText =
      "" + localStorage.getItem("slChild") + "";
  }
  if (localStorage.getItem("foreigner") != null) {
    document.getElementById("3").innerText =
      "" + localStorage.getItem("foreigner") + "";
  }
  if (localStorage.getItem("foreignChild") != null) {
    document.getElementById("4").innerText =
      "" + localStorage.getItem("foreignChild") + "";
  }
  if (localStorage.getItem("infant") != null) {
    document.getElementById("5").innerText =
      "" + localStorage.getItem("infant") + "";
  }
};
//renderCalendar();
if (window.location.href.indexOf("Tickets.html") > -1) {
  prevNextIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

      if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar(false);
    });
  });
}

function getSelectedDay(i) {
  let selectedDay = document.getElementById(`num${i}`);
  selectedDay.classList.add("active");

  let selectedDefaultDay = document.getElementById(prev);
  selectedDefaultDay.classList.remove("active");

  prev = "num" + i;

  dateSetup = `${i} / ${currMonth + 1} / ${currYear}`;

  localStorage.setItem("selectedDate", dateSetup);
  document.getElementById("date").innerText =
    localStorage.getItem("selectedDate");
}
let selectTime = [];

function setSelectedTimeSlotsOnLoad() {
  let text = "";
  if (localStorage.getItem("selectedTimeSlots") != null) {
    let str = localStorage.getItem("selectedTimeSlots");
    selectTime = JSON.parse(str);
  }
  for (let x of timeSlots) {
    let checkBoxId = "c" + x.id;
    let labelId = "l" + x.id;
    if (selectTime != null && selectTime.indexOf(x.id) >= 0)
      text += `<div class="time-item"> <input type="checkbox" id= "${checkBoxId}" onclick="check(${checkBoxId},${labelId},${x.id
        })" checked> <button id="${labelId}" for="${checkBoxId}" onclick= check(${checkBoxId},${labelId},${x.id
        }) style="background-color: rgb(41, 217, 213);" > ${x.startTime} - ${x.endTime
        } </button>${x.isPeak ? '<div class="lbl-peak">peak</div> ' : ""}</div>`;
    else
      text += `<div class="time-item"> <input type="checkbox" id= "${checkBoxId}" onclick="check(${checkBoxId},${labelId},${x.id
        })"> <button id="${labelId}" for="${checkBoxId}" onclick= check(${checkBoxId},${labelId},${x.id
        }) > ${x.startTime} - ${x.endTime} </button>${x.isPeak ? '  <div class="lbl-peak">peak</div>' : ""
        }</div>`;
  }
  document.querySelector(".multi-select").innerHTML = text;
}
//Guest

function addSlAdults() {
  let slAdultCount = 0;
  slAdultCount = parseInt(document.getElementById("1").innerText);
  slAdultCount = slAdultCount + 1;
  document.getElementById("1").innerText = "" + slAdultCount + "";

  localStorage.setItem("slAdults", slAdultCount);
  document.getElementById("slAdultTickets").innerText = `${localStorage.getItem(
    "slAdults"
  )} SL Adult`;

  calculateSLAdultCharge(slAdultCount);
}

function removeSlAdults() {
  let slAdultCount = 0;
  slAdultCount = parseInt(document.getElementById("1").innerText);
  if (slAdultCount > 0) {
    slAdultCount = slAdultCount - 1;
    document.getElementById("1").innerText = "" + slAdultCount + "";
  }
  if (slAdultCount == 0) localStorage.setItem("slAdults", 0);
  else localStorage.setItem("slAdults", slAdultCount);
  document.getElementById("slAdultTickets").innerText = `${localStorage.getItem(
    "slAdults"
  )} SL Adult`;
  calculateSLAdultCharge(slAdultCount);
}

function calculateSLAdultCharge(adultCount) {
  let peakHours = localStorage.getItem("peak");
  let normalHours = localStorage.getItem("hours");
  let charges = 0;
  if (adultCount > 0) {
    let chargePerPeakHour = 6;
    let chargePerNormalHour = 4;
    if (peakHours > 0) charges = charges + peakHours * chargePerPeakHour;
    if (normalHours > 0) charges = charges + normalHours * chargePerNormalHour;
    if (adultCount > 1) charges = charges * adultCount;

    document.getElementById("sl-adult-row").hidden = false;
  } else {
    document.getElementById("sl-adult-row").hidden = true;
  }
  localStorage.setItem("slAdultsCharges", charges);
  document.getElementById(
    "slAdultCharge"
  ).innerText = `$ ${localStorage.getItem("slAdultsCharges")} `;
  CalculateTotalCharges();
}
function addSlChild() {
  let children = 0;
  children = parseInt(document.getElementById("2").innerText);
  children = children + 1;
  document.getElementById("2").innerText = "" + children + "";

  localStorage.setItem("slChild", children);
  document.getElementById("slChildTickets").innerText = `${localStorage.getItem(
    "slChild"
  )} SL Child`;
  calculateSLChildCharge(children);
}

function removeSlChild() {
  let children = 0;
  children = parseInt(document.getElementById("2").innerText);
  if (children > 0) {
    children = children - 1;
  } else children = 0;
  document.getElementById("2").innerText = "" + children + "";
  if (children == 0) localStorage.setItem("slChild", 0);
  else localStorage.setItem("slChild", children);
  document.getElementById("slChildTickets").innerText = `${localStorage.getItem(
    "slChild"
  )} SL Child`;
  calculateSLChildCharge(children);
}
function calculateSLChildCharge(childCount) {
  let peakHours = localStorage.getItem("peak");
  let normalHours = localStorage.getItem("hours");
  let charges = 0;
  if (childCount > 0) {
    let chargePerPeakHour = 3;
    let chargePerNormalHour = 2;
    if (peakHours > 0) charges = charges + peakHours * chargePerPeakHour;
    if (normalHours > 0) charges = charges + normalHours * chargePerNormalHour;
    if (childCount > 1) charges = charges * childCount;

    document.getElementById("sl-child-row").hidden = false;
  } else {
    document.getElementById("sl-child-row").hidden = true;
  }
  localStorage.setItem("slChildCharges", charges);
  document.getElementById(
    "slChildCharge"
  ).innerText = `$ ${localStorage.getItem("slChildCharges")} `;
  CalculateTotalCharges();
}

function addForeigner() {
  let foreign = 0;
  foreign = parseInt(document.getElementById("3").innerText);
  foreign = foreign + 1;
  document.getElementById("3").innerText = "" + foreign + "";
  localStorage.setItem("foreigner", foreign);
  document.getElementById(
    "foreignerAdultTickets"
  ).innerText = `${localStorage.getItem("foreigner")} Foreigner Adult`;
  calculateForeignerCharge(foreign);
}

function removeForeigner() {
  let foreign = 0;
  foreign = parseInt(document.getElementById("3").innerText);
  if (foreign > 0) {
    foreign = foreign - 1;
  } else foreign = 0;
  document.getElementById("3").innerText = "" + foreign + "";
  if (foreign == 0) localStorage.setItem("foreigner", 0);
  else localStorage.setItem("foreigner", foreign);
  document.getElementById(
    "foreignerAdultTickets"
  ).innerText = `${localStorage.getItem("foreigner")} Foreigner Adult`;
  calculateForeignerCharge(foreign);
}

function calculateForeignerCharge(foreignCount) {
  let peakHours = localStorage.getItem("peak");
  let normalHours = localStorage.getItem("hours");
  let charges = 0;
  if (foreignCount > 0) {
    let chargePerPeakHour = 13;
    let chargePerNormalHour = 10;
    if (peakHours > 0) charges = charges + peakHours * chargePerPeakHour;
    if (normalHours > 0) charges = charges + normalHours * chargePerNormalHour;
    if (foreignCount > 1) charges = charges * foreignCount;

    document.getElementById("foreign-adult-row").hidden = false;
  } else {
    document.getElementById("foreign-adult-row").hidden = true;
  }
  localStorage.setItem("foreignerCharges", charges);
  document.getElementById(
    "foreignerAdultCharge"
  ).innerText = `$ ${localStorage.getItem("foreignerCharges")} `;
  CalculateTotalCharges();
}

function addForeignChild() {
  let children = 0;
  children = parseInt(document.getElementById("4").innerText);
  children = children + 1;
  document.getElementById("4").innerText = "" + children + "";
  localStorage.setItem("foreignChild", children);
  document.getElementById(
    "foreignerChildTickets"
  ).innerText = `${localStorage.getItem("foreignChild")} Foreigner Child`;
  calculateForeignerChildCharge(children);
}

function removeForeignChild() {
  let children = 0;
  children = parseInt(document.getElementById("4").innerText);
  if (children > 0) {
    children = children - 1;
  } else children = 0;
  document.getElementById("4").innerText = "" + children + "";

  if (children == 0) localStorage.setItem("foreignChild", 0);
  else localStorage.setItem("foreignChild", children);
  document.getElementById(
    "foreignerChildTickets"
  ).innerText = `${localStorage.getItem("foreignChild")} Foreigner Child`;
  calculateForeignerChildCharge(children);
}

function calculateForeignerChildCharge(foreignChildCount) {
  let peakHours = localStorage.getItem("peak");
  let normalHours = localStorage.getItem("hours");
  let charges = 0;
  if (foreignChildCount > 0) {
    let chargePerPeakHour = 8;
    let chargePerNormalHour = 5;
    if (peakHours > 0) charges = charges + peakHours * chargePerPeakHour;
    if (normalHours > 0) charges = charges + normalHours * chargePerNormalHour;
    if (foreignChildCount > 1) charges = charges * foreignChildCount;

    document.getElementById("foreign-child-row").hidden = false;
  } else {
    document.getElementById("foreign-child-row").hidden = true;
  }
  localStorage.setItem("foreignChildCharges", charges);
  document.getElementById(
    "foreignerChildCharge"
  ).innerText = `$ ${localStorage.getItem("foreignChildCharges")} `;
  CalculateTotalCharges();
}

function addInfant() {
  let infant = 0;
  infant = parseInt(document.getElementById("5").innerText);
  infant = infant + 1;
  document.getElementById("5").innerText = "" + infant + "";
  localStorage.setItem("infant", infant);
  document.getElementById("infantTickets").innerText = `${localStorage.getItem(
    "infant"
  )} Infant`;

  if (infant > 0) {
    document.getElementById("Infant-row").hidden = false;
  } else {
    document.getElementById("Infant-row").hidden = true;
  }
}

function removeInfant() {
  let infant = 0;
  infant = parseInt(document.getElementById("5").innerText);
  if (infant > 0) {
    infant = infant - 1;
  } else infant = 0;
  document.getElementById("5").innerText = "" + infant + "";

  if (infant == 0) localStorage.setItem("infant", 0);
  else localStorage.setItem("infant", infant);
  document.getElementById("infantTickets").innerText = `${localStorage.getItem(
    "infant"
  )} Infant`;
  if (infant > 0) {
    document.getElementById("Infant-row").hidden = false;
  } else {
    document.getElementById("Infant-row").hidden = true;
  }
}

function manageSummeryTable() {
  if (localStorage.getItem("slAdults") > 0) {
    document.getElementById("sl-adult-row").hidden = false;
  } else {
    document.getElementById("sl-adult-row").hidden = true;
  }
  if (localStorage.getItem("slChild") > 0) {
    document.getElementById("sl-child-row").hidden = false;
  } else {
    document.getElementById("sl-child-row").hidden = true;
  }
  if (localStorage.getItem("foreigner") > 0) {
    document.getElementById("foreign-adult-row").hidden = false;
  } else {
    document.getElementById("foreign-adult-row").hidden = true;
  }
  if (localStorage.getItem("foreignChild") > 0) {
    document.getElementById("foreign-child-row").hidden = false;
  } else {
    document.getElementById("foreign-child-row").hidden = true;
  }
  if (localStorage.getItem("infant") > 0) {
    document.getElementById("Infant-row").hidden = false;
  } else {
    document.getElementById("Infant-row").hidden = true;
  }
}

function check(checkBoxId, labelId, xid) {
  let maxId = 1;
  let minId = 1;
  let isAdded = false;
  let isRemoved = false;
  let hours = localStorage.getItem("hours");
  let peakHours = localStorage.getItem("peak");
  var item = timeSlots.find((a) => a.id == xid);
  if (selectTime.length > 0) {
    selectTime = selectTime.sort();
    maxId = selectTime[selectTime.length - 1];
    minId = selectTime[0];
  }
  if (selectTime.indexOf(xid) >= 0) {
    if (selectTime.length > 1) {
      if (xid == minId || xid == maxId) {
        selectTime.splice(selectTime.indexOf(xid), 1);
        isRemoved = true;
      }
    } else {
      selectTime = [];
      isRemoved = true;
    }
    if (isRemoved) {
      labelId.style.backgroundColor = "";
      checkBoxId.checked = false;

      if (item.isPeak == true) {
        if (peakHours > 1) peakHours--;
        else peakHours = 0;
      } else {
        if (hours > 1) hours--;
        else hours = 0;
      }
    }
  } else {
    if (selectTime.length > 0) {
      selectTime = selectTime.sort();
      maxId = selectTime[selectTime.length - 1];
      minId = selectTime[0];

      if (xid == minId - 1 || xid == maxId + 1) {
        selectTime.push(xid);
        isAdded = true;
      }
    } else {
      selectTime.push(xid);
      isAdded = true;
    }
    if (isAdded) {
      labelId.style.backgroundColor = "#29d9d5";
      checkBoxId.checked = true;

      if (item.isPeak == true) peakHours++;
      else hours++;
    }
  }
  onCalenderDateChanges(peakHours, hours, selectTime);
}

function CalculateTotalCharges() {
  let total =
    Number(localStorage.getItem("slAdultsCharges")) +
    Number(localStorage.getItem("slChildCharges")) +
    Number(localStorage.getItem("foreignerCharges")) +
    Number(localStorage.getItem("foreignChildCharges"));
  localStorage.setItem("totalCharges", total);
  document.getElementById("totalPayable").innerText = `$ ${localStorage.getItem(
    "totalCharges"
  )} `;
}

function onCalenderDateChanges(peakHours, hours, selectTime) {
  if (selectTime.length > 0) {
    selectTime.sort();
    let maxId = selectTime[selectTime.length - 1],
      minId = selectTime[0];
    let minTime = timeSlots.find((a) => a.id == minId).startTime;
    let maxTime = timeSlots.find((a) => a.id == maxId).endTime;
    localStorage.setItem("timeDuration", `${minTime} - ${maxTime}`);
    document.getElementById("time").innerText =
      localStorage.getItem("timeDuration");
  }
  localStorage.setItem("peak", peakHours);
  localStorage.setItem("hours", hours);
  localStorage.setItem("totalHours", Number(hours) + Number(peakHours));
  localStorage.setItem("selectedTimeSlots", JSON.stringify(selectTime));
  document.getElementById("duration").innerText = `${localStorage.getItem(
    "totalHours"
  )} hrs (${localStorage.getItem("hours")} Normal : ${localStorage.getItem(
    "peak"
  )} Peak)`;

  calculateForeignerCharge(localStorage.getItem("foreigner"));
  calculateForeignerChildCharge(localStorage.getItem("foreignChild"));
  calculateSLAdultCharge(localStorage.getItem("slAdults"));
  calculateSLChildCharge(localStorage.getItem("slChild"));
}

//details Page
function validateUserNameInput() {
  const inputName = document.getElementById("firsName");
  var letters = /^[a-zA-Z]+( [a-zA-Z]+)+$/;
  if (inputName.value.match(letters) || inputName.value == "") {
    inputName.classList.remove("invalid");
  } else {
    inputName.classList.add("invalid");
  }
}
function validateEmail() {
  var re = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/;
  const inputName = document.getElementById("email");
  if (inputName.value.match(re) || inputName.value == "") {
    inputName.classList.remove("invalid");
  } else {
    inputName.classList.add("invalid");
  }
}
function confirmEmail() {
  var email = document.getElementById("email").value;
  var confirmMail = document.getElementById("confirm-email");
  if (email == confirmMail) {
    confirmMail.classList.remove("invalid");
  } else {
    confirmMail.classList.add("invalid");
  }
}
function onDetailSubmit() {
  let name = document.getElementById("firsName").value;
  let mobile = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let gender = document.getElementById("gender").value;
  localStorage.setItem("name", name);
  localStorage.setItem("mobile", mobile);
  localStorage.setItem("email", email);
  localStorage.setItem("gender", gender);
}
////end detail page

//// payment page
function formatCardNumber() {
  var ccNumber = document.getElementById("cc-input");
  let ccNumberClass = ccNumber;
  ccNumber = ccNumber.value.replace(/\s+/g, "");

  const visaCardFormat = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/; // Starting with 4 length 13 or 16 digits (Visa)
  const masterCard = /^(?:5[1-5][0-9]{14})$/; //Starting with 51 through 55, length 16 digits (Mastercard)
  const americanExpressCard = /^(?:3[47][0-9]{13})$/; //Starting with 34 or 37, length 15 digits (American Express)

  if (
    !ccNumber.match(visaCardFormat) &&
    !ccNumber.match(masterCard) &&
    !ccNumber.match(americanExpressCard)
  ) {
    ccNumberClass.classList.add("invalid");
    // alert('Please Enter Valid Card Number');
    // document.getElementById("cc-input").value = "";
  } else {
    ccNumberClass.classList.remove("invalid");
  }
  var v = ccNumber.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];

  for (i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    document.getElementById("cc-input").value = parts.join(" ");
  }
}

function validateExpiryDate() {
  var ccDate = document.getElementById("expiry-date");
  var v = ccDate.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts = [];
  if (match.length > 4) match = match.substr(0, 4);
  for (i = 0, len = match.length; i < len; i += 2) {
    parts.push(match.substring(i, i + 2));
  }
  if (parts.length) {
    if (parts.length == 2 && parts[0] > 12) {
      ccDate.classList.add("invalid");
    } else {
      ccDate.classList.remove("invalid");
    }
    document.getElementById("expiry-date").value = parts.join("/");
  }
}
///end payment
//This function is used to map local storage data to the page when it is loaded

function pageOnload() {
  if (localStorage.getItem("selectedDate") == null) {
    (date = new Date()),
      (currYear = date.getFullYear()),
      (currMonth = date.getMonth()),
      (currDay = date.getDate());
    localStorage.setItem(
      "selectedDate",
      currDay + "/" + (currMonth + 1) + "/" + currYear
    );
  } else {
  }
  if (localStorage.getItem("totalHours") == null)
    localStorage.setItem("totalHours", 0);
  if (localStorage.getItem("hours") == null) localStorage.setItem("hours", 0);
  if (localStorage.getItem("peak") == null) localStorage.setItem("peak", 0);
  if (localStorage.getItem("slAdults") == null)
    localStorage.setItem("slAdults", 0);
  if (localStorage.getItem("slChild") == null)
    localStorage.setItem("slChild", 0);
  if (localStorage.getItem("foreigner") == null)
    localStorage.setItem("foreigner", 1);
  if (localStorage.getItem("foreignChild") == null)
    localStorage.setItem("foreignChild", 0);
  if (localStorage.getItem("infant") == null) localStorage.setItem("infant", 0);
  if (localStorage.getItem("slAdultsCharges") == null)
    localStorage.setItem("slAdultsCharges", 0);
  if (localStorage.getItem("slChildCharges") == null)
    localStorage.setItem("slChildCharges", 0);
  if (localStorage.getItem("foreignerCharges") == null)
    localStorage.setItem("foreignerCharges", 10);
  if (localStorage.getItem("foreignChildCharges") == null)
    localStorage.setItem("foreignChildCharges", 0);
  if (localStorage.getItem("totalCharges") == null)
    localStorage.setItem("totalCharges", 10);
  if (localStorage.getItem("selectedTimeSlots") == null)
    localStorage.setItem("selectedTimeSlots", JSON.stringify([1]));

  document.getElementById("date").innerText =
    localStorage.getItem("selectedDate");
  document.getElementById("duration").innerText = `${localStorage.getItem(
    "totalHours"
  )} hrs (${localStorage.getItem("hours")} Normal : ${localStorage.getItem(
    "peak"
  )} Peak)`;
  document.getElementById("slAdultTickets").innerText = `${localStorage.getItem(
    "slAdults"
  )} SL Adult`;
  document.getElementById("slChildTickets").innerText = `${localStorage.getItem(
    "slChild"
  )} SL Child`;
  document.getElementById(
    "foreignerAdultTickets"
  ).innerText = `${localStorage.getItem("foreigner")} Foreigner Adult`;
  document.getElementById(
    "foreignerChildTickets"
  ).innerText = `${localStorage.getItem("foreignChild")} Foreigner Child`;
  document.getElementById("infantTickets").innerText = `${localStorage.getItem(
    "infant"
  )} Infant`;
  document.getElementById(
    "slAdultCharge"
  ).innerText = `$ ${localStorage.getItem("slAdultsCharges")} `;
  document.getElementById(
    "slChildCharge"
  ).innerText = `$ ${localStorage.getItem("slChildCharges")} `;
  document.getElementById(
    "foreignerAdultCharge"
  ).innerText = `$ ${localStorage.getItem("foreignerCharges")} `;
  document.getElementById(
    "foreignerChildCharge"
  ).innerText = `$ ${localStorage.getItem("foreignChildCharges")} `;
  document.getElementById("totalPayable").innerText = `$ ${localStorage.getItem(
    "totalCharges"
  )} `;
  document.getElementById("time").innerText =
    localStorage.getItem("timeDuration");
  if (window.location.href.indexOf("Tickets.html") > -1) {
    //== "http://127.0.0.1:5500/Tickets.html")
    renderCalendar(true);
    setSelectedTimeSlotsOnLoad();
  }
  if (window.location.href.indexOf("Details.html") > -1) {
    //"http://127.0.0.1:5500/Confirmation.html")
    document.getElementById("firsName").value = localStorage.getItem("name");
    document.getElementById("phone").value = localStorage.getItem("mobile");
    document.getElementById("email").value = localStorage.getItem("email");
    document.getElementById("confirm-email").value =
      localStorage.getItem("email");
    document.getElementById("gender").value = localStorage.getItem("gender");
  }
  if (window.location.href.indexOf("Confirmation.html") > -1) {
    //"http://127.0.0.1:5500/Confirmation.html")
    document.getElementById("name").innerText = localStorage.getItem("name");
    document.getElementById("mobile").innerText =
      localStorage.getItem("mobile");
    document.getElementById("email").innerText = localStorage.getItem("email");
    document.getElementById("gender").innerText =
      localStorage.getItem("gender");
  }
  if (window.location.href.indexOf("Payment.html") > -1) {
    if (localStorage.getItem("totalCharges") != null && Number(localStorage.getItem("totalCharges") > 0))
      document.getElementById('pay-btn').innerText = `Pay $${localStorage.getItem("totalCharges")}`;

  }
  manageSummeryTable();
}
