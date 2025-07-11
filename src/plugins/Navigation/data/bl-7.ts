export const source = `
<style>
.nav-item {
    position: relative;
    transition: all 0.3s ease;
}

.nav-item::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-item:hover::after {
    width: 80%;
}

.social-icon {
    transition: all 0.3s ease;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social-icon:hover {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.mobile-menu {
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-menu.active {
    transform: translateX(0);
}

.hamburger {
    transition: all 0.3s ease;
}

.hamburger:hover {
    background: rgba(59, 130, 246, 0.1);
    transform: scale(1.05);
}

.brand-text {
    background: linear-gradient(135deg, #1e40af, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>

<div class="w-full">
    <nav class="relative bg-gradient-to-r from-slate-50 via-white to-slate-50 shadow-xl border-b border-gray-200/50 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                
                <!-- Логотип -->
                <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mr-3">
                        <span class="text-white font-bold text-xl">T</span>
                    </div>
                    <h1 class="text-2xl font-bold brand-text tracking-tight">TAILWIND</h1>
                </div>
                
                <!-- Десктопне меню -->
                <ul class="hidden md:flex items-center space-x-1 text-lg font-semibold">
                    <li class="nav-item px-5 py-2 text-gray-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-blue-50">
                        Home
                    </li>
                    <li class="nav-item px-5 py-2 text-gray-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-blue-50">
                        Contact
                    </li>
                    <li class="nav-item px-5 py-2 text-gray-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-blue-50">
                        Services
                    </li>
                    <li class="nav-item px-5 py-2 text-gray-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-blue-50">
                        About
                    </li>
                    <li class="nav-item px-5 py-2 text-gray-700 hover:text-blue-600 cursor-pointer rounded-lg hover:bg-blue-50">
                        Pricing
                    </li>
                </ul>
                
                <!-- Соціальні мережі -->
                <div class="hidden lg:flex items-center space-x-2">
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                    </a>
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2C5.477 2 2 5.477 2 10s3.477 8 8 8 8-3.477 8-8-3.477-8-8-8zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M10 7a3 3 0 100 6 3 3 0 000-6zm-1 3a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd"/>
                        </svg>
                    </a>
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm5.5 3a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM5 13h10v-2l-2-2-1.5 1.5L9 8 5 13z" clipRule="evenodd"/>
                        </svg>
                    </a>
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                        </svg>
                    </a>
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm9 4a1 1 0 10-2 0v3a1 1 0 102 0V9z" clipRule="evenodd"/>
                            <path d="M9 8a1 1 0 000-2v2z"/>
                        </svg>
                    </a>
                </div>
                
                <!-- Мобільна кнопка -->
                <button id="mobile-toggle" class="hamburger md:hidden p-3 rounded-xl hover:bg-gray-100">
                    <div class="w-6 h-0.5 bg-gray-600 mb-1.5 transition-all"></div>
                    <div class="w-6 h-0.5 bg-gray-600 mb-1.5 transition-all"></div>
                    <div class="w-6 h-0.5 bg-gray-600 transition-all"></div>
                </button>
            </div>
        </div>
        
        <!-- Мобільне меню -->
        <div id="mobile-menu" class="mobile-menu md:hidden absolute top-full right-0 w-80 h-screen bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-200">
            <div class="p-6">
                <ul class="space-y-1">
                    <li class="py-4 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all cursor-pointer border-b border-gray-100">
                        Home
                    </li>
                    <li class="py-4 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all cursor-pointer border-b border-gray-100">
                        Contact
                    </li>
                    <li class="py-4 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all cursor-pointer border-b border-gray-100">
                        Services
                    </li>
                    <li class="py-4 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all cursor-pointer border-b border-gray-100">
                        About
                    </li>
                    <li class="py-4 px-6 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all cursor-pointer border-b border-gray-100">
                        Pricing
                    </li>
                    <li class="mt-6">
                        <button class="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
                            Register
                        </button>
                    </li>
                </ul>
                
                <!-- Мобільні соціальні мережі -->
                <div class="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                    </a>
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2C5.477 2 2 5.477 2 10s3.477 8 8 8 8-3.477 8-8-3.477-8-8-8zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                        </svg>
                    </a>
                    <a href="#" class="social-icon text-gray-600">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </nav>
</div>

<script>
document.getElementById('mobile-toggle').onclick = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
    
    // Анімація гамбургера
    const lines = this.querySelectorAll('div');
    if (mobileMenu.classList.contains('active')) {
        lines[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
}
</script>
`;