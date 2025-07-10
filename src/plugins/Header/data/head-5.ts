export const source = `   <div class="flex justify-center">
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
    </div>
</nav>
</div>
<div class="flex justify-center items-center">
<div class="flex flex-col justify-center items-center max-w-7xl">
    <!-- Available attributes:
         data-main-title: main title -->
    <h1 class="text-3xl md:text-[50px] text-gray-700 font-bold mt-5" data-main-title>Tailblocks CSS</h1>
    <div class="flex flex-col justify-center items-center xl:flex-row m-8 w-[80%] lg:w-full">
        <!-- Available attributes:
             data-service-section: service section container -->
        <div class="flex flex-col items-center justify-center m-6 px-6 lg:w-1/3 w-full" data-service-section>
            <h1 class="text-gray-700 text-2xl font-bold">Service</h1>
            <!-- Available attributes:
                 data-service-item: service item -->
            <div class="flex items-center justify-center flex-col space-y-2 mt-5" data-service-item="web-development">
                <div class="flex items-center justify-center space-x-4">
                    <img src="https://www.esearchlogix.com/wp-content/uploads/2022/04/web-left-banner.jpg"
                        class="w-[20%] md:w-[5%]" alt="">
                    <h1 class="text-lg font-semibold mt-3">Web Development</h1>
                </div>
                <h1 class="text-justify text-gray-700 md:w-[250px]">Tailblocks provides best Tailwind CSS
                    components. Visit our website and feel free to give feedback.</h1>
            </div>
            <!-- More service items... -->
        </div>
        <!-- Available attributes:
             data-main-image: main image -->
        <div class="w-60 lg:w-96 h-60 lg:h-96 overflow-hidden" data-main-image>
            <img src="https://source.unsplash.com/300x400/?computer" class="h-full w-full" alt="">
        </div>
        <!-- Available attributes:
             data-about-section: about section container -->
        <div class="flex flex-col m-6 px-6 xl:w-1/3 w-full items-center justify-center" data-about-section>
            <div class="flex flex-col items-start">
                <h1 class="text-gray-700 text-2xl font-bold">Web specialist based in Jakarta</h1>
                <p class="text-justify text-gray-700 md:w-[250px] mt-5">Tailblocks provides best Tailwind CSS
                    components. Visit our website and feel free to give feedback.</p>
                <p class="text-justify text-gray-700 md:w-[250px] mt-5">Tailblocks provides best Tailwind CSS
                    components. Visit our website and feel free to give feedback.</p>
                <!-- Available attributes:
                     data-cta-button: call-to-action button -->
                <button class="mt-5 px-6 py-1 text-lg text-white hover:bg-gray-800 bg-gray-700" data-cta-button>Hire me</button>
            </div>
            <!-- Available attributes:
                 data-stats: statistics container -->
            <div class="flex space-x-6 mt-5" data-stats>
                <!-- Available attributes:
                     data-stat-item: statistic item -->
                <div class="flex flex-col" data-stat-item="experience">
                    <div class="flex space-x-1">
                        <h1 class="text-2xl font-semibold mt-3">13</h1>
                        <h1 class="text-xl mt-[14px] font-semibold">Years</h1>
                    </div>
                    <h1 class="text-gray-700">Experience</h1>
                </div>
                <!-- More stat items... -->
            </div>
        </div>
    </div>
</div>
</div>`;
/* 
const tailblocksData = {
    mainTitle: "Tailblocks CSS",
    services: [
        {
            name: "Web Development",
            icon: "https://www.esearchlogix.com/wp-content/uploads/2022/04/web-left-banner.jpg",
            description: "Tailblocks provides best Tailwind CSS components. Visit our website and feel free to give feedback."
        },
        {
            name: "UI/UX Design",
            icon: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149024129.jpg?w=2000",
            description: "Tailblocks provides best Tailwind CSS components. Visit our website and feel free to give feedback."
        },
        {
            name: "Web Consulting",
            icon: "https://webconsulting.ie/wp-content/uploads/2020/09/cropped-logo-Web-Consulting.png",
            description: "Tailblocks provides best Tailwind CSS components. Visit our website and feel free to give feedback."
        }
    ],
    mainImage: {
        src: "https://source.unsplash.com/300x400/?computer",
        alt: "Main image"
    },
    about: {
        title: "Web specialist based in Jakarta",
        description: [
            "Tailblocks provides best Tailwind CSS components. Visit our website and feel free to give feedback.",
            "Tailblocks provides best Tailwind CSS components. Visit our website and feel free to give feedback."
        ],
        ctaButton: "Hire me"
    },
    stats: [
        { name: "Experience", value: "13", unit: "Years" },
        { name: "Clients", value: "256", unit: "+" },
        { name: "Satisfaction", value: "99.8", unit: "%" }
    ]
};
*/