export const source =`
<title>Single Element Responsive Menu</title>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

<div class="font-sans">
<div class="bg-gray-200 text-gray-800 relative z-10 px-6">
    <div class="h-20 py-4 container mx-auto flex items-center justify-center">
        <!-- Menu -->
        <div x-data="{ open: false }" class="z-10 flex-1">
            <div :class="{ 'flex' : open, 'hidden' : open === false }" class="fixed md:relative top-0 left-0 w-full md:w-auto h-screen md:h-auto md:flex flex-col md:flex-row items-center justify-center md:justify-start z-40 bg-gray-200 md:bg-transparent leading-loose font-sans uppercase text-gray-800 text-base md:text-xs tracking-wider gap-8 hidden">
                <a href="#">Home</a>
                <a href="#">Products</a>
            </div>
            <button @click="open = true" type="button" :class="{ 'hidden' : open, 'block' : !open }" class="block md:hidden text-4xl font-thin">＝</button>
            <button @click="open = false" type="button" :class="{ 'block' : open, 'hidden' : !open }" class="md:hidden absolute top-0 right-0 leading-none p-8 text-xl z-50 hidden">╳</button>
        </div>
        <!-- / Menu -->
        <a href="/" class="flex-1 flex items-center justify-center block h-full">
            <svg class="h-20 w-auto" id='logoipsum'
                xmlns='http://www.w3.org/2000/svg' viewBox='0 0 177.778 100'>
                <path d='M31.941,62.825h25.65V37.175H31.941ZM52.654,47.532h-5.42v-5.42h5.42Zm-15.777-5.42H42.3V52.468H52.654v5.42H36.877Zm37.417-4.937A12.825,12.825,0,1,0,87.119,50,12.84,12.84,0,0,0,74.294,37.175Zm0,20.713A7.888,7.888,0,1,1,82.182,50,7.9,7.9,0,0,1,74.294,57.888Zm58.719-20.713A12.825,12.825,0,1,0,145.837,50,12.84,12.84,0,0,0,133.013,37.175Zm0,20.713A7.888,7.888,0,1,1,140.9,50,7.9,7.9,0,0,1,133.013,57.888Zm-29.36-20.713A12.825,12.825,0,1,0,116.478,50,12.84,12.84,0,0,0,103.653,37.175Zm0,20.713a7.888,7.888,0,1,1,7.488-10.356h-7.488v4.936h7.488A7.9,7.9,0,0,1,103.653,57.888Z' fill='#394149'/>
            </svg>
        </a>
        <div class="flex-1 flex items-center justify-end text-xs uppercase tracking-wider gap-4">
            <button type="button" class="relative">
                <svg class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
            </button>
        </div>
    </div>
</div>
<div class="p-12 text-center tracking-wide text-gray-800">
    <p class="mb-3">A responsive / mobile menu without the need for duplicating menu elements.</p>
    <p class="font-semibold text-sm">Resize your browser to see it in action </p>
</div>
</div>`;