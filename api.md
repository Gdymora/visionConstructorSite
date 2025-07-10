# отримати дані проекту за його id

```JavaScript
//promise
$().get('http://127.0.0.1:8005/api/project-data-json/view/15?page=1&per_page=100')
  .then(jsonData => {
     console.log(jsonData);
    const data = processData(jsonData.data);
    console.log("data", data);
    console.log('Received data:', data)
    updateHeaderData(data.header);
  })
  .catch(error => console.error('Error:', error));
```

```JavaScript
//await
(async function() {
  try {
    const jsonData = await $().get('http://127.0.0.1:8005/api/project-data-json/view/15?page=1&per_page=100', 'json');
    console.log(jsonData);
  }
  catch (error) {
    console.error('Error:', error);
  }
}
)();

```

# отримати дані проекту за його id

```JavaScript
$().get('http://127.0.0.1:8005/api/project-data-all/view/15')
  .then(data => console.log('Received data:', data))
  .catch(error => console.error('Error:', error));
```

# отримати grapes json представлення проекту за його id

```JavaScript
$().get('http://127.0.0.1:8005/api/projects/view/15')
  .then(data => console.log('Received data:', data))
  .catch(error => console.error('Error:', error));
```

# отримати темплете за його id

```JavaScript
$().get('http://127.0.0.1:8005/api/templates/view/{id}')
  .then(data => console.log('Received data:', data))
  .catch(error => console.error('Error:', error));
```

# отримати дані за id

```JavaScript
$().get('http://127.0.0.1:8005/api/data-tables/view/{id}')
  .then(data => console.log('Received data:', data))
  .catch(error => console.error('Error:', error));
```

# отримати сторінку за id

```JavaScript
$().get('http://127.0.0.1:8005/api/pages/view/{id}')
  .then(data => console.log('Received data:', data))
  .catch(error => console.error('Error:', error));
```

## Дані вставити по атрибуту

```JavaScript
/*document.getElementById(this.id) == this*/ let el = this;
(async function() {
  try {
    const jsonData = await $().get('http://127.0.0.1:8005/api/project-data-json/view/15', 'json');
    console.log(jsonData);
    const headerData = jsonData.data.header.data[0];
    // Оновлюємо логотип
    $('[data-header-logo]').each(function(element) {
      element.textContent = headerData.logo;
      // Змінюємо текст на новий
    }
                                );
    // Оновлюємо меню
    $('[data-header-menu]').each(function(menuElement) {
      menuElement.innerHTML = '';
      // Очищуємо поточний вміст
      headerData.menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = "hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5";
        li.innerHTML = `<a href="#">${item}
</a>`;
        menuElement.appendChild(li);
      }
                                  );
    }
                                );
    // Оновлюємо заголовок та підзаголовок
    $('[data-header-title]').each(function(titleElement) {
      titleElement.textContent = headerData.title;
    }
                                 );
    $('[data-header-subtitle]').each(function(subtitleElement) {
      subtitleElement.textContent = headerData.subtitle;
    }
                                    );
  }
  catch (error) {
    console.error('Error:', error);
  }
}
)();
```

```JavaScript
 const headerData = {
    logo: "MetaFlow3D",
    menuItems: ["AI Templates", "Pricing", "Documentation"],
    title: "Welcome to MetaFlow3D",
    subtitle: "Innovative AI Solutions"
};

// Оновлюємо логотип
$('[data-header-logo]').each(function(element) {
    element.textContent = headerData.logo; // Змінюємо текст на новий
});

// Оновлюємо меню
$('[data-header-menu]').each(function(menuElement) {
    menuElement.innerHTML = ''; // Очищуємо поточний вміст
    headerData.menuItems.forEach(item => {
        const li = document.createElement('li');
        li.className = "hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5";
        li.innerHTML = `<a href="#">${item}</a>`;
        menuElement.appendChild(li);
    });
});

// Оновлюємо заголовок та підзаголовок
$('[data-header-title]').each(function(titleElement) {
    titleElement.textContent = headerData.title;
});

$('[data-header-subtitle]').each(function(subtitleElement) {
    subtitleElement.textContent = headerData.subtitle;
});

```

## Заповнення по ключам обєкта

### За допомогою DomModern

```JavaScript
const headerData = {
  logo: "MetaFlow3D",
  menuItems: ["AI Templates", "Pricing", "Documentation"],
  title: "Welcome to MetaFlow3D",
  subtitle: "Innovative AI Solutions",
  image: "https://images.pexels.com/photos/5435454/pexels-photo-5435454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"  //data-header-image=""
};

// Оновлюємо елементи на основі ключів об'єкта headerData
function updateHeaderData(data) {
  // Пройдемося по ключах об'єкта
  Object.keys(data).forEach(function(key) {
    // Знаходимо елементи з відповідним атрибутом data-header-*
    $(`[data-header-${key}]`).each(function(element) {
      // Якщо значення — масив (наприклад, menuItems)
      if (Array.isArray(data[key])) {
        element.innerHTML = ''; // Очищуємо поточний вміст
        data[key].forEach(item => {
          const li = document.createElement('li');
          li.className = "hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5";
          li.innerHTML = `<a href="#">${item}</a>`;
          element.appendChild(li);
        });
      } else if (element.tagName === 'IMG' && key === 'imageUrl') {
        // Якщо це зображення, змінюємо src
        element.src = data[key];
      } else {
        // Якщо це просте значення (наприклад, текст)
        element.textContent = data[key];
      }
    });
  });
}
//*****************
function updateHeaderData(data) {
  Object.keys(data).forEach(function(key) {
    $(`[data-header-${key}
]`).each(function(element) {
      if (Array.isArray(data[key])) {
        console.log(element)
        const itemElements = element.querySelectorAll(`[data-header-${key}-item]`);
        itemElements.forEach((itemElement, index) => {
          if (data[key][index]) {
            itemElement.textContent = data[key][index];
          }});
      }
      else if (element.tagName === 'IMG' && key === 'imageUrl') {
        element.src = data[key];
      }
      else {
        element.textContent = data[key];
      }});
  });
}


// Викликаємо функцію для оновлення елементів
updateHeaderData(headerData);
```

## Заповнення по ключам обєкта

### За допомогою JavaScript

```JavaScript
const headerData = {
  logo: "MetaFlow3D",
  menuItems: ["AI Templates", "Pricing", "Documentation"],
  title: "Welcome to MetaFlow3D",
  subtitle: "Innovative AI Solutions"
};

// Функція для оновлення елементів на основі атрибутів data-header-*
function updateHeaderData(data) {
  // Пройдемося по ключах об'єкта
  Object.keys(data).forEach(key => {
    // Для кожного ключа знайдемо відповідні елементи з атрибутами data-header-*
    document.querySelectorAll(`[data-header-${key}]`).forEach(element => {
      // Якщо ключ — це масив (наприклад, menuItems)
      if (Array.isArray(data[key])) {
        element.innerHTML = ''; // Очищуємо поточний вміст
        data[key].forEach(item => {
          const li = document.createElement('li');
          li.className = "hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5";
          li.innerHTML = `<a href="#">${item}</a>`;
          element.appendChild(li);
        });
      } else {
        // Якщо це просте значення (наприклад, текст)
        element.textContent = data[key];
      }
    });
  });
}

// Викликаємо функцію для оновлення заголовка
updateHeaderData(headerData);

```

```JavaScript
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


```

```JavaScript
function processData2(inputData) {
  const result = {
  };
  function parseValue(value) {
    if (typeof value === 'string') {
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          return JSON.parse(value);
        }
        catch (e) {
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
    }
    else {
      // Випадок: [[{ ... }], [{ ... }], ...]
      return dataArray.map(item => item[0]);
    }
  }
  for (const key in inputData) {
    if (inputData[key] && typeof inputData[key] === 'object' && inputData[key].data) {
      const processedData = processDataArray(inputData[key].data);
      if (Array.isArray(processedData)) {
        // Якщо це масив (як у випадку з showcaseImages)
        result[key] = processedData.map(item => item.image_src || item);
      }
      else {
        // Якщо це об'єкт (як у випадку з header або hero)
        result[key] = {
        };
        for (const subKey in processedData) {
          result[key][subKey] = parseValue(processedData[subKey]);
        }
      }
    }
  }
  return result;
}
function processData1(inputData) {
  const result = {
  };
  function parseValue(value) {
    if (typeof value === 'string') {
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          return JSON.parse(value);
        }
        catch (e) {
          return value;
        }
      }
    }
    return value;
  }
  for (const key in inputData) {
    if (inputData[key] && typeof inputData[key] === 'object') {
      if (Array.isArray(inputData[key].data) && inputData[key].data.length > 0) {
        if (key === 'showcaseImages') {
          result[key] = inputData[key].data.map(item => item[0].image_src);
        }
        else {
          const firstItem = inputData[key].data[0][0];
          result[key] = {
          };
          for (const subKey in firstItem) {
            result[key][subKey] = parseValue(firstItem[subKey]);
          }
        }
      }
    }
  }
  return result;
}
```

