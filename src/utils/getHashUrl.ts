export function getHashUrl() {
    const hash = window.location.hash;  
    const pureHash = hash.slice(1);
    return pureHash;
}

// Функція для додавання #projectname до поточного URL
export function addProjectNameToUrl(projectName, event = { preventDefault: () => {} }) {
    // Запобігання стандартній дії переходу по посиланню, якщо подія передана
    event.preventDefault();

    // Використання history.pushState для зміни URL без перезавантаження сторінки
    window.history.pushState({}, '', `#${encodeURIComponent(projectName)}`);
}
