export const source = `
<!-- FAQ Gradient -->
<style>
.gradient-bg {
  background: radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 70%);
}
.card {
  backdrop-filter: blur(10px);
  background-color: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
}
</style>
<section class="gradient-bg min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-4xl aspect-video relative">
      <h2 class="text-white text-2xl font-bold mb-8">Ваш контент тут</h2>

      <div class="card absolute left-0 top-16 w-3/4 h-40 rounded-lg p-6 z-10">
        <h3 class="text-white font-semibold text-lg">Comfy Generator</h3>
        <p class="text-gray-300 text-sm mt-2">Easily manage your workflow with our intuitive and-drop environment, hassle...</p>
      </div>

      <div class="card absolute left-16 top-32 w-3/4 h-40 rounded-lg p-6 z-20">
        <h3 class="text-white font-semibold text-lg">Seamless Blender Integration</h3>
        <p class="text-gray-300 text-sm mt-2">Import your 3D assets directly from Blender into...</p>
      </div>

      <div class="card absolute left-32 top-48 w-3/4 h-40 rounded-lg p-6 z-30">
        <h3 class="text-white font-semibold text-lg">Customizable Workflows</h3>
        <p class="text-gray-300 text-sm mt-2">Adapt workflows to your project's specific needs with fully customizable nodes.</p>
        <div class="absolute bottom-4 right-4">
          <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </div>
      </div>
    </div>
  </section>
`;
