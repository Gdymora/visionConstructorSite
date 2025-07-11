export const source =`
<style>
.layout-frame {
    width: 1320px;
    height: 854px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: scale(0.3) translateX(-50%);
    transform-origin: 0 0;
}
</style>
</head>
<div class="bg-white">
<div class="min-h-screen text-center">
<div class="w-full flex flex-col justify-center items-center bg-gray-100 py-12 mb-8 border-b">
    <h1 class="px-4 mb-10 py-4 text-center font-thin text-xl border-t-2 border-b-2 border-gray-200">Free Layouts &amp; Templates</h1>
    <a href="https://github.com" class="bg-blue-200 text-blue-700 py-3 px-4 rounded-sm no-underline text-xs inline-block hover:bg-blue-300 hover:shadow-lg">View on Github</a>
</div>
<div class="container mx-auto flex justify-start items-start flex-wrap">                
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/voyage.html" class="absolute layout-frame"></iframe>
            <a href="layouts/voyage.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Voyage</h2>
    </div>            
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/tributary.html" class="absolute layout-frame"></iframe>
            <a href="layouts/tributary.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Tributary</h2>
    </div>           
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/foundation.html" class="absolute layout-frame"></iframe>
            <a href="layouts/foundation.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Foundation</h2>
    </div>               
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/outlet.html" class="absolute layout-frame"></iframe>
            <a href="layouts/outlet.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Outlet</h2>
    </div>                 
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/essential.html" class="absolute layout-frame"></iframe>
            <a href="layouts/essential.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Essential</h2>
    </div>               
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/fettle.html" class="absolute layout-frame"></iframe>
            <a href="layouts/fettle.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Fettle</h2>
    </div>                
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/impulse.html" class="absolute layout-frame"></iframe>
            <a href="layouts/impulse.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Impulse - Lifestyle Blog</h2>
    </div>             
    <!-- <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/masonry.html" class="absolute layout-frame"></iframe>
            <a href="layouts/masonry.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Horizontal Masonry Layout</h2>
    </div> -->
    <!-- <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/responsive-menu.html" class="absolute layout-frame"></iframe>
            <a href="layouts/responsive-menu.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Single Element Responsive Menu</h2>
    </div> -->
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/uncover.html" class="absolute layout-frame"></iframe>
            <a href="layouts/uncover.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Uncover</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/shout.html" class="absolute layout-frame"></iframe>
            <a href="layouts/shout.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Shout</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/skyscraper.html" class="absolute layout-frame"></iframe>
            <a href="layouts/skyscraper.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Skyscraper</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/slate.html" class="absolute layout-frame"></iframe>
            <a href="layouts/slate.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Slate</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/fullscreen.html" class="absolute layout-frame"></iframe>
            <a href="layouts/fullscreen.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Fullscreen</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/blocks.html" class="absolute layout-frame"></iframe>
            <a href="layouts/blocks.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Blocks</h2>
    </div>
    <!-- <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/home-3.html" class="absolute layout-frame"></iframe>
            <a href="layouts/home-3.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Marketing Home Page</h2>
    </div> -->
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/launch.html" class="absolute layout-frame"></iframe>
            <a href="layouts/launch.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Product Launch</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/photography.html" class="absolute layout-frame"></iframe>
            <a href="layouts/photography.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Photography</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/product.html" class="absolute layout-frame"></iframe>
            <a href="layouts/product.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Product Showcase</h2>
    </div>
    <!-- <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/login.html" class="absolute layout-frame"></iframe>
            <a href="layouts/login.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Login form</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/buttons.html" class="absolute layout-frame"></iframe>
            <a href="layouts/buttons.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Buttons</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/blog-1.html" class="absolute layout-frame"></iframe>
            <a href="layouts/blog-1.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Blog Articles</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/contact-1.html" class="absolute layout-frame"></iframe>
            <a href="layouts/contact-1.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Contact Page</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/products-1.html" class="absolute layout-frame"></iframe>
            <a href="layouts/products-1.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Products List</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/home-2.html" class="absolute layout-frame"></iframe>
            <a href="layouts/home-2.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Home Page</h2>
    </div>
    <div class="w-full md:w-1/2 lg:w-1/3 p-4">
        <div class="block  rounded-sm w-full h-64 relative overflow-hidden shadow bg-white">
            <iframe src="layouts/home-1.html" class="absolute layout-frame"></iframe>
            <a href="layouts/home-1.html" class="block absolute pin w-full h-full opacity-25 hover:bg-blue-100"></a>
        </div>
        <h2 class="p-4 text-center text-lg font-thin">Home Page</h2>
    </div> -->
</div>
</div>
<footer class="w-full bg-white border-t font-thin">
<div class="container mx-auto max-w-xl py-6 text-xs text-center">
    Created by 
    <a href="https://digizu.co.uk" class="text-black">Digizu</a>. Powered by 
    <a href="https://tailwindcss.com/" class="text-black">Tailwind CSS</a>.
</div>
</footer>
</div>`;