export const source = `
<!-- Testimonials Section -->
<section class="bg-gray-900 py-20 relative overflow-hidden">
<div class="container mx-auto px-4 relative z-10">
  <div class="flex items-center mb-12">
    <span class="text-green-500 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded border border-green-500">TESTIMONIALS</span>
    <h2 class="text-4xl font-bold text-white">Words From Our Lovely Clients</h2>
  </div>

  <div class="flex space-x-6 overflow-x-auto pb-6" id="testimonials-container">
    <!-- Testimonial 1 -->
    <div class="bg-gray-800 rounded-lg p-6 min-w-[300px] max-w-[400px] flex-shrink-0">
      <div class="text-green-500 text-4xl mb-4">"</div>
      <p class="text-white mb-4">I was skeptical at first, but now I can't imagine our content operations without it. It's that impactful.</p>
      <div class="flex items-center">
        <img src="/api/placeholder/40/40" alt="Jessica Saunders" class="rounded-full w-10 h-10 mr-3" />
        <div>
          <p class="text-white font-semibold">Jessica Saunders</p>
          <p class="text-gray-400 text-sm">Content Operations Manager</p>
        </div>
      </div>
    </div>

    <!-- Testimonial 2 -->
    <div class="bg-gray-800 rounded-lg p-6 min-w-[300px] max-w-[400px] flex-shrink-0">
      <div class="text-green-500 text-4xl mb-4">"</div>
      <p class="text-white mb-4">MetaFlow3D has revolutionized our 3D workflow. The efficiency gains are incredible.</p>
      <div class="flex items-center">
        <img src="/api/placeholder/40/40" alt="Michael Chen" class="rounded-full w-10 h-10 mr-3" />
        <div>
          <p class="text-white font-semibold">Michael Chen</p>
          <p class="text-gray-400 text-sm">Lead 3D Artist</p>
        </div>
      </div>
    </div>

    <!-- Testimonial 3 -->
    <div class="bg-gray-800 rounded-lg p-6 min-w-[300px] max-w-[400px] flex-shrink-0">
      <div class="text-green-500 text-4xl mb-4">"</div>
      <p class="text-white mb-4">The integration with our existing tools was seamless. It's become an essential part of our pipeline.</p>
      <div class="flex items-center">
        <img src="/api/placeholder/40/40" alt="Sarah Johnson" class="rounded-full w-10 h-10 mr-3" />
        <div>
          <p class="text-white font-semibold">Sarah Johnson</p>
          <p class="text-gray-400 text-sm">Technical Director</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation buttons -->
  <div class="flex justify-center mt-6 space-x-4">
    <button id="prevBtn" class="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none">&#10094; Prev</button>
    <button id="nextBtn" class="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none">Next &#10095;</button>
  </div>
</div>
</section>
`;
