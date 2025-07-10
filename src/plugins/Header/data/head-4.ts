export const source = `
<div class="flex justify-center">
    <nav class="self-center w-full max-w-7xl">
        <div class="flex flex-col lg:flex-row justify-around items-center"> 
            <!-- Available attributes:
                 data-header-logo: header logo text -->
            <h1 class="uppercase pl-5 py-4 text-lg font-sans font-bold" data-header-logo="logo-text">hero</h1>
            
            <!-- Available attributes:
                 data-header-menu: menu container -->
            <ul class="hidden lg:flex items-center text-[18px] font-semibold pl-32" data-header-menu>
                <!-- Available attributes:
                     data-menu-item: menu item -->
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <a href="#" data-menu-item="home">Home</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <a href="#" data-menu-item="contact">Contact</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <a href="#" data-menu-item="services">Services</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <a href="#" data-menu-item="about">About</a>
                </li>
                <li class="hover:underline underline-offset-4 decoration-2 decoration-white py-2 rounded-lg px-5">
                    <a href="#" data-menu-item="pricing">Pricing</a>
                </li>
            </ul>
            <!-- Available attributes:
                 data-social-icons: social icons container -->
            <div class="text-center text-base pr-5 inline-flex" data-social-icons>
                <!-- Available attributes:
                     data-social: social network -->
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[6px] hover:text-blue-500" data-social="twitter"><i class="fa fa-twitter"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="instagram"><i class="fa fa-instagram"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="facebook"><i class="fa fa-facebook"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="google"><i class="fa fa-google"></i></a>
                <a href="#" class="w-8 h-8 inline-block rounded-full pt-[5px] hover:text-blue-500" data-social="linkedin"><i class="fa fa-linkedin"></i></a>
            </div>
        </div>
    </nav>
</div>
<div class="flex justify-center p-8">
    <div class="flex flex-col justify-center">
        <div class="flex flex-col lg:flex-row max-w-5xl justify-center items-center p-2 space-y-3 w-[100%]">
            <div class="flex flex-col items-center lg:text-left text-center justify-between space-y-6 px-8">
                <div class="flex flex-col items-start space-y-3">
                    <!-- Available attributes:
                         data-header-title: main title -->
                    <div class="text-3xl md:text-5xl font-bold px-8" data-header-title="main">
                        Design is a journey of
                    </div>
                    <!-- Available attributes:
                         data-header-subtitle: subtitle -->
                    <div class="text-3xl text-orange-500 md:text-5xl font-bold px-8" data-header-subtitle>
                        Discovery
                    </div>
                    <div class="h-1 rounded-2xl w-20 bg-orange-500 ml-10"></div>
                </div>
                <!-- Available attributes:
                     data-cta-button: call-to-action button -->
                <button class="" data-cta-button>
                    <ion-icon name="caret-forward-outline"
                        class="mt-2 p-2 bg-orange-500 rounded-full text-3xl text-white border-2 border-orange-500 hover:bg-white hover:text-orange-500">
                    </ion-icon>
                </button>
            </div>
            <div class="flex space-x-2 md:space-x-6 md:m-4 w-1/2">
                <!-- Available attributes:
                     data-main-image: main image -->
                <div class="w-96 h-60 lg:h-96 overflow-hidden" data-main-image>
                    <img src="https://source.unsplash.com/300x400/?design" class="h-full w-full" alt="">
                </div>
            </div>
        </div>
    </div>
</div>`;
/*const fashionHubData = {
    headerLogo: "FashionHub",
    menuItems: [
        { name: "Home", link: "#" },
        { name: "Contact", link: "#contact" },
        { name: "Services", link: "#services" },
        { name: "About", link: "#about" }
    ],
    mainImage: {
        src: "https://source.unsplash.com/random/500x500/?fashion",
        alt: "Fashion main image"
    },
    galleryImages: [
        {
            id: 1,
            src: "https://source.unsplash.com/random/300x200/?clothing",
            alt: "Fashion gallery image 1"
        },
        {
            id: 2,
            src: "https://source.unsplash.com/random/200x200/?accessories",
            alt: "Fashion gallery image 2"
        },
        {
            id: 3,
            src: "https://source.unsplash.com/random/200x200/?shoes",
            alt: "Fashion gallery image 3"
        }
    ]
};*/