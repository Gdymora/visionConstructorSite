export const source = `
<style>
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
}
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.main-content {
    flex-grow: 1;
    background-color: #D3D9F1;
    color: #FD651A;
    padding: 20px;
}
.color-demo {
    background-color: white;
    padding: 20px;
    margin-top: 20px;
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
</style> 
<div class="container">
<main class="main-content">
    <h1>Головна частина сайту</h1>
    <p>Це основний вміст сайту. Фон має колір #D3D9F1, а текст - #FD651A.</p>
</main>
<section class="color-demo">
    <div class="color-block" style="background-color: #D3D9F1; color: #FD651A;">
        <span>BACKGROUND</span>
        <span>#D3D9F1</span>
    </div>
    <div class="color-block" style="background-color: #FD651A;">
        <span>TEKCT</span>
        <span>#FD651A</span>
    </div>
</section>
</div>
`;
