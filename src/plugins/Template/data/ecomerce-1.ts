export const source = `
<div x-data="{ cartOpen: false , isOpen: false }">
<!-- #region Header -->
<header class="bg-white">
    <div class="container mx-auto px-6 py-3">
        <div class="flex items-center justify-between">
            <div class="hidden w-full text-gray-600 md:flex md:items-center">
                <i class="gg-profile"></i>
            </div>
            <div
                class="w-full text-blue-900 md:text-center font-mono text-4xl font-semibold uppercase tracking-widest">
                Acme
            </div>
            <div class="flex items-center justify-end w-full">
                <button @click="cartOpen = !cartOpen" class="text-gray-600 focus:outline-none mx-4 sm:mx-0">
                    <i class="gg-shopping-cart"></i>
                </button>

                <div class="flex sm:hidden">
                    <button @click="isOpen = !isOpen" type="button"
                        class="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                        aria-label="toggle menu">
                        <i class="gg-menu-grid-r"></i>
                    </button>
                </div>
            </div>
        </div>
        <nav :class="isOpen ? '' : 'hidden'" class="sm:flex sm:justify-center sm:items-center mt-4">
            <div class="flex flex-col sm:flex-row">
                <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="index.html">Home</a>
                <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="category.html">Category</a>
                <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="product.html">Product</a>
                <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="cart.html">Cart</a>
                <a class="mt-3 text-gray-600 hover:underline sm:mx-3 sm:mt-0" href="contact.html">Contact</a>
            </div>
        </nav>
        <div class="relative mt-6 max-w-lg mx-auto">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i class="gg-search"></i>
            </span>

            <input
                class="pl-10 block w-full border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                type="text" placeholder="Search">
        </div>
    </div>
</header>
<!-- #endregion Header -->

<!-- #region Cart -->
<div :class="cartOpen ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'"
    class="fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 hidden"
    x-init="() => { $el.classList.remove('hidden'); }">
    <div class="flex items-center justify-between">
        <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
        <button @click="cartOpen = !cartOpen" class="text-gray-600 focus:outline-none">
            <i class="gg-close"></i>
        </button>
    </div>
    <hr class="my-3">
    <div class="flex justify-between mt-6">
        <div class="flex">
            <img class="h-20 w-20 object-cover" src="images/tshirt-front-white-small.png" alt="">
            <div class="mx-3">
                <h3 class="text-sm text-gray-600">T-Shirt</h3>
                <div class="flex items-center mt-2">
                    <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                        <i class="gg-remove"></i>
                    </button>
                    <span class="text-gray-700 mx-2">2</span>
                    <button class="text-gray-500 focus:outline-none focus:text-gray-600">
                        <i class="gg-add"></i>
                    </button>
                </div>
            </div>
        </div>
        <span class="text-gray-600">$24.99</span>
    </div>
    <a
        class="flex cursor-pointer items-center justify-center mt-4 px-3 py-2 bg-green-700 text-white text-sm uppercase font-medium hover:bg-green-500 focus:outline-none focus:bg-green-500">
        <span>Checkout</span>
        <i class="px-2 gg-arrow-right"></i>
    </a>
</div>
<!-- #endregion Cart -->

<main class="my-8">
    <!-- #region Body -->
    <div class="container mx-auto px-6">
        <div class="h-96 overflow-hidden bg-cover bg-center"
            style="background-image: url('https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')">
            <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                <div class="px-10 max-w-xl">
                    <h2 class="text-2xl text-white font-semibold">Hats</h2>
                    <p class="mt-2 text-gray-400">Get ready to elevate your fashion game with our incredible
                        hats sale! From trendy fedoras to classic beanies, you won't want to miss these
                        unbeatable deals.</p>
                    <button
                        class="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                        <span>Shop Now</span>
                        <i class="px-2 gg-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex flex-col py-10 md:flex-row md:py-14">

            <div
                class="mx-auto flex w-4/5 items-start justify-start pb-3 last:border-r-0 sm:w-1/2 md:w-2/5 md:flex-col md:items-center md:justify-center md:border-r-2 md:border-primary-lighter md:pb-0 md:text-center lg:mx-0 lg:w-1/3 lg:flex-row lg:text-left">
                <div>
                    <i class="gg-box"></i>
                </div>
                <div class="ml-6 md:mt-3 lg:mt-0">
                    <h3 class="font-hk text-xl font-semibold tracking-wide text-primary">
                        Free shipping
                    </h3>
                    <p class="font-hk text-base tracking-wide text-secondary-lighter">
                        On all orders over $30
                    </p>
                </div>
            </div>

            <div
                class="mx-auto flex w-4/5 items-start justify-start pb-3 last:border-r-0 sm:w-1/2 md:w-2/5 md:flex-col md:items-center md:justify-center md:border-r-2 md:border-primary-lighter md:pb-0 md:text-center lg:mx-0 lg:w-1/3 lg:flex-row lg:text-left">
                <div>
                    <i class="gg-phone"></i>
                </div>
                <div class="ml-6 md:mt-3 lg:mt-0">
                    <h3 class="font-hk text-xl font-semibold tracking-wide text-primary">
                        Always available
                    </h3>
                    <p class="font-hk text-base tracking-wide text-secondary-lighter">
                        24/7 call center available
                    </p>
                </div>
            </div>

            <div
                class="mx-auto flex w-4/5 items-start justify-start pb-3 last:border-r-0 sm:w-1/2 md:w-2/5 md:flex-col md:items-center md:justify-center md:border-r-2 md:border-primary-lighter md:pb-0 md:text-center lg:mx-0 lg:w-1/3 lg:flex-row lg:text-left">
                <div>
                    <i class="gg-mail"></i>
                </div>
                <div class="ml-6 md:mt-3 lg:mt-0">
                    <h3 class="font-hk text-xl font-semibold tracking-wide text-primary">
                        Free returns
                    </h3>
                    <p class="font-hk text-base tracking-wide text-secondary-lighter">
                        30 days free return policy
                    </p>
                </div>
            </div>

        </div>

        <div class="md:flex">
            <div class="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 mt-6">
                <div class="w-full h-64 mx-auto overflow-hidden bg-cover bg-center"
                    style="background-image: url('https://images.unsplash.com/photo-1588795904317-2f4ab1a0a852?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')">
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                        <div class="px-10">
                            <h2 class="text-2xl text-white font-semibold">Shirts</h2>
                            <p class="mt-2 text-gray-400">Upgrade your wardrobe with our latest shirt
                                collection! From crisp office wear to casual weekend styles, we've got you
                                covered for any occasion.</p>
                            <button
                                class="flex items-center mt-4 text-white text-sm uppercase font-medium hover:underline focus:outline-none">
                                <span>Shop Now</span>
                                <i class="px-2 gg-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="w-full h-64 mx-auto overflow-hidden bg-cover bg-center"
                    style="background-image: url('https://images.unsplash.com/photo-1631160246898-58192f971b5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80')">
                    <div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
                        <div class="px-10">
                            <h2 class="text-2xl text-white font-semibold">Accessories</h2>
                            <p class="mt-2 text-gray-400">Whether you're looking for a statement piece or a
                                versatile addition to your wardrobe, we have the perfect item to tie your look
                                together.</p>
                            <button
                                class="flex items-center mt-4 text-white text-sm uppercase font-medium hover:underline focus:outline-none">
                                <span>Shop Now</span>
                                <i class="px-2 gg-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-12 mb-3 flex flex-col items-center justify-between sm:mb-10 sm:flex-row sm:pb-4 lg:pb-0">
            <div class="text-center sm:text-left">
                <h2 class="text-3xl md:text-4xl">
                    Trending Products
                </h2>
            </div>
            <a href="category.html"
                class="group flex items-center text-xl transition-colors sm:pt-0 text-blue-500 hover:text-blue-900">
                Show more
                <i class="px-2 gg-arrow-right"></i>
            </a>
        </div>
        <div class="mt-8">
            <div class="grid gap-6 grid-cols-2 lg:grid-cols-4 mt-6">
                <div
                    class="w-full max-w-sm mx-auto shadow-md overflow-hidden bg-gradient-to-b from-neutral-500 to-neutral-900 hover:from-neutral-600 hover:to-neutral-900">
                    <div class="flex items-end justify-end h-64 w-full bg-cover bg-center"
                        style="background-image: url('images/Beanie-grey-medium.png')">
                    </div>
                    <div class="px-5 py-3 bg-white">
                        <h3 class="text-gray-700 uppercase">Beanie</h3>
                        <span class="text-gray-500 mt-2">$9.99</span>
                    </div>
                </div>
                <div
                    class="w-full max-w-sm mx-auto shadow-md overflow-hidden bg-gradient-to-b from-neutral-500 to-neutral-900 hover:from-neutral-600 hover:to-neutral-900">
                    <div class="flex items-end justify-end h-64 w-full bg-cover bg-center"
                        style="background-image: url('images/jersey-front-black-medium.png')">
                    </div>
                    <div class="px-5 py-3 bg-white">
                        <h3 class="text-gray-700 uppercase">Jersey</h3>
                        <span class="text-gray-500 mt-2">$49.99</span>
                    </div>
                </div>
                <div
                    class="w-full max-w-sm mx-auto shadow-md overflow-hidden bg-gradient-to-b from-neutral-500 to-neutral-900 hover:from-neutral-600 hover:to-neutral-900">
                    <div class="flex items-end justify-end h-64 w-full bg-cover bg-center"
                        style="background-image: url('images/tshirt-front-blue-medium.png')">
                    </div>
                    <div class="px-5 py-3 bg-white">
                        <h3 class="text-gray-700 uppercase">T-Shirt</h3>
                        <span class="text-gray-500 mt-2">$24.99</span>
                    </div>
                </div>
                <div
                    class="w-full max-w-sm mx-auto shadow-md overflow-hidden bg-gradient-to-b from-neutral-500 to-neutral-900 hover:from-neutral-600 hover:to-neutral-900">
                    <div class="flex items-end justify-end h-64 w-full bg-cover bg-center"
                        style="background-image: url('images/buckethat-white-medium.png')">
                    </div>
                    <div class="px-5 py-3 bg-white">
                        <h3 class="text-gray-700 uppercase">Bucket Hat</h3>
                        <span class="text-gray-500 mt-2">$9.99</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- #region Body -->
</main>

<!-- #region Footer-->
<footer class="bg-slate-200">
    <div class="bg-slate-900 text-white">
        <div class="py-16 sm:py-20 md:py-24 container mx-auto px-6">
            <div class="mx-auto flex flex-col items-center justify-between lg:flex-row">
                <div class="text-center lg:text-left w-full">
                    <h4 class="pb-8 text-xl font-bold">Contact</h4>
                    <ul>
                        <li class="block pb-2">
                            <a href="mailto:test.email0123@elyssi.com"
                                class="text-base transition-colors hover:text-primary">support@acme.com</a>
                        </li>
                        <li class="block pb-2">
                            <a href="tel:5555555555"
                                class="text-base transition-colors hover:text-primary">(555) 555-5555</a>
                        </li>
                    </ul>
                </div>
                <div class="py-16 text-center lg:py-0 w-full">
                    <a href="index.html" class="font-mono text-4xl uppercase tracking-widest">Acme</a>
                    <div class="flex items-center justify-center pt-5">
                        <a href="#">
                            <div
                                class="mr-5 flex items-center rounded-full bg-white px-2 py-2 group-hover:bg-blue-200">
                                <i class="gg-facebook text-gray-900"></i>
                            </div>
                        </a>
                        <a href="#">
                            <div
                                class="mr-5 flex items-center rounded-full bg-white px-2 py-2 group-hover:bg-blue-200">
                                <i class="gg-twitter text-gray-900"></i>
                            </div>
                        </a>
                        <a href="#">
                            <div
                                class="mr-5 flex items-center rounded-full bg-white px-2 py-2 group-hover:bg-blue-200">
                                <i class="gg-instagram text-gray-900"></i>
                            </div>
                        </a>
                        <a href="#">
                            <div
                                class="flex items-center rounded-full bg-white px-2 py-2 group-hover:bg-blue-200">
                                <i class="gg-slack text-gray-900"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="text-center lg:text-right w-full">
                    <h4 class="pb-8 text-xl font-bold">Links</h4>
                    <ul>
                        <li class="block pb-2">
                            <a href="index.html" class="text-base transition-colors hover:text-primary">Home</a>
                        </li>
                        <li class="block pb-2">
                            <a href="category.html"
                                class="text-base transition-colors hover:text-primary">Category</a>
                        </li>
                        <li class="block pb-2">
                            <a href="product.html"
                                class="text-base transition-colors hover:text-primary">Product</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="py-2">
        <p class="text-center text-base text-secondary">
       
        </p>
    </div>
</footer>

<!-- #endregion Footer -->
</div>`;