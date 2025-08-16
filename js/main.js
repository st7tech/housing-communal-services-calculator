// DOM элементы
const yearEl = document.getElementById("year-select");
const monthEl = document.getElementById("month-select");
const resultBasic = document.getElementById("basic-period");

// Функция для поиска строки таблицы по тексту
function findTableRowByText(searchText) {
  const rows = document.querySelectorAll('.results-table__row');
  for (let row of rows) {
    const cells = row.querySelectorAll('td');
    for (let cell of cells) {
      if (cell.textContent.includes(searchText)) {
        return row;
      }
    }
  }
  return null;
}

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

// Функция для расчета всех услуг
function calculateServices() {
  const year = parseInt(yearEl.value);
  const month = parseInt(monthEl.value);
  const residents = parseInt(document.getElementById('resident').value) || 0;
  const area = parseFloat(document.getElementById('area').value) || 0;
  
  if (!year || !month) {
    alert('Пожалуйста, выберите год и месяц');
    return;
  }

  // Определяем даты для текущего и базового периодов
  let currentPeriodDate = '01.01.2024';
  let basePeriodDate = '01.01.2023';
  
  if (year === 2024) {
    if (month >= 7) {
      currentPeriodDate = '01.07.2024';
      basePeriodDate = '01.01.2024';
    } else {
      currentPeriodDate = '01.01.2024';
      basePeriodDate = '01.01.2023';
    }
  } else if (year === 2025) {
    if (month >= 7) {
      currentPeriodDate = '01.07.2025';
      basePeriodDate = '01.01.2025';
    } else {
      currentPeriodDate = '01.01.2025';
      basePeriodDate = '01.01.2024';
    }
  }

  // Функция для получения тарифа
  function getTariff(serviceType, date, supplierId = null) {
    if (!tariffs[serviceType]) return null;
    
    const service = tariffs[serviceType];
    
    // Если поставщик не указан, берем первого доступного
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

  // Функция для получения тарифа электроснабжения (двухзонный)
  function getPowerSupplyTariffs(date, supplierId = null) {
    if (!tariffs.powerSupply) return null;
    
    const service = tariffs.powerSupply;
    if (!supplierId) {
      supplierId = Object.keys(service)[0];
    }
    
    const supplier = service[supplierId];
    if (!supplier) return null;
    
    return {
      day: supplier.meteringDevice.multiZone.day[date],
      night: supplier.meteringDevice.multiZone.night[date]
    };
  }

  // Функция для получения норматива
  function getStandard(serviceType, supplierId = null) {
    if (!tariffs[serviceType]) return null;
    
    const service = tariffs[serviceType];
    if (!supplierId) {
      supplierId = Object.keys(service)[0];
    }
    
    const supplier = service[supplierId];
    if (!supplier) return null;
    
    // Определяем тип дома
    const homeType = document.querySelector('input[name="home"]:checked')?.id;
    let standardType = 'forMKD';
    if (homeType === 'dacha') {
      standardType = 'forPrivateHouse';
    } else if (homeType === 'dormitory') {
      standardType = 'forDormitory';
    }
    
    // Для ТКО используем 'manually', для остальных 'standard'
    if (serviceType === 'municipalWaste') {
      return supplier.manually ? supplier.manually[standardType] : null;
    }
    
    return supplier.standard ? supplier.standard[standardType] : null;
  }

  // Расчет холодной воды
  function calculateColdWater() {
    const method = document.querySelector('input[name="cold-water"]:checked')?.value;
    const supplierId = document.getElementById('cold-water-tariff')?.value;
    const consumption = parseFloat(document.getElementById('cold-water-consumption-input')?.value) || 0;
    
    let currentTariff = getTariff('coldWater', currentPeriodDate, supplierId);
    let baseTariff = getTariff('coldWater', basePeriodDate, supplierId);
    
    let currentConsumption = 0;
    let baseConsumption = 0;
    let calculation = '';
    
    if (method === 'input') {
      // По прибору учета
      currentConsumption = consumption;
      baseConsumption = consumption;
      calculation = `${currentTariff} × ${consumption} = ${(currentTariff * consumption).toFixed(2)}`;
    } else {
      // По нормативу
      const standard = getStandard('coldWater', supplierId);
      if (standard) {
        currentConsumption = standard * residents;
        baseConsumption = standard * residents;
        calculation = `${standard} × ${residents} × ${currentTariff} = ${(standard * residents * currentTariff).toFixed(2)}`;
      }
    }
    
    return {
      tariff: currentTariff?.toFixed(2) || '0',
      consumption: currentConsumption.toFixed(2),
      calculation: calculation || '0',
      currentPayment: (currentTariff * currentConsumption).toFixed(2),
      basePayment: (baseTariff * baseConsumption).toFixed(2)
    };
  }

  // Расчет водоотведения
  function calculateWaterDisposal() {
    const method = document.querySelector('input[name="water-disposal"]:checked')?.value;
    const supplierId = document.getElementById('water-disposal-tariff')?.value;
    const manualConsumption = parseFloat(document.getElementById('water-disposal-consumption')?.value) || 0;
    
    let currentTariff = getTariff('waterDisposal', currentPeriodDate, supplierId);
    let baseTariff = getTariff('waterDisposal', basePeriodDate, supplierId);
    
    let currentConsumption = 0;
    let baseConsumption = 0;
    let calculation = '';
    
    if (method === 'input') {
      // Вручную
      currentConsumption = manualConsumption;
      baseConsumption = manualConsumption;
      calculation = `${currentTariff} × ${manualConsumption} = ${(currentTariff * manualConsumption).toFixed(2)}`;
    } else {
      // Автоматически - сумма горячей и холодной воды
      const coldWaterConsumption = parseFloat(document.getElementById('cold-water-consumption-input')?.value) || 0;
      const hotWaterConsumption = parseFloat(document.getElementById('hot-water-consumption-input')?.value) || 0;
      
      // Если выбраны нормативы, используем их
      const coldWaterMethod = document.querySelector('input[name="cold-water"]:checked')?.value;
      const hotWaterMethod = document.querySelector('input[name="hot-water"]:checked')?.value;
      
      let totalConsumption = 0;
      
      if (coldWaterMethod === 'input') {
        totalConsumption += coldWaterConsumption;
      } else {
        const coldWaterStandard = getStandard('coldWater', supplierId);
        if (coldWaterStandard) {
          totalConsumption += coldWaterStandard * residents;
        }
      }
      
      if (hotWaterMethod === 'input') {
        totalConsumption += hotWaterConsumption;
      } else {
        const hotWaterStandard = getStandard('hotWater', supplierId);
        if (hotWaterStandard) {
          totalConsumption += hotWaterStandard * residents;
        }
      }
      
      currentConsumption = totalConsumption;
      baseConsumption = totalConsumption;
      calculation = `${currentTariff} × ${totalConsumption.toFixed(2)} = ${(currentTariff * totalConsumption).toFixed(2)}`;
    }
    
    return {
      tariff: currentTariff?.toFixed(2) || '0',
      consumption: currentConsumption.toFixed(2),
      calculation: calculation || '0',
      currentPayment: (currentTariff * currentConsumption).toFixed(2),
      basePayment: (baseTariff * baseConsumption).toFixed(2)
    };
  }

  // Расчет горячей воды
  function calculateHotWater() {
    const method = document.querySelector('input[name="hot-water"]:checked')?.value;
    const supplierId = document.getElementById('hot-water-tariff')?.value;
    const consumption = parseFloat(document.getElementById('hot-water-consumption-input')?.value) || 0;
    
    let currentTariff = getTariff('hotWater', currentPeriodDate, supplierId);
    let baseTariff = getTariff('hotWater', basePeriodDate, supplierId);
    
    let currentConsumption = 0;
    let baseConsumption = 0;
    let calculation = '';
    
    if (method === 'input') {
      // По прибору учета
      currentConsumption = consumption;
      baseConsumption = consumption;
      calculation = `${currentTariff} × ${consumption} = ${(currentTariff * consumption).toFixed(2)}`;
    } else {
      // По нормативу
      const standard = getStandard('hotWater', supplierId);
      if (standard) {
        currentConsumption = standard * residents;
        baseConsumption = standard * residents;
        calculation = `${standard} × ${residents} × ${currentTariff} = ${(standard * residents * currentTariff).toFixed(2)}`;
      }
    }
    
    return {
      tariff: currentTariff?.toFixed(2) || '0',
      consumption: currentConsumption.toFixed(2),
      calculation: calculation || '0',
      currentPayment: (currentTariff * currentConsumption).toFixed(2),
      basePayment: (baseTariff * baseConsumption).toFixed(2)
    };
  }

  // Расчет отопления
  function calculateHeating() {
    const method = document.querySelector('input[name="heating"]:checked')?.value;
    const supplierId = document.getElementById('heating-tariff')?.value;
    const consumption = parseFloat(document.getElementById('heating-consumption-input')?.value) || 0;
    
    let currentTariff = getTariff('heating', currentPeriodDate, supplierId);
    let baseTariff = getTariff('heating', basePeriodDate, supplierId);
    
    let currentConsumption = 0;
    let baseConsumption = 0;
    let calculation = '';
    
    if (method === 'input') {
      // По прибору учета
      currentConsumption = consumption;
      baseConsumption = consumption;
      calculation = `${currentTariff} × ${consumption} = ${(currentTariff * consumption).toFixed(2)}`;
    } else {
      // По нормативу
      const standard = getStandard('heating', supplierId);
      if (standard) {
        currentConsumption = standard * area;
        baseConsumption = standard * area;
        calculation = `${standard} × ${area} × ${currentTariff} = ${(standard * area * currentTariff).toFixed(2)}`;
      }
    }
    
    return {
      tariff: currentTariff?.toFixed(2) || '0',
      consumption: currentConsumption.toFixed(2),
      calculation: calculation || '0',
      currentPayment: (currentTariff * currentConsumption).toFixed(2),
      basePayment: (baseTariff * baseConsumption).toFixed(2)
    };
  }

  // Расчет электроснабжения
  function calculatePowerSupply() {
    const method = document.querySelector('input[name="power-supply"]:checked')?.value;
    const tariffType = document.querySelector('input[name="tariff-type"]:checked')?.value;
    const supplierId = document.getElementById('power-supply-tariff')?.value;
    
    let currentTariff = getTariff('powerSupply', currentPeriodDate, supplierId);
    let baseTariff = getTariff('powerSupply', basePeriodDate, supplierId);
    let currentMultiTariffs = getPowerSupplyTariffs(currentPeriodDate, supplierId);
    let baseMultiTariffs = getPowerSupplyTariffs(basePeriodDate, supplierId);
    
    let currentConsumption = 0;
    let baseConsumption = 0;
    let calculation = '';
    let tariffDisplay = '';
    let consumptionDisplay = '';
    
    if (method === 'input') {
      // По прибору учета
      if (tariffType === '2-zone') {
        // Двухзонная тарификация
        const dayConsumption = parseFloat(document.getElementById('power-supply-consumption-day')?.value) || 0;
        const nightConsumption = parseFloat(document.getElementById('power-supply-consumption-night')?.value) || 0;
        
        currentConsumption = dayConsumption + nightConsumption;
        baseConsumption = dayConsumption + nightConsumption;
        
        let currentDayPayment, currentNightPayment, baseDayPayment, baseNightPayment;
        
        // Проверяем, применяется ли специальная логика для периода 01.07.2025-30.06.2026
        const isSpecialPeriod = (year === 2025 && month >= 7) || (year === 2026 && month <= 6);
        
        if (isSpecialPeriod) {
          // Специальная логика для периода 01.07.2025-30.06.2026
          const nightPercentage = (nightConsumption / currentConsumption) * 100;
          
          if (nightPercentage < 40) {
            // Стандартный расчет
            currentDayPayment = currentMultiTariffs.day * dayConsumption;
            currentNightPayment = currentMultiTariffs.night * nightConsumption;
            baseDayPayment = baseMultiTariffs.day * dayConsumption;
            baseNightPayment = baseMultiTariffs.night * nightConsumption;
            
            calculation = `${currentMultiTariffs.day} × ${dayConsumption} + ${currentMultiTariffs.night} × ${nightConsumption} = ${(currentDayPayment + currentNightPayment).toFixed(2)}`;
          } else {
            // Ночная зона > 40% - применяем скидку 14.4% к ночному тарифу
            currentDayPayment = currentMultiTariffs.day * dayConsumption;
            currentNightPayment = (currentMultiTariffs.night * nightConsumption) * 0.856; // 100% - 14.4% = 85.6%
            baseDayPayment = baseMultiTariffs.day * dayConsumption;
            baseNightPayment = (baseMultiTariffs.night * nightConsumption) * 0.856;
            
            calculation = `${currentMultiTariffs.day} × ${dayConsumption} + (${currentMultiTariffs.night} × ${nightConsumption}) × 0.856 = ${(currentDayPayment + currentNightPayment).toFixed(2)}`;
          }
        } else {
          // Стандартный расчет для других периодов
          currentDayPayment = currentMultiTariffs.day * dayConsumption;
          currentNightPayment = currentMultiTariffs.night * nightConsumption;
          baseDayPayment = baseMultiTariffs.day * dayConsumption;
          baseNightPayment = baseMultiTariffs.night * nightConsumption;
          
          calculation = `${currentMultiTariffs.day} × ${dayConsumption} + ${currentMultiTariffs.night} × ${nightConsumption} = ${(currentDayPayment + currentNightPayment).toFixed(2)}`;
        }
        
        tariffDisplay = `${currentMultiTariffs.day} | ${currentMultiTariffs.night}`;
        consumptionDisplay = `${dayConsumption} | ${nightConsumption}`;
        
        // Обновляем расчетные значения
        currentConsumption = currentDayPayment + currentNightPayment;
        baseConsumption = baseDayPayment + baseNightPayment;
      } else {
        // Одноставочный тариф
        const consumption = parseFloat(document.getElementById('power-supply-consumption-input')?.value) || 0;
        
        // Проверяем, применяется ли специальная логика для периода 01.07.2025-30.06.2026
        const isSpecialPeriod = (year === 2025 && month >= 7) || (year === 2026 && month <= 6);
        
        if (isSpecialPeriod) {
          // Скидка 3.3% для одноставочного тарифа
          currentConsumption = (currentTariff * consumption) * 0.967; // 100% - 3.3% = 96.7%
          baseConsumption = (baseTariff * consumption) * 0.967;
          calculation = `(${currentTariff} × ${consumption}) × 0.967 = ${currentConsumption.toFixed(2)}`;
        } else {
          // Стандартный расчет
          currentConsumption = currentTariff * consumption;
          baseConsumption = baseTariff * consumption;
          calculation = `${currentTariff} × ${consumption} = ${currentConsumption.toFixed(2)}`;
        }
        
        tariffDisplay = currentTariff?.toFixed(2) || '0';
        consumptionDisplay = consumption.toFixed(2);
      }
    } else {
      // По нормативу - только одноставочный
      const standard = getStandard('powerSupply', supplierId);
      if (standard) {
        const standardConsumption = standard * residents;
        
        // Проверяем, применяется ли специальная логика для периода 01.07.2025-30.06.2026
        const isSpecialPeriod = (year === 2025 && month >= 7) || (year === 2026 && month <= 6);
        
        if (isSpecialPeriod) {
          // Скидка 3.3% для одноставочного тарифа
          currentConsumption = (currentTariff * standardConsumption) * 0.967;
          baseConsumption = (baseTariff * standardConsumption) * 0.967;
          calculation = `(${standard} × ${residents} × ${currentTariff}) × 0.967 = ${currentConsumption.toFixed(2)}`;
        } else {
          // Стандартный расчет
          currentConsumption = standard * residents * currentTariff;
          baseConsumption = standard * residents * baseTariff;
          calculation = `${standard} × ${residents} × ${currentTariff} = ${currentConsumption.toFixed(2)}`;
        }
        
        tariffDisplay = currentTariff?.toFixed(2) || '0';
        consumptionDisplay = currentConsumption.toFixed(2);
      }
    }
    
    return {
      tariff: tariffDisplay || '0',
      consumption: consumptionDisplay || '0',
      calculation: calculation || '0',
      currentPayment: currentConsumption.toFixed(2),
      basePayment: baseConsumption.toFixed(2)
    };
  }

  // Расчет ТКО
  function calculateMunicipalWaste() {
    const supplierId = document.getElementById('municipal-waste-tariff')?.value;
    const currentTariff = getTariff('municipalWaste', currentPeriodDate, supplierId);
    const baseTariff = getTariff('municipalWaste', basePeriodDate, supplierId);
    const standard = getStandard('municipalWaste', supplierId);
    
    let currentConsumption = 0;
    let baseConsumption = 0;
    let calculation = '';
    
    if (standard && currentTariff) {
      currentConsumption = standard * residents;
      baseConsumption = standard * residents;
      calculation = `${standard} × ${residents} × ${currentTariff} = ${(standard * residents * currentTariff).toFixed(2)}`;
    }
    
    return {
      tariff: currentTariff?.toFixed(2) || '0',
      consumption: currentConsumption.toFixed(2),
      calculation: calculation || '0',
      currentPayment: (currentTariff * currentConsumption).toFixed(2),
      basePayment: (baseTariff * baseConsumption).toFixed(2)
    };
  }

  // Выполняем все расчеты
  const results = {
    coldWater: calculateColdWater(),
    waterDisposal: calculateWaterDisposal(),
    hotWater: calculateHotWater(),
    heating: calculateHeating(),
    powerSupply: calculatePowerSupply(),
    municipalWaste: calculateMunicipalWaste()
  };

  // Обновляем таблицу результатов
  updateResultsTable(results);
  
  // Рассчитываем итоги
  calculateTotals(results);
}

// Функция для обновления таблицы результатов
function updateResultsTable(results) {
  // Холодная вода
  updateTableRow('cold-water', results.coldWater);
  
  // Водоотведение
  updateTableRow('water-disposal', results.waterDisposal);
  
  // Горячая вода
  updateTableRow('hot-water', results.hotWater);
  
  // Отопление
  updateTableRow('heating', results.heating);
  
  // Электроснабжение
  updateTableRow('power-supply', results.powerSupply);
  
  // ТКО
  updateTableRow('municipal-waste', results.municipalWaste);
}

// Функция для обновления строки таблицы
function updateTableRow(serviceType, result) {
  const row = document.querySelector(`tr[data-service="${serviceType}"]`);
  if (!row) return;
  
  const cells = row.querySelectorAll('td');
  if (cells.length >= 6) {
    cells[1].textContent = result.tariff;
    cells[2].textContent = result.consumption;
    cells[3].textContent = result.calculation;
    cells[4].textContent = result.currentPayment;
    cells[5].textContent = result.basePayment;
  }
}

// Функция для расчета итогов
function calculateTotals(results) {
  let totalCurrent = 0;
  let totalBase = 0;
  
  Object.values(results).forEach(result => {
    totalCurrent += parseFloat(result.currentPayment) || 0;
    totalBase += parseFloat(result.basePayment) || 0;
  });
  
  // Обновляем строку "Итого"
  const totalRow = document.querySelector('.results-table__row--total');
  if (totalRow) {
    const cells = totalRow.querySelectorAll('td');
    if (cells.length >= 6) {
      cells[1].textContent = '-'; // Тариф не применим для итогов
      cells[2].textContent = '-'; // Объем потребления не применим для итогов
      cells[3].textContent = 'Сумма всех услуг'; // Расчет
      cells[4].textContent = totalCurrent.toFixed(2); // Плата в текущем периоде
      cells[5].textContent = totalBase.toFixed(2); // Плата в базовом периоде
    }
  }
  
  // Рассчитываем индекс роста
  let growthIndex = 0;
  if (totalBase > 0) {
    growthIndex = (totalCurrent / totalBase) * 100;
  }
  
  // Получаем предельный индекс для выбранного года
  const year = parseInt(yearEl.value);
  const limitIndex = tariffs.limitIndex[year] || 0;
  
  // Обновляем строку "Индекс роста"
  const allRows = document.querySelectorAll('.results-table__row');
  for (let row of allRows) {
    const firstCell = row.querySelector('td:first-child');
    if (firstCell && firstCell.textContent.includes('Индекс роста')) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 6) {
        cells[1].textContent = '-'; // Тариф не применим
        cells[2].textContent = '-'; // Объем потребления не применим
        cells[3].textContent = `(${totalCurrent.toFixed(2)} / ${totalBase.toFixed(2)}) × 100`; // Формула расчета
        cells[4].textContent = '-'; // Плата в текущем периоде не применима
        cells[5].textContent = `${growthIndex.toFixed(2)}%`; // Результат
      }
      break;
    }
  }
  
  // Обновляем строку "Предельный индекс"
  for (let row of allRows) {
    const firstCell = row.querySelector('td:first-child');
    if (firstCell && firstCell.textContent.includes('Предельный индекс')) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 6) {
        cells[1].textContent = '-'; // Тариф не применим
        cells[2].textContent = '-'; // Объем потребления не применим
        cells[3].textContent = '-'; // Описание не нужно
        cells[4].textContent = '-'; // Плата в текущем периоде не применима
        cells[5].textContent = `${limitIndex.toFixed(2)}%`; // Значение для выбранного года
      }
      break;
    }
  }
  
  // Превышение - показываем "Да" или "Нет"
  for (let row of allRows) {
    const firstCell = row.querySelector('td:first-child');
    if (firstCell && firstCell.textContent.includes('Превышение')) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 6) {
        cells[1].textContent = '-'; // Тариф не применим
        cells[2].textContent = '-'; // Объем потребления не применим
        cells[3].textContent = '-'; // Описание не нужно
        cells[4].textContent = '-'; // Плата в текущем периоде не применима
        if (growthIndex > limitIndex) {
          cells[5].textContent = 'Да';
          cells[5].style.color = 'red';
        } else {
          cells[5].textContent = 'Нет';
          cells[5].style.color = 'inherit';
        }
      }
      break;
    }
  }
}

// Добавляем обработчик для кнопки "Рассчитать"
document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.querySelector('.btn--calculate');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateServices);
  }
  
  // Добавляем data-атрибуты к строкам таблицы для удобства поиска
  const tableRows = document.querySelectorAll('.results-table__row');
  tableRows.forEach((row, index) => {
    const serviceNames = ['cold-water', 'water-disposal', 'hot-water', 'heating', 'power-supply', 'municipal-waste'];
    if (serviceNames[index]) {
      row.setAttribute('data-service', serviceNames[index]);
    }
  });
});