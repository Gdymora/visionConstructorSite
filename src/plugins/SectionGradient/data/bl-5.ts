export const source = `
<!-- FAQ Gradient -->
<style>
.gradient-bg {
  background: radial-gradient(circle, rgb(60, 39, 164), rgb(4, 26, 4)); 
}
</style>
<section class="gradient-bg min-h-screen flex items-center justify-center p-4">
  <div class="w-full max-w-4xl aspect-video relative overflow-hidden">
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1000 562" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <radialGradient id="circleGradient1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 281) rotate(90) scale(150)">
                  <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#4c1d95" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="circleGradient2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 281) rotate(90) scale(150)">
                  <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#4c1d95" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="circleGradient3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(600 281) rotate(90) scale(150)">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#1e40af" stop-opacity="0"/>
              </radialGradient>
              <radialGradient id="circleGradient4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 281) rotate(90) scale(150)">
                  <stop offset="0%" stop-color="#4ade80" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#16a34a" stop-opacity="0"/>
              </radialGradient>
              <filter id="blur">
                  <feGaussianBlur stdDeviation="40" />
              </filter>
          </defs>
          
          <g filter="url(#blur)">
              <circle cx="200" cy="281" r="150" fill="url(#circleGradient1)"/>
              <circle cx="400" cy="281" r="150" fill="url(#circleGradient2)"/>
              <circle cx="600" cy="281" r="150" fill="url(#circleGradient3)"/>
              <circle cx="800" cy="281" r="150" fill="url(#circleGradient4)"/>
          </g>
      </svg>
      
      <div class="relative z-10 w-full h-full flex items-center justify-center">
          <h2 class="text-white text-4xl font-bold">Ваш контент тут</h2>
      </div>
  </div>
  </section>
`;
