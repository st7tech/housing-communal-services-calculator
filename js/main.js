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

const coldWaterRadios = document.querySelectorAll('input[name="cold-water"]');
const coldWaterInput = document.getElementById("cold-water-consumption-input");
const coldWaterSelect = document.getElementById(
  "cold-water-consumption-select"
);

coldWaterRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "input") {
      document.getElementById("cold-water-consumption-input").style.display =
        "block";
      document.querySelector(
        'label[for="cold-water-consumption-input"]'
      ).style.display = "block";

      document.getElementById("cold-water-consumption-select").style.display =
        "none";
      document.querySelector(
        'label[for="cold-water-consumption-select"]'
      ).style.display = "none";
    } else {
      document.getElementById("cold-water-consumption-input").style.display =
        "none";
      document.querySelector(
        'label[for="cold-water-consumption-input"]'
      ).style.display = "none";

      document.getElementById("cold-water-consumption-select").style.display =
        "block";
      document.querySelector(
        'label[for="cold-water-consumption-select"]'
      ).style.display = "block";
    }
  });
});

const radios = document.querySelectorAll('input[name="water-disposal"]');
const waterDisposalInput = document.getElementById(
  "water-disposal-consumption"
);

function updateWaterDisposalInput() {
  const selected = document.querySelector(
    'input[name="water-disposal"]:checked'
  );
  const isManual = selected && selected.value === "input";

  waterDisposalInput.disabled = !isManual;

  if (!isManual) waterDisposalInput.value = "Введите значение";
}

// Повесить обработчики
radios.forEach((radio) =>
  radio.addEventListener("change", updateWaterDisposalInput)
);

updateWaterDisposalInput();

const hotWaterRadios = document.querySelectorAll('input[name="hot-water"]');
const hotWaterInput = document.getElementById("hot-water-consumption-input");
const hotWaterSelect = document.getElementById("hot-water-consumption-select");

hotWaterRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "input") {
      document.getElementById("hot-water-consumption-input").style.display =
        "block";
      document.querySelector(
        'label[for="hot-water-consumption-input"]'
      ).style.display = "block";

      document.getElementById("hot-water-consumption-select").style.display =
        "none";
      document.querySelector(
        'label[for="hot-water-consumption-select"]'
      ).style.display = "none";
    } else {
      document.getElementById("hot-water-consumption-input").style.display =
        "none";
      document.querySelector(
        'label[for="hot-water-consumption-input"]'
      ).style.display = "none";

      document.getElementById("hot-water-consumption-select").style.display =
        "block";
      document.querySelector(
        'label[for="hot-water-consumption-select"]'
      ).style.display = "block";
    }
  });
});

const heatingRadios = document.querySelectorAll('input[name="heating"]');
const heatingInput = document.getElementById("heating-consumption-input");
const heatingSelect = document.getElementById("heating-consumption-select");

heatingRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "input") {
      document.getElementById("heating-consumption-input").style.display =
        "block";
      document.querySelector(
        'label[for="heating-consumption-input"]'
      ).style.display = "block";

      document.getElementById("heating-consumption-select").style.display =
        "none";
      document.querySelector(
        'label[for="heating-consumption-select"]'
      ).style.display = "none";
    } else {
      document.getElementById("heating-consumption-input").style.display =
        "none";
      document.querySelector(
        'label[for="heating-consumption-input"]'
      ).style.display = "none";

      document.getElementById("heating-consumption-select").style.display =
        "block";
      document.querySelector(
        'label[for="heating-consumption-select"]'
      ).style.display = "block";
    }
  });
});

const powerSupplyRadios = document.querySelectorAll('input[name="power-supply"]')
const tarifTypeRadios = document.querySelectorAll('input[name="tariff-type"]')
const powerSupplyInput = document.getElementById('power-supply-consumption-input')
const powerSupplySelect = document.getElementById('power-supply-consumption-select')

powerSupplyRadios.forEach(radio => {
  if (radio.value === 'select') {
    
  }
})