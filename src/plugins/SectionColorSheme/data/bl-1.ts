export const source = `
<style>
:root {
    --background-color: #F5DBDC;
    --text-color: #717171;
}
body, html {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
}
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}
.logo {
    font-size: 24px;
    font-weight: bold;
}
.nav-links a {
    margin-left: 20px;
    text-decoration: none;
    color: var(--text-color);
}
.hero {
    padding: 100px 0;
    text-align: center;
}
.hero h1 {
    font-size: 48px;
    margin-bottom: 20px;
}
.hero p {
    font-size: 18px;
    max-width: 600px;
    margin: 0 auto 30px;
}
.cta-button {
    display: inline-block;
    background-color: var(--text-color);
    color: white;
    padding: 12px 24px;
    border-radius: 30px;
    text-decoration: none;
    transition: background-color 0.3s;
}
.cta-button:hover {
    background-color: #5a5a5a;
}
.gallery {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 40px 0;
}
.gallery-item {
    width: calc(33.333% - 20px);
    margin-bottom: 30px;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.gallery-item-content {
    padding: 20px;
}
.cards {
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
}
.card {
    width: calc(33.333% - 20px);
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.color-demo {
  background-color: white;
  padding: 40px 0;
  margin-top: 60px;
}
.color-block {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 10px;
  color: white;
}
footer {
    background-color: var(--text-color);
    color: white;
    padding: 40px 0;
    margin-top: 60px;
}
.footer-content {
    display: flex;
    justify-content: space-between;
}
.footer-section {
    width: 30%;
}
.footer-section h3 {
    margin-bottom: 20px;
}
</style>
 
<header>
<div class="container">
    <nav>
        <div class="logo">Лого</div>
        <div class="nav-links">
            <a href="#">Головна</a>
            <a href="#">Галерея</a>
            <a href="#">Про нас</a>
            <a href="#">Контакти</a>
        </div>
    </nav>
</div>
</header>

<main>
<section class="hero">
    <div class="container">
        <h1>Ласкаво просимо на наш лендінг</h1>
        <p>Це приклад повноцінного лендінгу з використанням заданої кольорової схеми.</p>
        <a href="#" class="cta-button">Дізнатися більше</a>
    </div>
</section>

<section class="color-demo">
            <div class="container">
                <h2>Кольорова схема</h2>
                <div class="color-block" style="background-color: var(--background-color);">
                    <span class="color-name">BACKGROUND</span>
                    <span>#F5DBDC</span>
                </div>
                <div class="color-block" style="background-color: var(--text-color); color: white;">
                    <span class="color-name">TEKCT</span>
                    <span>#717171</span>
                </div>
            </div>
</section>

<section class="gallery container">
    <div class="gallery-item">
        <img src="/api/placeholder/400/200" alt="Галерея 1">
        <div class="gallery-item-content">
            <h3>Заголовок 1</h3>
            <p>Короткий опис зображення 1.</p>
        </div>
    </div>
    <div class="gallery-item">
        <img src="/api/placeholder/400/200" alt="Галерея 2">
        <div class="gallery-item-content">
            <h3>Заголовок 2</h3>
            <p>Короткий опис зображення 2.</p>
        </div>
    </div>
    <div class="gallery-item">
        <img src="/api/placeholder/400/200" alt="Галерея 3">
        <div class="gallery-item-content">
            <h3>Заголовок 3</h3>
            <p>Короткий опис зображення 3.</p>
        </div>
    </div>
</section>

<section class="cards container">
    <div class="card">
        <h3>Картка 1</h3>
        <p>Інформація про картку 1.</p>
    </div>
    <div class="card">
        <h3>Картка 2</h3>
        <p>Інформація про картку 2.</p>
    </div>
    <div class="card">
        <h3>Картка 3</h3>
        <p>Інформація про картку 3.</p>
    </div>
</section>
</main>

<footer>
<div class="container footer-content">
    <div class="footer-section">
        <h3>Про нас</h3>
        <p>Короткий опис про компанію чи проект.</p>
    </div>
    <div class="footer-section">
        <h3>Контакти</h3>
        <p>Email: info@example.com</p>
        <p>Телефон: +380123456789</p>
    </div>
    <div class="footer-section">
        <h3>Слідкуйте за нами</h3>
        <p>Посилання на соціальні мережі</p>
    </div>
</div>
</footer>
`;
