export const source = `
<!-- Hero Section -->
<section class="bg-gray-900 text-white relative overflow-hidden" data-section="hero">
  <style>
    .grid-background-se {
      background-color: rgba(17, 17, 17, 0.7); /* Semi-transparent dark background */
      background-image: linear-gradient(to right, transparent 49px, rgba(128, 0, 128, 0.5) 49px, rgba(128, 0, 128, 0.5) 51px, transparent 51px),
        linear-gradient(to bottom, transparent 49px, rgba(0, 0, 255, 0.5) 49px, rgba(0, 0, 255, 0.5) 51px, transparent 51px),
        linear-gradient(to right, transparent 149px, rgba(255, 165, 0, 0.5) 149px, rgba(255, 165, 0, 0.5) 151px, transparent 151px);
      background-size: 150px 150px, 150px 150px, 300px 300px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }
    .content-wrapper {
      position: relative;
      z-index: 1;
    }
  </style>
  <div class="grid-background-se"></div>
  <div class="content-wrapper text-center py-20 px-4">
    <h1 class="text-5xl font-bold mb-6">
      MetaFlow3D: Інтелектуальні 3D<br />
      рішення для <span class="text-purple-400">архітектурних проектів</span>
    </h1>
    <p class="text-xl text-gray-300 mb-8">ШІ-керований 3D-рендеринг та управління робочим процесом для креативних професіоналів</p>
    <a href="#" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700">Почніть свою 3D-революцію</a>
  </div>
</section>
`;
