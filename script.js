let currentLanguage = 'ar';

function selectLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('languagePopup').classList.add('hidden');
    
    if (lang === 'en') {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }
    
    updateTexts(lang);
}

function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(el => {
        el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
}

const menuIcon = document.getElementById('menuIcon');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuBackdrop = document.getElementById('menuBackdrop');

function toggleMenu() {
    menuIcon.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    menuBackdrop.classList.toggle('active');
    
    if (menuOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        cartOverlay.classList.remove('active');
    } else {
        document.body.style.overflow = 'auto';
    }
}

menuIcon.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', () => {
    menuIcon.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.querySelectorAll('.menu-list a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('active');
        menuOverlay.classList.remove('active');
        menuBackdrop.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

menuBackdrop.addEventListener('click', () => {
    menuIcon.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuBackdrop.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');

function toggleCart() {
    cartOverlay.classList.toggle('active');
    menuBackdrop.classList.toggle('active');
    
    if (cartOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        menuOverlay.classList.remove('active');
        menuIcon.classList.remove('active');
    } else {
        document.body.style.overflow = 'auto';
    }
}

cartIcon.addEventListener('click', toggleCart);
cartClose.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
    menuBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// شاشة الإعلانات
let currentSlide = 0;
const slides = document.querySelectorAll('.ads-slide');
const adsSlider = document.getElementById('adsSlider');
let touchStartX = 0;
let touchEndX = 0;

console.log('Slides found:', slides.length);
console.log('First slide has active class:', slides[0].classList.contains('active'));

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    console.log('Current slide:', currentSlide);
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

// دعم اللمس والسحب
adsSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

adsSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// دعم الماوس
adsSlider.addEventListener('mousedown', (e) => {
    touchStartX = e.screenX;
});

adsSlider.addEventListener('mouseup', (e) => {
    touchEndX = e.screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // سحب لليسار = الصورة التالية
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // سحب لليمين = الصورة السابقة
        changeSlide(-1);
    }
}

// تبديل تلقائي كل 5 ثواني
setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
}, 5000);

// تحديث رابط المنتج حسب اللغة المختارة
function setProductLink(event, productId) {
    event.preventDefault();
    const link = event.currentTarget;
    link.href = `loading.html?product=${productId}&lang=${currentLanguage}`;
    window.location.href = link.href;
}