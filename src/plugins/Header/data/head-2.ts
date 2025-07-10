export const source = `
<div class="flex justify-center bg-black">
    <nav class="self-center w-full max-w-7xl">
        <div class="flex flex-col lg:flex-row justify-around items-center text-white">
            <!-- Доступні атрибути:
                 data-header-logo: лого заголовка -->
            <h1 class="uppercase pl-5 py-4 text-lg font-sans font-bold" data-header-logo="MetaFlow3D">hero</h1>
            <!-- Доступні атрибути:
                 data-header-menu: меню заголовка -->
            <ul class="hidden lg:flex items-center text-[18px] font-semibold pl-32" data-header-menu>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (home) -->
                    <a href="#" data-menu-item="home">Home</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (contact) -->
                    <a href="#" data-menu-item="contact">Contact</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (services) -->
                    <a href="#" data-menu-item="services">Services</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (about) -->
                    <a href="#" data-menu-item="about">About</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (pricing) -->
                    <a href="#" data-menu-item="pricing">Pricing</a>
                </li>
            </ul>
            <div class="text-white text-center text-base pr-5 inline-flex">
                <!-- Доступні атрибути:
                     data-social: соціальна мережа -->
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[6px] hover:text-blue-500" data-social="twitter"><i class="fa fa-twitter"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="instagram"><i class="fa fa-instagram"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="facebook"><i class="fa fa-facebook"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="google"><i class="fa fa-google"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="linkedin"><i class="fa fa-linkedin"></i></a>
            </div>
        </div>
    </nav>
</div>
<div class="flex justify-center bg-black p-8">
    <div class="flex flex-col justify-center">
        <div class="flex flex-col lg:flex-row max-w-7xl justify-center items-center p-2 space-y-3 w-full">
            <div class="flex flex-col text-white md:items-start items-center justify-between space-y-3 px-8">
                <!-- Доступні атрибути:
                     data-header-title: заголовок -->
                <div class="text-5xl md:text-7xl font-bold" data-header-title="Hero Animation">Hero Animation</div>
                <!-- Доступні атрибути:
                     data-header-subtitle: підзаголовок -->
                <div class="text-lg uppercase md:text-3xl" data-header-subtitle="Interactive Components">Interactive Components</div>
                <!-- Доступні атрибути:
                     data-header-website: веб-сайт -->
                <div class="text-xl md:text-3xl" data-header-website="@tailblocks.org">@tailblocks.org</div>
            </div>
            <div class="flex space-x-2 md:space-x-6 md:m-4">
                <div class="md:w-20 w-10 h-60 md:h-96 overflow-hidden rounded-xl" data-image-id="image1">
                    <!-- Доступні атрибути:
                         data-image-id: унікальний ідентифікатор зображення -->
                    <img src="https://source.unsplash.com/100x400/?man" class="h-full w-full" alt="Man Image">
                </div>
                <div class="md:w-60 w-28 h-60 md:h-96 overflow-hidden rounded-xl" data-image-id="image2">
                    <img src="https://source.unsplash.com/200x400/?girl" class="h-full w-full" alt="Girl Image">
                </div>
                <div class="md:w-28 w-16 h-60 md:h-96 overflow-hidden rounded-xl" data-image-id="image3">
                    <img src="https://source.unsplash.com/100x400/?boy" class="h-full w-full" alt="Boy Image">
                </div>
                <div class="md:w-20 w-10 h-60 md:h-96 overflow-hidden rounded-xl" data-image-id="image4">
                    <img src="https://source.unsplash.com/100x400/?women" class="h-full w-full" alt="Women Image">
                </div>
            </div>
        </div>
    </div>
</div>

`;
/* const metaFlow3DData = {
    headerLogo: "MetaFlow3D",
    menuItems: [
        { name: "Home", link: "#" },
        { name: "Contact", link: "#contact" },
        { name: "Services", link: "#services" },
        { name: "About", link: "#about" },
        { name: "Pricing", link: "#pricing" }
    ],
    socialMedia: [
        { name: "twitter", icon: "fa-twitter", link: "#" },
        { name: "instagram", icon: "fa-instagram", link: "#" },
        { name: "facebook", icon: "fa-facebook", link: "#" },
        { name: "google", icon: "fa-google", link: "#" },
        { name: "linkedin", icon: "fa-linkedin", link: "#" }
    ],
    headerContent: {
        title: {
            text: "Hero Animation",
            dataAttribute: "Hero Animation"
        },
        subtitle: {
            text: "Interactive Components",
            dataAttribute: "Interactive Components"
        },
        website: {
            text: "@tailblocks.org",
            dataAttribute: "@tailblocks.org"
        }
    },
    galleryImages: [
        { id: "image1", src: "https://source.unsplash.com/100x400/?man", alt: "Man Image" },
        { id: "image2", src: "https://source.unsplash.com/200x400/?girl", alt: "Girl Image" },
        { id: "image3", src: "https://source.unsplash.com/100x400/?boy", alt: "Boy Image" },
        { id: "image4", src: "https://source.unsplash.com/100x400/?women", alt: "Women Image" }
    ]
}; */