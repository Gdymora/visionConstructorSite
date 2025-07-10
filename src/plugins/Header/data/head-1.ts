export const source = `
<style>@media (max-width: 1024px) {
   [data-header-menuitems="menuitems"] {
       display: none;
   }
}</style>
<header data-header="header" class="header-block bg-slate-900"> 
  <div class="flex justify-center" data-element="header-container">
    <nav class="self-center w-full max-w-7xl nav-block" data-element="navigation">
      <div class="flex flex-col lg:flex-row justify-around items-center">
        <!-- Logo -->
        <div data-element="logo" class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 mr-3"></div>
          <h1 class="uppercase pl-5 py-4 text-lg font-sans font-bold text-white" data-header-logo="logo">
            hero
          </h1>
        </div>

        <!-- Desktop Menu -->
<ul class="lg:flex items-center text-[18px] font-semibold pl-32" data-header-menuitems="menuitems">
    <li data-header-menuitems-item="item" class="hover:text-blue-400 py-2 px-5 text-white">
        <a href="#">Home</a>
    </li>
    <li data-header-menuitems-item="item" class="hover:text-blue-400 py-2 px-5 text-white">
        <a href="#">Contact</a>
    </li>
    <li data-header-menuitems-item="item" class="dropdown relative">
        <button id="servicesBtn" class="hover:text-blue-400 py-2 px-5 text-white">
            Services
        </button>
        <div id="servicesMenu" style="display: none;" class="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Service 1</a>
            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Service 2</a>
        </div>
    </li>
    <li data-header-menuitems-item="item" class="hover:text-blue-400 py-2 px-5 text-white">
        <a href="#">About</a>
    </li>
    <li data-header-menuitems-item="item" class="hover:text-blue-400 py-2 px-5 text-white">
        <a href="#">Pricing</a>
    </li>
</ul>

        <!-- CTA Button -->
        <a href="#" data-header-cta="cta" class="button-gradient bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Try Now
        </a>

        <!-- Social Icons -->
        <div class="text-center text-base pr-5 inline-flex text-white" data-element="social-icons">
          <a href="#" class="w-8 h-8 inline-block rounded-full pt-[6px] hover:text-blue-500">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500">
            <i class="fa fa-instagram"></i>
          </a>
          <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500">
            <i class="fa fa-google"></i>
          </a>
          <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500">
            <i class="fa fa-linkedin"></i>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-white p-2" id="mobileMenuBtn" aria-label="Menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobileMenu" style="display: none">
        <div class="px-2 pt-2 pb-3 space-y-1 text-white">
          <a href="#" class="block px-3 py-2 hover:text-blue-400">Home</a>
          <a href="#" class="block px-3 py-2 hover:text-blue-400">Contact</a>
          <div class="mobile-dropdown">
            <button id="mobilesServicesBtn" class="w-full text-left px-3 py-2 hover:text-blue-400">
              Services
            </button>
            <div id="mobileServicesMenu" class="pl-6" style="display: none">
              <a href="#" class="block py-2 hover:text-blue-400">Service 1</a>
              <a href="#" class="block py-2 hover:text-blue-400">Service 2</a>
            </div>
          </div>
          <a href="#" class="block px-3 py-2 hover:text-blue-400">About</a>
          <a href="#" data-header-cta="cta-mobile" class="block px-3 py-2 bg-blue-600 rounded hover:bg-blue-700">Try Now</a>
        </div>
      </div>
    </nav>
  </div>

  <!-- Hero Section -->
  <div class="header-block flex justify-center py-10" data-element="hero-section">
    <div class="flex flex-col justify-center">
      <div class="flex flex-col max-w-7xl justify-center items-center p-2 mt-10">
        <div class="flex flex-col w-[90%] md:w-3/4 text-center items-center justify-center space-y-3">
          <div class="text-5xl font-bold text-white" data-header-title="main-title">
            Clean Green Crypto Energy for Crypto Mining
          </div>
          <div class="text-xl font-semibold text-gray-400" data-header-subtitle="main-subtitle">
            Help save the planet with KWATT tokenized electricity
          </div>
          <div class="md:text-lg" data-element="subscribe-form">
            <input
              class="bg-gray-200/70 border drop-shadow-sm shadow-gray-700 rounded-2xl placeholder-slate-400 px-4 py-1 focus:outline-none"
              type="email"
              placeholder="E-mail Address"
              data-element="email-input"
            />
            <button
              class="p-1 m-2 rounded-2xl text-white bg-blue-500 px-4 font-semibold hover:bg-blue-900 hover:transform ease-in-out duration-300"
              data-element="subscribe-button"
            >
              Subscribe
            </button>
          </div>
        </div>
        <div class="w-3/4 h-60 md:h-96 my-4 rounded-lg overflow-hidden" data-header-image-container="container">
          <img
            data-header-image="image"
            src="https://source.unsplash.com/500x400/?cryptocurrency,electricity"
            class="h-full w-full"
            alt="Cryptocurrency and electricity illustration"
          />
        </div>
      </div>
    </div>
  </div>

  <script>
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.style.display === 'none';
        mobileMenu.style.display = isHidden ? 'block' : 'none';
    });

    // Desktop dropdown
    const servicesBtn = document.getElementById('servicesBtn');
    const servicesMenu = document.getElementById('servicesMenu');

    servicesBtn.addEventListener('click', () => {
        const isHidden = servicesMenu.style.display === 'none';
        servicesMenu.style.display = isHidden ? 'block' : 'none';
    });

    // Mobile dropdown
    const mobileServicesBtn = document.getElementById('mobilesServicesBtn');
    const mobileServicesMenu = document.getElementById('mobileServicesMenu');

    mobileServicesBtn.addEventListener('click', () => {
        const isHidden = mobileServicesMenu.style.display === 'none';
        mobileServicesMenu.style.display = isHidden ? 'block' : 'none';
    });
  </script>
</header>
`;
/* const cryptoLandingData = {
    headerLogo: "hero",
    menuItems: [
        { name: "Home", link: "#" },
        { name: "Contact", link: "#" },
        { name: "Services", link: "#" },
        { name: "About", link: "#" },
        { name: "Pricing", link: "#" }
    ],
    socialMedia: [
        { name: "twitter", icon: "fa-twitter", link: "#" },
        { name: "instagram", icon: "fa-instagram", link: "#" },
        { name: "facebook", icon: "fa-facebook", link: "#" },
        { name: "google", icon: "fa-google", link: "#" },
        { name: "linkedin", icon: "fa-linkedin", link: "#" }
    ],
    headerContent: {
        title: {
            text: "Clean Green Crypto Energy for Crypto Mining",
            dataAttribute: "main-title"
        },
        subtitle: {
            text: "Help save the planet with KWATT tokenized electricity",
            dataAttribute: "main-subtitle"
        }
    },
    subscribeForm: {
        placeholder: "E-mail Address",
        buttonText: "Subscribe"
    },
    mainImage: {
        src: "https://source.unsplash.com/500x400/?cryptocurrency,electricity",
        alt: "Cryptocurrency and electricity illustration"
    }
}; 
//js
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

*/
