// DOM элементы
const yearEl = document.getElementById("year-select");
const monthEl = document.getElementById("month-select");
const resultBasic = document.getElementById("basic-period");

// Функция для расчета базового периода
function calculateBasicPeriod() {
  const year = parseInt(yearEl.value);
  const month = parseInt(monthEl.value);
  if (!year || !month) return;
  const baseYear = year - 1;
  resultBasic.value = `Декабрь ${baseYear}`;
}

// Обработчики для периода
yearEl.addEventListener("change", calculateBasicPeriod);
monthEl.addEventListener("change", calculateBasicPeriod);

// Универсальная функция для переключения полей расхода
function toggleConsumptionFields(serviceName) {
  const selectedRadio = document.querySelector(`input[name="${serviceName}"]:checked`);
  const isInput = selectedRadio && selectedRadio.value === "input";
  
  const inputField = document.getElementById(`${serviceName}-consumption-input`);
  const selectField = document.getElementById(`${serviceName}-consumption-select`);
  const inputLabel = document.querySelector(`label[for="${serviceName}-consumption-input"]`);
  const selectLabel = document.querySelector(`label[for="${serviceName}-consumption-select"]`);
  
  if (inputField && selectField && inputLabel && selectLabel) {
    if (isInput) {
      inputField.style.display = "block";
      inputLabel.style.display = "block";
      selectField.style.display = "none";
      selectLabel.style.display = "none";
    } else {
      inputField.style.display = "none";
      inputLabel.style.display = "none";
      selectField.style.display = "block";
      selectLabel.style.display = "block";
    }
  }
}

// Обработчики для холодной воды
const coldWaterRadios = document.querySelectorAll('input[name="cold-water"]');
coldWaterRadios.forEach((radio) => {
  radio.addEventListener("change", () => toggleConsumptionFields("cold-water"));
});

// Обработчики для водоотведения
const waterDisposalRadios = document.querySelectorAll('input[name="water-disposal"]');
const waterDisposalInput = document.getElementById("water-disposal-consumption");

function updateWaterDisposalInput() {
  const selected = document.querySelector('input[name="water-disposal"]:checked');
  const isManual = selected && selected.value === "input";

  if (waterDisposalInput) {
    waterDisposalInput.disabled = !isManual;
    if (!isManual) {
      waterDisposalInput.value = "Введите значение";
    }
  }
}

waterDisposalRadios.forEach((radio) =>
  radio.addEventListener("change", updateWaterDisposalInput)
);

// Инициализация водоотведения
updateWaterDisposalInput();

// Обработчики для горячей воды
const hotWaterRadios = document.querySelectorAll('input[name="hot-water"]');
hotWaterRadios.forEach((radio) => {
  radio.addEventListener("change", () => toggleConsumptionFields("hot-water"));
});

// Обработчики для отопления
const heatingRadios = document.querySelectorAll('input[name="heating"]');
heatingRadios.forEach((radio) => {
  radio.addEventListener("change", () => toggleConsumptionFields("heating"));
});

// Элементы электроснабжения
const powerSupplyRadios = document.querySelectorAll('input[name="power-supply"]');
const powerSupplyInput = document.getElementById('power-supply-consumption-input');
const powerSupplySelect = document.getElementById('power-supply-consumption-select');
const tariffTypeGroup = document.getElementById('tariff-type-group');
const powerSupplyConsumptionLabel = document.getElementById('power-supply-consumption-label');
const powerSupplyConsumptionSelectLabel = document.getElementById('power-supply-consumption-select-label');

// Функция для обновления электроснабжения
function updatePowerSupply() {
  const selectedMethod = document.querySelector('input[name="power-supply"]:checked');
  const isMetering = selectedMethod && selectedMethod.value === 'input';
  const singleTariffRadio = document.getElementById('single-tariff');
  const multiZoneRadio = document.getElementById('multi-zone');
  
  if (!tariffTypeGroup || !powerSupplyInput || !powerSupplySelect || 
      !powerSupplyConsumptionLabel || !powerSupplyConsumptionSelectLabel ||
      !singleTariffRadio || !multiZoneRadio) {
    return;
  }
  
  if (isMetering) {
    // Если активен "Прибор учета" - доступны оба типа тарифов, показываем input
    tariffTypeGroup.style.display = 'block';
    powerSupplyInput.style.display = 'block';
    powerSupplyConsumptionLabel.style.display = 'block';
    powerSupplySelect.style.display = 'none';
    powerSupplyConsumptionSelectLabel.style.display = 'none';
    
    // Активируем оба типа тарифов
    singleTariffRadio.disabled = false;
    multiZoneRadio.disabled = false;
    singleTariffRadio.parentElement.classList.remove('disabled');
    multiZoneRadio.parentElement.classList.remove('disabled');
  } else {
    // Если активен "Норматив" - доступен только одноставочный тариф, показываем select
    tariffTypeGroup.style.display = 'block';
    powerSupplyInput.style.display = 'none';
    powerSupplyConsumptionLabel.style.display = 'none';
    powerSupplySelect.style.display = 'block';
    powerSupplyConsumptionSelectLabel.style.display = 'block';
    
    // Деактивируем 2-х зонную тарификацию
    singleTariffRadio.disabled = false;
    multiZoneRadio.disabled = true;
    singleTariffRadio.parentElement.classList.remove('disabled');
    multiZoneRadio.parentElement.classList.add('disabled');
    
    // Автоматически выбираем одноставочный тариф
    singleTariffRadio.checked = true;
  }
}

// Обработчики для электроснабжения
powerSupplyRadios.forEach(radio => {
  radio.addEventListener('change', updatePowerSupply);
});

// Инициализация электроснабжения
updatePowerSupply();

// Модальное окно инструкции
const instructionBtn = document.querySelector('.btn--instruction');
const modal = document.getElementById('instruction-modal');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.querySelector('.modal__overlay');

// Функция открытия модального окна
function openModal() {
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Функция закрытия модального окна
function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Обработчики для модального окна
if (instructionBtn) {
  instructionBtn.addEventListener('click', openModal);
}

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', closeModal);
}

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});