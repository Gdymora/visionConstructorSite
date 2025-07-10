/*document.getElementById(this.id) == this*/
async function fetchProjectData() {
  try {
    const response = await fetch("http://127.0.0.1:8005/api/project-data-json/view/15");
    // Перевіряємо, чи успішний запит
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}
  `);
    }
    const jsonData = await response.json();
    console.log(jsonData);
    // Обробка отриманих даних
    const data = processData(jsonData.data);
    console.log("data", data);
    console.log("Received data:", data);
    // Оновлення елементів заголовка на основі отриманих даних
    //updateHeaderData(data.header);
    // Викликаємо для всього об'єкта data
    updateAllSections(data);
  } catch (error) {
    console.error("Error fetching project data:", error);
  }
}
// Виклик асинхронної функції
fetchProjectData();
// Функція для оновлення елементів на основі атрибутів data-header-*
function updateHeaderData(data, sectionName) {
  Object.keys(data).forEach(function (key) {
    const keyLower = key.toLowerCase();
    $(`[data-${sectionName}-${keyLower}]`).each(function (element) {
      if (Array.isArray(data[key])) {
        const itemElements = element.querySelectorAll(`[data-${sectionName}-${keyLower}-item]`);
        itemElements.forEach((itemElement, index) => {
          if (data[key][index]) {
            itemElement.textContent = data[key][index];
          }
        });
      } else if (element.tagName === "IMG" && key === "imageurl") {
        element.src = data[key];
      } else {
        element.textContent = data[key];
      }
    });
  });
}
function updateAllSections(data) {
  Object.keys(data).forEach(function (section) {
    // Перебір усіх секцій (header, hero, showcaseImages)
    updateHeaderData(data[section], section);
  });
}
function processData(inputData) {
  const result = {};
  function parseValue(value) {
    if (typeof value === "string") {
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
    }
    return value;
  }
  function processDataArray(dataArray) {
    if (dataArray.length === 1 && Array.isArray(dataArray[0])) {
      // Випадок: [[{ ... }]]
      return dataArray[0][0];
    } else {
      // Випадок: [[{ ... }], [{ ... }], ...]
      return dataArray.map((item) => item[0]);
    }
  }
  for (const key in inputData) {
    if (inputData[key] && typeof inputData[key] === "object" && inputData[key].data) {
      const processedData = processDataArray(inputData[key].data);
      if (Array.isArray(processedData)) {
        // Якщо це масив (як у випадку з showcaseImages)
        result[key] = processedData;
      } else {
        // Якщо це об'єкт (як у випадку з header або hero)
        result[key] = {};
        for (const subKey in processedData) {
          result[key][subKey] = parseValue(processedData[subKey]);
        }
      }
    }
  }
  return result;
}
