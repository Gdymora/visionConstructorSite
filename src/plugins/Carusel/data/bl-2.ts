export const source = `
<!-- Carusel -->
<style>
.grid-background {
    background-image: 
        linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
}

.no-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.image-carousel {
    scroll-behavior: smooth;
}
</style>
<div class="bg-gray-900 py-20 relative overflow-hidden"> 
<div class="absolute inset-0 grid-background opacity-10"></div>
<div class="container mx-auto px-4 relative z-10">
    <div data-showcaseImages="showcaseImages" class="image-carousel flex items-center space-x-4 overflow-x-auto py-8 px-4 no-scrollbar" id="imageCarousel">
        <!--w-72 w-96 w-128-->>
        <div data-showcaseImages-container="container" class="carousel-item flex-shrink-0 w-96 h-96 rounded-3xl overflow-hidden shadow-lg">
            <img data-showcaseImages-item="item" src="https://cdn.pixabay.com/photo/2022/09/29/11/45/dawn-7487173_1280.jpg" alt="Car 1" class="w-full h-full object-cover">
        </div>
        <div data-showcaseImages-container="container" class="carousel-item flex-shrink-0 w-96 h-96 rounded-3xl overflow-hidden shadow-lg">
            <img data-showcaseImages-item="item" src="https://cdn.pixabay.com/photo/2022/09/29/11/45/dawn-7487173_1280.jpg" alt="Sci-Fi Scene" class="w-full h-full object-cover">
        </div>
        <div data-showcaseImages-container="container" class="carousel-item flex-shrink-0 w-96 h-96 rounded-3xl overflow-hidden shadow-lg">
            <img data-showcaseImages-item="item" src="https://cdn.pixabay.com/photo/2022/09/29/11/45/dawn-7487173_1280.jpg" alt="Car 2" class="w-full h-full object-cover">
        </div>        
    </div>
</div>
</div>
`;
/* <script>
    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('imageCarousel');
        let isDown = false;
        let startX;
        let scrollLeft;
    
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
    
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });
    
        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });
    
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    
        carousel.addEventListener('wheel', (e) => {
            e.preventDefault();
            carousel.scrollLeft += e.deltaY;
        });
    });
    </script>
     */