export const source = `  
<div class="flex justify-center bg-no-repeat bg-cover h-full md:bg-center" style="background-image:url('https://source.unsplash.com/700x400/?white')">
    <div class="flex flex-col items-center">
        <nav class="self-center w-full max-w-7xl">
            <div class="flex md:flex-row flex-col justify-between items-center md:items-start border-b-2 border-blue-900">
                <!-- Available attributes:
                     data-header-logo: header logo text -->
                <h1 class="py-4 text-2xl font-sans font-bold px-10" data-header-logo="logo-text">Portfolio</h1>
                
                <!-- Available attributes:
                     data-header-menu: menu container -->
                <ul class="flex items-center text-sm md:text-[18px] font-bold md:px-10 my-2" data-header-menu>
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
        <div class="flex flex-col justify-center items-center text-center max-w-7xl my-8 py-4 px-10">
            <!-- Available attributes:
                 data-welcome-text: welcome text -->
            <h1 class="text-base font-medium tracking-wider" data-welcome-text>Welcome to my Client Template</h1>
            <span class="underline underline-offset-2 text-gray-700-mt-3"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
            <div class="flex flex-col text-gray-700mt-5">
                <!-- Available attributes:
                     data-name: name of the portfolio owner -->
                <h1 class="text-4xl md:text-[50px] font-semibold" data-name>Hello I'm John Watson</h1>
                <!-- Available attributes:
                     data-profession: profession of the portfolio owner -->
                <p class="text-xl mt-2 md:mt-4 tracking-wide" data-profession>Designer - Developer - Freelancer</p>
            </div>
            <!-- Available attributes:
                 data-description: description text -->
            <p class="mt-4 text-sm md:w-[52%] tracking-wide leading-7" data-description>Tailblocks provides best Tailwind CSS
                components. Visit our website and feel free to give feedback. With the help of Tailblocks, a user can
                build a website in a much lesser time.</p>
            <!-- Available attributes:
                 data-social-links: social media links container -->
            <div class="space-x-3 mt-6 md:mt-4 text-white" data-social-links>
                <a href="#" data-social="facebook"> <i class="fa-brands fa-facebook-f bg-blue-600 hover:text-blue-500 hover:bg-white rounded-full px-3 py-[11px] w-9 h-9 text-center"></i> </a>
                <a href="#" data-social="twitter"> <i class="fa-brands fa-twitter bg-blue-600 hover:text-red-500 hover:bg-white rounded-full px-[10px] py-[11px] w-9 h-9 text-center"></i> </a>
                <a href="#" data-social="linkedin"> <i class="fa-brands fa-linkedin bg-blue-600 hover:text-yellow-500 hover:bg-white rounded-full px-3 py-[11px] w-9 h-9 text-center"></i> </a>
                <a href="#" data-social="website"> <i class="fa-brands fa-chrome bg-blue-600 hover:text-indigo-600 hover:bg-white rounded-full px-[10px] py-[11px] w-9 h-9 text-center"></i> </a>
            </div>
            <div class="flex mt-10 space-x-5">
                <!-- Available attributes:
                     data-button: button type -->
                <button class="bg-white text-blue-900 px-6 py-2 hover:brightness-105 font-semibold" data-button="read-more">Read More</button>
                <button class="bg-blue-900 text-white border-2 border-white px-6 py-2 hover:brightness-105 font-semibold" data-button="contact">Contact Me</button>
            </div>
        </div>
    </div>
</div>`;
/* 
const portfolioData = {
    backgroundImage: "https://source.unsplash.com/700x400/?white",
    headerLogo: "Portfolio",
    menuItems: [
        { name: "Home", link: "#", dataAttribute: "home" },
        { name: "Contact", link: "#", dataAttribute: "contact" },
        { name: "Services", link: "#", dataAttribute: "services" },
        { name: "About", link: "#", dataAttribute: "about" }
    ],
    welcomeText: "Welcome to my Client Template",
    name: "Hello I'm John Watson",
    profession: "Designer - Developer - Freelancer",
    description: "Tailblocks provides best Tailwind CSS components. Visit our website and feel free to give feedback. With the help of Tailblocks, a user can build a website in a much lesser time.",
    socialLinks: [
        { name: "facebook", link: "#", icon: "fa-facebook-f" },
        { name: "twitter", link: "#", icon: "fa-twitter" },
        { name: "linkedin", link: "#", icon: "fa-linkedin" },
        { name: "website", link: "#", icon: "fa-chrome" }
    ],
    buttons: [
        { text: "Read More", type: "read-more", style: "bg-white text-blue-900" },
        { text: "Contact Me", type: "contact", style: "bg-blue-900 text-white border-2 border-white" }
    ]
};
*/