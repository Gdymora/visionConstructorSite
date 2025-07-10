Документація для бібліотеки myLibrary.js
Опис
Бібліотека myLibrary.js надає набір функцій для взаємодії з DOM елементами та виконання CRUD операцій (створення, читання, оновлення, видалення) через API. Ця бібліотека може бути використана як самостійно, так і у складі React додатків для інтеграції з різноманітними компонентами.

Встановлення
Скопіюйте файл myLibrary.js до вашого проекту.
Імпортуйте методи бібліотеки у ваш React компонент:
javascript
Копіювати код
import { registerGlobalMethods } from "./myLibrary";
Використовуйте метод registerGlobalMethods у вашому компоненті для реєстрації методів у глобальному контексті:
javascript
Копіювати код
useEffect(() => {
  registerGlobalMethods();
}, []);
Методи
changeColor
Змінює колір тексту вказаного елемента.

Параметри:

elementId (string): ID елемента.
color (string): Новий колір.
Приклад:

javascript
Копіювати код
window.changeColor('myElement', 'red');
changeText
Змінює текст вказаного елемента.

Параметри:

elementId (string): ID елемента.
newText (string): Новий текст.
Приклад:

javascript
Копіювати код
window.changeText('myElement', 'Hello, World!');
addClickListener
Додає обробник подій для натискання на вказаний елемент.

Параметри:

elementId (string): ID елемента.
callback (function): Функція-обробник подій.
Приклад:

javascript
Копіювати код
window.addClickListener('myButton', () => {
  console.log('Button clicked!');
});
fetchData
Виконує GET запит до вказаного URL.

Параметри:

url (string): URL для запиту.
Приклад:

javascript
Копіювати код
const data = await window.fetchData('https://jsonplaceholder.typicode.com/todos/1');
console.log(data);
createData
Виконує POST запит до вказаного endpoint для створення нових даних.

Параметри:

endpoint (string): Endpoint для запиту.
data (object): Дані для створення.
Приклад:

javascript
Копіювати код
const newData = await window.createData('posts', { title: 'foo', body: 'bar', userId: 1 });
console.log(newData);
readData
Виконує GET запит до вказаного endpoint для читання даних.

Параметри:

endpoint (string): Endpoint для запиту.
Приклад:

javascript
Копіювати код
const data = await window.readData('posts/1');
console.log(data);
updateData
Виконує PUT запит до вказаного endpoint для оновлення даних.

Параметри:

endpoint (string): Endpoint для запиту.
data (object): Дані для оновлення.
Приклад:

javascript
Копіювати код
const updatedData = await window.updateData('posts/1', { id: 1, title: 'foo', body: 'bar', userId: 1 });
console.log(updatedData);
deleteData
Виконує DELETE запит до вказаного endpoint для видалення даних.

Параметри:

endpoint (string): Endpoint для запиту.
Приклад:

javascript
Копіювати код
const result = await window.deleteData('posts/1');
console.log(result);
Приклад використання у React компоненті
jsx
Копіювати код
import React, { useEffect } from 'react';
import { registerGlobalMethods } from './myLibrary';

const App = () => {
  useEffect(() => {
    registerGlobalMethods();
  }, []);

  return (
    <div>
      <button id="myButton">Click me</button>
      <div id="demo">Demo Text</div>
    </div>
  );
};

export default App;



const json = {
    html: `
      <button id="myButton">Click me</button>
      <div id="demo">Demo Text</div>
      <p id="test">Test Paragraph</p>
      <div id="react-state"></div>
    `,
    script: `
      (function() {
        changeColor("test", "blue");
        changeText("demo", "Initial Text from Script");

        addClickListener("myButton", async function() {
          changeText("demo", "New Text from Click");
          changeColor("demo", "red");

          try {
            const data = await fetchData("https://jsonplaceholder.typicode.com/todos/1");
            updateDemoText(JSON.stringify(data));
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        });

        // Збереження функції для доступу з зовнішнього скрипта
        window.updateDemoText = (newText) => {
          document.getElementById("react-state").innerText = newText;
        };
      })();
    `
  };

  <div>1
  </div>
  <div class="active">2
  </div>
  <div>3
  </div>
$('.active').hide();

