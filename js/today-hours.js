document.addEventListener("DOMContentLoaded", function () {
  const statusEl = document.getElementById("open-status");
  if (!statusEl) return;

  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ...
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const schedule = {
    0: { open: 10 * 60, close: 14 * 60, label: "Sun" },
    1: null,
    2: { open: 10 * 60, close: 16 * 60, label: "Tue" },
    3: { open: 10 * 60, close: 16 * 60, label: "Wed" },
    4: { open: 10 * 60, close: 16 * 60, label: "Thu" },
    5: { open: 10 * 60, close: 17 * 60, label: "Fri" },
    6: { open: 10 * 60, close: 16 * 60, label: "Sat" }
  };

  function formatTime(minutes) {
    let h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${String(m).padStart(2, "0")} ${ampm}`;
  }

  statusEl.classList.remove("open", "closed");

  const today = schedule[day];

  if (today) {
    if (currentMinutes >= today.open && currentMinutes < today.close) {
      statusEl.textContent = `Open Now — closes at ${formatTime(today.close)}`;
      statusEl.classList.add("open");
      return;
    }

    if (currentMinutes < today.open) {
      statusEl.textContent = `Closed Now — opens at ${formatTime(today.open)}`;
      statusEl.classList.add("closed");
      return;
    }
  }

  let nextDay = (day + 1) % 7;
  while (!schedule[nextDay]) {
    nextDay = (nextDay + 1) % 7;
  }

  statusEl.textContent = `Closed Now — opens ${schedule[nextDay].label} at ${formatTime(schedule[nextDay].open)}`;
  statusEl.classList.add("closed");
});