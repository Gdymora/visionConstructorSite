export const source =`
<title>Photography Showcase</title>

<div class="bg-white">

    <header class="bg-white relative z-40 w-full h-24 px-12 flex justify-between items-center">
        
        <div class="w-full lg:w-auto">
            <a href="#" class="font-serif text-2xl block text-center text-black text-lg no-underline hover:text-gray-600">r/m</a>
        </div>

        <div class="flex-1 flex justify-center lg:justify-end">
            <a href="#" class="block w-4 h-2 border-t-2 border-b-2 border-black hover:border-gray-600"></a>
        </div>

    </header>

    <div class="lg:h-screen -mt-24 lg:pt-24 w-full flex flex-wrap">
        
        <div class="h-screen w-full lg:h-full lg:w-1/2 flex justify-center items-center">
            
            <div class="max-w-xl px-12 lg:px-32">
                
                <p class="font-sans text-xs text-gray-600 uppercase tracking-wide mb-4">Reaction</p>

                <h1 class="text-2xl md:text-4xl leading-normal mb-8 font-serif">Only photograph what you love.</h1>

                <div class="ml-12 -mr-12">

                    <p class="pr-6 md:pr-0 text-xs leading-normal md:leading-loose text-gray-900 mb-8">To me, photography is an art of observation. It’s about finding something interesting an ordinary place... I’ve found it has little to do with the things you see and everything to do with the way you see them.</p>

                    <p class="text-xs text-black uppercase">Discover <span class="inline-block h-1 w-24 ml-4 border-t border-gray-light"></span></p>

                </div>

            </div>

        </div>


        <div class="h-screen w-full lg:h-full lg:w-1/2 relative">
            
            <div class="w-full h-full bg-cover bg-no-repeat bg-center" style="background-image: url('https://images.unsplash.com/photo-1482784160316-6eb046863ece?w=1400');"></div>

            <div class="absolute pin-l pin-b py-6 px-4 bg-white flex justify-around w-32">
                <a href="#" class="text-xs text-gray-600er hover:text-gray-900 no-underline">&larr;</a>
                <span class="text-xs text-gray-600er">1/3</span>
                <a href="#" class="text-xs text-gray-600er hover:text-gray-900 no-underline">&rarr;</a>
            </div>

        </div>

    </div>

    <footer class="lg:fixed pin-b pin-l text-gray-600 font-serif p-12 text-xs text-center lg:text-left">copyright &copy; 2019 r/m</footer>


</div>`;