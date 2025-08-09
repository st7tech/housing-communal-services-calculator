const yearEl = document.getElementById("year-select");
const monthEl = document.getElementById("month-select");
const resultBasic = document.getElementById("basic-period");

function calculateBasicPeriod() {
  const year = parseInt(yearEl.value);
  const month = parseInt(monthEl.value);
  if (!year || !month) return;
  const baseYear = year - 1;
  return (resultBasic.value = `Декарь ${baseYear}`);
}

yearEl.addEventListener("change", calculateBasicPeriod);
monthEl.addEventListener("change", calculateBasicPeriod);

