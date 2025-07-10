export const source = `
<div class="bg-slate-200 font-sans leading-normal tracking-normal">
    <nav class="flex items-center justify-between flex-wrap bg-emerald-700 p-6 fixed w-full z-10 pin-t">
        <div class="flex items-center flex-no-shrink text-white mr-6">
            <a class="text-white no-underline hover:text-white hover:no-underline" href="#">
                <!-- Available attributes:
                     data-header-logo: header logo text -->
                <span class="text-2xl pl-2" data-header-logo="logo-text"><i class="em em-grinning"></i> Brand McBrandface</span>
            </a>
        </div>

        <!-- Available attributes:
             data-nav-toggle: navigation toggle button -->
        <div class="block lg:hidden">
            <button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-white hover:border-white" data-nav-toggle>
               <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>

        <!-- Available attributes:
             data-nav-content: navigation content container -->
        <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0" id="nav-content" data-nav-content>
            <!-- Available attributes:
                 data-nav-menu: navigation menu -->
            <ul class="list-reset lg:flex justify-end flex-1 items-center" data-nav-menu>
                <!-- Available attributes:
                     data-nav-item: navigation item -->
                <li class="mr-3" data-nav-item="active">
                    <a class="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
                </li>
                <li class="mr-3" data-nav-item="link1">
                    <a class="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="#">link</a>
                </li>
                <li class="mr-3" data-nav-item="link2">
                    <a class="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="#">link</a>
                </li>
                <li class="mr-3" data-nav-item="link3">
                    <a class="inline-block text-grey-dark no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" href="#">link</a>
                </li>
            </ul>
        </div>
    </nav>

    <!--Container-->
    <div class="container shadow-lg mx-auto bg-white mt-24 md:mt-18">
    </div>

    <script>
        //Javascript to toggle the menu 
        document.getElementById('nav-toggle').onclick = function(){ 
            document.getElementById("nav-content").classList.toggle("hidden");
        }
    </script>
</div>`;
/* 
const navbarData = {
    headerLogo: {
        text: "Brand McBrandface",
        icon: "em em-grinning"
    },
    navToggle: {
        id: "nav-toggle",
        ariaLabel: "Toggle navigation"
    },
    navContent: {
        id: "nav-content"
    },
    navMenu: [
        { text: "Active", link: "#", class: "text-white", dataAttribute: "active" },
        { text: "link", link: "#", class: "text-grey-dark", dataAttribute: "link1" },
        { text: "link", link: "#", class: "text-grey-dark", dataAttribute: "link2" },
        { text: "link", link: "#", class: "text-grey-dark", dataAttribute: "link3" }
    ]
};

// Function to toggle navigation menu
function toggleNavigation() {
    const navContent = document.getElementById(navbarData.navContent.id);
    navContent.classList.toggle("hidden");
}
*/