export const source = `
<!-- Section industries-->
<section class="bg-gray-900 py-20 relative overflow-hidden">
  <div class="container mx-auto px-4 relative z-10">
    <h2 class="text-2xl md:text-3xl text-white mb-8">Perfect for businesses in diverse industries seeking efficiency...</h2>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <button class="industry-btn p-4 text-left bg-blue-600 text-white" data-industry="automotive">Automotive Industry</button>
      <button class="industry-btn p-4 text-left bg-gray-800 text-gray-300 hover:bg-gray-700" data-industry="interior">Interior Design</button>
      <button class="industry-btn p-4 text-left bg-gray-800 text-gray-300 hover:bg-gray-700" data-industry="product">Product Design</button>
      <button class="industry-btn p-4 text-left bg-gray-800 text-gray-300 hover:bg-gray-700" data-industry="fashion">Fashion & Apparel</button>
      <button class="industry-btn p-4 text-left bg-gray-800 text-gray-300 hover:bg-gray-700" data-industry="furniture">Furniture Design</button>
      <button class="industry-btn p-4 text-left bg-gray-800 text-gray-300 hover:bg-gray-700" data-industry="advertising">
        Advertising & Digital Marketing
      </button>
    </div>

    <div class="rounded-lg overflow-hidden shadow-2xl mb-8">
      <img id="mainImage" src="/api/placeholder/800/400?text=Automotive" alt="Industry Example" class="w-full h-64 md:h-96 object-cover" />
    </div>

    <div class="relative">
      <div id="carousel" class="flex space-x-4 overflow-x-auto pb-4">
        <img src="/api/placeholder/200/150?text=Auto+1" alt="Automotive 1" class="w-40 h-28 object-cover rounded-lg" />
        <img src="/api/placeholder/200/150?text=Auto+2" alt="Automotive 2" class="w-40 h-28 object-cover rounded-lg" />
        <img src="/api/placeholder/200/150?text=Auto+3" alt="Automotive 3" class="w-40 h-28 object-cover rounded-lg" />
        <img src="/api/placeholder/200/150?text=Auto+4" alt="Automotive 4" class="w-40 h-28 object-cover rounded-lg" />
        <img src="/api/placeholder/200/150?text=Auto+5" alt="Automotive 5" class="w-40 h-28 object-cover rounded-lg" />
      </div>
      <button id="prevBtn" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r">&#10094;</button>
      <button id="nextBtn" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l">&#10095;</button>
    </div>
  </div>
</section>
`;
