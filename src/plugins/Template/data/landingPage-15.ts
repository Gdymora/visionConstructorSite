export const source =`
<script>
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        'display' : ['Nunito', 'sans-serif'],
        'sans' : ['Work Sans', 'sans-serif']
      }
    }
  }
}
</script> 
<div class="font-sans antialiased bg-gray-100 text-gray-700">
<div class="h-8 z-10 relative bg-blue-100 text-blue-900 text-xs text-center tracking-wider flex items-center justify-center px-6">Free shipping on all orders over £50</div>
<div x-data="{showMenu: false}" class="h-24 z-40 relative container mx-auto px-6 flex items-center justify-between text-white">
<div>
    <a href="/" class="lowercase font-normal text-xl">essential</a>
</div>
<div class="flex items-center justify-center font-normal relative z-10">
    <button class="md:hidden" x-on:click="showMenu = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-white h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
    </button>
    <div class="hidden md:flex items-center justify-center">
        <a href="/products" class="mx-6">Shop</a>
        <a href="/about" class="mx-6">About</a>
        <a href="/blog" class="mx-6">Articles</a>
    </div>
</div>
<div class="flex">
    <a href="#" class="ml-4">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
    </a>
    <a href="#" class="ml-4">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
    </a>
</div>
<div x-show="showMenu" class="fixed inset-0 w-screen h-screen md:hidden flex flex-col items-center justify-center text-2xl space-y-4 bg-blue-100 text-white z-40">
    <button x-on:click="showMenu = false" class="absolute top-0 right-0 mt-12 mr-12 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
    </button>
    <a href="/products" class="mx-6">Shop</a>
    <a href="/about" class="mx-6">About</a>
    <a href="/blog" class="mx-6">Articles</a>
</div>
</div>
<script>
const slideshow = () => ({
current: 0,
images: [
'https://images.unsplash.com/photo-1604014472507-ff028430732b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
'https://images.unsplash.com/photo-1594325624708-75a0a6cf806f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
],
init() {
    window.setInterval(() => {
        this.current = this.current < this.images.length - 1 ? this.current + 1 : 0
    }, 4000);
}
});
</script>
<div x-data="slideshow()" x-init="init()" class="-mt-32 relative w-full h-screen bg-blue-100 flex items-center justify-center">
<div class="relative z-10 text-center text-white text-center px-6">
    <div class="text-xs uppercase tracking-widest">Clean and affordable beauty</div>
    <h1 class="text-3xl md:text-5xl font-display font-semibold mt-2">Beautiful, natural skin</h1>
    <p class="mt-4">A unique layout with a striking design</p>
    <div class="max-w-sm mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <a href="#" class="inline-block bg-blue-200 text-white text-sm tracking-widest font-heading px-8 py-4">Shop now</a>
        <a href="#" class="inline-block bg-gray-100 text-gray-700 text-sm tracking-widest font-heading px-8 py-4">Learn more</a>
    </div>
</div>
<img x-bind:src="images[current]" class="w-full h-full absolute inset-0 object-cover opacity-95">
</div>
<div class="container mx-auto px-6 flex flex-wrap items-center py-24">
<div class="w-full lg:flex-1">
    <div class="uppercase text-sm text-gray-700 tracking-widest">Why Cheslsea?</div>
    <h2 class="text-3xl md:text-4xl font-semibold font-display mt-3">Natural and organic is the future of skincare and life as we know it.</h2>
</div>
<div class="w-full lg:w-auto text-center">
    <svg class="inline-block w-32 h-32 -mb-10 -mt-4 lg:mt-0 lg:mb-0 lg:transform lg:rotate-90 lg:-ml-8" x="0px" y="0px" viewBox="0 0 100 125">
        <path d="M91.8 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7C70 47.3 68 45 64 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-.6 0-1 .4-1 1s.4 1 1 1c3 0 4.5 1.7 6.2 3.7 1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7.6 0 1-.4 1-1s-.4-1-1-1z"/>
    </svg>
</div>
<div class="w-full lg:flex-1">
    <p>Let's face it. Many cosmetics are bad for your skin. We use only natural ingredients and still provide consistently great tanning results.</p>
    <a href="#" class="inline-block bg-blue-200 text-white text-sm tracking-widest font-heading px-8 py-4 mt-4">Learn more</a>
</div>
</div>
<div class="p-4 grid grid-cols-1 md:grid-cols-5 grid-rows-2 gap-4 md:h-screen">
<a href="#" class="relative block bg-black text-white md:col-span-2">
    <div class="relative z-10 p-12">
        <h3 class="font-display text-2xl">Best Sellers</h3>
        <p class="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur.</p>
        <div class="inline-block bg-white text-gray-700 text-sm tracking-widest font-heading px-8 py-4 mt-6">Shop now</div>
    </div>
    <img src="https://images.unsplash.com/photo-1527632911563-ee5b6d53465b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover opacity-75">
</a>
<a href="#" class="relative block bg-black text-white md:col-span-3 lg:col-span-1">
    <div class="relative z-10 p-12">
        <h3 class="font-display text-2xl">Limited</h3>
        <p class="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur.</p>
        <div class="inline-block bg-white text-gray-700 text-sm tracking-widest font-heading px-8 py-4 mt-6">Shop now</div>
    </div>
    <img src="https://images.unsplash.com/photo-1531646317777-0619c7c5d1d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" class="absolute inset-0 w-full h-full object-cover opacity-75">
</a>
<a href="#" class="relative block bg-black text-white md:col-span-3 lg:col-span-2 lg:row-span-2">
    <div class="relative z-10 p-12">
        <h3 class="font-display text-2xl">New In</h3>
        <p class="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur.</p>
        <div class="inline-block bg-white text-gray-700 text-sm tracking-widest font-heading px-8 py-4 mt-6">Shop now</div>
    </div>
    <img src="https://images.unsplash.com/photo-1527633412983-d80af308e660?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80" class="absolute inset-0 w-full h-full object-cover opacity-75">
</a>
<a href="#" class="relative block bg-black text-white md:col-span-2 lg:col-span-1">
    <div class="relative z-10 p-12">
        <h3 class="font-display text-2xl">Sale</h3>
        <p class="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur.</p>
        <div class="inline-block bg-white text-gray-700 text-sm tracking-widest font-heading px-8 py-4 mt-6">Shop now</div>
    </div>
    <img src="https://images.unsplash.com/photo-1533017568856-f6085fef5f1f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" class="absolute inset-0 w-full h-full object-cover opacity-75">
</a>
<a href="#" class="relative block bg-black text-white md:col-span-5 lg:col-span-2">
    <div class="relative z-10 p-12">
        <h3 class="font-display text-2xl">Half Price</h3>
        <p class="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur.</p>
        <div class="inline-block bg-white text-gray-700 text-sm tracking-widest font-heading px-8 py-4 mt-6">Shop now</div>
    </div>
    <img src="https://images.unsplash.com/photo-1603001790877-2733c25430d7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80" class="absolute inset-0 w-full h-full object-cover opacity-75">
</a>
</div>
<div class="text-center py-12">
<a href="#" class="inline-block bg-blue-200 text-white text-sm tracking-widest font-heading px-8 py-4">Shop now</a>
</div>
<div class="p-4 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-screen">
<div class="text-gray-700 text-center md:col-span-2 flex items-center justify-center">
    <div class="relative z-10 p-12">
        <div class="uppercase text-sm text-gray-700 tracking-widest">Limited Run</div>
        <h3 class="font-display font-semibold text-3xl mt-2">Moisturise</h3>
        <p class="mt-3 mx-auto max-w-md">Whether in the sun or on the couch, hydration is key to maintaining happy, healthy skin.</p>
        <a href="#" class="inline-block bg-blue-200 text-white text-sm tracking-widest font-heading px-8 py-4 mt-6">Shop now</a>
    </div>
</div>
<div class="h-64 md:h-auto md:col-span-2 md:row-span-2 relative">
    <img src="https://images.unsplash.com/photo-1597931752949-98c74b5b159f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80" class="absolute inset-0 w-full h-full object-cover">
</div>
<div class="h-64 md:h-auto col-span-1 row-span-1 relative">
    <img src="https://images.unsplash.com/photo-1607602175460-c5dff74d7909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1482&q=80" class="absolute inset-0 w-full h-full object-cover">
</div>
<div class="h-64 md:h-auto col-span-1 row-span-1 relative">
    <img src="https://images.unsplash.com/photo-1598282780498-8eda08ec1941?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80" class="absolute inset-0 w-full h-full object-cover">
</div>
</div>
<div class="container mx-auto px-6 py-12">
<h2 class="font-display font-semibold text-3xl">Testimonials</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 mt-12">
    <div class="relative">
        <p class="relative z-10 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="relative z-10 text-sm flex items-center justify-end">
            <svg class="inline-block w-32 h-32 -mb-8" x="0px" y="0px" viewBox="0 0 100 125">
                <path d="M91.8 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7C70 47.3 68 45 64 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-.6 0-1 .4-1 1s.4 1 1 1c3 0 4.5 1.7 6.2 3.7 1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7.6 0 1-.4 1-1s-.4-1-1-1z"/>
            </svg>
            <span>Elle Spearman</span>
        </div>
        <svg class="absolute top-0 left-0 w-28 h-28 -mt-10 -ml-8 opacity-5" viewBox="0 0 95.333 95.332">
            <path d="M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793
                                    c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045
                                    s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076
                                    c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002
                                    c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z"/>
            <path d="M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019
                                    c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23
                                    c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16
                                    c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312
                                    c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z"/>
        </svg>
    </div>
    <div class="relative">
        <p class="relative z-10 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="relative z-10 text-sm flex items-center justify-end">
            <svg class="inline-block w-32 h-32 -mb-8" x="0px" y="0px" viewBox="0 0 100 125">
                <path d="M91.8 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7C70 47.3 68 45 64 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-.6 0-1 .4-1 1s.4 1 1 1c3 0 4.5 1.7 6.2 3.7 1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7.6 0 1-.4 1-1s-.4-1-1-1z"/>
            </svg>
            <span>Elle Spearman</span>
        </div>
        <svg class="absolute top-0 left-0 w-28 h-28 -mt-10 -ml-8 opacity-5" viewBox="0 0 95.333 95.332">
            <path d="M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793
                                    c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045
                                    s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076
                                    c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002
                                    c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z"/>
            <path d="M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019
                                    c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23
                                    c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16
                                    c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312
                                    c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z"/>
        </svg>
    </div>
    <div class="relative">
        <p class="relative z-10 text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="relative z-10 text-sm flex items-center justify-end">
            <svg class="inline-block w-32 h-32 -mb-8" x="0px" y="0px" viewBox="0 0 100 125">
                <path d="M91.8 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7C70 47.3 68 45 64 45c-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-3.9 0-5.9 2.3-7.7 4.3-1.7 2-3.2 3.7-6.2 3.7s-4.5-1.7-6.2-3.7c-1.8-2-3.8-4.3-7.7-4.3-.6 0-1 .4-1 1s.4 1 1 1c3 0 4.5 1.7 6.2 3.7 1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7s4.5 1.7 6.2 3.7c1.8 2 3.8 4.3 7.7 4.3 3.9 0 5.9-2.3 7.7-4.3 1.7-2 3.2-3.7 6.2-3.7.6 0 1-.4 1-1s-.4-1-1-1z"/>
            </svg>
            <span>Elle Spearman</span>
        </div>
        <svg class="absolute top-0 left-0 w-28 h-28 -mt-10 -ml-8 opacity-5" viewBox="0 0 95.333 95.332">
            <path d="M30.512,43.939c-2.348-0.676-4.696-1.019-6.98-1.019c-3.527,0-6.47,0.806-8.752,1.793
                                    c2.2-8.054,7.485-21.951,18.013-23.516c0.975-0.145,1.774-0.85,2.04-1.799l2.301-8.23c0.194-0.696,0.079-1.441-0.318-2.045
                                    s-1.035-1.007-1.75-1.105c-0.777-0.106-1.569-0.16-2.354-0.16c-12.637,0-25.152,13.19-30.433,32.076
                                    c-3.1,11.08-4.009,27.738,3.627,38.223c4.273,5.867,10.507,9,18.529,9.313c0.033,0.001,0.065,0.002,0.098,0.002
                                    c9.898,0,18.675-6.666,21.345-16.209c1.595-5.705,0.874-11.688-2.032-16.851C40.971,49.307,36.236,45.586,30.512,43.939z"/>
            <path d="M92.471,54.413c-2.875-5.106-7.61-8.827-13.334-10.474c-2.348-0.676-4.696-1.019-6.979-1.019
                                    c-3.527,0-6.471,0.806-8.753,1.793c2.2-8.054,7.485-21.951,18.014-23.516c0.975-0.145,1.773-0.85,2.04-1.799l2.301-8.23
                                    c0.194-0.696,0.079-1.441-0.318-2.045c-0.396-0.604-1.034-1.007-1.75-1.105c-0.776-0.106-1.568-0.16-2.354-0.16
                                    c-12.637,0-25.152,13.19-30.434,32.076c-3.099,11.08-4.008,27.738,3.629,38.225c4.272,5.866,10.507,9,18.528,9.312
                                    c0.033,0.001,0.065,0.002,0.099,0.002c9.897,0,18.675-6.666,21.345-16.209C96.098,65.559,95.376,59.575,92.471,54.413z"/>
        </svg>
    </div>
</div>
</div>
<div class="p-4 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-screen">
<div class="h-64 md:h-auto md:col-span-2 md:row-span-2 relative">
    <img src="https://images.unsplash.com/photo-1605204376600-72ed73f1f9ec?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2551&q=80" class="absolute inset-0 w-full h-full object-cover">
</div>
<div class="text-gray-700 text-center md:col-span-2 flex items-center justify-center">
    <div class="relative z-10 p-12">
        <div class="uppercase text-sm text-gray-700 tracking-widest">Only the best</div>
        <h3 class="font-display font-semibold text-3xl mt-2">Cleansers</h3>
        <p class="mt-3 mx-auto max-w-md">We're humans too and we understand that skin care and cosmetics should rejuvenate and rehydrate in the short and long run.</p>
        <a href="#" class="inline-block bg-blue-200 text-white text-sm tracking-widest font-heading px-8 py-4 mt-6">Shop now</a>
    </div>
</div>
<div class="h-64 md:h-auto col-span-1 row-span-1 relative">
    <img src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" class="absolute inset-0 w-full h-full object-cover">
</div>
<div class="h-64 md:h-auto col-span-1 row-span-1 relative">
    <img src="https://images.unsplash.com/photo-1585652757146-e9d00bf2810c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80" class="absolute inset-0 w-full h-full object-cover">
</div>
</div>
<div class="text-gray-800 text-opacity-40 font-semibold text-xs tracking-widest px-12">
<div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 py-24">
    <div>
        <div class="text-gray-900 text-4xl font-display">essential</div>
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
<div class="bg-gray-200 text-gray-500 text-sm lg:text-base text-center font-heading font-light tracking-widest uppercase p-12">©2021 design by novolio. images by unsplash</div>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer="defer"></script>
</div>`;