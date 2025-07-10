export const source = `
<!-- Gradient -->
<style>
.gradient-bg {
    background: radial-gradient(ellipse at center, #4c1d95 0%, #1e1b4b 50%, #0f172a 100%);
}
</style> 
<section class="gradient-bg min-h-screen flex items-center justify-center p-4">
<div class="w-full max-w-4xl aspect-video relative overflow-hidden">
<svg class="absolute inset-0 w-full h-full" viewBox="0 0 1000 562" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <radialGradient id="circleGradient1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 281) rotate(90) scale(300)">
            <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#4c1d95" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="circleGradient2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(900 281) rotate(90) scale(400)">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#4c1d95" stop-opacity="0"/>
        </radialGradient>
    </defs>
    
    <circle cx="100" cy="281" r="300" fill="url(#circleGradient1)"/>
    <circle cx="900" cy="281" r="400" fill="url(#circleGradient2)"/>
</svg>

<div class="relative z-10 w-full h-full flex items-center justify-center">
    <h2 class="text-white text-4xl font-bold">Ваш контент тут</h2>
</div>
</div>
</section>
`;
