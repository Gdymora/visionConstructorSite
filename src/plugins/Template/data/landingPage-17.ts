export const source =`
<script>
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        'display' : ['Marcellus', 'serif'],
        'heading' : ['Barlow Semi Condensed', 'serif'],
        'sans' : ['Overpass', 'sans-serif']
      }
    }
  }
}
</script>

<div class="font-sans antialiased bg-gray-50">
<div class="relative z-40 relative px-6 text-white">
<div class="h-32 py-4 container mx-auto flex items-center justify-between relative z-10">
    <a href="/" class="uppercase font-bold text-2xl flex items-center justify-start h-full hover:opacity-50">fettle</a>
    <div x-data="{ open: false }" class="relative z-40 flex-1 text-right">
        <div :class="{ 'flex' : open, 'hidden' : open === false }" class="z-40 px-6 fixed md:relative top-0 left-0 w-full md:w-auto h-screen md:h-auto md:flex flex-col md:flex-row items-center justify-start md:justify-end pt-32 md:pt-0 overflow-y-scroll md:overflow-visible bg-gray-200 text-gray-900 md:text-current md:bg-transparent leading-loose text-cyan-900 text-sm md:text-sm font-semibold tracking-widest hidden uppercase font-heading">
            <a href="/" class="text-left block w-full md:w-auto border-b border-gray-300 md:border-none py-4 md:py-0 md:ml-8 hover:opacity-50">Home</a>
            <a href="/about" class="text-left block w-full md:w-auto border-b border-gray-300 md:border-none py-4 md:py-0 md:ml-8 hover:opacity-50">About</a>
            <a href="/blog" class="text-left block w-full md:w-auto border-b border-gray-300 md:border-none py-4 md:py-0 md:ml-8 hover:opacity-50">Blog</a>
            <a href="/portfolio" class="text-left block w-full md:w-auto border-b border-gray-300 md:border-none py-4 md:py-0 md:ml-8 hover:opacity-50">Portfolio</a>
            <a href="/contact" class="text-left block w-full md:w-auto border-b border-gray-300 md:border-none py-4 md:py-0 md:ml-8 hover:opacity-50">Contact</a>
            <div class="flex md:hidden items-center justify-center my-12">
                <a href="#" class="mx-4">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                </a>
                <a href="#" class="mx-4">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </a>
                <a href="#" class="mx-4">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                </a>
                <a href="#" class="mx-4">
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                    </svg>
                </a>
            </div>
            <button @click="open = false" type="button" :class="{ 'inline-block' : open, 'hidden' : !open }" class="md:hidden absolute top-0 right-0 leading-none uppercase tracking-widest font-semibold z-50 hidden px-6 h-32 text-gray-900 flex items-center justify-center">Close</button>
        </div>
        <button @click="open = true" type="button" :class="{ 'hidden' : open, 'inline-block' : !open }" class="block md:hidden text-4xl font-thin inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>
            </svg>
        </button>
    </div>
</div>
</div>
<script>
const slideshow = () => ({
current: 0,
images: [
'https://images.unsplash.com/photo-1599058917677-0adfe92e05f2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1949&q=80',
'https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
'https://images.unsplash.com/photo-1599058917727-824293170100?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80',
]
});
</script>
<div x-data="slideshow()" class="w-full h-screen relative z-20 -mt-32 px-12 flex items-center justify-center bg-green-900">
<div class="h-full w-full absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-30"></div>
<div class="relative z-10 text-center px-12">
    <h1 class="md:max-w-lg lg:max-w-lg xl:max-w-2xl mx-auto text-3xl lg:text-4xl xl:text-5xl font-black leading-relaxed lg:leading-relaxed xl:leading-normal text-white font-display">Lorem ipsum dolor sit</h1>
    <div class="max-w-xs md:max-w-sm lg:max-w-md mx-auto mt-8 text-white text-sm lg:text-base lg:leading-loose tracking-wide">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
</div>
<img x-bind:src="images[current]" class="absolute top-0 left-0 w-full h-full object-cover opacity-90">
<div class="absolute z-20 top-1/2 left-0 w-full flex items-center justify-between px-6 md:px-12">
    <button x-on:click="current = current > 0 ? current - 1 : images.length - 1" class="hover:opacity-50">
        <svg class="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
        </svg>
    </button>
    <button x-on:click="current = current < images.length - 1 ? current + 1 : 0" class="hover:opacity-50">
        <svg class="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
    </button>
</div>
</div>
<div class="p-12 md:p-24">
<div class="bg-gray-100 p-12 md:py-24 lg:flex">
    <div class="mx-auto max-w-4xl flex flex-wrap">
        <img src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" class="w-full lg:w-4/12 h-full object-cover">
        <div class="flex-1 flex items-center justify-center pt-12 lg:pt-0">
            <div class="text-center">
                <h3 class="text-4xl font-display mb-8 text-gray-700">Lorem ipsum dolor sit</h3>
                <p class="text-sm lg:text-lg max-w-md mx-auto text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
    </div>
</div>
</div>
<div class="p-12 md:p-24 md:pt-12">
<h3 class="text-xs uppercase tracking-widest text-center mb-2 text-gray-800">Featured Links</h3>
<h2 class="text-2xl uppercase tracking-widest text-center lg:text-4xl font-heading mb-20 text-gray-900">Work Overview</h2>
<div class="lg:grid grid-cols-4 grid-rows-3 gap-5 font-display text-3xl text-white">
    <a href="#" class="bg-black col-span-1 row-span-1 relative flex items-center justify-center py-24">
        <span class="relative z-10">About</span>
        <img src="https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-25">
    </a>
    <a href="#" class="bg-black col-span-1 row-span-1 relative flex items-center justify-center py-24">
        <span class="relative z-10">Blog</span>
        <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-25">
    </a>
    <a href="#" class="bg-black col-span-2 row-span-2 relative flex items-center justify-center py-24">
        <span class="relative z-10">Work</span>
        <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-25">
    </a>
    <a href="#" class="bg-black col-span-2 row-span-2 relative flex items-center justify-center py-24">
        <span class="relative z-10">Contact</span>
        <img src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-25">
    </a>
    <a href="#" class="bg-black col-span-1 row-span-1 relative flex items-center justify-center py-24">
        <span class="relative z-10">Prints</span>
        <img src="https://images.unsplash.com/photo-1485727749690-d091e8284ef3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-25">
    </a>
    <a href="#" class="bg-black col-span-1 row-span-1 relative flex items-center justify-center py-24">
        <span class="relative z-10">FAQ</span>
        <img src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50 hover:opacity-25">
    </a>
</div>
</div>
<div class="p-12 md:p-24 pt-0 md:pt-0">
<div class="bg-gray-100 p-12 md:py-24 lg:flex">
    <div class="mx-auto max-w-4xl flex flex-wrap">
        <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="w-full lg:w-7/12 h-full object-cover">
        <div class="flex-1 flex items-center justify-center lg:px-12 pt-12 lg:pt-0">
            <div class="text-center">
                <div class="uppercase tracking-widest text-xs text-gray-600 mb-4 font-display font-bold mb-10">my latest adventure</div>
                <div class="uppercase tracking-widest text-xs text-gray-600 mb-4">Travel</div>
                <h3 class="text-4xl leading-tight font-display mb-8 text-gray-700 my-6">Lorem ipsum dolor sit</h3>
                <a href="#" class="inline-block uppercase text-xs tracking-widest border border-gray-300 px-6 py-4 hover:bg-gray-300">See more</a>
            </div>
        </div>
    </div>
</div>
</div>
<div class="container mx-auto px-6 mb-12">
<div class="flex h-32 lg:h-48 md:h-52 bg-black relative">
    <div class="flex-1 h-full relative">
        <img src="https://images.unsplash.com/photo-1591258370814-01609b341790?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" class="absolute inset w-full h-full object-cover opacity-50">
    </div>
    <div class="flex-1 h-full relative">
        <img src="https://images.unsplash.com/photo-1598136490929-292a0a7890c2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1949&q=80" class="absolute inset w-full h-full object-cover opacity-50">
    </div>
    <div class="flex-1 h-full relative">
        <img src="https://images.unsplash.com/photo-1554284126-aa88f22d8b74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2314&q=80" class="absolute inset w-full h-full object-cover opacity-50">
    </div>
    <div class="flex-1 h-full relative hidden lg:block">
        <img src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1874&q=80" class="absolute inset w-full h-full object-cover opacity-50">
    </div>
    <div class="flex-1 h-full relative hidden lg:block">
        <img src="https://images.unsplash.com/photo-1557564437-0995702f88fc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset w-full h-full object-cover opacity-50">
    </div>
    <div class="absolute inset-0 w-full h-full flex z-20 flex items-center justify-center">
        <a href="#" class="bg-white px-8 py-3 text-sm tracking-widest font-heading">@novolio</a>
    </div>
</div>
</div>
<div class="text-sm lg:text-base text-center font-heading pb-24 tracking-widest uppercase opacity-50">&copy; fettle. all rights reserved</div>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer="defer"></script>
</div>`;