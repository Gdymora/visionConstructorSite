export const source = `
<!-- Section Card inerAction-->
<section class="bg-gray-900 py-16 relative overflow-hidden min-h-screen flex items-center">
  <style>
    .grid-background {
      background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .perspective-1000 {
      perspective: 1000px;
    }
  </style>

  <!-- Background Gradient -->
  <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-50"></div>

  <!-- Grid -->
  <div class="absolute inset-0 grid-background opacity-10"></div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="flex flex-wrap justify-center items-center gap-6 perspective-1000">

      <!-- Card 1 -->
      <article class="w-72 h-80 group">
        <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div class="absolute inset-0 bg-gray-800 rounded-lg p-6 border border-blue-500 shadow-lg">
            <h3 class="text-xl font-semibold text-white mb-3">Seamless Blender Integration</h3>
            <p class="text-gray-300">Import your 3D assets directly from Blender to our platform.</p>
          </div>
          <div class="absolute inset-0 bg-blue-600 rounded-lg p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h3 class="text-xl font-semibold text-white mb-3">Additional Information</h3>
            <p class="text-gray-200">Our Blender integration preserves all materials and textures, ensuring the integrity of your work.</p>
          </div>
        </div>
      </article>

      <!-- Card 2 -->
      <article class="w-72 h-80 group mt-12">
        <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div class="absolute inset-0 bg-gray-800 rounded-lg p-6 border border-blue-500 shadow-lg">
            <h3 class="text-xl font-semibold text-white mb-3">Customizable Workflows</h3>
            <p class="text-gray-300">Tailor your workflows to fit your project's needs with customizable nodes.</p>
          </div>
          <div class="absolute inset-0 bg-blue-600 rounded-lg p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h3 class="text-xl font-semibold text-white mb-3">Flexibility in Action</h3>
            <p class="text-gray-200">Create custom nodes, combine existing ones, and optimize your workflow for maximum efficiency.</p>
          </div>
        </div>
      </article>

      <!-- Card 3 -->
      <article class="w-72 h-80 group">
        <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div class="absolute inset-0 bg-gray-800 rounded-lg p-6 border border-blue-500 shadow-lg">
            <h3 class="text-xl font-semibold text-white mb-3">Convenient Project Management</h3>
            <p class="text-gray-300">Easily manage your 3D projects with our intuitive interface.</p>
          </div>
          <div class="absolute inset-0 bg-blue-600 rounded-lg p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <h3 class="text-xl font-semibold text-white mb-3">Team Collaboration</h3>
            <p class="text-gray-200">Built-in tools for collaboration and progress tracking improve team communication.</p>
          </div>
        </div>
      </article>

    </div>
  </div>
</section>

`;
