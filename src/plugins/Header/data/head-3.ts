export const source = `
<div class="flex justify-center">
    <nav class="self-center w-full max-w-7xl">
        <div class="flex flex-col lg:flex-row justify-around items-center border-b-2"> 
            <!-- Доступні атрибути:
                 data-header-logo: лого заголовка -->
            <h1 class="uppercase pl-5 py-4 text-lg font-sans font-bold" data-header-logo="logo-text">fashionhub</h1>

            <ul class="hidden lg:flex items-center text-[18px] font-semibold pl-32">
                <li class="hover:underline underline-offset-4 decoration-2 decoration-black py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (home) -->
                    <a href="#" data-menu-item="home">Home</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-black py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (contact) -->
                    <a href="#" data-menu-item="contact">Contact</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-black py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (services) -->
                    <a href="#" data-menu-item="services">Services</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-black py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (about) -->
                    <a href="#" data-menu-item="about">About</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-black py-2 rounded-lg px-5">
                    <!-- Доступні атрибути:
                         data-menu-item: пункт меню (pricing) -->
                    <a href="#" data-menu-item="pricing">Pricing</a>
                </li>
            </ul>
            <div class="text-center text-base pr-5 inline-flex">
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

<div class="flex justify-center">
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col max-w-7xl justify-center items-center space-y-3 w-full">
            <div class="flex flex-col md:items-start items-center justify-center space-y-3 px-8 text-center">
                <!-- Доступні атрибути:
                     data-header-title: заголовок -->
                <div class="text-3xl md:text-7xl font-bold" data-header-title="Fashion Look">Make Your Fashion Look More Charming</div>
            </div>
            <div class="flex flex-col lg:flex-row space-x-2 space-y-3 md:space-x-6 w-full items-center justify-center">
                <div class="lg:w-40 w-64 h-40 overflow-hidden rounded-xl">
                    <!-- Доступні атрибути:
                         data-image-id: унікальний ідентифікатор зображення -->
                    <img src="https://source.unsplash.com/random/300x500/?man" alt="" class="" data-image-id="image1" />
                </div>
                <div class="flex flex-row lg:flex-col space-x-3 space-y-6 items-center justify-center">
                    <div class="w-32 lg:w-40 h-32 overflow-hidden rounded-xl">
                        <img src="https://source.unsplash.com/random/300x500/?man" alt="" class="" data-image-id="image2" />
                    </div>
                    <div class="w-32 lg:w-40 h-48 overflow-hidden rounded-xl">
                        <img src="https://source.unsplash.com/random/300x500/?man" alt="" class="" data-image-id="image3" />
                    </div>
                </div>
                <div class="lg:w-60 w-64 h-96 overflow-hidden rounded-xl">
                    <img src="https://source.unsplash.com/random/300x500/?man" alt="" class="" data-image-id="image4" />
                </div>
                <div class="flex flex-row lg:flex-col space-x-3 space-y-6 items-center justify-center">
                    <div class="w-32 lg:w-40 h-48 overflow-hidden rounded-xl">
                        <img src="https://source.unsplash.com/random/300x500/?man" alt="" class="" data-image-id="image5" />
                    </div>
                    <div class="w-32 lg:w-40 h-32 overflow-hidden rounded-xl">
                        <img src="https://source.unsplash.com/random/300x500/?man" alt="" class="" data-image-id="image6" />
                    </div>
                </div>
                <div class="lg:w-40 w-64 h-40 overflow-hidden rounded-xl">
                    <img src="https://source.unsplash.com/random/300x500/?man" alt="" class="" data-image-id="image7" />
                </div>
            </div>
        </div>
    </div>
</div>
`;
/* 
const fashionHubData = {
    headerLogo: "fashionhub",
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
    headerTitle: {
        text: "Make Your Fashion Look More Charming",
        dataAttribute: "Fashion Look"
    },
    galleryImages: [
        { id: "image1", src: "https://source.unsplash.com/random/300x500/?man", alt: "Fashion image 1" },
        { id: "image2", src: "https://source.unsplash.com/random/300x500/?man", alt: "Fashion image 2" },
        { id: "image3", src: "https://source.unsplash.com/random/300x500/?man", alt: "Fashion image 3" },
        { id: "image4", src: "https://source.unsplash.com/random/300x500/?man", alt: "Fashion image 4" },
        { id: "image5", src: "https://source.unsplash.com/random/300x500/?man", alt: "Fashion image 5" },
        { id: "image6", src: "https://source.unsplash.com/random/300x500/?man", alt: "Fashion image 6" },
        { id: "image7", src: "https://source.unsplash.com/random/300x500/?man", alt: "Fashion image 7" }
    ]
};
 */