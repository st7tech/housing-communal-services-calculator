// DOM элементы
const yearEl = document.getElementById("year-select");
const monthEl = document.getElementById("month-select");
const resultBasic = document.getElementById("basic-period");

// Функция для заполнения select-элементов тарифами
function populateTariffs() {
  const selectedYear = parseInt(yearEl.value) || 2024;
  const selectedMonth = parseInt(monthEl.value) || 1;
  
  // Определяем актуальную дату для тарифа
  let tariffDate = '01.01.2024'; // по умолчанию
  if (selectedYear === 2024) {
    if (selectedMonth >= 7) {
      tariffDate = '01.07.2024';
    } else {
      tariffDate = '01.01.2024';
    }
  } else if (selectedYear === 2025) {
    if (selectedMonth >= 7) {
      tariffDate = '01.07.2025';
    } else {
      tariffDate = '01.01.2025';
    }
  }

  // Холодное водоснабжение
  const coldWaterTariff = document.getElementById("cold-water-tariff");
  if (coldWaterTariff && tariffs.coldWater) {
    coldWaterTariff.innerHTML = '<option value="" selected disabled>Выберите тариф</option>';
    Object.keys(tariffs.coldWater).forEach(id => {
      const supplier = tariffs.coldWater[id];
      const currentTariff = supplier.meteringDevice[tariffDate];
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${supplier.suppliersName} - ${currentTariff} руб/куб.м`;
      coldWaterTariff.appendChild(option);
    });
  }

  // Водоотведение
  const waterDisposalTariff = document.getElementById("water-disposal-tariff");
  if (waterDisposalTariff && tariffs.waterDisposal) {
    waterDisposalTariff.innerHTML = '<option value="" selected disabled>Выберите тариф</option>';
    Object.keys(tariffs.waterDisposal).forEach(id => {
      const supplier = tariffs.waterDisposal[id];
      const currentTariff = supplier.automatically[tariffDate];
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${supplier.suppliersName} - ${currentTariff} руб/куб.м`;
      waterDisposalTariff.appendChild(option);
    });
  }

  // Горячее водоснабжение
  const hotWaterTariff = document.getElementById("hot-water-tariff");
  if (hotWaterTariff && tariffs.hotWater) {
    hotWaterTariff.innerHTML = '<option value="" selected disabled>Выберите тариф</option>';
    Object.keys(tariffs.hotWater).forEach(id => {
      const supplier = tariffs.hotWater[id];
      const currentTariff = supplier.meteringDevice[tariffDate];
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${supplier.suppliersName} - ${currentTariff} руб/куб.м`;
      hotWaterTariff.appendChild(option);
    });
  }

  // Отопление
  const heatingTariff = document.getElementById("heating-tariff");
  if (heatingTariff && tariffs.heating) {
    heatingTariff.innerHTML = '<option value="" selected disabled>Выберите тариф</option>';
    Object.keys(tariffs.heating).forEach(id => {
      const supplier = tariffs.heating[id];
      const currentTariff = supplier.meteringDevice[tariffDate];
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${supplier.suppliersName} - ${currentTariff} руб/Гкал`;
      heatingTariff.appendChild(option);
    });
  }

  // Обращение с ТКО
  const municipalWasteTariff = document.getElementById("municipal-waste-tariff");
  if (municipalWasteTariff && tariffs.municipalWaste) {
    municipalWasteTariff.innerHTML = '<option value="" selected disabled>Выберите тариф</option>';
    Object.keys(tariffs.municipalWaste).forEach(id => {
      const supplier = tariffs.municipalWaste[id];
      const currentTariff = supplier.automatically[tariffDate];
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${supplier.suppliersName} - ${currentTariff} руб/куб.м`;
      municipalWasteTariff.appendChild(option);
    });
  }
}

// Заполняем тарифы при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  populateTariffs();
  updatePowerSupplyTariffs();
  updateTariffInfo();
});

// Функция для обновления тарифов электроснабжения с учетом типа тарифа
function updatePowerSupplyTariffs() {
  const selectedYear = parseInt(yearEl.value) || 2024;
  const selectedMonth = parseInt(monthEl.value) || 1;
  
  // Определяем актуальную дату для тарифа
  let tariffDate = '01.01.2024'; // по умолчанию
  if (selectedYear === 2024) {
    if (selectedMonth >= 7) {
      tariffDate = '01.07.2024';
    } else {
      tariffDate = '01.01.2024';
    }
  } else if (selectedYear === 2025) {
    if (selectedMonth >= 7) {
      tariffDate = '01.07.2025';
    } else {
      tariffDate = '01.01.2025';
    }
  }

  const powerSupplyTariff = document.getElementById("power-supply-tariff");
  if (powerSupplyTariff && tariffs.powerSupply) {
    powerSupplyTariff.innerHTML = '<option value="" selected disabled>Выберите тариф</option>';
    Object.keys(tariffs.powerSupply).forEach(id => {
      const supplier = tariffs.powerSupply[id];
      const singleTariff = supplier.meteringDevice.single[tariffDate];
      const dayTariff = supplier.meteringDevice.multiZone.day[tariffDate];
      const nightTariff = supplier.meteringDevice.multiZone.night[tariffDate];
      
      const option = document.createElement('option');
      option.value = id;
      option.textContent = `${supplier.suppliersName} - Одноставочный: ${singleTariff} руб/кВт⋅ч, День: ${dayTariff} руб/кВт⋅ч, Ночь: ${nightTariff} руб/кВт⋅ч`;
      powerSupplyTariff.appendChild(option);
    });
  }
}

// Функция для обновления тарифной информации в текущем и базовом периодах
function updateTariffInfo() {
  const selectedYear = parseInt(yearEl.value) || 2024;
  const selectedMonth = parseInt(monthEl.value) || 1;
  
  // Определяем даты для текущего и базового периодов
  let currentPeriodDate = '01.01.2024';
  let basePeriodDate = '01.01.2023';
  
  if (selectedYear === 2024) {
    if (selectedMonth >= 7) {
      currentPeriodDate = '01.07.2024';
      basePeriodDate = '01.01.2024';
    } else {
      currentPeriodDate = '01.01.2024';
      basePeriodDate = '01.01.2023';
    }
  } else if (selectedYear === 2025) {
    if (selectedMonth >= 7) {
      currentPeriodDate = '01.07.2025';
      basePeriodDate = '01.01.2025';
    } else {
      currentPeriodDate = '01.01.2025';
      basePeriodDate = '01.01.2024';
    }
  }

  // Функция для получения тарифа по услуге и дате
  function getTariff(serviceType, date) {
    if (!tariffs[serviceType]) return null;
    
    const service = tariffs[serviceType];
    
    // Получаем ID выбранного поставщика из соответствующего select
    let supplierId = null;
    switch (serviceType) {
      case 'coldWater':
        supplierId = document.getElementById('cold-water-tariff')?.value;
        break;
      case 'waterDisposal':
        supplierId = document.getElementById('water-disposal-tariff')?.value;
        break;
      case 'hotWater':
        supplierId = document.getElementById('hot-water-tariff')?.value;
        break;
      case 'heating':
        supplierId = document.getElementById('heating-tariff')?.value;
        break;
      case 'powerSupply':
        supplierId = document.getElementById('power-supply-tariff')?.value;
        break;
      case 'municipalWaste':
        supplierId = document.getElementById('municipal-waste-tariff')?.value;
        break;
    }
    
    // Если поставщик не выбран, берем первого доступного
    if (!supplierId) {
      supplierId = Object.keys(service)[0];
    }
    
    const supplier = service[supplierId];
    if (!supplier) return null;
    
    switch (serviceType) {
      case 'coldWater':
      case 'hotWater':
        return supplier.meteringDevice[date];
      case 'waterDisposal':
        return supplier.automatically[date];
      case 'heating':
        return supplier.meteringDevice[date];
      case 'powerSupply':
        return supplier.meteringDevice.single[date];
      case 'municipalWaste':
        return supplier.automatically[date];
      default:
        return null;
    }
  }

  // Функция для получения единиц измерения
  function getUnits(serviceType) {
    switch (serviceType) {
      case 'coldWater':
      case 'hotWater':
      case 'waterDisposal':
      case 'municipalWaste':
        return 'руб/куб.м';
      case 'heating':
        return 'руб/Гкал';
      case 'powerSupply':
        return 'руб/кВт⋅ч';
      default:
        return '';
    }
  }

  // Обновляем тарифную информацию для каждой услуги
  const services = [
    { type: 'coldWater', currentId: 'cold-water-tarif-сurrent', baseId: 'cold-water-tarif-basiс' },
    { type: 'waterDisposal', currentId: 'water-disposal-tarif-current', baseId: 'water-disposal-tarif-basic' },
    { type: 'hotWater', currentId: 'hot-water-tarif-current', baseId: 'hot-water-tarif-basic' },
    { type: 'heating', currentId: 'heating-tarif-current', baseId: 'heating-tarif-basic' },
    { type: 'powerSupply', currentId: 'power-supply-tarif-current', baseId: 'power-supply-tarif-basic' },
    { type: 'municipalWaste', currentId: 'municipal-waste-tarif-current', baseId: 'municipal-waste-tarif-basic' }
  ];

  services.forEach(service => {
    const currentElement = document.getElementById(service.currentId);
    const baseElement = document.getElementById(service.baseId);
    
    if (currentElement && baseElement) {
      const currentTariff = getTariff(service.type, currentPeriodDate);
      const baseTariff = getTariff(service.type, basePeriodDate);
      const units = getUnits(service.type);
      
      if (currentTariff !== null) {
        currentElement.textContent = `${currentTariff} ${units}`;
      } else {
        currentElement.textContent = '-';
      }
      
      if (baseTariff !== null) {
        baseElement.textContent = `${baseTariff} ${units}`;
      } else {
        baseElement.textContent = '-';
      }
    }
  });
}

// Обработчики для периода
yearEl.addEventListener("change", () => {
  calculateBasicPeriod();
  populateTariffs();
  updatePowerSupplyTariffs();
  updateTariffInfo();
});
monthEl.addEventListener("change", () => {
  calculateBasicPeriod();
  populateTariffs();
  updatePowerSupplyTariffs();
  updateTariffInfo();
});

// Функция для заполнения нормативов на основе выбранного типа дома
function populateStandards() {
  // Получаем выбранный тип дома
  const selectedHomeType = document.querySelector('input[name="home"]:checked');
  if (!selectedHomeType) return;
  
  const homeType = selectedHomeType.id;
  
  // Определяем тип дома для нормативов
  let standardType = 'forMKD'; // по умолчанию
  if (homeType === 'dacha') {
    standardType = 'forPrivateHouse';
  } else if (homeType === 'dormitory') {
    standardType = 'forDormitory';
  }
  
  // Холодное водоснабжение - нормативы
  const coldWaterStandard = document.getElementById("cold-water-standard-value");
  if (coldWaterStandard && tariffs.coldWater) {
    const supplierIds = Object.keys(tariffs.coldWater);
    for (let i = 0; i < supplierIds.length; i++) {
      const id = supplierIds[i];
      const supplier = tariffs.coldWater[id];
      if (supplier.standard && supplier.standard[standardType]) {
        coldWaterStandard.textContent = `${supplier.standard[standardType]} куб.м/чел`;
        break; // Берем первого поставщика
      }
    }
  }

  // Горячее водоснабжение - нормативы
  const hotWaterStandard = document.getElementById("hot-water-standard-value");
  if (hotWaterStandard && tariffs.hotWater) {
    const supplierIds = Object.keys(tariffs.hotWater);
    for (let i = 0; i < supplierIds.length; i++) {
      const id = supplierIds[i];
      const supplier = tariffs.hotWater[id];
      if (supplier.standard && supplier.standard[standardType]) {
        hotWaterStandard.textContent = `${supplier.standard[standardType]} куб.м/чел`;
        break; // Берем первого поставщика
      }
    }
  }

  // Отопление - нормативы
  const heatingStandard = document.getElementById("heating-standard-value");
  if (heatingStandard && tariffs.heating) {
    const supplierIds = Object.keys(tariffs.heating);
    for (let i = 0; i < supplierIds.length; i++) {
      const id = supplierIds[i];
      const supplier = tariffs.heating[id];
      if (supplier.standard && supplier.standard.comment) {
        heatingStandard.textContent = supplier.standard.comment;
        break; // Берем первого поставщика
      }
    }
  }

  // Электроснабжение - нормативы
  const powerSupplyStandard = document.getElementById("power-supply-standard-value");
  if (powerSupplyStandard && tariffs.powerSupply) {
    const supplierIds = Object.keys(tariffs.powerSupply);
    for (let i = 0; i < supplierIds.length; i++) {
      const id = supplierIds[i];
      const supplier = tariffs.powerSupply[id];
      if (supplier.standard && supplier.standard.comment) {
        powerSupplyStandard.textContent = supplier.standard.comment;
        break; // Берем первого поставщика
      }
    }
  }

  // Обращение с ТКО - нормативы (пока не используется, но код готов для будущего)
  // const municipalWasteStandard = document.getElementById("municipal-waste-standard-value");
  // if (municipalWasteStandard && tariffs.municipalWaste) {
  //   const supplierIds = Object.keys(tariffs.municipalWaste);
  //   for (let i = 0; i < supplierIds.length; i++) {
  //     const id = supplierIds[i];
  //     const supplier = tariffs.municipalWaste[id];
  //     if (supplier.manually && supplier.manually[standardType]) {
  //       municipalWasteStandard.textContent = `${supplier.manually[standardType]} куб.м/чел`;
  //       break; // Берем первого поставщика
  //     }
  //   }
  // }
}

// Заполняем нормативы при загрузке страницы
document.addEventListener('DOMContentLoaded', populateStandards);

// Добавляем обработчики для обновления тарифной информации при выборе поставщика
function addTariffChangeListeners() {
  const tariffSelects = [
    'cold-water-tariff',
    'water-disposal-tariff', 
    'hot-water-tariff',
    'heating-tariff',
    'power-supply-tariff',
    'municipal-waste-tariff'
  ];

  tariffSelects.forEach(selectId => {
    const select = document.getElementById(selectId);
    if (select) {
      select.addEventListener('change', updateTariffInfo);
    }
  });
}

// Добавляем слушатели при загрузке страницы
document.addEventListener('DOMContentLoaded', addTariffChangeListeners);

// Добавляем обработчики для выбора типа дома
function addHomeTypeChangeListeners() {
  const homeTypeRadios = document.querySelectorAll('input[name="home"]');
  homeTypeRadios.forEach(radio => {
    radio.addEventListener('change', populateStandards);
  });
}

// Добавляем слушатели для типа дома при загрузке страницы
document.addEventListener('DOMContentLoaded', addHomeTypeChangeListeners);

// Функция для расчета базового периода
function calculateBasicPeriod() {
  const year = parseInt(yearEl.value);
  const month = parseInt(monthEl.value);
  if (!year || !month) return;
  const baseYear = year - 1;
  resultBasic.value = `Декабрь ${baseYear}`;
}

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
const powerSupplyDayInput = document.getElementById('power-supply-consumption-day');
const powerSupplyNightInput = document.getElementById('power-supply-consumption-night');
const powerSupplyDayLabel = document.getElementById('power-supply-consumption-day-label');
const powerSupplyNightLabel = document.getElementById('power-supply-consumption-night-label');
const tariffTypeRadios = document.querySelectorAll('input[name="tariff-type"]');

// Функция для обновления электроснабжения
function updatePowerSupply() {
  const selectedMethod = document.querySelector('input[name="power-supply"]:checked');
  const isMetering = selectedMethod && selectedMethod.value === 'input';
  const singleTariffRadio = document.getElementById('single-tariff');
  const multiZoneRadio = document.getElementById('multi-zone');
  const selectedTariffType = document.querySelector('input[name="tariff-type"]:checked');
  const isMultiZone = selectedTariffType && selectedTariffType.value === '2-zone';
  
  if (!tariffTypeGroup || !powerSupplyInput || !powerSupplySelect || 
      !powerSupplyConsumptionLabel || !powerSupplyConsumptionSelectLabel ||
      !singleTariffRadio || !multiZoneRadio ||
      !powerSupplyDayInput || !powerSupplyNightInput ||
      !powerSupplyDayLabel || !powerSupplyNightLabel) {
    return;
  }
  
  if (isMetering) {
    // Если активен "Прибор учета" - доступны оба типа тарифов
    tariffTypeGroup.style.display = 'block';
    powerSupplySelect.style.display = 'none';
    powerSupplyConsumptionSelectLabel.style.display = 'none';

    // Активируем оба типа тарифов
    singleTariffRadio.disabled = false;
    multiZoneRadio.disabled = false;
    singleTariffRadio.parentElement.classList.remove('disabled');
    multiZoneRadio.parentElement.classList.remove('disabled');

    if (isMultiZone) {
      // 2-х зонная тарификация: показываем два поля (день/ночь)
      powerSupplyInput.style.display = 'none';
      powerSupplyConsumptionLabel.style.display = 'none';

      powerSupplyDayInput.style.display = 'block';
      powerSupplyNightInput.style.display = 'block';
      powerSupplyDayLabel.style.display = 'block';
      powerSupplyNightLabel.style.display = 'block';
    } else {
      // Одноставочный: показываем одно поле расхода
      powerSupplyInput.style.display = 'block';
      powerSupplyConsumptionLabel.style.display = 'block';

      powerSupplyDayInput.style.display = 'none';
      powerSupplyNightInput.style.display = 'none';
      powerSupplyDayLabel.style.display = 'none';
      powerSupplyNightLabel.style.display = 'none';
    }
  } else {
    // Если активен "Норматив" - доступен только одноставочный тариф, показываем select
    tariffTypeGroup.style.display = 'block';
    powerSupplyInput.style.display = 'none';
    powerSupplyConsumptionLabel.style.display = 'none';
    powerSupplySelect.style.display = 'block';
    powerSupplyConsumptionSelectLabel.style.display = 'block';

    // Прячем дневной/ночной расход
    powerSupplyDayInput.style.display = 'none';
    powerSupplyNightInput.style.display = 'none';
    powerSupplyDayLabel.style.display = 'none';
    powerSupplyNightLabel.style.display = 'none';
    
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

tariffTypeRadios.forEach(radio => {
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