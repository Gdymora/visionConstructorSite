export const source = `
<!-- Contact Section -->
<section class="bg-gray-900 py-20 relative overflow-hidden">
<!-- Фоновий градієнт -->
<div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-50"></div>

<!-- Сітка -->
<div class="absolute inset-0 grid-background opacity-10"></div>

<div class="container mx-auto px-4 relative z-10">
  <div class="flex flex-wrap -mx-4">
    <!-- Ліва колонка -->
    <div class="w-full md:w-1/2 px-4 mb-8 md:mb-0">
      <span class="text-blue-500 text-sm font-semibold mb-2 inline-block">CONTACT</span>
      <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
        Ready to<br />
        Supercharge Your<br />
        Success?
      </h2>
      <div class="flex space-x-4 mt-6">
        <a href="#" class="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300"> Discord </a>
        <a href="#" class="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300"> Twitter </a>
      </div>
    </div>

    <!-- Права колонка (форма) -->
    <div class="w-full md:w-1/2 px-4">
      <form class="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <textarea
            placeholder="You can write message here"
            rows="4"
            class="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Try It Now
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</section>
`;
