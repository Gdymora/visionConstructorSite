export const source = `
<style>
.nav-link {
    position: relative;
    transition: all 0.3s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.brand-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hamburger {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.hamburger:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.hamburger span {
    width: 24px;
    height: 3px;
    background-color: white;
    margin: 2px 0;
    transition: 0.3s;
    border-radius: 2px;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

@media (max-width: 768px) {
    .mobile-menu {
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }
    
    .mobile-menu.active {
        transform: translateY(0);
    }
}
</style>

<nav class="relative bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 shadow-xl border-b border-slate-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            
            <!-- Логотип -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span class="text-white font-bold text-xl">🚀</span>
                </div>
                <div class="text-white">
                    <h1 class="text-xl font-bold brand-gradient">Brand McBrandface</h1>
                    <p class="text-xs text-gray-300 hidden sm:block">Сучасні рішення</p>
                </div>
            </div>

            <!-- Десктопне меню -->
            <div class="hidden lg:flex items-center space-x-1">
                <a href="#" class="nav-link px-4 py-2 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                    Головна
                </a>
                <a href="#" class="nav-link px-4 py-2 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                    Послуги
                </a>
                <a href="#" class="nav-link px-4 py-2 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                    Про нас
                </a>
                <a href="#" class="nav-link px-4 py-2 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                    Контакти
                </a>
                <button class="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Замовити
                </button>
            </div>

            <!-- Мобільна кнопка -->
            <div class="lg:hidden">
                <button id="nav-toggle" class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </div>

    <!-- Мобільне меню -->
    <div id="nav-content" class="mobile-menu lg:hidden absolute w-full bg-slate-800/95 backdrop-blur-md border-t border-slate-700 shadow-2xl">
        <div class="px-4 py-6 space-y-3">
            <a href="#" class="block px-4 py-3 text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                Головна
            </a>
            <a href="#" class="block px-4 py-3 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                Послуги
            </a>
            <a href="#" class="block px-4 py-3 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                Про нас
            </a>
            <a href="#" class="block px-4 py-3 text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-all duration-300">
                Контакти
            </a>
            <button class="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
                Замовити
            </button>
        </div>
    </div>
</nav>

<script>
document.getElementById('nav-toggle').onclick = function(){
    const navContent = document.getElementById("nav-content");
    const hamburger = this;
    
    navContent.classList.toggle("active");
    hamburger.classList.toggle("active");
}
</script>
`;