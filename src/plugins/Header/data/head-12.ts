export const source = `
<div class="bg-gray-900 text-white">
  <style>
    .grid-background {
      background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
      pointer-events: none;
    }
  </style> 
  
  <header class="relative z-10 px-6 py-4 flex justify-between items-center">
    <div class="flex items-center">
      <div class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 mr-3"></div>
      <span class="text-2xl font-bold" data-header-logo>MetaFlow3D</span>
    </div>
    <nav class="flex gap-6 items-center" data-header-menu>
      <a href="#" class="text-gray-400 hover:text-white" data-header-menu-item>Всі шаблони</a>
      <a href="#" class="text-gray-400 hover:text-white" data-header-menu-item>Ціни</a>
      <a href="#" class="text-gray-400 hover:text-white" data-header-menu-item>Зв'язатися з нами</a>
      <a href="#" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Спробувати зараз</a>
    </nav>
  </header>
  
  <section class="relative z-10 text-center py-20 px-4">
    <h1 class="text-5xl font-bold mb-6" data-header-title>
      MetaFlow3D: Інтелектуальні 3D<br />
      рішення для <span class="text-purple-400">архітектурних проектів</span>
    </h1>
    <p class="text-xl text-gray-400 mb-8" data-header-subtitle>ШІ-керований 3D-рендеринг та управління робочим процесом для креативних професіоналів</p>
    <a href="#" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700">Почніть свою 3D-революцію</a>
  </section>
</div>

`;
/* 
const navbarData = {
    headerLogo: {
        text: "Brand McBrandface",
        icon: "em em-grinning"
    },
    navToggle: {
        id: "nav-toggle",
        ariaLabel: "Toggle navigation"
    },
    navContent: {
        id: "nav-content"
    },
    navMenu: [
        { text: "Active", link: "#", class: "text-white", dataAttribute: "active" },
        { text: "link", link: "#", class: "text-grey-dark", dataAttribute: "link1" },
        { text: "link", link: "#", class: "text-grey-dark", dataAttribute: "link2" },
        { text: "link", link: "#", class: "text-grey-dark", dataAttribute: "link3" }
    ]
};

// Function to toggle navigation menu
function toggleNavigation() {
    const navContent = document.getElementById(navbarData.navContent.id);
    navContent.classList.toggle("hidden");
}
*/