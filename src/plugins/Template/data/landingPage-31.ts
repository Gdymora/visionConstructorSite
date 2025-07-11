export const source =`
<title>Shout Template</title>

<div class="font-sans">

    <header class="bg-white">

        <div class="p-8 container mx-auto flex flex-wrap items-center justify-between">
            <a href="/" class="mb-6 md:mb-0 w-full text-center md:text-left md:w-auto font-display font-black text-3xl text-black uppercase">Shout.</a>

            <ul class="justify-center md:justify-end flex-1 flex list-reset">
                <li>
                    <a href="/about" class="text-sm text-grey-800 no-underline hover:text-black">About us</a>
                </li>
                <li class="ml-6">
                    <a href="/products" class="text-sm text-grey-800 no-underline hover:text-black">Products</a>
                </li>
                <li class="ml-6">
                    <a href="/contact" class="text-sm bg-yellow-400 py-3 px-6">Contact</a>
                </li>
            </ul>
        </div>

    </header>

    <div class="max-w-5xl mx-auto p-8 py-24 flex justify-start items-center">
        <div class="flex-1">
            <h1 class="font-display-italic font-extrabold text-5xl md:text-6xl italic leading-none mb-12">Introducing.</h1>
            <p class="leading-loose max-w-xl">Nisl suscipit adipiscing bibendum est ultricies integer. Faucibus a pellentesque sit amet. Gravida quis blandit turpis cursus in hac habitasse platea.</p>
        </div>
        <div class="hidden md:block w-56">
            <a href="/about" class="ml-12 bg-yellow-400 py-6 px-10">Learn more</a>
        </div>
    </div>

    <img src="https://images.unsplash.com/photo-1481456384069-0effc539ab7e?w=2000" class="w-full h-64 object-cover" />


    <div class="bg-gray-100">
        <div class="max-w-5xl mx-auto p-8 py-24 flex flex-wrap justify-start items-center">
            <div class="flex-1">
                <h2 class="font-display-italic font-extrabold text-5xl md:text-6xl italic leading-none mb-12">Enlighten.</h2>
            </div>
            <div class="w-full lg:w-72">
                <p class="leading-loose max-w-xl">Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Posuere ac ut consequat semper viverra nam libero justo. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. </p>
            </div>
        </div>
    </div>


    <div class="max-w-5xl mx-auto pt-20 p-8 flex justify-end">
        <h3 class="font-display-italic font-extrabold text-5xl md:text-6xl italic leading-none mb-12 max-w-xl">Products.</h3>
    </div>


    <div class="container mx-auto flex flex-wrap pb-20">

        <div class="w-full md:w-1/2 lg:w-1/3 px-6 mb-12">
            <a href="#">
                <img src="https://images.unsplash.com/photo-1524010349062-860def6649c3?w=800" class="w-full h-64 object-cover mb-6" />
            </a>
            <h3 class="text-2xl uppercase font-display font-extrabold tracking-widest mb-2">Oculous Trainer</h3>
            <p class="text-xs text-gray-500 mb-4">Eros in cursus turpis massa tincidunt dui ut ornare. Vestibulum morbi blandit cursus risus at ultrices mi. Augue ut lectus arcu bibendum at varius.</p>
            <a href="/products/#digital-defender" class="inline-block border-2 border-black py-3 px-8 uppercase font-display font-thin tracking-wide text-xs hover:bg-yellow-400 hover:border-yellow-400">Learn more</a>
        </div>

        <div class="w-full md:w-1/2 lg:w-1/3 px-6 mb-12">
            <a href="#">
                <img src="https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800" class="w-full h-64 object-cover mb-6" />
            </a>
            <h3 class="text-2xl uppercase font-display font-extrabold tracking-widest mb-2">Vinta Backpack</h3>
            <p class="text-xs text-gray-500 mb-4">Eros in cursus turpis massa tincidunt dui ut ornare. Vestibulum morbi blandit cursus risus at ultrices mi. Augue ut lectus arcu bibendum at varius.</p>
            <a href="/products/#digital-defender" class="inline-block border-2 border-black py-3 px-8 uppercase font-display font-thin tracking-wide text-xs hover:bg-yellow-400 hover:border-yellow-400">Learn more</a>
        </div>

        <div class="w-full md:w-1/2 lg:w-1/3 px-6 mb-12">
            <a href="#">
                <img src="https://images.unsplash.com/photo-1469210537992-30c8c8abef12?w=800" class="w-full h-64 object-cover mb-6" />
            </a>
            <h3 class="text-2xl uppercase font-display font-extrabold tracking-widest mb-2">Leica Camera</h3>
            <p class="text-xs text-gray-500 mb-4">Eros in cursus turpis massa tincidunt dui ut ornare. Vestibulum morbi blandit cursus risus at ultrices mi. Augue ut lectus arcu bibendum at varius.</p>
            <a href="/products/#digital-defender" class="inline-block border-2 border-black py-3 px-8 uppercase font-display font-thin tracking-wide text-xs hover:bg-yellow-400 hover:border-yellow-400">Learn more</a>
        </div>
    
    </div>

    <div class="bg-black text-white text-center text-sm py-12">
        <p>Copyright &copy; 2019 Shout.</p>
    </div>

</div>`;