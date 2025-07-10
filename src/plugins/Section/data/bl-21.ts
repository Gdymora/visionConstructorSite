export const source = ` 
<section class="py-20 bg-gray-100" data-section="pricing-toggle">
<div class="container mx-auto px-4">
  <h2 class="text-3xl font-bold text-center mb-12">Гнучкі плани для вашого бізнесу</h2>
  <div class="flex justify-center mb-8">
    <span class="mr-3">Щомісячно</span>
    <label class="switch">
      <input type="checkbox" id="pricing-toggle">
      <span class="slider round"></span>
    </label>
    <span class="ml-3">Щорічно</span>
  </div>
  <div class="flex flex-wrap justify-center" id="pricing-plans">
    <!-- Плани будуть додані за допомогою JavaScript на основі вибору користувача -->
  </div>
</div>
</section>
`;
