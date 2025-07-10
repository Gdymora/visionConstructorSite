export const source = ` 
<section class="py-20" data-section="features-interactive-demo">
<div class="container mx-auto px-4">
  <h2 class="text-3xl font-bold text-center mb-12">Спробуйте MetaFlow3D в дії</h2>
  <div class="bg-gray-200 p-6 rounded-lg shadow-lg">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="model-select">
        Виберіть 3D модель:
      </label>
      <select id="model-select" class="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option>Куб</option>
        <option>Сфера</option>
        <option>Піраміда</option>
      </select>
    </div>
    <div id="3d-viewport" class="w-full h-64 bg-white rounded"></div>
    <div class="mt-4 flex justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Обертати
      </button>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Змінити колір
      </button>
    </div>
  </div>
</div>
</section>
`;
