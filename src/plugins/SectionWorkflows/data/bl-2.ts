export const source = `
<!-- Workflows Section -->
<section class="bg-gray-900 py-16 relative overflow-hidden">
<style>
  .grid-background {
    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }
</style>
<!-- Фоновий градієнт -->
<div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-50"></div>

<!-- Сітка -->
<div class="absolute inset-0 grid-background opacity-10"></div>

<div class="container mx-auto px-4 relative z-10">
  <div class="flex items-center mb-8">
    <span class="text-blue-500 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded border border-blue-500">CATALOGUE</span>
    <h2 class="text-4xl font-bold text-white">Our <span class="text-blue-500">Workflows</span></h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Workflow 1 -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <img src="/api/placeholder/400/300" alt="Transfer your photo" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-white font-semibold mb-2">Transfer your photo</h3>
        <p class="text-gray-400 text-sm mb-4">This workflow allows you to create 3D models from basic shapes.</p>
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Generate Images</button>
          <button class="bg-gray-700 text-white px-3 py-1 rounded text-sm">New & Popular</button>
        </div>
      </div>
    </div>

    <!-- Workflow 2 -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <img src="/api/placeholder/400/300" alt="Workflow New" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-white font-semibold mb-2">Workflow New</h3>
        <p class="text-gray-400 text-sm mb-4">This workflow allows you to create 3D models from basic shapes.</p>
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Generate Images</button>
          <button class="bg-gray-700 text-white px-3 py-1 rounded text-sm">New & Popular</button>
        </div>
      </div>
    </div>

    <!-- Workflow 3 -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <img src="/api/placeholder/400/300" alt="Workflow New" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-white font-semibold mb-2">Workflow New</h3>
        <p class="text-gray-400 text-sm mb-4">This workflow allows you to create 3D models from basic shapes.</p>
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Generate Images</button>
          <button class="bg-gray-700 text-white px-3 py-1 rounded text-sm">New & Popular</button>
        </div>
      </div>
    </div>

    <!-- Workflow 4 -->
    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <img src="/api/placeholder/400/300" alt="Workflow New" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-white font-semibold mb-2">Workflow New</h3>
        <p class="text-gray-400 text-sm mb-4">This workflow allows you to create 3D models from basic shapes.</p>
        <div class="flex space-x-2">
          <button class="bg-blue-600 text-white px-3 py-1 rounded text-sm">Generate Images</button>
          <button class="bg-gray-700 text-white px-3 py-1 rounded text-sm">New & Popular</button>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
`;
