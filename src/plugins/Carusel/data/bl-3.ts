export const source = `
<!-- Carusel -->
<style>
.photo-stack {
    --d: 10s; /* duration */
}

.photo-frame {
    transition: all 0.5s ease;
}

.photo-frame:nth-child(1) { animation: shuffle var(--d) infinite; animation-delay: calc(0 * var(--d) / 5); --r: -8deg; }
.photo-frame:nth-child(2) { animation: shuffle var(--d) infinite; animation-delay: calc(1 * var(--d) / 5); --r: 5deg; }
.photo-frame:nth-child(3) { animation: shuffle var(--d) infinite; animation-delay: calc(2 * var(--d) / 5); --r: -3deg; }
.photo-frame:nth-child(4) { animation: shuffle var(--d) infinite; animation-delay: calc(3 * var(--d) / 5); --r: 7deg; }
.photo-frame:nth-child(5) { animation: shuffle var(--d) infinite; animation-delay: calc(4 * var(--d) / 5); --r: -5deg; }

@keyframes shuffle {
    0%, 100% { z-index: 1; transform: translate(0, 0) rotate(var(--r)); }
    5%, 20% { z-index: 5; transform: translate(-15px, -15px) rotate(0deg); }
    25%, 90% { z-index: 1; transform: translate(0, 0) rotate(var(--r)); }
}

.photo-frame:hover {
    animation-play-state: paused;
    z-index: 10;
    transform: scale(1.05) rotate(0deg) translate(-15px, -15px) !important;
}
</style>
<div class="bg-[#e0d4b4] min-h-screen flex items-center justify-center">
    <div class="photo-stack relative w-[400px] h-[400px]">
        <div class="photo-frame absolute bg-white p-2 shadow-md" style="left: 0; top: 20px;">
            <img src="https://picsum.photos/id/1004/280/280" alt="Photo 1" class="w-full h-auto">
        </div>
        <div class="photo-frame absolute bg-white p-2 shadow-md" style="left: 80px; top: 0;">
            <img src="https://picsum.photos/id/1013/280/280" alt="Photo 2" class="w-full h-auto">
        </div>
        <div class="photo-frame absolute bg-white p-2 shadow-md" style="left: 40px; top: 80px;">
            <img src="https://picsum.photos/id/1066/280/280" alt="Photo 3" class="w-full h-auto">
        </div>
        <div class="photo-frame absolute bg-white p-2 shadow-md" style="left: 120px; top: 40px;">
            <img src="https://picsum.photos/id/325/280/280" alt="Photo 4" class="w-full h-auto">
        </div>
        <div class="photo-frame absolute bg-white p-2 shadow-md" style="left: 20px; top: 60px;">
            <img src="https://picsum.photos/id/65/280/280" alt="Photo 5" class="w-full h-auto">
        </div>
    </div>
</div>
`;
 