export const source = ` 
<section class="py-20" data-section="pricing-custom">
<div class="container mx-auto px-4">
  <h2 class="text-3xl font-bold text-center mb-12">Створіть свій власний план</h2>
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <div class="mb-6">
      <label class="block text-gray-700 font-bold mb-2" for="users">Кількість користувачів</label>
      <input type="range" id="users" min="1" max="100" value="1" class="w-full">
      <p class="text-right"><span id="user-count">1</span> користувачів</p>
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 font-bold mb-2">Виберіть функції</label>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" name="features" value="3d-modeling">
          <span class="ml-2">3D моделювання</span>
        </label>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" name="features" value="rendering">
          <span class="ml-2">Рендеринг</span>
        </label>
      </div>
      <!-- Додайте більше опцій функцій -->
    </div>
    <div class="text-center">
      <p class="text-2xl font-bold mb-4">Ваша ціна: $<span id="total-price">0</span>/міс</p>
      <button class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">Отримати пропозицію</button>
    </div>
  </div>
</div>
</section>
`;
