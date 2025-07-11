export const source =`
<link rel="preconnect" href="https://fonts.gstatic.com"> 
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@100;200;300;400;500;600;700&family=Playfair+Display:wght@100;200;300;400;500;600;700&family=Overpass:wght@200;300;400;600;700&display=swap" rel="stylesheet">
<style>
    /* We reccomend adding these styles to your tailwind config or global stylesheet. */
    .font-display {
        font-family: 'Playfair Display', serif;
    }
    .font-heading {
        font-family: 'Fira Sans Condensed', sans-serif;
    }
    .font-sans {
        font-family: 'Overpass', sans-serif;
    }
</style>

<div class="font-sans antialiased bg-white">

<div class="h-24 z-10 relative container mx-auto px-6 grid grid-cols-3">

    <div class="flex items-center">
        <!-- menu button -->
        <button>
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
    </div>

    <div class="flex items-center justify-center">
        <a href="#">
            <!-- logo -->
            <svg class="h-24 w-auto text-white fill-current" viewBox='0 0 177.778 100'><path d='M31.941,62.825h25.65V37.175H31.941ZM52.654,47.532h-5.42v-5.42h5.42Zm-15.777-5.42H42.3V52.468H52.654v5.42H36.877Zm37.417-4.937A12.825,12.825,0,1,0,87.119,50,12.84,12.84,0,0,0,74.294,37.175Zm0,20.713A7.888,7.888,0,1,1,82.182,50,7.9,7.9,0,0,1,74.294,57.888Zm58.719-20.713A12.825,12.825,0,1,0,145.837,50,12.84,12.84,0,0,0,133.013,37.175Zm0,20.713A7.888,7.888,0,1,1,140.9,50,7.9,7.9,0,0,1,133.013,57.888Zm-29.36-20.713A12.825,12.825,0,1,0,116.478,50,12.84,12.84,0,0,0,103.653,37.175Zm0,20.713a7.888,7.888,0,1,1,7.488-10.356h-7.488v4.936h7.488A7.9,7.9,0,0,1,103.653,57.888Z'/></svg>
        </a>
    </div>

    <div class="flex items-center justify-end">
        <!-- add to cart button -->
        <button>
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </button>
    </div>
</div>

<div class="-mt-24 relative w-full py-12 px-12 bg-yellow-900">
    <!-- hero section -->
    <div class="relative z-10 text-center py-48">
        <h1 class="text-white text-center text-6xl font-display font-bold mb-12">A ride for every lifestyle</h1>
        <a href="#" class="inline-block bg-yellow-800 text-white uppercase text-sm tracking-widest font-heading px-8 py-4">Shop now</a>
    </div>

    <!-- hero links -->
    <div class="relative z-10 mx-auto max-w-4xl flex justify-between uppercase text-white font-heading tracking-widest text-sm">
        <a href="#" class="border-b border-white">Find out more</a>
        <a href="#" class="border-b border-white">Get in touch</a>
    </div>

    <!-- banner image -->
    <img src="https://images.unsplash.com/photo-1490129375591-2658b3e2ee50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2244&q=80" class="w-full h-full absolute inset-0 object-cover opacity-70" />
</div>

<!-- featured section -->

<div class="grid grid-cols-2">

    <div class="bg-white p-24 flex justify-end items-center">
        <!-- featured image -->
        <img src="https://images.unsplash.com/photo-1501631259223-89d4e246ed23?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1960&q=80" class="max-w-md" />
    </div>

    <div class="bg-gray-100 p-24 flex justify-start items-center">
        
        <!-- featured title & excerpt -->
        <div class="max-w-md">
            <div class="w-24 h-2 bg-yellow-800 mb-4"></div>
            <h2 class="font-display font-bold text-4xl mb-6">Speed: A jogging stroller that keeps up with you</h2>
            <p class="font-light text-gray-600 mb-6 leading-relaxed">The all new Speed model is designed with the active life in mind. Speed moves smoothly thanks to an all-wheel suspension, air-filled tires, and folds with ease due to a new ergonomic trigger release.</p>
            <a href="#" class="inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-8 hover:bg-yellow-800 hover:text-white">View model</a>
        </div>

    </div>

</div>

<img src="https://images.unsplash.com/photo-1501901609772-df0848060b33?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="w-full h-screen object-cover" />

<div class="max-w-xl mx-auto text-center py-32">
    <div class="w-24 h-2 bg-yellow-800 mb-4 mx-auto"></div>
    <h2 class="font-display font-bold text-5xl mb-6">Stork means versatility</h2>
    <p class="font-light text-gray-600 mb-6 leading-relaxed">Our strollers are guaranteed to perform wherever your adventure takes you next.</p>
</div>

<div class="grid grid-cols-3 bg-black">
    <a href="#" class="bg-black relative block flex items-center justify-center h-72 font-heading text-white uppercase tracking-widest hover:opacity-75">
        <div class="relative z-10">Forest Trails</div>
        <img src="https://images.unsplash.com/photo-1449495169669-7b118f960251?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50" />
    </a>
    <a href="#" class="bg-black relative block flex items-center justify-center h-72 font-heading text-white uppercase tracking-widest hover:opacity-75">
        <div class="relative z-10">City Streets</div>
        <img src="https://images.unsplash.com/uploads/1411070807173e4d6762d/f84a3a01?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50" />
    </a>
    <a href="#" class="bg-black relative block flex items-center justify-center h-72 font-heading text-white uppercase tracking-widest hover:opacity-75">
        <div class="relative z-10">Sandy Beaches</div>
        <img src="https://images.unsplash.com/photo-1528855275993-0f4a23fedd62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="absolute inset-0 w-full h-full object-cover opacity-50" />
    </a>
</div>

<div class="grid grid-cols-2">
    <div class="bg-gray-100 p-24 flex justify-start items-center">
        <div class="max-w-md">
            <div class="w-24 h-2 bg-yellow-800 mb-4"></div>
            <h2 class="font-display font-bold text-4xl mb-6">Our sustainability promise</h2>
            <p class="font-light text-gray-600 mb-6 leading-relaxed">At Stork we know you care deeply about the earth that our children will inherit. That’s why we only use materials that are manufactured with sustainability in mind.</p>
            <a href="#" class="inline-block border-2 border-yellow-800 font-light text-yellow-800 text-sm uppercase tracking-widest py-3 px-8 hover:bg-yellow-800 hover:text-white">Learn more</a>
        </div>
    </div>
    <div class="bg-white p-24 flex justify-end items-center">
        <img src="https://images.unsplash.com/photo-1521145239174-279dc2227166?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" class="max-w-md" />
    </div>
</div>

<div class="relative w-full py-12 px-12">
    <div class="relative z-10 text-center py-24">
        <h1 class="text-white text-center text-6xl font-display font-bold mb-6">Endlessly customizable</h1>
        <p class="text-white mb-10 font-bold text-lg">Discover useful accessories for your Stork stroller that fit your unique needs.</p>
        <a href="#" class="inline-block bg-yellow-800 text-white uppercase text-sm tracking-widest font-heading px-8 py-4">View accessories</a>
    </div>

    <img src="https://images.unsplash.com/photo-1503516459261-40c66117780a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80" class="w-full h-full absolute inset-0 object-cover" />
</div>

<div class="bg-gray-900 text-white text-opacity-40 font-semibold uppercase text-xs tracking-widest bg-opacity-80 px-12">
    <div class="container mx-auto grid grid-cols-4 py-24">
        <div>
            <div class="text-white opacity-50 text-4xl font-display">Impulse</div>				
        </div>
        <div>
            <div class="font-display text-white uppercase text-sm tracking-widest mb-6">More Info</div>
            <a href="#" class="block mb-4">Shop</a>
            <a href="#" class="block mb-4">About</a>
            <a href="#" class="block mb-4">Info</a>
            <a href="#" class="block mb-4">FAQ</a>
        </div>
        <div>
            <div class="font-display text-white uppercase text-sm tracking-widest mb-6">Helpful Links</div>
            <a href="#" class="block mb-4">Shop</a>
            <a href="#" class="block mb-4">About</a>
            <a href="#" class="block mb-4">Info</a>
            <a href="#" class="block mb-4">FAQ</a>
        </div>
        <div>
            <div class="font-display text-white uppercase text-sm tracking-widest mb-6">Find out more</div>
            <a href="#" class="block mb-4">Shop</a>
            <a href="#" class="block mb-4">About</a>
            <a href="#" class="block mb-4">Info</a>
            <a href="#" class="block mb-4">FAQ</a>
        </div>
    </div>
    <div class="text-sm lg:text-base text-center font-heading font-light tracking-widest uppercase text-white opacity-75 pb-24">
        ©2021 design by novolio. images by unsplash
    </div>
</div>

</div>`;