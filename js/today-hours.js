document.addEventListener("DOMContentLoaded", function () {
  const target = document.getElementById("today-hours");
  if (!target) return;

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const hoursMap = {
    Sunday: "10:00 AM - 2:00 PM",
    Monday: "Closed",
    Tuesday: "10:00 AM - 4:00 PM",
    Wednesday: "10:00 AM - 4:00 PM",
    Thursday: "10:00 AM - 4:00 PM",
    Friday: "10:00 AM - 5:00 PM",
    Saturday: "10:00 AM - 4:00 PM"
  };

  const now = new Date();
  const todayName = dayNames[now.getDay()];
  const todayHours = hoursMap[todayName] || "Closed";

  if (todayHours === "Closed") {
    target.textContent = `Today (${todayName}): Closed`;
    target.style.background = "#fff1f0";
    target.style.color = "#c62828";
  } else {
    target.textContent = `Today (${todayName}): ${todayHours}`;
  }
});