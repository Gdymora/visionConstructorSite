export const source =`
<title>outlet</title>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Prata&family=Karla:wght@200;300;400;600;700&display=swap" rel="stylesheet">
 
<script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'display' : ['Playfair Display', 'serif'],
            'heading' : ['Fira Sans Condensed', 'serif'],
            'sans' : ['Overpass', 'sans-serif']
          }
        }
      }
    }
</script> 
<div class="font-sans text-gray-700 antialiased bg-white">
<script>
const menu = () => ({
    showContactInfo: false,
    showMobileMenu: false,
});
</script>
<div x-data="menu()">
    <div class="container mx-auto px-6 flex justify-between items-center py-4 h-32">
        <div class="flex items-center h-full">
            <a href="/" class="text-2xl font-bold text-black tracking-tighter h-full flex items-center">outlet</a>
            <div class="hidden lg:flex items-center text-xs uppercase tracking-wider ml-4">
                <a href="/products" class="ml-8">Catalog</a>
                <a href="/about" class="ml-8">About</a>
                <a href="/blog" class="ml-8">Blog</a>
                <button x-on:click="showContactInfo = true" type="button" class="uppercase ml-8">Contact</button>
            </div>
        </div>
        <div class="flex items-center text-xs uppercase tracking-wider">
            <a href="/cart" class="ml-8">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
            </a>
        </div>
        <template x-if="showContactInfo">
            <div class="z-50 bg-black bg-opacity-50 fixed inset-0 w-screen min-h-screen lg:h-screen lg:flex lg:justify-center lg:items-center p-12">
                <div class="w-full max-w-sm bg-white text-xs uppercase shadow-2xl">
                    <div class="pt-6 pr-6 flex justify-end">
                        <button x-on:click="showContactInfo = false" type="button">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="px-12 pb-12 pt-2">
                        <a href="tel:01632 960192" class="flex items-center my-2">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                             01632 960192 
                        </a>
                        <a href="mailto:hitir48807@netjook.com" class="flex items-center my-2">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                             hitir48807@netjook.com
                        </a>
                        <div class="flex items-center my-2">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                             MON-SAT, 9-5 | SUN, 10-4
                        </div>
                        <a href="https://www.google.com/maps/place/2321 Wildwood Street, OH, 44503" target="_blank" class="flex items-center my-2">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                             2321 Wildwood Street, OH, 44503
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </div>
    <div class="flex justify-center items-center">
        <button x-on:click="showMobileMenu = true" class="flex lg:hidden uppercase text-xs items-center -mt-6 mb-6">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
            </svg>
             Menu
        </button>
    </div>
    <template x-if="showMobileMenu">
        <div class="md:hidden fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-gray-100 z-40 uppercase space-y-4 text-xl tracking-widest text-center text-black">
            <a href="/products">Catalog</a>
            <a href="/about">About</a>
            <a href="/blog">Blog</a>
            <button x-on:click="showContactInfo = true" type="button" class="uppercase tracking-widest text-black">Contact</button>
            <button class="absolute top-0 right-0 pr-8 pt-4" x-on:click="showMobileMenu = false" type="button">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </button>
        </div>
    </template>
</div>
<div class="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12">
    <div class="lg:col-span-5 py-12 md:px-12 md:py-32 flex items-center justify-center">
        <div class="max-w-sm">
            <h1 class="text-5xl md:text-6xl mb-6 font-display text-black leading-tight">Our new arrivals</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/products" class="flex items-center mt-8 uppercase text-sm text-black font-semibold">
                Shop now 
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>
    </div>
    <script>
    const slideshow = () => ({
        current: 0,
        items: [{
            "image": "https://images.unsplash.com/photo-1515555230216-82228b88ea98?auto=format&amp;fit=crop&amp;w=900&amp;q=60",
            "url": "/product"
        }, {
            "image": "https://images.unsplash.com/photo-1601144537792-c401ba4e30ba?auto=format&amp;fit=crop&amp;w=900&amp;q=60",
            "url": "/product"
        }, {
            "image": "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&amp;fit=crop&amp;w=900&amp;q=60",
            "url": "/product"
        }, {
            "image": "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&amp;fit=crop&amp;w=900&amp;q=60",
            "url": "/product"
        }, {
            "image": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&amp;fit=crop&amp;w=900&amp;q=60",
            "url": "/product"
        }]
    });
    </script>
    <div x-data="slideshow()" class="lg:col-span-7 relative h-52 md:h-72 lg:h-auto">
        <a :href="items[current].url" href="/product">
            <img x-bind:src="items[current].image" class="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1515555230216-82228b88ea98?auto=format&amp;amp;fit=crop&amp;amp;w=900&amp;amp;q=60">
        </a>
        <div class="absolute bottom-0 right-0 grid grid-cols-2">
            <button class="p-4 md:p-6 bg-white hover:bg-gray-100 hover:opacity-80" x-on:click="current = current > 0 ? current - 1 : items.length - 1">
                <svg class="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button class="p-4 md:p-6 bg-white hover:bg-gray-100 hover:opacity-80" x-on:click="current = current < items.length - 1 ? current + 1 : 0">
                <svg class="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    </div>
</div>
<h2 class="text-center uppercase font-display text-lg md:text-xl text-black py-12 md:py-24 px-6">Our Collections</h2>
<div class="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 lg:mb-24">
    <div class="relative h-52 md:h-72 lg:h-auto">
        <a href="/category">
            <img src="https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
        </a>
    </div>
    <div class="px-6 py-12 md:p-16 lg:p-32 flex items-center justify-center order-last">
        <div>
            <h3 class="text-4xl mb-6 font-display text-black leading-tight">Bags + Clutches</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/category" class="flex items-center mt-8 uppercase text-sm text-black font-semibold">
                Shop now 
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>
    </div>
</div>
<div class="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 lg:mb-24">
    <div class="relative h-52 md:h-72 lg:h-auto">
        <a href="/category">
            <img src="https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
        </a>
    </div>
    <div class="px-6 py-12 md:p-16 lg:p-32 flex items-center justify-center order-last lg:order-first">
        <div>
            <h3 class="text-4xl mb-6 font-display text-black leading-tight">Clothing</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/category" class="flex items-center mt-8 uppercase text-sm text-black font-semibold">
                Shop now 
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>
    </div>
</div>
<div class="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 lg:mb-24">
    <div class="relative h-52 md:h-72 lg:h-auto">
        <a href="/category">
            <img src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
        </a>
    </div>
    <div class="px-6 py-12 md:p-16 lg:p-32 flex items-center justify-center order-last">
        <div>
            <h3 class="text-4xl mb-6 font-display text-black leading-tight">Jewellery</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/category" class="flex items-center mt-8 uppercase text-sm text-black font-semibold">
                Shop now 
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>
    </div>
</div>
<h2 class="text-center uppercase font-display text-lg lg:text-xl text-black py-12 md:py-24 px-6">Latest Products</h2>
<div class="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 grid-rows-none lg:grid-rows-2 gap-8 text-center text-sm uppercase">
    <div class="col-span-1 row-span-1">
        <div class="w-full h-52 relative">
            <a href="/product">
                <img src="https://images.unsplash.com/photo-1515555230216-82228b88ea98?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
            </a>
        </div>
        <div class="p-6">
            <a href="/product" class="block font-semibold text-black mb-1">Shoes</a>
            <div>£39</div>
        </div>
    </div>
    <div class="col-span-1 row-span-1 lg:col-span-2 lg:row-span-2">
        <div class="w-full h-52 lg:h-96 relative">
            <a href="/product">
                <img src="https://images.unsplash.com/photo-1601144537792-c401ba4e30ba?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
            </a>
        </div>
        <div class="p-6">
            <a href="/product" class="block font-semibold text-black mb-1">Nike Airforce</a>
            <div>£104.99</div>
        </div>
    </div>
    <div class="col-span-1 row-span-1">
        <div class="w-full h-52 relative">
            <a href="/product">
                <img src="https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
            </a>
        </div>
        <div class="p-6">
            <a href="/product" class="block font-semibold text-black mb-1">Handbag</a>
            <div>£39</div>
        </div>
    </div>
    <div class="col-span-1 row-span-1">
        <div class="w-full h-52 relative">
            <a href="/product">
                <img src="https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
            </a>
        </div>
        <div class="p-6">
            <a href="/product" class="block font-semibold text-black mb-1">Earings</a>
            <div>£29</div>
        </div>
    </div>
    <div class="col-span-1 row-span-1">
        <div class="w-full h-52 relative">
            <a href="/product">
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&amp;fit=crop&amp;w=900&amp;q=60" class="absolute inset-0 w-full h-full object-cover">
            </a>
        </div>
        <div class="p-6">
            <a href="/product" class="block font-semibold text-black mb-1">Autumn Collection</a>
            <div>£42.56</div>
        </div>
    </div>
</div>
<div class="container mx-auto py-20 mt-12 md:mt-24 border-t border-gray-200">
    <div class="bg-black relative">
        <div class="relative z-10 text-white text-center px-6 md:px-12 py-24 md:py-48">
            <h3 class="font-display text-2xl">End of Season Sale</h3>
            <p class="mt-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
            <a href="/products" class="inline-block bg-black uppercase text-sm py-4 px-6 mt-8 hover:opacity-75">Browse</a>
        </div>
        <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2550&amp;q=80" class="absolute inset-0 w-full h-full object-cover opacity-75">
    </div>
</div>
<div class="container mx-auto border-t border-gray-200 px-6">
    <div class="text-center max-w-md mx-auto my-12 md:my-24">
        <p class="text-lg">"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
        <div class="mt-4 font-bold">novolio</div>
    </div>
</div>
<div class="container mx-auto flex flex-wrap justify-between border-t border-b border-gray-200 py-6 mb-8">
    <form class="flex flex-wrap sm:flex-nowrap w-full sm:max-w-sm px-6" name="subscribe" method="POST">
        <input type="text" name="email" required="" class="h-12 flex-1 border border-gray-200 text-center sm:text-left uppercase font-semibold px-4 text-sm" placeholder="Email address">
        <button class="w-full sm:w-auto h-12 px-6 flex justify-center items-center uppercase text-sm bg-gray-900 text-white flex-shrink-0">Subscribe</button>
    </form>
    <div class="w-full sm:w-auto flex items-center justify-center sm:justify-end px-6 mt-6 sm:mt-0">
        <a href="#" class="mx-2">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg>
        </a>
        <a href="#" class="mx-2">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
            </svg>
        </a>
        <a href="#" class="mx-2">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"></path>
            </svg>
        </a>
        <a href="#" class="mx-2">
            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"></path>
            </svg>
        </a>
    </div>
</div>
<div class="container mx-auto px-6 flex flex-wrap uppercase text-sm font-bold text-gray-900 py-6">
    <div class="flex-1">
        <a href="/products" class="block mt-2">Catalog</a>
        <a href="/about" class="block mt-2">About</a>
        <a href="/blog" class="block mt-2">Blog</a>
    </div>
    <div class="flex-1">
        <a href="/login" class="block mt-2">Login</a>
        <a href="/register" class="block mt-2">Register</a>
        <a href="/blog" class="block mt-2">Blog</a>
    </div>
    <div class="flex-1">
        <a href="/products" class="block mt-2">Catalog</a>
        <a href="/about" class="block mt-2">About</a>
        <a href="/blog" class="block mt-2">Blog</a>
    </div>
    <div class="w-full mt-12 md:mt-0 md:w-4/12">
        <h4>outlet</h4>
        <p class="normal-case leading-relaxed mt-2 max-w-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</p>
    </div>
</div>
<div class="container mx-auto text-center py-12 mt-12 border-t border-gray-200 text-xs uppercase">
    <div>Copyright &copy; 2021 novolio</div>
    <div class="text-gray-400 mt-2">Images by Unsplash</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.2/dist/alpine.min.js" defer="defer"></script>
</div>`;