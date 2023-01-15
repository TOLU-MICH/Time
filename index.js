let sec, mins, centiSec, hrs, dateInterval;
setInterval(() => {
  dateInterval = new Date();
}, 1000);
const date = new Date();
const time = document.querySelector(".time");
const timeWatch = document.querySelector(".time-watch");

let countDownContent = document.getElementById("countdown-content");
countDownContent.innerHTML = `<span class="flex font-bold countdown-content-child">
      <span>&nbsp;0 </span><span>:&nbsp;0&nbsp;</span><span>:&nbsp;0</span></span>`;
countDownContent.innerHTML += `<span class="flex font-bold countdown-content-child2 hidden">`;
let span = document.createElement("span");
span.classList.add("countdown-time", "flex", "hidden");
span.innerHTML = spanElement("day-time", "Day");
span.innerHTML += spanElement("hour-time", "Hour");
span.innerHTML += spanElement("minutes-time", "Minutes");
span.innerHTML += spanElement("seconds-time", "Seconds");
document.querySelector(".inner").appendChild(span);

function spanElement(id, text) {
  return `<span><p id =${id} class = "font-bold">&nbsp;0&nbsp;</p>  <label for="day-time" class = "flex">${text}</label></span>`;
}

let countDownChild1 = document.querySelector(".countdown-content-child2");
let myTimeInterval = setInterval(() => {
  timeWatch.innerHTML = dateInterval.toLocaleTimeString();
  time.innerHTML = dateInterval.toLocaleTimeString();
  countDownChild1.innerHTML = dateInterval.toLocaleTimeString();
}, 1000);

let myProgressInterval = setInterval(() => {
  let hour = date.getHours();
  let percent = (hour / 24) * 100;
  let hourPercentage = Math.round(percent) / 100;
  let dashOffSet = 720 - hourPercentage * 720;
  document.getElementById("circle").style.strokeDashoffset = dashOffSet;
}, 1000);

let myDateInterval = setInterval(() => {
  let monthDay = `<p id= "month-day" class="flex">${date.getDate()}</p>`;
  let year = `<p id="year" >${date.getFullYear()}</p>`;
  let month = `<p id= "month">${months[date.getMonth()]}</p>`;
  let day = `<p id= "day">${weekDay[date.getDay()]}</p>`;
  document.getElementById("date-content").innerHTML =
    monthDay + month + year + day;
}, 1000);

const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dayList = document.getElementById("day-list");
const hourList = document.getElementById("hour-list");
const minuteList = document.getElementById("minutes-list");
const secondsList = document.getElementById("seconds-list");
const container = document.getElementById("container");

container.addEventListener("click", (event) => {
  function eTarget(target, element) {
    if (event.target.id === target) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  }
  eTarget("countdown-day", dayList);
  eTarget("countdown-hour", hourList);
  eTarget("countdown-minutes", minuteList);
  eTarget("countdown-seconds", secondsList);
  if (event.target.id === "delete-alarm") {
    alarmTime.splice(event.target.parentElement.id, 1);
    event.target.parentElement.remove();
    ringTone.pause();
    document.querySelector(".time-container").classList.remove("alarm-active");
  }
});



const setAlarmBox = document.querySelector(".set-alarm-box ");
document.querySelector(".add").addEventListener("click", () => {
  setAlarmBox.style.display = "flex";
  resetCountDown();
  hideStopWatch();
});

const alarmContent = document.getElementById("alarm-content");
let selectAlarm = document.querySelectorAll("select");

document.querySelector(".set-alarm-btn").addEventListener("click", () => {
  const noAlarm = document.querySelector(".no-alarm");
  if (alarmContent.contains(noAlarm)) alarmContent.innerHTML = "";
  let selectedAlarmTime = `${selectAlarm[0].value}:${selectAlarm[1].value}:00 ${selectAlarm[2].value}`;
  alarmTime.push(selectedAlarmTime);
  let alarmSelectedItem = document.createElement("div");
  alarmSelectedItem.classList.add("alarm-item");
  alarmSelectedItem.setAttribute("id", `${alarmContent.childElementCount}`);
  alarmSelectedItem.innerHTML = `${selectedAlarmTime} <img class= 'icon' id='delete-alarm' src= "image/delete.svg"/>`;
  alarmContent.appendChild(alarmSelectedItem);
  setAlarmBox.style.display = "none";
});

let ringTone = new Audio("./files/sound.mp3");
let alarmTime = [];

let myAlarmInterval = setInterval(() => {
  for (let i = 0; i < alarmTime.length; i++) {
    if (alarmTime[i] === dateInterval.toLocaleTimeString()) {
      document.querySelector(".time-container").classList.add("alarm-active");
      ringTone.play();
      ringTone.loop = true;
      alarmContent.innerHTML = `<button class="clear-alarm-btn" id="delete-alarm">Clear Alarm</button>;`;
    }
  }
}, 1000);

const play = document.querySelector(".play ");
const lap = document.querySelector(".lap");
const reset = document.querySelector(".reset");
reset.addEventListener("click", resetStopWatch);
play.addEventListener("click", playStopWatch);
lap.addEventListener("click", lapStopWatch);
let secCounter = 0;
let centiCounter = 0;
let minsCounter = 0;
let hrsCounter = 0;
let isPlay = false;
const hours = document.querySelector(".hours ");
const minutes = document.querySelector(".minutes ");
const seconds = document.querySelector(".seconds");
const centiseconds = document.querySelector(".centiseconds");
let isReset = false;
let liItem = 0;
const liContainer = document.querySelector(".li-container");

function resetStopWatch() {
  isPlay = true;
  playStopWatch();
  reset.classList.add("hidden");
  lap.classList.add("hidden");
  hours.innerHTML = `&nbsp`;
  minutes.innerHTML = `&nbsp;`;
  seconds.innerHTML = `&nbsp;0 :`;
  centiseconds.innerHTML = `&nbsp;0`;
  centiCounter = 0;
  secCounter = 0;
  minsCounter = 0;
  hrsCounter = 0;
  liContainer.innerHTML = "";
  liItem = 0;
}

function playStopWatch() {
  if (!isPlay && !isReset) {
    reset.classList.remove("hidden");
    lap.classList.remove("hidden");
    play.innerHTML = "Pause";

    centiSec = setInterval(() => {
      centiCounter > 100 ? (centiCounter = 0) : centiCounter++;
      centiCounter = centiCounter < 10 ? `0${centiCounter}` : centiCounter;
      centiseconds.innerHTML = centiCounter;
    }, 10);
    sec = setInterval(() => {
      secCounter >= 59 ? (secCounter = 0) : ++secCounter;
      secCounter = secCounter < 10 ? `0${secCounter}` : secCounter;
      seconds.innerHTML = `${secCounter} :`;
    }, 1000);
    mins = setInterval(() => {
      minsCounter >= 59 ? (minsCounter = 0) : ++minsCounter;
      minsCounter = minsCounter < 10 ? `0${minsCounter}` : minsCounter;
      minutes.innerHTML = `${minsCounter} :`;
    }, 60000);
    hrs = setInterval(() => {
      ++hrsCounter;
      hrsCounter = hrsCounter < 10 ? `0${hrsCounter}` : hrsCounter;
      hours.innerHTML = `${hrsCounter} :`;
    }, 3600000);
    isPlay = true;
    isReset = true;
  } else {
    play.innerHTML = "Play";
    isPlay = false;
    isReset = false;
    clearInterval(centiSec);
    clearInterval(sec);
    clearInterval(mins);
    clearInterval(hrs);
  }
}

function lapStopWatch() {
  let li = document.createElement("li");
  let number = document.createElement("span");
  number.setAttribute("class", "li-number");
  number.innerHTML = `#${++liItem}`;
  li.appendChild(number);
  li.innerHTML += `${hrsCounter} : ${minsCounter} : ${secCounter} : ${centiCounter}`;
  liContainer.appendChild(li);
}

let timeCondition = true;
let stopWatchCondition = false;
const displayStopWatch = document.querySelector(".display-stopwatch");
let stopWatchHeading = document.getElementById("stopwatch-text");
let stopWatchIcon = document.querySelector(".Stopwatch-icon");
let buttonWrapper = document.querySelector(".button-wrapper");
let stopWatchContentChild = document.getElementById("stopwatch-content-child");

document.querySelector(".stopwatch").addEventListener("click", (event) => {
  if (stopWatchCondition) {
    hideStopWatch();
  } else {
    timeCondition = false;
    stopWatchCondition = true;
    liContainer.classList.remove("hidden");
    buttonWrapper.classList.remove("hidden");
    play.classList.remove("hidden");
    stopWatchHeading.innerHTML = "Time";
    stopWatchIcon.setAttribute("src", "image/time-svgrepo-com.svg");
    displayStopWatch.classList.remove("hidden");
    timeWatch.classList.remove("hidden");
    stopWatchContentChild.classList.add("hidden");
    setAlarmBox.style.display = "none";
    resetCountDown();
    time.classList.add("hidden");
  }
});

function hideStopWatch() {
  stopWatchCondition = false;
  timeCondition = true;
  stopWatchHeading.innerHTML = "Stopwatch";
  stopWatchIcon.setAttribute("src", "image/timer.svg");
  play.classList.add("hidden");
  displayStopWatch.classList.add("hidden");
  timeWatch.classList.add("hidden");
  time.classList.remove("hidden");
  stopWatchContentChild.classList.remove("hidden");
  liContainer.classList.add("hidden");
  buttonWrapper.classList.add("hidden");
  if (
    !lap.classList.contains("hidden") &&
    !reset.classList.contains("hidden")
  ) {
    resetStopWatch();
  }
}

setList(8, date.getFullYear() - 1, document.getElementById("year-list"));
setList(58, 0, minuteList, true);
setList(58, 0, secondsList, true);

for (let i = 0; i <= 12; i++) {
  let option = new Option(`${i}`);
  selectAlarm[0].appendChild(option);
}

for (let i = 0; i <= 59; i++) {
  i = i < 10 ? `0${i}` : i;
  let option = new Option(`${i}`);
  selectAlarm[1].appendChild(option);
}

for (let i = 0; i <= 11; i++) {
  let no = i + 1;
  no = no < 10 ? "0" + no : no;
  let value = `${no}-${months[i]}`;
  let option = new Option(value);
  document.getElementById("month-list").appendChild(option);
}

function setList(maxNo, value, element, listCond = false) {
  let td = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");
  td.setAttribute("valign", "top");
  td2.setAttribute("valign", "top");
  td3.setAttribute("valign", "top");
  td4.setAttribute("valign", "top");
  td5.setAttribute("valign", "top");
  for (let i = 0; i <= maxNo; i++) {
    value++;
    value = value < 10 ? "0" + value : value;
    if (!listCond) {
      let option = new Option(value);
      element.appendChild(option);
    } else {
      let li = document.createElement("li");
      li.id = `item${i}`;
      li.innerHTML = value;
      if (i < 12) td.appendChild(li);
      if (i >= 12 && i < 24) td2.appendChild(li);
      if (i >= 24 && i < 36) td3.appendChild(li);
      if (i >= 36 && i < 48) td4.appendChild(li);
      if (i >= 48) td5.appendChild(li);
      element.appendChild(td);
      element.appendChild(td2);
      element.appendChild(td3);
      element.appendChild(td4);
      element.appendChild(td5);
    }
  }
}

// populating the hourList
let td = document.createElement("td");
let td2 = document.createElement("td");
td.setAttribute("valign", "top");
td2.setAttribute("valign", "top");
for (let i = 0; i <= 23; i++) {
  i = i < 10 ? "0" + i : i;
  let t = 12;
  let n = 12 - i;
  let meridiam = i > 11 ? "pm" : "am";
  let li = document.createElement("li");
  li.id = `li${i}`;
  if (i > 12) li.innerHTML = `${i}${t - i}${meridiam}`;
  else li.innerHTML = `${i}-${12}${meridiam}`;
  if (i < 12 && i > 0) li.innerHTML = `${i}-${t - n}${meridiam}`;
  if (i > 11) {
    td.appendChild(li);
    hourList.appendChild(td);
  } else {
    td2.appendChild(li);
    hourList.appendChild(td2);
  }
}

const countDownMonth = document.getElementById("countdown-month");
countDownMonth.addEventListener("click", () => {
  let year = date.getFullYear();
  let month = countDownMonth.value;
  let daysInMonth = new Date(year, month, 0).getDate();
  setList(daysInMonth, 0, dayList, true);
});

const countDownDay = document.getElementById("countdown-day");
const countDownHour = document.getElementById("countdown-hour");
const countDownSeconds = document.getElementById("countdown-seconds");
const countDownMinutes = document.getElementById("countdown-minutes");

clickItem(dayList, countDownDay);
clickItem(hourList, countDownHour);
clickItem(minuteList, countDownMinutes);
clickItem(secondsList, countDownSeconds);

function clickItem(element, input) {
  element.addEventListener("click", (e) => {
    let id = e.target.id;
    input.value = document.getElementById(`${id}`).innerHTML.substring(0, 2);
  });
}

let cond = false;
const countDownContainer = document.querySelector(".countdown-container");
let countdownCalender = document.querySelectorAll(".countdown-calender");

// switching between date and hour while setting the countdown
let p = document.createElement("p");
p.classList.add("p");
p.textContent = "Use (hour/minutes/seconds) instead";
countDownContainer.appendChild(p);
document.querySelector(".p").addEventListener("click", () => {
  let p = document.querySelector(".p");
  if (!cond) {
    p.innerHTML = "Use (Year/Month/Day) instead";
    cond = true;
    countdownCalender[0].classList.add("hidden");
    countdownCalender[1].classList.remove("hidden");
  } else {
    p.innerHTML = "Use (hour/minutes/seconds) instead";
    cond = false;
    countdownCalender[0].classList.remove("hidden");
    countdownCalender[1].classList.add("hidden");
  }
});

let input = document.querySelectorAll("input");
let countDownIcon = document.querySelector(".countdown-icon");
let countDownChild = document.querySelector(".countdown-content-child");
let countDown = document.querySelector(".countdown");
let countDownTime = document.querySelector(".countdown-time");
let countDownHeading = document.getElementById("countdown-text");
let timeContainer = document.querySelector(".time-container");
let countDownCondition = false;
countDown.addEventListener("click", (event) => {
  if (countDownCondition) {
    resetCountDown();
  } else {
    setAlarmBox.style.display = "none";
    hideStopWatch();
    time.classList.add("hidden");
    countDownCondition = true;
    countDownHeading.innerHTML = "Time";
    countDownIcon.setAttribute("src", "image/time-svgrepo-com.svg");
    countDownChild1.classList.remove("hidden");
    countDownChild.classList.add("hidden");
    countDownContainer.classList.remove("hidden");
    countDownTime.classList.remove("hidden");
    timeContainer.classList.add("countdown-bar");
  }
});

let outer = document.querySelector(".outer");

function resetCountDown() {
  countDownCondition = false;
  countDownHeading.innerHTML = "Stopwatch";
  countDownIcon.setAttribute("src", "image/countdown.svg");
  countDownChild1.classList.add("hidden");
  countDownChild.classList.remove("hidden");
  time.classList.remove("hidden");
  countDownContainer.classList.add("hidden");
  countDownTime.classList.add("hidden");
  clearInterval(countDownInterval);
  document.getElementById("day-time").innerHTML = `&nbsp;0&nbsp`;
  document.getElementById("hour-time").innerHTML = `&nbsp;0&nbsp`;
  document.getElementById("minutes-time").innerHTML = `&nbsp;0&nbsp`;
  document.getElementById("seconds-time").innerHTML = `&nbsp;0&nbsp;`;
  outer.classList.remove("countdown-animation");
  input[0].value = "";
  input[1].value = "";
  input[2].value = "";
  input[3].value = "";
  input[4].value = "";
  input[5].value = "";
  timeContainer.classList.remove("countdown-bar");
}

let countDownbtn = document.querySelector(".create-countdown-btn");
let firstValue, thirdValue, secondValue, toDate, countDownInterval;

countDownbtn.addEventListener("click", () => {
  if (!cond) {
    firstValue = document.getElementById("countdown-year").value;
    secondValue = countDownMonth.value;
    thirdValue = countDownDay.value;
    toDate = new Date(`${firstValue} ${secondValue} ${thirdValue}`);
  } else {
    firstValue = countDownHour.value;
    secondValue = countDownMinutes.value;
    thirdValue = countDownSeconds.value;
    toDate = new Date(`${months[date.getMonth()]} ${date.getDate()}, 
      ${date.getFullYear()} ${firstValue}:${secondValue}: ${thirdValue}`);
  }

  // calculating the time for the countdown
  countDownInterval = setInterval(() => {
    let milliseconds = toDate.getTime() - dateInterval.getTime();
    let secs = Math.floor((milliseconds / 1000) % 60);
    let min = Math.floor((milliseconds / 1000 / 60) % 60);
    let hr = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    let day = Math.floor(milliseconds / 1000 / 60 / 60 / 24);
    day = day < 10 ? "0" + day : day;
    secs = secs < 10 ? "0" + secs : secs;
    min = min < 10 ? "0" + min : min;
    hr = hr < 10 ? "0" + hr : hr;
    document.getElementById("day-time").innerHTML = `&nbsp;${day}&nbsp;`;
    document.getElementById("minutes-time").innerHTML = `&nbsp;${min}&nbsp;`;
    document.getElementById("hour-time").innerHTML = `&nbsp;${hr}&nbsp;`;
    document.getElementById("seconds-time").innerHTML = `&nbsp;${secs}&nbsp;`;
    countDownContainer.classList.add("hidden");
    countDownCondition = true;
  }, 1000);
  outer.classList.add("countdown-animation");
});
