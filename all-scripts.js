/* ========================================
   RAMLA STORE - ALL SCRIPTS
   ======================================== */

/* ========== INDEX / HOMEPAGE SCRIPTS ========== */
let currentLanguage = 'ar';

function selectLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('currentLanguage', lang);
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
        updateCartDisplay();
    } else {
        document.body.style.overflow = 'auto';
    }
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    
    // تحديث العدد في الأيقونة
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    
    if (cart.length === 0) {
        const emptyMsg = currentLanguage === 'ar' ? 'السلة فارغة' : 'Cart is empty';
        cartContent.innerHTML = `<p class="cart-empty">${emptyMsg}</p>`;
        cartFooter.style.display = 'none';
    } else {
        let itemsHTML = '<div class="cart-items">';
        
        cart.forEach((item, index) => {
            const sizeLabel = currentLanguage === 'ar' ? 'المقاس:' : 'Size:';
            const options = [];
            
            if (item.options && item.options.abayaLock) {
                options.push(currentLanguage === 'ar' ? 'تقفيل العباية' : 'Abaya Lock');
            }
            if (item.options && item.options.liningColor) {
                options.push(currentLanguage === 'ar' ? 'تغيير البطانة' : 'Lining Color');
            }
            if (item.options && item.options.secondaryColor) {
                options.push(currentLanguage === 'ar' ? 'اللون الثانوي' : 'Secondary Color');
            }
            
            const productImages = {
                'P1': 'P1.png',
                'P2': 'P2.png',
                'P3': 'P3.png',
                'P4': 'P4.png'
            };
            
            itemsHTML += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${productImages[item.productId] || 'P1.png'}" alt="${item.productName}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.productName}</div>
                        <div class="cart-item-info">
                            ${sizeLabel} ${item.size}${options.length > 0 ? '<br>' + options.join(' • ') : ''}
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})"></button>
                </div>
            `;
        });
        
        itemsHTML += '</div>';
        cartContent.innerHTML = itemsHTML;
        cartTotal.textContent = cart.length;
        cartFooter.style.display = 'flex';
        
        // تحديث النصوص
        updateTexts(currentLanguage);
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// تحديث عداد السلة عند تحميل الصفحة
window.addEventListener('load', updateCartDisplay);

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

// بوب اب سياسة الاسترجاع
const returnPolicyOverlay = document.getElementById('returnPolicyOverlay');
const returnPolicyClose = document.getElementById('returnPolicyClose');
const returnPolicyLink = document.querySelector('.return-policy-link');

if (returnPolicyLink) {
    returnPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        returnPolicyOverlay.classList.add('active');
        menuOverlay.classList.remove('active');
        menuBackdrop.classList.remove('active');
        menuIcon.classList.remove('active');
        document.body.style.overflow = 'hidden';
        
        // تحديث النصوص حسب اللغة
        updateTexts(currentLanguage);
    });
}

if (returnPolicyClose) {
    returnPolicyClose.addEventListener('click', () => {
        returnPolicyOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (returnPolicyOverlay) {
    returnPolicyOverlay.addEventListener('click', (e) => {
        if (e.target === returnPolicyOverlay) {
            returnPolicyOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// بوب اب سياسة الخصوصية
const privacyPolicyOverlay = document.getElementById('privacyPolicyOverlay');
const privacyPolicyClose = document.getElementById('privacyPolicyClose');
const privacyPolicyLink = document.querySelector('.privacy-policy-link');

if (privacyPolicyLink) {
    privacyPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyPolicyOverlay.classList.add('active');
        menuOverlay.classList.remove('active');
        menuBackdrop.classList.remove('active');
        menuIcon.classList.remove('active');
        document.body.style.overflow = 'hidden';
        
        // تحديث النصوص حسب اللغة
        updateTexts(currentLanguage);
    });
}

if (privacyPolicyClose) {
    privacyPolicyClose.addEventListener('click', () => {
        privacyPolicyOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (privacyPolicyOverlay) {
    privacyPolicyOverlay.addEventListener('click', (e) => {
        if (e.target === privacyPolicyOverlay) {
            privacyPolicyOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// بوب اب عن رملا
const aboutOverlay = document.getElementById('aboutOverlay');
const aboutClose = document.getElementById('aboutClose');
const aboutLink = document.querySelector('.about-link');

if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutOverlay.classList.add('active');
        menuOverlay.classList.remove('active');
        menuBackdrop.classList.remove('active');
        menuIcon.classList.remove('active');
        document.body.style.overflow = 'hidden';
        
        // تحديث النصوص حسب اللغة
        updateTexts(currentLanguage);
    });
}

if (aboutClose) {
    aboutClose.addEventListener('click', () => {
        aboutOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (aboutOverlay) {
    aboutOverlay.addEventListener('click', (e) => {
        if (e.target === aboutOverlay) {
            aboutOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

/* ========== PRODUCT PAGE SCRIPTS ========== */
// بيانات المنتجات
const products = {
    'P1': {
        name: { ar: 'هتان 1', en: 'HATTAN 1' },
        image: 'P1.png'
    },
    'P2': {
        name: { ar: 'هتان 2', en: 'HATTAN 2' },
        image: 'P2.png'
    },
    'P3': {
        name: { ar: 'غضى', en: 'GHADA' },
        image: 'P3.png'
    },
    'P4': {
        name: { ar: 'بارق', en: 'BAREQ' },
        image: 'P4.png'
    }
};

// الحصول على معلومات المنتج من URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const currentLang = urlParams.get('lang') || 'ar';

// تحديث اتجاه الصفحة واللغة
if (currentLang === 'en') {
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
    
    // تحديث placeholder
    const notesTextarea = document.getElementById('notes');
    notesTextarea.placeholder = lang === 'ar' ? 'اكتب ملاحظاتك هنا...' : 'Write your notes here...';
}

// تحميل بيانات المنتج
function loadProduct() {
    if (productId && products[productId]) {
        const product = products[productId];
        
        document.getElementById('productImage').src = product.image;
        document.getElementById('productImage').alt = product.name[currentLang];
        document.getElementById('productTitle').textContent = product.name[currentLang];
        document.title = product.name[currentLang] + ' - Ramla Design';
    } else {
        // إذا المنتج غير موجود، ارجع للصفحة الرئيسية
        window.location.href = 'index.html';
    }
}

// التحقق من اختيار المقاس
function validateSize() {
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    let isSelected = false;
    
    sizeInputs.forEach(input => {
        if (input.checked) {
            isSelected = true;
        }
    });
    
    return isSelected;
}

// إضافة المنتج للسلة
document.getElementById('addToCartBtn').addEventListener('click', function() {
    // التحقق من اختيار المقاس
    if (!validateSize()) {
        showErrorPopup(currentLang);
        return;
    }
    
    // جمع البيانات
    const selectedSize = document.querySelector('input[name="size"]:checked').value;
    const abayaLock = document.getElementById('abayaLock').checked;
    const liningColor = document.getElementById('liningColor').checked;
    const secondaryColor = document.getElementById('secondaryColor').checked;
    const notes = document.getElementById('notes').value;
    
    // بيانات المنتج
    const orderData = {
        productId: productId,
        productName: products[productId].name[currentLang],
        size: selectedSize,
        options: {
            abayaLock: abayaLock,
            liningColor: liningColor,
            secondaryColor: secondaryColor
        },
        notes: notes,
        timestamp: new Date().toISOString()
    };
    
    // حفظ في localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(orderData);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // إظهار بوب اب النجاح
    showSuccessPopup(currentLang);
    
    // العودة للصفحة الرئيسية بعد ثانيتين
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

// بوب اب النجاح
function showSuccessPopup(lang) {
    const message = lang === 'ar' 
        ? 'تمت إضافة المنتج للسلة بنجاح!' 
        : 'Product added to cart successfully!';
    
    // إنشاء البوب اب
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="success-popup-content">
            <div class="success-icon">✓</div>
            <p class="success-message">${message}</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // إظهار البوب اب
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    // إخفاء البوب اب
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    }, 1800);
}

// بوب اب الخطأ
function showErrorPopup(lang) {
    const message = lang === 'ar' 
        ? 'يرجى اختيار المقاس أولاً' 
        : 'Please select a size first';
    
    // إنشاء البوب اب
    const popup = document.createElement('div');
    popup.className = 'success-popup error-popup';
    popup.innerHTML = `
        <div class="success-popup-content">
            <div class="success-icon error-icon">!</div>
            <p class="success-message">${message}</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // إظهار البوب اب
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    // إخفاء البوب اب
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    }, 1500);
}

// تحميل المنتج وتحديث النصوص
loadProduct();
updateTexts(currentLang);