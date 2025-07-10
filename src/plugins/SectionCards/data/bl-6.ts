export const source = `
<section class="bg-gray-900 py-16 relative overflow-hidden flex items-center">
 <style>
   .card-container {
     display: flex;
     justify-content: center;
     gap: 2rem;
     transition: all 0.5s ease;
   }

   .card {
     transition: transform 0.5s ease;
   }

   /* Початкові позиції */
   .card:nth-child(1) { transform: translateX(0) rotate(10deg); }
   .card:nth-child(2) { transform: translateX(0) rotate(-5deg); }
   .card:nth-child(3) { transform: translateX(0) rotate(-10deg); }

   /* Анімовані позиції */
   .card-container.spread .card:nth-child(1) { transform: translateX(-330px) rotate(0); }
   .card-container.spread .card:nth-child(2) { transform: translateX(0) rotate(0); }
   .card-container.spread .card:nth-child(3) { transform: translateX(330px) rotate(0); }
 </style>

 <div class="container mx-auto px-4 relative z-10">
   <div class="card-container">
     <!-- Card 1 -->
     <article class="card w-72 h-80 group">
       <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
         <!-- Card content -->
       </div>
     </article>

     <!-- Card 2 -->
     <article class="card w-72 h-80 group">
       <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
         <!-- Card content -->
       </div>
     </article>

     <!-- Card 3 -->
     <article class="card w-72 h-80 group">
       <div class="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
         <!-- Card content -->
       </div>
     </article>
   </div>
   
   <button class="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg" id="animateButton">
     Animate Cards
   </button>
 </div>

 <script>
   const button = document.getElementById('animateButton');
   const container = document.querySelector('.card-container');
   
   button.addEventListener('click', () => {
     container.classList.toggle('spread');
   });
 </script>
</section>
`;
