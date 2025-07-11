export const source =`
<title>tributary</title>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@100;200;300;400;500;600;700&family=Karla:wght@200;300;400;600;700&display=swap" rel="stylesheet">

<script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'display' : ['Crimson Text', 'serif'],
            'sans' : ['Karla', 'sans-serif']
          }
        }
      }
    }
</script>

<div class="font-sans antialiased bg-white">
<div class="h-8 z-10 relative bg-white text-gray-600 text-xs text-center tracking-wider flex items-center justify-center">
    Our new plant book is available. 
    <a href="#" class="underline ml-1">Get it here</a>
</div>
<div class="h-24 z-10 relative container mx-auto px-6 flex items-center justify-center">
    <div class="absolute inset-0 w-full h-full flex items-center justify-between text-gray-900 font-light">
        <div>
            <a href="#" class="mr-6">Shop</a>
            <a href="#" class="mr-6">About</a>
            <a href="#" class="mr-6">Articles</a>
        </div>
        <div>
            <a href="#" class="ml-6">Search</a>
            <a href="#" class="ml-6">Cart (0)</a>
        </div>
    </div>
    <a href="#" class="relative">
        <svg class="h-24 w-auto text-gray-900 fill-current" id="logoipsum" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 177.778 100">
            <path d="M53.73,45.71c.36,0,.48.13.48.48v7.92h4.07c.35,0,.48.13.48.48v.7c0,.35-.13.48-.48.48H52.92c-.35,0-.49-.13-.49-.48v-9.1c0-.35.14-.48.49-.48Z"/>
            <path d="M62.31,49.2c0-2.31,1.46-3.7,4-3.7s4,1.39,4,3.7v3.08c0,2.31-1.47,3.7-4,3.7s-4-1.39-4-3.7Zm6.32,0c0-1.3-.81-2-2.27-2s-2.26.71-2.26,2V52.3c0,1.31.8,2,2.26,2s2.27-.72,2.27-2Z"/>
            <path d="M82.22,50.26c.39,0,.48.13.48.48v1.9A3,3,0,0,1,81.64,55a4.36,4.36,0,0,1-3,.94c-2.59,0-4-1.39-4-3.7v-3.1c0-2.28,1.46-3.68,4-3.68,2,0,3.3.79,3.85,2.37a.43.43,0,0,1-.3.62l-.78.27c-.34.12-.48.05-.6-.3a2.06,2.06,0,0,0-2.17-1.3c-1.47,0-2.27.71-2.27,2V52.3c0,1.31.81,2,2.27,2S81,53.63,81,52.65v-.74H78.83c-.36,0-.49-.14-.49-.49v-.68c0-.35.13-.48.49-.48Z"/>
            <path d="M86.83,49.2c0-2.31,1.46-3.7,4-3.7s4,1.39,4,3.7v3.08c0,2.31-1.47,3.7-4,3.7s-4-1.39-4-3.7Zm6.31,0c0-1.3-.81-2-2.26-2s-2.27.71-2.27,2V52.3c0,1.31.81,2,2.27,2s2.26-.72,2.26-2Z"/>
            <path d="M99.54,46c0-.22.07-.29.29-.29h.46c.22,0,.27.07.27.29v9.48c0,.22,0,.29-.27.29h-.46c-.22,0-.29-.07-.29-.29Z"/>
            <path d="M109.67,45.71a3.14,3.14,0,1,1,0,6.28h-3v3.49c0,.22-.05.29-.26.29h-.47c-.21,0-.29-.07-.29-.29V46c0-.22.08-.29.29-.29ZM109.58,51a2.18,2.18,0,1,0,0-4.36h-3V51Z"/>
            <path d="M120.62,45.51a3.61,3.61,0,0,1,3.72,2.18c.08.16,0,.29-.16.37l-.44.2c-.18.07-.25.06-.36-.13a2.72,2.72,0,0,0-2.76-1.64c-1.69,0-2.61.67-2.61,1.87a1.52,1.52,0,0,0,1.27,1.54,6.79,6.79,0,0,0,1.66.32,6.88,6.88,0,0,1,2,.41A2.25,2.25,0,0,1,124.5,53c0,1.87-1.36,3-3.86,3a3.61,3.61,0,0,1-3.83-2.43.27.27,0,0,1,.17-.38l.44-.16a.27.27,0,0,1,.36.17A2.86,2.86,0,0,0,120.64,55c1.89,0,2.82-.66,2.82-2a1.49,1.49,0,0,0-1.17-1.53,7,7,0,0,0-1.59-.28l-1.08-.14a9.5,9.5,0,0,1-1-.27,2.63,2.63,0,0,1-.89-.47,2.44,2.44,0,0,1-.8-1.91C117,46.65,118.31,45.51,120.62,45.51Z"/>
            <path d="M129.89,52.35a2.78,2.78,0,0,0,5.55,0V46c0-.22.07-.29.29-.29h.46c.22,0,.29.07.29.29v6.34c0,2.27-1.34,3.64-3.81,3.64s-3.81-1.37-3.81-3.64V46c0-.22.07-.29.28-.29h.47c.21,0,.28.07.28.29Z"/>
            <path d="M150.28,45.71c.22,0,.29.07.29.29v9.48c0,.22-.07.29-.29.29h-.42c-.21,0-.28-.07-.28-.29V49.71a18.55,18.55,0,0,1,.17-2.51h-.06a18,18,0,0,1-1.09,2.21l-2.15,3.79a.35.35,0,0,1-.33.22h-.28a.37.37,0,0,1-.34-.22l-2.18-3.83a16.07,16.07,0,0,1-1-2.18h-.06a21.76,21.76,0,0,1,.16,2.53v5.76c0,.22-.07.29-.29.29h-.39c-.22,0-.29-.07-.29-.29V46c0-.22.07-.29.29-.29h.36a.4.4,0,0,1,.4.23L146,52.16,149.48,46c.11-.21.17-.24.39-.24Z"/>
            <path d="M35.94,53.55v7.23a1,1,0,0,1-2.09,0V53.56a1.77,1.77,0,0,0,1,.34A1.72,1.72,0,0,0,35.94,53.55Zm8.9-2.09a1,1,0,0,0-1,1v1.26a1,1,0,1,0,2.09,0V52.51A1,1,0,0,0,44.84,51.46ZM31.58,56.29a1.8,1.8,0,0,1-1-.34V63.2a1.05,1.05,0,0,0,2.1,0V56A1.83,1.83,0,0,1,31.58,56.29Zm10-7a1,1,0,0,0-1.05,1v5.57a1.05,1.05,0,1,0,2.1,0V50.36A1,1,0,0,0,41.53,49.31Zm-3.32,2.14a1.83,1.83,0,0,1-1.05-.34v7.27a1.05,1.05,0,1,0,2.1,0V51.1A1.77,1.77,0,0,1,38.21,51.45ZM29.31,57V36.69a.94.94,0,0,0-.94-.93h-.22a.94.94,0,0,0-.94.93V57a.94.94,0,0,0,.94.94h.22A.94.94,0,0,0,29.31,57Zm2.38-1.48h-.22a.94.94,0,0,1-.94-.94V39.11a.94.94,0,0,1,.94-.93h.22a.94.94,0,0,1,.94.93V54.6A.94.94,0,0,1,31.69,55.54ZM35,53.14h-.23a.93.93,0,0,1-.93-.93V41.51a.93.93,0,0,1,.93-.94H35a.94.94,0,0,1,.93.94v10.7A.93.93,0,0,1,35,53.14Zm3.31-2.45H38.1a.94.94,0,0,1-.94-.93V44A.94.94,0,0,1,38.1,43h.22a.94.94,0,0,1,.94.94v5.8A.94.94,0,0,1,38.32,50.69Zm3.32-2.15h-.22a.94.94,0,0,1-.94-.94V46.11a.94.94,0,0,1,.94-.93h.22a.94.94,0,0,1,.94.93V47.6A.94.94,0,0,1,41.64,48.54Z"/>
        </svg>
    </a>
</div>
<div class="-mt-32 relative w-full h-screen bg-yellow-300 flex items-end justify-center">
    <img src="https://images.unsplash.com/photo-1521334884684-d80222895322?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=100" class="w-full h-full absolute inset-0 object-cover object-top opacity-80">
    <svg class="w-10 h-10 text-gray-900 relative z-10 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
</div>
<div class="bg-green-50 bg-opacity-50">
    <div class="px-12 py-32">
        <h1 class="text-5xl max-w-2xl mx-auto leading-tight text-center font-display font-semibold text-gray-800">Beautiful plant stands that encourage you to get creative.</h1>
    </div>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-12">
        <img src="https://images.unsplash.com/photo-1459156212016-c812468e2115?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=949&q=80" class="h-screen w-full object-cover">
        <img src="https://images.unsplash.com/photo-1531875456634-3f5418280d20?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" class="h-screen w-full object-cover md:mt-32">
    </div>
    <div class="container mx-auto px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:-mt-32">
        <div class="p-12 md:p-16">
            <p class="text-gray-700 leading-relaxed mb-12">Driven by a committment to encourage creativity with greenery, we design functional plant stands and botanical wares that amplify plant wares within a space.</p>
            <a href="#" class="border-b border-gray-700 text-gray-700">Shop all our products</a>
        </div>
    </div>
    <div class="grid grid-cols-3 gap-12 px-12 pt-32 pb-32">
        <a href="#" class="block relative h-72 flex items-end justify-end pr-12 pb-12 text-right hover:opacity-75">
            <div class="relative z-10">
                <h3 class="font-display text-3xl font-semibold text-gray-800 mb-6">Our Favourites</h3>
                <span class="border-b border-gray-700 text-gray-700 pb-1">Shop now</span>
            </div>
            <img src="https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1935&q=80" class="absolute inset-0 w-full h-full object-cover object-right">
        </a>
        <a href="#" class="block relative h-72 flex items-end justify-end pr-12 pb-12 text-right hover:opacity-75">
            <div class="relative z-10">
                <h3 class="font-display text-3xl font-semibold text-gray-800 mb-6">The Collection</h3>
                <span class="border-b border-gray-700 text-gray-700 pb-1">Shop now</span>
            </div>
            <img src="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1951&q=80" class="absolute inset-0 w-full h-full object-cover object-right">
        </a>
        <a href="#" class="block relative h-72 flex items-end justify-end pr-12 pb-12 text-right hover:opacity-75">
            <div class="relative z-10">
                <h3 class="font-display text-3xl font-semibold text-gray-800 mb-6">Signature Style</h3>
                <span class="border-b border-gray-700 text-gray-700 pb-1">Shop now</span>
            </div>
            <img src="https://images.unsplash.com/photo-1504198266287-1659872e6590?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover object-right">
        </a>
    </div>
    <div class="px-12 container mx-auto pb-24">
        <h2 class="text-5xl leading-tight text-left font-display font-semibold text-gray-800 px-12">New products</h2>
    </div>
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-12 pb-24">
        <a href="#" class="block hover:opacity-75">
            <img src="https://images.unsplash.com/photo-1459156212016-c812468e2115?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=949&q=80" class="h-screen w-full object-cover">
            <div class="pt-6">
                <h3>Loop</h3>
                <div class="text-red-400">
                    £30.00 
                    <span class="text-gray-400 line-through ml-4">£60.00</span>
                </div>
            </div>
        </a>
        <a href="#" class="block hover:opacity-75 md:-mt-32">
            <img src="https://images.unsplash.com/photo-1531875456634-3f5418280d20?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" class="h-screen w-full object-cover">
            <div class="pt-6">
                <h3>Loop</h3>
                <div class="text-red-400">
                    £30.00 
                    <span class="text-gray-400 line-through ml-4">£60.00</span>
                </div>
            </div>
        </a>
    </div>
</div>
<div class="bg-white py-12">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 px-12 pt-24">
        <div>
            <h2 class="pb-24 px-12 text-5xl leading-tight text-left font-display font-semibold text-gray-800 px-12">How to turn your home into a jungle retreat</h2>
            <img src="https://images.unsplash.com/photo-1484509025075-64c8133991bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80" class="h-96 w-full object-cover">
        </div>
        <div class="md:pt-32">
            <img src="https://images.unsplash.com/photo-1505066211281-ed125c006f4c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" class="h-96 w-full object-cover">
            <div class="px-12 py-24">
                <p class="text-gray-700 leading-relaxed mb-12">With design-savvy tips and expert advice you'll learn all there is to know about decorating with plants and botanical styling, plus the necessities like light requirements and when to water and feed. From bathroom to boudoir and every room in between, create your very own green oasis with Plant Style.</p>
            </div>
        </div>
    </div>
</div>
<div class="bg-green-50 text-gray-800 text-opacity-40 font-semibold text-xs tracking-widest px-12">
    <div class="container mx-auto grid grid-cols-4 py-24">
        <div>
            <div class="text-gray-900 text-4xl font-display">tributary</div>
        </div>
        <div>
            <div class="font-display text-gray-900 text-sm tracking-widest mb-6">More Info</div>
            <a href="#" class="block mb-4">Shop</a>
            <a href="#" class="block mb-4">About</a>
            <a href="#" class="block mb-4">Info</a>
            <a href="#" class="block mb-4">FAQ</a>
        </div>
        <div>
            <div class="font-display text-gray-900 text-sm tracking-widest mb-6">Helpful Links</div>
            <a href="#" class="block mb-4">Shop</a>
            <a href="#" class="block mb-4">About</a>
            <a href="#" class="block mb-4">Info</a>
            <a href="#" class="block mb-4">FAQ</a>
        </div>
        <div>
            <div class="font-display text-gray-900 text-sm tracking-widest mb-6">Find out more</div>
            <a href="#" class="block mb-4">Shop</a>
            <a href="#" class="block mb-4">About</a>
            <a href="#" class="block mb-4">Info</a>
            <a href="#" class="block mb-4">FAQ</a>
        </div>
    </div>
</div>
<div class="bg-green-600 bg-opacity-30 text-green-900 text-sm lg:text-base text-center font-heading font-light tracking-widest uppercase p-12">©2021 design by novolio. images by unsplash</div>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer="defer"></script>
</div>`;