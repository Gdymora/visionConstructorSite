export const source = `
<!-- Tools Section -->
<section class="bg-gray-900 py-20 relative overflow-hidden">
      <!-- Фоновий градієнт -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-50"></div>

      <!-- Сітка -->
      <div class="absolute inset-0 grid-background opacity-10"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="mb-12">
          <span class="text-yellow-500 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded border border-yellow-500">WORKFLOW ESSENTIALS</span>
          <h2 class="text-4xl font-bold text-white mt-4">Tools For Smooth <span class="text-yellow-500">3D Workflows</span></h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Blender Plugin -->
          <div class="bg-gray-800 rounded-lg overflow-hidden">
            <img src="/api/placeholder/400/300" alt="Blender Plugin" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">Blender Plugin</h3>
              <p class="text-gray-400">Seamlessly integrate our tools into your Blender workflow for enhanced 3D modeling capabilities.</p>
            </div>
          </div>

          <!-- ComfyUI -->
          <div class="bg-gray-800 rounded-lg overflow-hidden">
            <img src="/api/placeholder/400/300" alt="ComfyUI" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">ComfyUI</h3>
              <p class="text-gray-400">A user-friendly interface for complex node-based workflows, simplifying your 3D creation process.</p>
            </div>
          </div>

          <!-- AI Result -->
          <div class="bg-gray-800 rounded-lg overflow-hidden">
            <img src="/api/placeholder/400/300" alt="AI Result" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-white mb-2">AI Result</h3>
              <p class="text-gray-400">Leverage AI-powered tools to enhance your 3D renders and streamline your workflow.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Декоративні елементи -->
      <div class="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-blue-500 opacity-20"></div>
      <div class="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-yellow-500 opacity-20"></div>
    </section>
`;
