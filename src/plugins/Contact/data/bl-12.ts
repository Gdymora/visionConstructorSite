export const source = `	<!-- header -->
<header class="w-full px-6 bg-white">
    <div class="container mx-auto max-w-4xl md:flex justify-between items-center">
        <a href="#" class="block py-6 w-full text-center md:text-left md:w-auto text-gray-dark no-underline flex justify-center items-center">
            Your Logo
        </a>
        <div class="w-full md:w-auto text-center md:text-right">
            <!-- Login / Register -->
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
            <a href="#" class="px-2 md:pl-0 md:mr-3 md:pr-3 text-gray-darkest no-underline">Contact</a>
        </div>
        <div class="w-full md:w-1/2 text-center md:text-right">
            <!-- extra links -->
        </div>
    </div>
</nav>
<!-- /nav -->

<!-- contact -->
<div class="w-full bg-white">

    <!-- title -->
    <div class="text-center px-6 py-12 mb-6 bg-gray-100 border-b">
        <h1 class=" text-xl md:text-4xl pb-4">Contact Us</h1>
        <p class="leading-loose text-gray-dark">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
    </div>
    <!-- /title -->

    <div class="container max-w-4xl mx-auto pb-10 px-12 md:px-0">

        <div class="flex flex-wrap justify-start items-start -mx-4">

            <div class="w-full md:w-1/2 p-4">
                
                <form>
                    <fieldset class="mb-4">
                        <label class="block text-sm text-gray-dark pb-2">Name</label>
                        <input class="block w-full border rounded py-2 px-3 text-sm text-gray-700" type="text" />
                        <p class="text-xs pt-2 text-gray">This is some helper text...</p>
                    </fieldset>

                    <fieldset class="mb-4">
                        <label class="block text-sm text-gray-dark pb-2">Email</label>
                        <input class="block w-full border rounded py-2 px-3 text-sm text-gray-700" type="text" />
                    </fieldset>

                    <fieldset class="mb-4">
                        <label class="block text-sm text-gray-dark pb-2">Message</label>
                        <textarea class="block w-full border border-red-300er rounded py-2 px-3 text-sm text-gray-700 h-32"></textarea>
                        <p class="text-xs pt-2 text-red-400">This field is required...</p>
                    </fieldset>

                    <button class="text-sm py-2 px-3 bg-black text-white rounded">Submit</button>
                </form>

            </div>

            <div class="w-full md:w-1/2 p-4">
                <div class="overflow-hidden rounded border mb-6">
                    <iframe class="w-full h-64" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d106000.49300263195!2d151.1141413582031!3d-33.8763776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1547515706012" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>

                <p class="text-black font-bold mb-1">
                    My Company Ltd
                </p>
                <p class="text-sm mb-2">
                    3 Doris St,<br />
                    North Sydney,<br />
                    NSW 2060
                </p>

                <p class="text-black font-bold">(02) 9923 1838</p>
            </div>

        </div>

    </div>

</div>
<!-- /contact -->


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
<!-- /footer -->`;