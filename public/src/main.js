// Title movement
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("showText");
    } else {
      entry.target.classList.remove("showText");
    }
  });
});

const hiddenItems = document.querySelectorAll(".hiddenText");
hiddenItems.forEach((el) => observer.observe(el));

// Vertical animation

const observerV = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("showTextV");
    } else {
      entry.target.classList.remove("showTextV");
    }
  });
});

const hiddenItemsV = document.querySelectorAll(".hiddenTextV");
hiddenItemsV.forEach((el) => observerV.observe(el));

//prevents images from being draggable
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.draggable = false;
  });
});
const date = new Date();
const workPeriod = document.querySelectorAll("#workPeriod");
const monthData = [
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

function calculateYear(inputYear, endInputYear, dateDisplay) {
  dateDisplay.textContent = `- ${endInputYear - inputYear} Years`;
}
function calculateMonth(inputMonth, endInputMonth, dateDisplay) {
  const startMonth = monthData.indexOf(inputMonth);
  const endMonth = monthData.indexOf(endInputMonth);
  dateDisplay.textContent += ` ${endMonth - startMonth + 1} Months`;
}

function extractDom() {
  const startPeriod = document.querySelectorAll(".startDate");
  const endPeriod = document.querySelectorAll(".endDate");
  let cardDateDisplays = document.querySelectorAll(".dateDisplay");

  let filterStartMonth;
  let filterEndMonth;
  let filterStartYear;
  let filterEndYear;

  let i = 0;
  let j = 0;

  while (i < startPeriod.length && j < endPeriod.length) {
    const startDate = startPeriod[i].textContent;
    const endDate = endPeriod[j].textContent;
    const cardDateDisplay = cardDateDisplays[i];
    monthData.forEach((month) => {
      if (startDate.includes(month)) {
        filterStartMonth = month;
      }
      if (endDate.includes(month)) {
        filterEndMonth = month;
      }
    });

    if (startDate.match(/\b\d{4}\b/)) {
      filterStartYear = String(startDate.match(/\b\d{4}\b/));
    }
    if (endDate.includes("Present")) {
      filterEndYear = String(date.getFullYear());
      filterEndMonth = monthData[String(date.getMonth())];
    }
    if (endDate.match(/\b\d{4}\b/)) {
      filterEndYear = String(endDate.match(/\b\d{4}\b/));
    }

    // calculateYear(startYear.textContent, endYear.textContent);
    if (cardDateDisplay) {
      calculateYear(filterStartYear, filterEndYear, cardDateDisplay);
      calculateMonth(filterStartMonth, filterEndMonth, cardDateDisplay);
    }
    i++;
    j++;
  }
}
extractDom();
