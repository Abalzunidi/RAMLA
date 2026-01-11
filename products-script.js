// الحصول على اللغة من URL أو من localStorage
const urlParams = new URLSearchParams(window.location.search);
let currentLanguage = urlParams.get('lang') || localStorage.getItem('currentLanguage') || 'ar';

// تحديث اتجاه الصفحة واللغة
if (currentLanguage === 'en') {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
} else {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
}

// تحديث النصوص حسب اللغة
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(el => {
        el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
}

// تحديث رابط المنتج حسب اللغة المختارة
function setProductLink(event, productId) {
    event.preventDefault();
    const link = event.currentTarget;
    link.href = `loading.html?product=${productId}&lang=${currentLanguage}`;
    window.location.href = link.href;
}

// تحديث النصوص
updateTexts(currentLanguage);