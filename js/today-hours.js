document.addEventListener("DOMContentLoaded", function () {
  const contactStatusEl = document.getElementById("open-status");
  const footerStatusEl = document.getElementById("footer-open-status");
  const footerTodayEl = document.getElementById("footer-today-hours");

  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ...
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const schedule = {
    0: { open: 10 * 60, close: 14 * 60, label: "Sun", display: "Sun: 10:00 AM - 2:00 PM" },
    1: null,
    2: { open: 10 * 60, close: 16 * 60, label: "Tue", display: "Tue: 10:00 AM - 4:00 PM" },
    3: { open: 10 * 60, close: 16 * 60, label: "Wed", display: "Wed: 10:00 AM - 4:00 PM" },
    4: { open: 10 * 60, close: 16 * 60, label: "Thu", display: "Thu: 10:00 AM - 4:00 PM" },
    5: { open: 10 * 60, close: 17 * 60, label: "Fri", display: "Fri: 10:00 AM - 5:00 PM" },
    6: { open: 10 * 60, close: 16 * 60, label: "Sat", display: "Sat: 10:00 AM - 4:00 PM" }
  };

  function formatTime(minutes) {
    let h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
  }

  function getStatusText() {
    const today = schedule[day];

    if (today) {
      if (currentMinutes >= today.open && currentMinutes < today.close) {
        return {
          text: `Open Now — closes at ${formatTime(today.close)}`,
          state: "open"
        };
      }

      if (currentMinutes < today.open) {
        return {
          text: `Closed Now — opens at ${formatTime(today.open)}`,
          state: "closed"
        };
      }
    }

    let nextDay = (day + 1) % 7;
    while (!schedule[nextDay]) {
      nextDay = (nextDay + 1) % 7;
    }

    return {
      text: `Closed Now — opens ${schedule[nextDay].label} at ${formatTime(schedule[nextDay].open)}`,
      state: "closed"
    };
  }

  function getTodayDisplay() {
    const today = schedule[day];
    if (!today) {
      return "Today: Mon: Closed";
    }
    return `Today: ${today.display}`;
  }

  const status = getStatusText();
  const todayDisplay = getTodayDisplay();

  if (contactStatusEl) {
    contactStatusEl.textContent = status.text;
    contactStatusEl.classList.remove("open", "closed");
    contactStatusEl.classList.add(status.state);
  }

  if (footerStatusEl) {
    footerStatusEl.textContent = status.text;
    footerStatusEl.className = status.state === "open" ? "footer-hours-open" : "footer-hours-closed";
  }

  if (footerTodayEl) {
    footerTodayEl.textContent = todayDisplay;
  }
});