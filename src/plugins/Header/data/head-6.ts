export const source = `    <div class="flex justify-center">
<nav class="self-center w-full max-w-7xl">
    <div class="flex flex-col justify-around items-center md:items-start border-b-2">
        <!-- Available attributes:
             data-header-logo: header logo text -->
        <h1 class="uppercase py-4 text-2xl font-sans font-bold px-10" data-header-logo="logo-text">fashionhub</h1>

        <!-- Available attributes:
             data-header-menu: menu container -->
        <ul class="flex items-center text-sm md:text-[18px] font-bold md:px-10" data-header-menu>
            <!-- Available attributes:
                 data-menu-item: menu item -->
            <li class="hover:underline underline-offset-4 decoration-2 decoration-cyan-500 py-2 rounded-lg px-2 md:px-5">
                <a href="#" data-menu-item="home">Home</a>
            </li>
            <li class="hover:underline underline-offset-4 decoration-2 decoration-cyan-500 py-2 rounded-lg px-2 md:px-5">
                <a href="#" data-menu-item="contact">Contact</a>
            </li>
            <li class="hover:underline underline-offset-4 decoration-2 decoration-cyan-500 py-2 rounded-lg px-2 md:px-5">
                <a href="#" data-menu-item="services">Services</a>
            </li>
            <li class="hover:underline underline-offset-4 decoration-2 decoration-cyan-500 py-2 rounded-lg px-2 md:px-5">
                <a href="#" data-menu-item="about">About</a>
            </li>
        </ul>
    </div>
</nav>
</div>
<div class="flex justify-center">
<div class="flex flex-col md:flex-row space-y-2 items-center justify-center max-w-7xl w-full p-4">
    <!-- Available attributes:
         data-main-image: main large image -->
    <div class="w-full md:w-1/2 mx-2 h-96 overflow-hidden" data-main-image>
        <img src="https://source.unsplash.com/random/500x500/?man" alt="Main fashion image" class="h-full w-full" />
    </div>
    <!-- Available attributes:
         data-image-gallery: image gallery container -->
    <div class="w-full md:w-1/2 mx-2 h-96" data-image-gallery>
        <div class="flex flex-col space-y-2">
            <!-- Available attributes:
                 data-gallery-image: gallery image -->
            <div class="h-48 w-full overflow-hidden" data-gallery-image="1">
                <img src="https://source.unsplash.com/random/300x200/?man" alt="Fashion gallery image 1" class="h-full w-full" />
            </div>
            <div class="h-48 w-full flex space-x-1 p-2">
                <div class="h-full w-1/2 overflow-hidden" data-gallery-image="2">
                    <img src="https://source.unsplash.com/random/200x200/?man" alt="Fashion gallery image 2" class="h-full w-full" />
                </div>
                <div class="h-full w-1/2 overflow-hidden" data-gallery-image="3">
                    <img src="https://source.unsplash.com/random/200x200/?man" alt="Fashion gallery image 3" class="h-full w-full" />
                </div>
            </div>
        </div>
    </div>
</div>
</div>`;
/* const fashionHubData = {
    headerLogo: "fashionhub",
    menuItems: [
        { name: "Home", link: "#", dataAttribute: "home" },
        { name: "Contact", link: "#", dataAttribute: "contact" },
        { name: "Services", link: "#", dataAttribute: "services" },
        { name: "About", link: "#", dataAttribute: "about" }
    ],
    images: {
        main: {
            src: "https://source.unsplash.com/random/500x500/?man",
            alt: "Main fashion image"
        },
        gallery: [
            {
                id: 1,
                src: "https://source.unsplash.com/random/300x200/?man",
                alt: "Fashion gallery image 1"
            },
            {
                id: 2,
                src: "https://source.unsplash.com/random/200x200/?man",
                alt: "Fashion gallery image 2"
            },
            {
                id: 3,
                src: "https://source.unsplash.com/random/200x200/?man",
                alt: "Fashion gallery image 3"
            }
        ]
    }
}; */