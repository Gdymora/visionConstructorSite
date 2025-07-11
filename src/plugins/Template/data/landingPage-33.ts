export const source =`
<title>Title</title> 
<div>

    <!-- header -->
    <header class="w-full px-6 bg-white">
        <div class="container mx-auto max-w-4xl md:flex justify-between items-center">
            <a href="#" class="block py-6 w-full text-center md:text-left md:w-auto text-gray-600 no-underline flex justify-center items-center">
                Your Logo
            </a>
            <div class="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
                <a href="#" class="inline-block no-underline bg-black text-white text-sm py-2 px-3">Login / Regsiter</a>
            </div>
        </div>
    </header>
    <!-- /header -->

    <!-- nav -->
    <nav class="w-full bg-white md:pt-0 px-6 relative z-20 border-t border-b border-gray-300">
        <div class="container mx-auto max-w-4xl md:flex justify-between items-center text-sm md:text-md md:justify-start">
            <div class="w-full md:w-1/2 text-center md:text-left py-4 flex flex-wrap justify-center items-stretch md:justify-start md:items-start">
                <a href="#" class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-300">Home</a>
                <a href="#" class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-300">Products</a>
                <a href="#" class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-300">About Us</a>
                <a href="#" class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline md:border-r border-gray-300">News</a>
                <a href="#" class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-700 no-underline">Contact</a>
            </div>
            <div class="w-full md:w-1/2 text-center md:text-right pb-4 md:p-0">
                <input type="search" placeholder="Search..." class="bg-gray-200 border text-sm p-1" />
            </div>
        </div>
    </nav>
    <!-- /nav -->

    <!-- title -->
    <h1 class="text-center text-xl md:text-4xl px-6 py-12 bg-white">Our Products</h1>
    <!-- /title -->

    <!-- products grid -->
    <div class="w-full px-6 py-12 bg-gray-100 border-t">

        <div class="container max-w-4xl mx-auto pb-10 flex justify-between items-center px-3">
            <div class="text-xs">
                <a href="#" class="bg-gray-500 text-white no-underline py-1 px-2 rounded-lg mr-2">Previous</a>
                <div class="hidden md:inline">
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">1</a>
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">2</a>
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">3</a>
                    <span class="px-2 text-gray">...</span>
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">42</a>
                </div>
                <a href="#" class="bg-black text-white no-underline py-1 px-2 rounded-lg ml-2">Next</a>

            </div>

            <div class="text-sm text-gray-600">
                Per page: 
                <select class="bg-white border rounded-lg w-24 h-8 ml-1">
                    <option>24</option>
                    <option>48</option>
                    <option>All</option>
                </select>
            </div>
        </div>



        <div class="container max-w-4xl mx-auto pb-10 flex flex-wrap">
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>
            
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <a href="#">
                    <img src="https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800" class="w-full h-auto rounded-lg" />
                </a>

                <h2 class="text-xl py-4">
                    <a href="#" class="text-black no-underline">Product name</a>
                </h2>

                <p class="text-xs leading-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
            </div>

        </div>

        

        <div class="container max-w-4xl mx-auto pb-10 flex justify-between items-center px-3">
            <div class="text-xs">
                <a href="#" class="bg-gray-500 text-white no-underline py-1 px-2 rounded-lg mr-2">Previous</a>
                <div class="hidden md:inline">
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">1</a>
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">2</a>
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">3</a>
                    <span class="px-2 text-gray">...</span>
                    <a href="#" class="text-sm px-1 text-gray-900 no-underline">42</a>
                </div>
                <a href="#" class="bg-black text-white no-underline py-1 px-2 rounded-lg ml-2">Next</a>

            </div>

            <div class="text-sm text-gray-600">
                Per page: 
                <select class="bg-white border rounded-lg w-24 h-8 ml-1">
                    <option>24</option>
                    <option>48</option>
                    <option>All</option>
                </select>
            </div>
        </div>

    </div>
    <!-- /products grid -->


    <!-- footer -->
    <footer class="w-full bg-white px-6 border-t">
        <div class="container mx-auto max-w-4xl py-6 flex flex-wrap md:flex-no-wrap justify-between items-center text-sm">
            &copy;2019 Your Company. All rights reserved.
            <div class="pt-4 md:p-0 text-center md:text-right text-xs">
                <a href="#" class="text-black no-underline hover:underline">Privacy Policy</a>
                <a href="#" class="text-black no-underline hover:underline ml-4">Terms &amp; Conditions</a>
                <a href="#" class="text-black no-underline hover:underline ml-4">Contact Us</a>
            </div>
        </div>
    </footer>
    <!-- /footer -->


</div>`;