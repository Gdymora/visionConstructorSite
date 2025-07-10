export const source = `
<!-- Hero Section -->
<section class="bg-gray-900 text-white relative overflow-hidden" data-section="hero">
  <style>
    .grid-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    .dark-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(17, 17, 17, 0.8) 0%, rgba(17, 17, 17, 0.6) 100%);
      z-index: 1;
    }
    .content-wrapper {
      position: relative;
      z-index: 2;
    }
  </style>

  <svg class="grid-background" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <defs>
      <pattern id="smallGrid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(100, 100, 255, 0.3)" stroke-width="0.5" />
      </pattern>
      <pattern id="grid" width="180" height="180" patternUnits="userSpaceOnUse">
        <rect width="180" height="180" fill="url(#smallGrid)" />
        <path d="M 180 0 L 0 0 0 180" fill="none" stroke="rgba(255, 165, 0, 0.3)" stroke-width="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>

  <div class="dark-overlay"></div>

  <div class="content-wrapper text-center py-20 px-4">
    <p class="text-sm uppercase tracking-wide mb-4">GROW ON YOUR OWN BUSINESS</p>
    <h1 class="text-4xl md:text-5xl font-bold mb-6">
      MetaFlow3D: Intelligent 3D<br />
      Solutions for <span class="text-purple-400">Architectural Projects</span>
    </h1>
    <p class="text-xl text-gray-300 mb-8">AI-Powered 3D Rendering and Workflow Management for Creative Professionals</p>
    <a href="#" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 inline-block"> Start Your 3D Revolution </a>
  </div>
</section>
`;
