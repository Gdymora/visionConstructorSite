export const source = `
<!-- Section Card -->
<section class="bg-gray-900 py-16 relative overflow-hidden">
  <!-- Background Gradient -->
  <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-50"></div>

  <!-- Grid Background -->
  <div class="absolute inset-0 grid-background opacity-10"></div>

  <div class="container mx-auto px-4 relative z-10">
    <h2 class="text-3xl font-bold text-center text-white mb-12">Main Features</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <article class="bg-gray-800 rounded-lg p-6 border border-blue-500 shadow-lg transform hover:scale-105 transition duration-300">
        <h3 class="text-xl font-semibold text-white mb-3">Seamless Integration with Blender</h3>
        <p class="text-gray-300 mb-4">Import your 3D assets directly from Blender into our platform.</p>
        <div class="flex justify-end">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      </article>

      <!-- Card 2 -->
      <article class="bg-gray-800 rounded-lg p-6 border border-blue-500 shadow-lg transform hover:scale-105 transition duration-300">
        <h3 class="text-xl font-semibold text-white mb-3">Customizable Workflows</h3>
        <p class="text-gray-300 mb-4">Adapt workflows to your project’s needs with fully customizable nodes.</p>
        <div class="flex justify-end">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
      </article>

      <!-- Card 3 -->
      <article class="bg-gray-800 rounded-lg p-6 border border-blue-500 shadow-lg transform hover:scale-105 transition duration-300">
        <h3 class="text-xl font-semibold text-white mb-3">Efficient Project Management</h3>
        <p class="text-gray-300 mb-4">Easily manage your 3D projects with our intuitive interface for collaboration and progress tracking.</p>
        <div class="flex justify-end">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            ></path>
          </svg>
        </div>
      </article>
    </div>
  </div>
</section>
`;
