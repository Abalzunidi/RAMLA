// ========================================
// RAMLA STORE - MAIN SCRIPT
// ========================================

// المتغيرات العامة
let currentLanguage = 'ar';

// ========================================
// وظيفة اختيار اللغة - GLOBAL
// ========================================
window.selectLanguage = function(lang) {
    currentLanguage = lang;
    localStorage.setItem('currentLanguage', lang);
    
    const popup = document.getElementById('languagePopup');
    if (popup) {
        popup.classList.add('hidden');
    }
    
    if (lang === 'en') {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }
    
    updateTexts(lang);
    console.log('✅ تم تغيير اللغة إلى: ' + lang);
};

// تحديث النصوص
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(el => {
        const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        if (text) {
            el.textContent = text;
        }
    });
}

// ========================================
// وظيفة حذف من السلة - GLOBAL
// ========================================
window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    console.log('✅ تم حذف المنتج من السلة');
};

// ========================================
// بعد تحميل الصفحة
// ========================================
window.addEventListener('load', function() {
    console.log('✅ الصفحة تحملت - جاهز للعمل');
    
    initMenu();
    initCart();
    updateCartDisplay();
    
    console.log('✅ جميع الوظائف جاهزة');
});

// ========================================
// المنيو
// ========================================
function initMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuClose = document.getElementById('menuClose');
    const menuBackdrop = document.getElementById('menuBackdrop');
    
    if (!menuIcon || !menuOverlay || !menuBackdrop) {
        console.warn('⚠️ عناصر المنيو غير موجودة');
        return;
    }
    
    menuIcon.addEventListener('click', function() {
        console.log('🔘 تم الضغط على المنيو');
        menuIcon.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        
        if (menuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            const cartOverlay = document.getElementById('cartOverlay');
            if (cartOverlay) {
                cartOverlay.classList.remove('active');
            }
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            menuIcon.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // إغلاق المنيو عند الضغط على الروابط
    document.querySelectorAll('.menu-list a').forEach(link => {
        link.addEventListener('click', function() {
            menuIcon.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    console.log('✅ المنيو جاهز');
}

// ========================================
// السلة
// ========================================
function initCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    
    if (!cartIcon || !cartOverlay) {
        console.warn('⚠️ عناصر السلة غير موجودة');
        return;
    }
    
    cartIcon.addEventListener('click', function() {
        console.log('🛒 تم الضغط على السلة');
        cartOverlay.classList.toggle('active');
        const menuBackdrop = document.getElementById('menuBackdrop');
        if (menuBackdrop) {
            menuBackdrop.classList.toggle('active');
        }
        
        if (cartOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            const menuOverlay = document.getElementById('menuOverlay');
            const menuIcon = document.getElementById('menuIcon');
            if (menuOverlay) menuOverlay.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('active');
            updateCartDisplay();
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    if (cartClose) {
        cartClose.addEventListener('click', function() {
            cartOverlay.classList.remove('active');
            const menuBackdrop = document.getElementById('menuBackdrop');
            if (menuBackdrop) menuBackdrop.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    console.log('✅ السلة جاهزة');
}

function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
    
    if (!cartContent) return;
    
    if (cart.length === 0) {
        const emptyMsg = currentLanguage === 'ar' ? 'السلة فارغة' : 'Cart is empty';
        cartContent.innerHTML = '<p class="cart-empty">' + emptyMsg + '</p>';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        let itemsHTML = '<div class="cart-items">';
        
        cart.forEach(function(item, index) {
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
            
            itemsHTML += '<div class="cart-item">';
            itemsHTML += '<div class="cart-item-image">';
            itemsHTML += '<img src="' + (productImages[item.productId] || 'P1.png') + '" alt="' + item.productName + '">';
            itemsHTML += '</div>';
            itemsHTML += '<div class="cart-item-details">';
            itemsHTML += '<div class="cart-item-name">' + item.productName + '</div>';
            itemsHTML += '<div class="cart-item-info">';
            itemsHTML += sizeLabel + ' ' + item.size;
            if (options.length > 0) {
                itemsHTML += '<br>' + options.join(' • ');
            }
            itemsHTML += '</div>';
            itemsHTML += '</div>';
            itemsHTML += '<button class="cart-item-remove" onclick="removeFromCart(' + index + ')"></button>';
            itemsHTML += '</div>';
        });
        
        itemsHTML += '</div>';
        cartContent.innerHTML = itemsHTML;
        if (cartTotal) cartTotal.textContent = cart.length;
        if (cartFooter) cartFooter.style.display = 'flex';
        
        updateTexts(currentLanguage);
    }
}

console.log('✅ Script تحمل بنجاح');