export const source = `<style>
@import url('https://fonts.googleapis.com/css?family=Quicksand');
::selection{background-color: aliceblue}
.font-serif{font-family : 'Quicksand', sans-serif;}
.smooth {
        transition: box-shadow 0.3s ease-in-out;
    }
:root{
::-webkit-scrollbar{height:10px;width:10px}::-webkit-scrollbar-track{background:#efefef;border-radius:6px}::-webkit-scrollbar-thumb{background:#d5d5d5;border-radius:6px}::-webkit-scrollbar-thumb:hover{background:#c4c4c4}
}
</style>
</head>
<body class="bg-white font-sans leading-normal tracking-normal">

<!--Nav-->
<nav class="bg-indigo-900 p-4 mt-0 w-full">
<div class="container mx-auto flex items-center">
      <div class="flex text-white font-extrabold">
            <a class="flex text-white text-base no-underline hover:text-white hover:no-underline" href="#"> 
                👻 <span class="hidden w-0 md:w-auto md:block pl-1">GhostWind CSS (VUE)</span>
            </a>
            </div>
    
    <div class="flex pl-4 text-sm">
        <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
          <li class="mr-2">
            <a class="inline-block py-2 px-2 text-white no-underline" href="index.html">HOME</a>
          </li>
          <li class="mr-2">
            <a class="inline-block text-yellow-400 no-underline hover:text-yellow-200 hover:text-underline py-2 px-2" href="#">LINK</a>
          </li>
          <li class="mr-2">
            <a class="inline-block text-yellow-400 no-underline hover:text-yellow-200 hover:text-underline py-2 px-2" href="#">LINK</a>
          </li>
            <li class="mr-2">
            <a class="inline-block text-yellow-400 no-underline hover:text-yellow-200 hover:text-underline py-2 px-2" href="#">LINK</a>
          </li>
        </ul>
    </div>
     </div>
</nav>
<!--slide in nav-->
<div id="header" class="bg-white fixed w-full z-10 top-0 hidden animated" style="opacity: .95;">
<div class="bg-white">
    <div class="flex flex-wrap items-center content-center">
        <div class="flex w-1/2 justify-start text-white font-extrabold">
            <a class="flex text-gray-900 no-underline hover:text-gray-900 hover:no-underline pl-2" href="#">
                👻 <span class="hidden w-0 md:w-auto md:block pl-1">Ghostwind CSS</span>
            </a>
        </div>
        <div class="flex w-1/2 justify-end content-center">		
              <p class="hidden sm:block mr-3 text-center h-14 p-4 text-xs"><span class="pr-2">Share this</span></p>
                <a class="inline-block text-white no-underline hover:text-white hover:underline text-center h-10 w-10 p-2 md:h-auto md:w-16 md:p-4" href="https://twitter.com/intent/tweet?url=#" style="background-color:#33b1ff;">
                    <svg class="fill-current text-white h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path></svg>
                </a>
                <a class="inline-block text-white no-underline hover:text-white hover:underline text-center h-10 w-10 p-2 md:h-auto md:w-16 md:p-4" href="https://www.facebook.com/sharer/sharer.php?u=#" style="background-color:#005e99">
                    <svg class="fill-current text-white h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path></svg>
                </a>
        </div>
    </div>
    
</div>
<!--Progress bar-->
<div id="progress" class="h-1 bg-white shadow" style="background:linear-gradient(to right, #4dc0b5 var(--scroll), transparent 0);"></div>
</div>


<!--Title-->
<div class="text-center pt-16 md:pt-32">
<p class="text-sm md:text-base text-teal-500 font-bold">- 29 FEBRUARY 2020 -<span class="text-gray-900"></span></p>
<h1 class="font-bold break-normal text-3xl md:text-5xl">Ghostwind CSS (Vue) - By <a class="text-gray-800 hover:text-teal-500 no-underline border-b-2 border-teal-500" href="https://github.com/diomed">@diomed</a></h1>
</div>

<!--image-->
<div class="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded" style="background-image:url('https://images.unsplash.com/photo-1488630228244-bcdf33562a43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80'); height: 75vh;"></div>

<!--Container-->
<div class="container max-w-5xl mx-auto -mt-32">

<div class="mx-0 sm:mx-6">
    
    <div class="bg-white w-full p-8 md:p-24 text-xl md:text-2xl text-gray-800 leading-normal shadow-md m-5">
        
        <!--Post Content-->
        

        <!--Lead Para-->
<p class="font-serif">
Panther savannah, for puma or munchkin singapura for egyptian mau himalayan. Cougar mouser so burmese and birman bengal havana brown. Egyptian mau savannah and siberian and siamese or singapura but persian. Ocelot jaguar munchkin kitten yet donskoy so panther. Maine coon kitten or balinese . Bengal norwegian forest leopard, yet havana brown bengal but abyssinian persian. Tiger tabby for russian blue-500 but russian blue. Tiger savannah lion for jaguar but norwegian forest ocelot. Scottish fold ocelot and siamese and tomcat. Lynx turkish angora so havana brown siamese. Puma bengal, cougar tiger but egyptian mau. Tom tomcat so lynx, leopard, savannah, or bengal. Bobcat scottish fold, and scottish fold yet lion. Birman savannah, havana brown so sphynx, for balinese . Puma. Egyptian mau cornish rex bengal havana brown or siamese donskoy. Kitten cheetah. Himalayan donskoy so norwegian forest. Malkin. Siamese siberian. Singapura ragdoll jaguar yet bombay singapura and panther. Himalayan lion and sphynx or balinese devonshire rex. </p>									
        <!--/ Post Content-->
                
    </div>
                
</div>

</div>




<div class="bg-gray-200" id="app">

<div class="container w-full max-w-6xl mx-auto px-2 py-8">
    <div class=" flex flex-wrap -mx-2">
        <div v-for="item in content " class="w-full md:w-1/3 px-2 pb-12">
            <div  class=" bg-white rounded shadow-md hover:shadow-lg relative smooth">
                <span class="no-underline hover:no-underline">

      <template>
<img src='https://source.unsplash.com/item.unsplash' class="h-48 w-full rounded-t shadow"/>
</template>
      
                        <div class="p-6 h-auto " >	
                            <p class="text-gray-600 text-xs md:text-sm">{{item.category}}</p>
                            <div class="font-bold text-xl text-gray-900">{{item.title}}</div>
                            <p class="text-gray-800 font-serif text-base mb-5">
                                {{item.article}}
                            </p>
                        </div>
                        <div class="flex items-center justify-between inset-x-0 bottom-0 p-6">
                            <img class="w-8 h-8 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar">
                            <p class="text-gray-600 text-xs md:text-sm">{{item.min}} MIN READ</p>
                        </div>
                </a>
            </div>
        </div>
    </div>
</div>
</div>



<footer class="bg-gray-900">	
<div class="container max-w-6xl mx-auto flex items-center px-2 py-8">

    <div class="w-full mx-auto flex flex-wrap items-center">
        <div class="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
            <a class="text-gray-900 no-underline hover:text-gray-900 hover:no-underline" href="#">
                👻 <span class="text-base text-gray-200"> Ghostwind CSS (VUE)</span>				
            </a>
        </div>
        <div class="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
            <ul class="list-reset flex justify-center flex-1 md:flex-none items-center">
              <li>
                <a class="inline-block py-2 px-3 text-white no-underline" href="index.html">HOME</a>
              </li>
              <li>
                <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3" href="#">link</a>
              </li>
              <li>
                <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3" href="#">link</a>
              </li>
              <li>
                <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:underline py-2 px-3" href="#">link</a>
              </li>
            </ul>
        </div>
    </div>



</div>
</footer>  
</body>`;