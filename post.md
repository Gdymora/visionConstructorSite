# home

/_document.getElementById(this.id) == this_/ let el = this;
// Ініціалізація мобільного меню
$("#mobileMenuToggle").mobileNav();
// Ініціалізація пагінації (припускаємо, що у нас 5 сторінок і ми на першій)
$("#pagination").pagination(5, 1);
// Ініціалізація каруселі футера
$("#footerCarousel").carouselBlog();
// Завантаження постів у контейнер
$('#postsContainer').postGenerator('http://127.0.0.1:8005/api/data-tables/view/2').then(({
data, $el }
                                                                                        ) => {
  console.log('Fetched data:', data);
  console.log('ModernLib element:', $el);
}
                                                                                       ).catch(error => {
  console.error('Error loading posts:', error);
}
                                                                                              );
// Завантаження даних про мене
$('#aboutMe').postGenerator('http://127.0.0.1:8005/api/data-tables/view/4',
(post) => `<span>${post.biography}
</span>`
).then(({
data, $el }
                                  ) => {
  console.log('Fetched data:', data);
  console.log('ModernLib element:', $el);
}
                                 ).catch(error => {
  console.error('Error loading about me data:', error);
}
                                        );
// Завантаження зображень Instagram
$("#instagram-2").postGenerator("http://127.0.0.1:8005/api/data-tables/view/3",
(post) => `<img src="${post.imageUrl}
" alt="${post.alt}
" class="hover:opacity-75"/>`
).catch(error => {
console.error('Error loading Instagram data:', error);
}
);
// Запит до API та обробка результатів
$().get('http://127.0.0.1:8005/api/data-tables/view/3').then(data => {
console.log('Received data:', data);
}
).catch(error => {
console.error('Error fetching data:', error);
}
);

# post

$("#aboutMe-2").postGenerator(
  "http://127.0.0.1:8005/api/data-tables/view/4",
  (post) => `<span>${post.biography}
</span>`);
$("#instagram").postGenerator(
  "http://127.0.0.1:8005/api/data-tables/view/3",
  (post) =>`<img src="${post.imageUrl}
" src="${post.alt}
" class="hover:opacity-75"/>`
);
$("#footerCarousel-2").carouselBlog({
  prevButtonSelector: "#prev-2",
  nextButtonSelector: "#next-2",
  slidesContainerSelector: ".flex",
  visibleSlides: 4,
  slideWidth: 25,
}
                                   );
async function loadPosts() {
  try {
    const queryParams = await $().getUrlComponent('queryParams');
    const url = 'http://127.0.0.1:8005/api/data-tables/view/2';
    // Замініть на ваш актуальний URL
    // Отримання даних
    const response = await $().get(url);
    const posts = response.data;
    // Використання параметра з запиту або значення за замовчуванням
    const postId = queryParams.id || 1;
    const postData = posts.find(item => item.id == postId);
    if (!postData) {
      console.error(`Post with ID ${postId}
not found.`);
      $("#postone").html('<p>Post not found.</p>');
      return;
    }
    // Формування HTML контенту
    const post = `

<article class="flex flex-col shadow my-4">
<a href="${postData.link}
" class="hover:opacity-75">
<img src="${postData.image}
" alt="${postData.title}
" />
</a>
<div class="bg-white flex flex-col justify-start p-6">
<a href="#" class="text-blue-700 text-sm font-bold uppercase pb-4">${postData.category}
</a>
<a href="${postData.link}
" class="text-3xl font-bold hover:text-gray-700 pb-4">${postData.title}
</a>
<p class="text-sm pb-3">
By <a href="#" class="font-semibold hover:text-gray-800">${postData.author}
</a>, Published on ${postData.date}
</p>
<p class="pb-3">${postData.text}
</p>
</div>
</article>`;
    // Виведення даних
    console.log('post', postData);
    $("#postone").html(post);
  }
  catch (error) {
    console.error('Error fetching post data:', error);
    $("#postone").html('<p>Error loading post data.</p>');
  }
}
loadPosts();

# admin

/_document.getElementById(this.id) == this_/ let el = this;
$("#adminPanelContainer").html('<p>Hello</p>');
// Спочатку налаштуємо глобальні параметри (опціонально)
// $.adminSettings.apiBaseUrl = "http://127.0.0.1:8005/api";
// $.adminSettings.defaultItemsPerPage = 15;
// Ініціалізація адмін-панелі
function createCustomUserManagement() {
return {
load: function (contentArea, projectId, userService, options = {
}
) {
const {
page = 1, itemsPerPage = 10, helpers }
= options;
contentArea.html(`

<h2 class="text-xl mb-4">Custom User Management</h2>
<p>This is a custom implementation of user management.</p>
<button id="loadUsersBtn" class="px-4 py-2 bg-blue-500 text-white rounded">Load Users</button>
<div id="userList"></div>
`);
      $("#loadUsersBtn").on("click", () => {
        userService
          .getAll(projectId)
          .then((response) => {
          const users = response.data;
          let userListHtml = "<ul>";
          users.forEach((user) => {
            userListHtml += `<li>${user.name}
(${user.email}
) - Custom View</li>`;
          }
                       );
          userListHtml += "</ul>";
          $("#userList").html(userListHtml);
        }
               )
          .catch((error) => {
          console.error("Error loading users:", error);
          $("#userList").html("<p>Error loading users</p>");
        }
                );
      }
                           );
    }
    ,
    create: function (userData) {
      console.log("Creating user with custom logic:", userData);
      // Тут може бути ваша кастомна логіка створення користувача
    }
    ,
    update: function (userId, userData) {
      console.log("Updating user with custom logic:", userId, userData);
      // Тут може бути ваша кастомна логіка оновлення користувача
    }
    ,
    delete: function (userId) {
      console.log("Deleting user with custom logic:", userId);
      // Тут може бути ваша кастомна логіка видалення користувача
    }
    ,
  };
}
function createCustomComponent() {
  return {
    load: function (contentArea, projectId, customService, options = {
    }
                   ) {
      const {
        page = 1, itemsPerPage = 10, helpers }
      = options;
      // Створення базової структури
      const componentHtml = `
<div class="custom-component">
<h2 class="text-xl mb-4">Custom Component</h2>
<div class="tab mt-20 block-center">
<div class="tab-panel" data-tabpanel>
<div class="tab-item tab-item--active">Data</div>
<div class="tab-item">Settings</div>
<div class="tab-item">Info</div>
</div>
<div class="tab-content tab-content--active" id="dataTab"></div>
<div class="tab-content" id="settingsTab">Settings content here</div>
<div class="tab-content" id="infoTab">Info content here</div>
</div>
<button id="openModalBtn" class="btn btn-primary mt-4">Open Modal</button>
</div>
`;
      contentArea.html(componentHtml);
      // Ініціалізація табів
      if (typeof $().tab === "function") {
        $("[data-tabpanel]").tab();
      }
      else {
        console.error("Tab initialization function is not available");
      }
      // Створення модального вікна
      const modalHtml = `
<div class="modal" id="customModal">
<div class="modal-dialog">
<div class="modal-content">
<button class="close" data-close>
<span>&times;</span>
</button>
<div class="modal-header">
<div class="modal-title">Custom Modal</div>
</div>
<div class="modal-body">
This is the content of the custom modal.
</div>
<div class="modal-footer">
<button class="btn btn-danger" data-close>Close</button>
<button class="btn btn-success" id="saveModalBtn">Save changes</button>
</div>
</div>
</div>
</div>
`;
      $("body").append(modalHtml);
      // Ініціалізація модального вікна
      if (typeof $().modal === "function") {
        const modal = $("#customModal").modal();
        $("#openModalBtn").on("click", () => modal.open());
        $("#saveModalBtn").on("click", () => {
          console.log("Save action");
          modal.close();
        }
                             );
      }
      else {
        console.error("Modal initialization function is not available");
      }
      // Завантаження даних з використанням customService
      customService
        .getAll(projectId, {
        page, itemsPerPage }
               )
        .then((data) => {
        const dataHtml = `
<h3 class="text-lg mb-2">Custom Data</h3>
<pre>${JSON.stringify(data, null, 2)}
</pre>
`;
        $("#dataTab").html(dataHtml);
      }
             )
        .catch((error) => {
        console.error("Error loading custom data:", error);
        $("#dataTab").html("<p>Error loading data</p>");
      }
              );
    }
    ,
  };
}
const customService = {
  baseUrl: "http://127.0.0.1:8005/api/v1",
  getAll: async function (projectId, options = {
  }
                         ) {
    const {
      page = 1, itemsPerPage = 15 }
    = options;
    try {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      const tokenKey = "project_user_token";
      // Замініть на реальний ключ або передайте його через параметр
      const token = localStorage.getItem(tokenKey);
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const response = await fetch(`${this.baseUrl}
/project-roles?page=${page}
&per_page=${itemsPerPage}
`, {
        headers: {
          Authorization: `Bearer ${token}
`,
          "X-Project-ID": projectId,
        }
        ,
      }
                                  );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}
`);
      }
      return await response.json();
    }
    catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  }
  ,
};
$("#adminPanelContainer").html("<p>Hello</p>");
// Спочатку налаштуємо глобальні параметри (опціонально)
// $.adminSettings.apiBaseUrl = "http://127.0.0.1:8005/api";
// $.adminSettings.defaultItemsPerPage = 15;
// Ініціалізація адмін-панелі
$("#adminPanelContainer").adminPanel({
  projectId: "4",
  apiBaseUrl: "http://127.0.0.1:8005/api/v1", // Це перевизначить глобальне налаштування, якщо потрібно
  itemsPerPage: 20, // Це перевизначить глобальне налаштування
  onMenuItemClick: function (menuItem) {
    console.log("Clicked menu item:", menuItem);
    $("#adminPanelContainer").trigger("menuItemClick", {
      menuItem: menuItem }
                                     );
    // Тут можна додати додаткову логіку при кліку на пункт меню
  }
  ,
  components: {
    // Стандартні компоненти
    // userManagement: userManagementComponent,
    //  roleManagement: roleManagementComponent,
    // ...
  }
  ,
  customComponents: {
    // Користувацькі компоненти
    customManagement: createCustomUserManagement(),
    customComponent: createCustomComponent(),
  }
  ,
  menuItems: [
    {
      id: "dashboard", label: "Dashboard" }
    ,
    {
      id: "users", label: "Users" }
    ,
    {
      id: "roles", label: "Roles" }
    ,
    {
      id: "permissions", label: "Permissions" }
    ,
    {
      id: "tables", label: "Tables" }
    ,
    {
      id: "posts", label: "Posts" }
    ,
    {
      id: "settings", label: "Settings" }
    ,
    {
      id: "customManagement", label: "Custom Management" }
    , // Новий пункт меню для користувацького компонента
    {
      id: "customComponent", label: "Custom Component" }
    , // Новий пункт меню для користувацького компонента
  ],
  additionalComponents: {
    tabs: $().tab, // Якщо ви хочете використовувати компонент вкладок
    modal: $().modal, // Якщо ви хочете використовувати модальні вікна
  }
  ,
  customServices: {
    customManagementService: customService,
    customComponentService: customService,
    // ... інші сервіси
  }
  ,
}
                                    );
$("#adminPanelContainer").on("usersLoaded", function () {
  console.log("Users section loaded");
  // Додаткова логіка після завантаження розділу користувачів
}
                            );
// Приклад кастомізації форми створення ролі
$("#adminPanelContainer").on("beforeShowRoleForm", function (event, formHtml) {
  // Модифікуємо HTML форми перед відображенням
  return formHtml + '<div class="mt-4"><label>Custom Field: <input type="text" id="customRoleField"></label></div>';
}
                            );
$("#adminPanelContainer").on("roleFormSubmit", function (event, roleData) {
  // Додаємо кастомне поле до даних ролі перед відправкою
  roleData.customField = $("#customRoleField").val();
  return roleData;
});
// Приклад додавання кастомної сторінки налаштувань
$("#adminPanelContainer").on("menuItemClick", function (event) {
  if (event.detail.menuItem === "settings") {
    const settingsHtml = `
<h2 class="text-xl mb-4">Settings</h2>
<form id="settingsForm">
<label class="block mb-2">
Site Name:
<input type="text" id="siteName" class="w-full p-2 border rounded">
</label>
<label class="block mb-2">
Footer Text:
<input type="text" id="footerText" class="w-full p-2 border rounded">
</label>
<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Settings</button>
</form>
`;
    $("#contentArea").html(settingsHtml);
    $("#settingsForm").on("submit", (e) => {
      e.preventDefault();
      const settings = {
        siteName: $("#siteName").val(),
        footerText: $("#footerText").val(),
      };
      console.log("Saving settings:", settings);
      const notification = $().notification({
        position: "top-right",
        duration: 3000,
      }
                                           );
      // Тут можна додати логіку збереження налаштувань
      notification.show("Settings saved successfully", "success");
    });
  }
});
