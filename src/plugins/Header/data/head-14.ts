export const source = `
<style>
      button.active svg line:first-child {
        transform: translateY(6px) rotate(45deg);
      }

      button.active svg line:nth-child(2) {
        opacity: 0;
      }

      button.active svg line:last-child {
        transform: translateY(-6px) rotate(-45deg);
      }

      svg line {
        transition: all 0.3s ease;
      }
    </style>
 <header data-header="header" class="bg-gray-950 text-white relative z-10">
      <div
        id="ie34"
        class="relative z-10 px-6 py-4 flex justify-between items-center"
      >
        <div data-element="logo" class="flex items-center">
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 mr-3"
          ></div>
          <span data-header-logoText="logoText" class="text-2xl font-bold"
            >MetaFlow3D...</span
          >
        </div>
        <nav
          id="ifhyw"
          class="flex flex-col md:flex-row gap-6 items-center relative"
        >
        <button 
        class="md:hidden absolute right-4 top-4 z-50"
        onclick="this.classList.toggle('active'); this.nextElementSibling.classList.toggle('max-md:hidden')"
      >
            <svg
              class="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                class="stroke-current stroke-2 transition-transform origin-center"
              />
              <line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                class="stroke-current stroke-2 transition-transform origin-center"
              />
              <line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                class="stroke-current stroke-2 transition-transform origin-center"
              />
            </svg>
          </button>

          <div
            data-header-menuitems="menuitems"
            class="flex flex-col md:flex-row md:gap-6 absolute right-0 top-16 bg-gray-900 p-4 rounded-lg md:static md:bg-transparent md:p-0 max-md:hidden"
          >
            <a
              href="#"
              data-header-menuitems-item="item"
              class="block text-gray-400 hover:text-white"
              >Про нас</a
            >
          </div>

          <a
            href="#"
            data-header-cta="cta"
            class="button-gradient bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >Спробувати зараз</a
          >
        </nav>
      </div>
    </header>
`;
