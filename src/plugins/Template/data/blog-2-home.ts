export const source = `<div class="font-light antialiased">
<header class="flex items-center justify-between py-3 px-6 border-b border-gray-100">
    <div id="header-left" class="flex items-center">
        <div class="text-gray-800 font-semibold">
            <span class="text-yellow-500 text-xl">&lt;YELO&gt;</span> Code
        </div>
        <div class="top-menu ml-10">
            <ul class="flex space-x-4">
                <li>
                    <a class="flex space-x-2 items-center hover:text-yellow-900 text-sm text-yellow-500"
                        href="http://127.0.0.1:8000">
                        Home
                    </a>
                </li>

                <li>
                    <a class="flex space-x-2 items-center hover:text-yellow-500 text-sm text-gray-500"
                        href="http://127.0.0.1:8000/blog">
                        Blog
                    </a>
                </li>

                <li>
                    <a class="flex space-x-2 items-center hover:text-yellow-500 text-sm text-gray-500"
                        href="http://127.0.0.1:8000/blog">
                        About Us
                    </a>
                </li>

                <li>
                    <a class="flex space-x-2 items-center hover:text-yellow-500 text-sm text-gray-500"
                        href="http://127.0.0.1:8000/blog">
                        Contact Us
                    </a>
                </li>

                <li>
                    <a class="flex space-x-2 items-center hover:text-yellow-500 text-sm text-gray-500"
                        href="http://127.0.0.1:8000/blog">
                        Terms
                    </a>
                </li>

            </ul>
        </div>
    </div>
    <div id="header-right" class="flex items-center md:space-x-6">
        <div class="flex space-x-5">
            <a class="flex space-x-2 items-center hover:text-yellow-500 text-sm text-gray-500"
                href="http://127.0.0.1:8000/login">
                Login
            </a>
            <a class="flex space-x-2 items-center hover:text-yellow-500 text-sm text-gray-500"
                href="http://127.0.0.1:8000/register">
                Register
            </a>
        </div>
    </div>
</header>


<div class="w-full text-center py-32">
    <h1 class="text-2xl md:text-3xl font-bold text-center lg:text-5xl text-gray-700">
        Welcome to <span class="text-yellow-500">&lt;YELO&gt;</span> <span class="text-gray-900"> News</span>
    </h1>
    <p class="text-gray-500 text-lg mt-1">Best Blog in the universe</p>
    <a class="px-3 py-2 text-lg text-white bg-gray-800 rounded mt-5 inline-block"
        href="http://127.0.0.1:8000/blog">Start
        Reading</a>
</div>

<main class="container mx-auto px-5 flex flex-grow">
    <div class="mb-10">
        <div class="mb-16">
            <h2 class="mt-16 mb-5 text-3xl text-yellow-500 font-bold">Featured Posts</h2>
            <div class="w-full">
                <div class="grid grid-cols-3 gap-10 w-full">
                    <div class="md:col-span-1 col-span-3">
                        <a href="http://127.0.0.1:8000/blog/laravel-34">
                            <div>
                                <img class="w-full rounded-xl"
                                    src="http://127.0.0.1:8000/storage/3i5uKG05UnvhbORZ3ieDkvtAOL8ss5-metaZXAxNSAoMjIpLnBuZw==-.png">
                            </div>
                        </a>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <a href="http://127.0.0.1:8000/categories/laravel" class="bg-red-600 
                                    text-white 
                                    rounded-xl px-3 py-1 text-sm mr-3">
                                    Laravel
                                </a>
                                <p class="text-gray-500 text-sm">2023-09-05</p>
                            </div>
                            <a class="text-xl font-bold text-gray-900">Laravel 10 tutorial feed page #34</a>
                        </div>

                    </div>
                    <div class="md:col-span-1 col-span-3">
                        <a href="http://127.0.0.1:8000/blog/fil3tutorial">
                            <div>
                                <img class="w-full rounded-xl"
                                    src="http://127.0.0.1:8000/storage/4sEsCDleYEXT4GC7AdU8BP7TBab3cx-metaZmlsYW1lbnQgY291cnNlICg0KS5wbmc=-.png">
                            </div>
                        </a>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <a href="http://127.0.0.1:8000/categories/PHP" class="bg-blue-400 
                                    text-white 
                                    rounded-xl px-3 py-1 text-sm mr-3">
                                    PHP</a>
                                <p class="text-gray-500 text-sm">2023-09-04</p>
                            </div>
                            <a class="text-xl font-bold text-gray-900">Filament 3 relationship manager tutorial
                            </a>
                        </div>

                    </div>
                    <div class="md:col-span-1 col-span-3">
                       
                            <div>
                                <img class="w-full rounded-xl"
                                    src="https://via.placeholder.com/640x480.png/0000ee?text=corrupti">
                            </div>
                            <div class="mt-3">
                                <div class="flex items-center mb-2">
                                    <p class="text-gray-500 text-sm">2023-08-29</p>
                                </div>
                                <a class="text-xl font-bold text-gray-900">Mary Berge</a>
                            </div>
                    </div>
                </div>
            </div>
            <a class="mt-10 block text-center text-lg text-yellow-500 font-semibold"
                href="http://127.0.0.1:8000/blog">More
                Posts</a>
        </div>
        <hr>

        <h2 class="mt-16 mb-5 text-3xl text-yellow-500 font-bold">Latest Posts</h2>
        <div class="w-full mb-5">
            <div class="grid grid-cols-3 gap-10 gap-y-32 w-full">
                <div class="md:col-span-1 col-span-3">
                    <a href="http://127.0.0.1:8000/blog/laravel-34">
                        <div>
                            <img class="w-full rounded-xl"
                                src="http://127.0.0.1:8000/storage/3i5uKG05UnvhbORZ3ieDkvtAOL8ss5-metaZXAxNSAoMjIpLnBuZw==-.png">
                        </div>
                    </a>
                    <div class="mt-3"><a href="http://127.0.0.1:8000/blog/laravel-34">
                        </a>
                        <div class="flex items-center mb-2"><a href="http://127.0.0.1:8000/blog/laravel-34">
                            </a><a href="http://127.0.0.1:8000/categories/laravel" class="bg-red-600 
                                    text-white 
                                    rounded-xl px-3 py-1 text-sm mr-3">
                                Laravel</a>
                            <p class="text-gray-500 text-sm">2023-09-05</p>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">Laravel 10 tutorial feed page #34</h3>
                    </div>

                </div>
                <div class="md:col-span-1 col-span-3">
                    <a href="http://127.0.0.1:8000/blog/fil3tutorial">
                        <div>
                            <img class="w-full rounded-xl"
                                src="http://127.0.0.1:8000/storage/4sEsCDleYEXT4GC7AdU8BP7TBab3cx-metaZmlsYW1lbnQgY291cnNlICg0KS5wbmc=-.png">
                        </div>
                    </a>
                    <div class="mt-3"><a href="http://127.0.0.1:8000/blog/fil3tutorial">
                        </a>
                        <div class="flex items-center mb-2"><a href="http://127.0.0.1:8000/blog/fil3tutorial">
                            </a><a href="http://127.0.0.1:8000/categories/PHP" class="bg-blue-400 
                                    text-white 
                                    rounded-xl px-3 py-1 text-sm mr-3">
                                PHP</a>
                            <p class="text-gray-500 text-sm">2023-09-04</p>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900">Filament 3 relationship manager tutorial</h3>
                    </div>

                </div>
                <div class="md:col-span-1 col-span-3">
                    <a
                        href="http://127.0.0.1:8000/blog/in-exercitationem-quis-dolor-consequatur-eligendi-esse-rerum">
                        <div>
                            <img class="w-full rounded-xl"
                                src="https://via.placeholder.com/640x480.png/0000ee?text=corrupti">
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <p class="text-gray-500 text-sm">2023-08-29</p>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">Mary Berge</h3>
                        </div>
                    </a>
                </div>
                <div class="md:col-span-1 col-span-3">
                    <a href="http://127.0.0.1:8000/blog/autem-nesciunt-architecto-doloribus-ut-id">
                        <div>
                            <img class="w-full rounded-xl"
                                src="https://via.placeholder.com/640x480.png/00ee33?text=nihil">
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <p class="text-gray-500 text-sm">2023-08-29</p>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">Dr. Reina Yost</h3>
                        </div>
                    </a>
                </div>
                <div class="md:col-span-1 col-span-3">
                    <a href="http://127.0.0.1:8000/blog/voluptas-ipsam-ea-officia-nostrum">
                        <div>
                            <img class="w-full rounded-xl"
                                src="https://via.placeholder.com/640x480.png/00cc33?text=in">
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <p class="text-gray-500 text-sm">2023-08-29</p>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">Carlie Hermann</h3>
                        </div>
                    </a>
                </div>
                <div class="md:col-span-1 col-span-3">
                    <a href="http://127.0.0.1:8000/blog/ea-officiis-tenetur-aut-voluptatem">
                        <div>
                            <img class="w-full rounded-xl"
                                src="https://via.placeholder.com/640x480.png/00eeaa?text=repudiandae">
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <p class="text-gray-500 text-sm">2023-08-29</p>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">Tess Kub</h3>
                        </div>
                    </a>
                </div>
                <div class="md:col-span-1 col-span-3">
                    <a
                        href="http://127.0.0.1:8000/blog/non-et-molestiae-repellat-omnis-amet-mollitia-necessitatibus">
                        <div>
                            <img class="w-full rounded-xl"
                                src="https://via.placeholder.com/640x480.png/00bb77?text=et">
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <p class="text-gray-500 text-sm">2023-08-29</p>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">Lysanne Schmeler</h3>
                        </div>
                    </a>
                </div>
                <div class="md:col-span-1 col-span-3">
                    <a href="http://127.0.0.1:8000/blog/itaque-officiis-accusantium-quis-distinctio">
                        <div>
                            <img class="w-full rounded-xl"
                                src="https://via.placeholder.com/640x480.png/00dd88?text=et">
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <p class="text-gray-500 text-sm">2023-08-29</p>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">Dr. Kiara Mohr</h3>
                        </div>
                    </a>
                </div>
                <div class="md:col-span-1 col-span-3">
                    <a href="http://127.0.0.1:8000/blog/sed-dolor-id-qui-distinctio-autem-repellat-voluptas">
                        <div>
                            <img class="w-full rounded-xl"
                                src="https://via.placeholder.com/640x480.png/002288?text=aut">
                        </div>
                        <div class="mt-3">
                            <div class="flex items-center mb-2">
                                <p class="text-gray-500 text-sm">2023-08-29</p>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">Alfreda Hills</h3>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <a class="mt-10 block text-center text-lg text-yellow-500 font-semibold"
            href="http://127.0.0.1:8000/blog">More
            Posts</a>
    </div>
</main>

<footer class="text-sm space-x-4 flex items-center border-t border-gray-100 flex-wrap justify-center py-4 ">
    <a class="text-gray-500 hover:text-yellow-500" href="">About Us</a>
    <a class="text-gray-500 hover:text-yellow-500" href="">Help</a>
    <a class="text-gray-500 hover:text-yellow-500" href="">Login</a>
    <a class="text-gray-500 hover:text-yellow-500" href="">Explore</a>
</footer>
</div>`;