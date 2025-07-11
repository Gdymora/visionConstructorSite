export const source = ` 
<link href='https://unpkg.com/css.gg/icons/all.css' rel='stylesheet'>
<script src="//unpkg.com/alpinejs" defer></script>
<script src="main.js" defer></script>

<div>
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

        <!-- #region Product Info -->
        <div class="container grid grid-cols-2 gap-6 mx-auto">
            <div>
                <img src="images/tshirt-front-white-large.png" alt="product" class="w-full">
                <div class="grid grid-cols-5 gap-4 mt-4">
                    <img src="images/tshirt-front-white-small.png" alt="product"
                        class="w-full cursor-pointer border border-gray-400">
                    <img src="images/tshirt-side-white-small.png" alt="product"
                        class="w-full cursor-pointer border">
                    <img src="images/tshirt-back-white-small.png" alt="product"
                        class="w-full cursor-pointer border">
                </div>
            </div>

            <div>
                <h2 class="text-3xl font-medium uppercase mb-2">Shirt</h2>
                <div class="flex items-center mb-4">
                    <div class="flex gap-1 text-sm text-yellow-400">
                        <i class="star"></i>
                        <i class="star"></i>
                        <i class="star"></i>
                        <i class="star"></i>
                        <i class="star"></i>
                    </div>
                    <div class="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                </div>
                <div class="space-y-2">
                    <p class="text-gray-800 font-semibold space-x-2">
                        <span>Availability: </span>
                        <span class="text-green-600">In Stock</span>
                    </p>
                    <p class="space-x-2">
                        <span class="text-gray-800 font-semibold">Brand: </span>
                        <span class="text-gray-600">Elastic Path</span>
                    </p>
                    <p class="space-x-2">
                        <span class="text-gray-800 font-semibold">Category: </span>
                        <span class="text-gray-600">Tops</span>
                    </p>
                    <p class="space-x-2">
                        <span class="text-gray-800 font-semibold">SKU: </span>
                        <span class="text-gray-600">10001-W-L</span>
                    </p>
                </div>
                <div class="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                    <p class="text-xl text-primary font-semibold">$9.99</p>
                    <p class="text-base text-gray-400 line-through">$19.99</p>
                </div>

                <p class="mt-4 text-gray-600">Looking for a comfortable and stylish way to show off your favorite
                    brand? Our logo t-shirt is the perfect choice! Made from high-quality materials and featuring a
                    bold and eye-catching logo design, this t-shirt is the ideal way to express your love for your
                    favorite brand while staying comfortable and fashionable. Whether you're heading out for a
                    casual day with friends or just running errands around town, this logo t-shirt is sure to become
                    a staple in your wardrobe.</p>

                <div class="pt-4">
                    <h3 class="text-sm text-gray-800 uppercase mb-1">Size</h3>
                    <div class="flex items-center gap-2">
                        <div class="size-selector">
                            <input type="radio" name="size" id="size-xs" class="hidden">
                            <label for="size-xs"
                                class="text-xs border border-gray-200 h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XS</label>
                        </div>
                        <div class="size-selector">
                            <input type="radio" name="size" id="size-sm" class="hidden">
                            <label for="size-sm"
                                class="text-xs border border-gray-200 h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">S</label>
                        </div>
                        <div class="size-selector">
                            <input type="radio" name="size" id="size-m" class="hidden">
                            <label for="size-m"
                                class="text-xs border border-gray-200 h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">M</label>
                        </div>
                        <div class="size-selector">
                            <input type="radio" name="size" id="size-l" class="hidden">
                            <label for="size-l"
                                class="text-xs border border-gray-200 h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">L</label>
                        </div>
                        <div class="size-selector">
                            <input type="radio" name="size" id="size-xl" class="hidden">
                            <label for="size-xl"
                                class="text-xs border border-gray-200 h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">XL</label>
                        </div>
                    </div>
                </div>

                <div class="pt-4">
                    <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Color</h3>
                    <div class="flex items-center gap-2">
                        <div class="color-selector">
                            <input type="radio" name="color" id="black" class="hidden">
                            <label for="black"
                                class="border border-gray-200 h-6 w-6  cursor-pointer shadow-sm block"
                                style="background-color: #000;"></label>
                        </div>
                        <div class="color-selector">
                            <input type="radio" name="color" id="white" class="hidden">
                            <label for="white"
                                class="border border-gray-200 h-6 w-6  cursor-pointer shadow-sm block"
                                style="background-color: #fff;"></label>
                        </div>
                        <div class="color-selector">
                            <input type="radio" name="color" id="gray" class="hidden">
                            <label for="gray" class="border border-gray-200 h-6 w-6  cursor-pointer shadow-sm block"
                                style="background-color: #a4a9ad;"></label>
                        </div>
                        <div class="color-selector">
                            <input type="radio" name="color" id="blue" class="hidden">
                            <label for="blue" class="border border-gray-200 h-6 w-6  cursor-pointer shadow-sm block"
                                style="background-color: #0033cc;"></label>
                        </div>

                    </div>
                </div>

                <div class="mt-4">
                    <h3 class="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
                    <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                        <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-
                        </div>
                        <div class="h-8 w-8 text-base flex items-center justify-center">4</div>
                        <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                    <a href="#"
                        class="bg-green-700 border border-primary text-white px-8 py-2 font-medium uppercase flex items-center gap-2 hover:bg-green-500 transition">
                        Add to cart
                    </a>
                    <a href="#"
                        class="border border-gray-300 text-gray-600 px-8 py-2 font-medium uppercase flex items-center gap-2 hover:text-primary transition">
                        <i class="gg-heart"></i> Wishlist
                    </a>
                </div>
            </div>
        </div>
        <!-- #endregion Product Info -->

        <!-- description -->
        <div class="container py-16 mx-auto">
            <h3 class="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">Product details</h3>
            <div class="w-3/5 pt-6">
                <div class="text-gray-600">
                    <p class="py-4">Introducing our premium logo t-shirt, the ultimate combination of style,
                        comfort, and quality. If you're looking for a t-shirt that not only looks great but also
                        feels great to wear, then you're in the right place. Made from the highest quality
                        materials, this shirt is designed to be both durable and breathable, ensuring that you stay
                        comfortable all day long, no matter what your plans are.</p>
                    <p class="py-4">Crafted from soft, high-quality cotton, this logo t-shirt is perfect for
                        everyday wear. The lightweight, breathable fabric will keep you cool and comfortable even on
                        the hottest of days, making it the ideal choice for any season. With its classic
                        short-sleeved design, this t-shirt is versatile enough to be worn on its own or layered with
                        your favorite outerwear.</p>
                    <p class="py-4">The standout feature of this t-shirt is undoubtedly the bold and eye-catching
                        logo design. Our skilled designers have meticulously crafted this logo to be both stylish
                        and recognizable, making it the perfect way to show off your love for your favorite brand.
                        Whether you're a loyal fan or simply appreciate great design, this logo t-shirt is the
                        perfect addition to your wardrobe.</p>
                    <p class="py-4">In terms of fit, this t-shirt has been designed with both comfort and style in
                        mind. The classic cut is flattering and easy to wear, and the relaxed fit provides plenty of
                        room for movement. The ribbed neckline adds an extra touch of style, while the double-needle
                        stitching ensures that this t-shirt will stand up to even the toughest wear and tear.</p>
                    <p class="py-4">But it's not just the quality of the materials and design that sets this t-shirt
                        apart. We're committed to sustainable and ethical manufacturing, and all of our products are
                        made with the highest standards of social and environmental responsibility in mind. You can
                        wear this t-shirt with pride, knowing that it was made with care and consideration for both
                        people and the planet.</p>
                    <p class="py-4">So whether you're looking for a new addition to your casual wardrobe, a way to
                        show off your love for your favorite brand, or simply a comfortable and stylish t-shirt to
                        wear, our logo t-shirt has got you covered. Order yours today and experience the perfect
                        combination of quality, style, and comfort!</p>
                </div>

                <table class="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                    <tr>
                        <th class="py-2 px-4 border border-gray-300 w-40 font-medium">Color</th>
                        <th class="py-2 px-4 border border-gray-300 ">White</th>
                    </tr>
                    <tr>
                        <th class="py-2 px-4 border border-gray-300 w-40 font-medium">Material</th>
                        <th class="py-2 px-4 border border-gray-300 ">Cotton</th>
                    </tr>
                    <tr>
                        <th class="py-2 px-4 border border-gray-300 w-40 font-medium">Size</th>
                        <th class="py-2 px-4 border border-gray-300 ">Large</th>
                    </tr>
                </table>
            </div>
        </div>
        <!-- ./description -->

        <!-- related product -->
        <div class="container pb-16 mx-auto">
            <h2 class="text-2xl font-medium text-gray-800 uppercase mb-6">Related products</h2>
            <div class="grid grid-cols-4 gap-6">
                <div class="bg-white shadow-md overflow-hidden">
                    <div class="relative group">
                        <img src="images/tshirt-front-black-small.png" alt="product 1" class="w-full">
                        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="view product">
                                <i class="gg-search"></i>
                            </a>
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="add to wishlist">
                                <i class="gg-heart"></i>
                            </a>
                        </div>
                    </div>
                    <div class="pt-4 pb-3 px-4">
                        <a href="#">
                            <h4
                                class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                Shirt</h4>
                        </a>
                        <div class="flex items-baseline mb-1 space-x-2">
                            <p class="text-xl text-primary font-semibold">$9.99</p>
                            <p class="text-sm text-gray-400 line-through">$19.99</p>
                        </div>
                        <div class="flex items-center">
                            <div class="flex gap-1">
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                            </div>
                            <div class="text-xs text-gray-500 ml-3">(150)</div>
                        </div>
                    </div>
                    <a href="#"
                        class="block w-full py-3 text-center text-white bg-green-700 border border-primary hover:bg-green-500 transition">Add
                        to cart</a>
                </div>
                <div class="bg-white shadow-md overflow-hidden">
                    <div class="relative group">
                        <img src="images/tshirt-front-grey-small.png" alt="product 1" class="w-full">
                        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="view product">
                                <i class="gg-search"></i>
                            </a>
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="add to wishlist">
                                <i class="gg-heart"></i>
                            </a>
                        </div>
                    </div>
                    <div class="pt-4 pb-3 px-4">
                        <a href="#">
                            <h4
                                class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                Shirt</h4>
                        </a>
                        <div class="flex items-baseline mb-1 space-x-2">
                            <p class="text-xl text-primary font-semibold">$9.99</p>
                            <p class="text-sm text-gray-400 line-through">$19.99</p>
                        </div>
                        <div class="flex items-center">
                            <div class="flex gap-1">
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                            </div>
                            <div class="text-xs text-gray-500 ml-3">(150)</div>
                        </div>
                    </div>
                    <a href="#"
                        class="block w-full py-3 text-center text-white bg-green-700 border border-primary hover:bg-green-500 transition">Add
                        to cart</a>
                </div>
                <div class="bg-white shadow-md overflow-hidden">
                    <div class="relative group">
                        <img src="images/tshirt-front-blue-small.png" alt="product 1" class="w-full">
                        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="view product">
                                <i class="gg-search"></i>
                            </a>
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="add to wishlist">
                                <i class="gg-heart"></i>
                            </a>
                        </div>
                    </div>
                    <div class="pt-4 pb-3 px-4">
                        <a href="#">
                            <h4
                                class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                Shirt</h4>
                        </a>
                        <div class="flex items-baseline mb-1 space-x-2">
                            <p class="text-xl text-primary font-semibold">$9.99</p>
                            <p class="text-sm text-gray-400 line-through">$19.99</p>
                        </div>
                        <div class="flex items-center">
                            <div class="flex gap-1">
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                            </div>
                            <div class="text-xs text-gray-500 ml-3">(150)</div>
                        </div>
                    </div>
                    <a href="#"
                        class="block w-full py-3 text-center text-white bg-green-700 border border-primary hover:bg-green-500 transition">Add
                        to cart</a>
                </div>
                <div class="bg-white shadow-md overflow-hidden">
                    <div class="relative group">
                        <img src="images/tshirt-front-white-small.png" alt="product 1" class="w-full">
                        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="view product">
                                <i class="gg-search"></i>
                            </a>
                            <a href="#"
                                class="text-white text-lg w-9 h-8 bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                title="add to wishlist">
                                <i class="gg-heart"></i>
                            </a>
                        </div>
                    </div>
                    <div class="pt-4 pb-3 px-4">
                        <a href="#">
                            <h4
                                class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                Shirt</h4>
                        </a>
                        <div class="flex items-baseline mb-1 space-x-2">
                            <p class="text-xl text-primary font-semibold">$9.99</p>
                            <p class="text-sm text-gray-400 line-through">$19.99</p>
                        </div>
                        <div class="flex items-center">
                            <div class="flex gap-1">
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                                <i class="star"></i>
                            </div>
                            <div class="text-xs text-gray-500 ml-3">(150)</div>
                        </div>
                    </div>
                    <a href="#"
                        class="block w-full py-3 text-center text-white bg-green-700 border border-primary hover:bg-green-500 transition">Add
                        to cart</a>
                </div>
            </div>
        </div>
        <!-- ./related product -->

        <!-- #endregion Body -->
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
                                <div class="mr-5 flex items-center bg-white px-2 py-2 group-hover:bg-blue-200">
                                    <i class="gg-facebook text-gray-900"></i>
                                </div>
                            </a>
                            <a href="#">
                                <div class="mr-5 flex items-center bg-white px-2 py-2 group-hover:bg-blue-200">
                                    <i class="gg-twitter text-gray-900"></i>
                                </div>
                            </a>
                            <a href="#">
                                <div class="mr-5 flex items-center bg-white px-2 py-2 group-hover:bg-blue-200">
                                    <i class="gg-instagram text-gray-900"></i>
                                </div>
                            </a>
                            <a href="#">
                                <div class="flex items-center bg-white px-2 py-2 group-hover:bg-blue-200">
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
                <a href="https://github.com/jluterek/tailwind-ecommerce-template">Source Code - GitHub</a>
            </p>
        </div>
    </footer>

    <!-- #endregion Footer -->
</div>
</div>`;