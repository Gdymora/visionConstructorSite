export const source = `
<section class="bg-gradient-to-r from-cyan-500 to-blue-500 py-20 relative overflow-hidden">
<div class="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full blur-3xl opacity-20"></div>
<div class="absolute bottom-0 left-0 w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20"></div>
<div class="container mx-auto px-4 relative z-10">
  <h2 class="text-4xl font-bold mb-12 text-center text-white">Choose Your Plan</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h3 class="text-2xl font-semibold mb-4">Basic</h3>
      <p class="text-4xl font-bold mb-6">$29<span class="text-sm font-normal">/month</span></p>
      <ul class="mb-6">
        <li class="mb-2">Feature 1</li>
        <li class="mb-2">Feature 2</li>
        <li class="mb-2">Feature 3</li>
      </ul>
      <button class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Choose Plan</button>
    </div>
    <!-- Repeat for other pricing tiers -->
  </div>
</div>
</section>
`;
