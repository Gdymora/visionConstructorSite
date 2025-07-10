/*document.getElementById(this.id) == this*/
const carousel = document.getElementById("imageCarousel");
let isDown = false;
let startX;
let scrollLeft;
carousel.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener("mouseleave", () => {
  isDown = false;
});
carousel.addEventListener("mouseup", () => {
  isDown = false;
});
carousel.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});
carousel.addEventListener("wheel", (e) => {
  e.preventDefault();
  carousel.scrollLeft += e.deltaY;
});
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

    if (typeof data[key] === "object" && data[key].src) {
      console.log("Обробляємо картинку:", data.length, data[key], data[key].src);

      // Знаходимо контейнер карусельки
      const carouselContainer = document.querySelector(`[data-${sectionName}]`);

      // Знаходимо всі елементи зображень
      const imageElements = carouselContainer.querySelectorAll(`[data-${sectionName}-item]`);
      const imageCount = imageElements.length;

      // Якщо картинок більше, ніж елементів, клонуємо останній блок
      if (data.length > imageCount) {
        const lastItemContainer = imageElements[imageCount - 1].closest(`[data-${sectionName}-container]`);

        for (let i = imageCount; i < data.length; i++) {
          const newItemContainer = lastItemContainer.cloneNode(true);
          carouselContainer.appendChild(newItemContainer);
        }
      }

      // Оновлюємо всі елементи зображень
      carouselContainer.querySelectorAll(`[data-${sectionName}-item]`).forEach((element, index) => {
        if (data[index] && data[index].src) {
          element.src = data[index].src;
          if (data[index].alt) {
            element.alt = data[index].alt;
          }
        }
      });
    }

    $(`[data-${sectionName}-${keyLower}]`).each(function (element) {
      if (Array.isArray(data[key])) {
        const itemElements = element.querySelectorAll(`[data-${sectionName}-${keyLower}-item]`);
        itemElements.forEach((itemElement, index) => {
          if (data[key][index]) {
            console.log(keyLower, itemElements);
            if (typeof data[key][index] === "object" && data[key][index].src) {
              // Новий випадок: об'єкт з src
              if (itemElement.tagName === "IMG") {
                itemElement.src = data[key][index].src;
                if (data[key][index].alt) {
                  itemElement.alt = data[key][index].alt;
                }
              }
            } else {
              // Існуючий випадок: просто значення
              itemElement.textContent = data[key][index];
            }
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