// بيانات المنتجات
const products = {
    'P1': { name: { ar: 'هتان 1', en: 'HATTAN 1' }, image: 'P1.png' },
    'P2': { name: { ar: 'هتان 2', en: 'HATTAN 2' }, image: 'P2.png' },
    'P3': { name: { ar: 'غضى', en: 'GHADA' }, image: 'P3.png' },
    'P4': { name: { ar: 'بارق', en: 'BAREQ' }, image: 'P4.png' }
};

// الحصول على معلومات المنتج من URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const currentLang = urlParams.get('lang') || 'ar';

// تحديث اتجاه الصفحة
if (currentLang === 'en') {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
} else {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
}

// تحديث النصوص
function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(function(el) {
        const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        if (text) el.textContent = text;
    });
    
    const notesTextarea = document.getElementById('notes');
    if (notesTextarea) {
        notesTextarea.placeholder = lang === 'ar' ? 'اكتب ملاحظاتك هنا...' : 'Write your notes here...';
    }
}

// تحميل بيانات المنتج
function loadProduct() {
    if (productId && products[productId]) {
        const product = products[productId];
        const imgEl = document.getElementById('productImage');
        const titleEl = document.getElementById('productTitle');
        
        if (imgEl) {
            imgEl.src = product.image;
            imgEl.alt = product.name[currentLang];
        }
        if (titleEl) {
            titleEl.textContent = product.name[currentLang];
        }
        document.title = product.name[currentLang] + ' - Ramla Design';
    } else {
        window.location.href = 'index.html';
    }
}

// التحقق من اختيار المقاس
function validateSize() {
    const sizeInputs = document.querySelectorAll('input[name="size"]');
    let isSelected = false;
    sizeInputs.forEach(function(input) {
        if (input.checked) isSelected = true;
    });
    return isSelected;
}

// بوب اب النجاح
function showSuccessPopup(lang) {
    const message = lang === 'ar' ? 'تمت إضافة المنتج للسلة بنجاح!' : 'Product added to cart successfully!';
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = '<div class="success-popup-content"><div class="success-icon">✓</div><p class="success-message">' + message + '</p></div>';
    document.body.appendChild(popup);
    
    setTimeout(function() { popup.classList.add('show'); }, 10);
    setTimeout(function() {
        popup.classList.remove('show');
        setTimeout(function() { document.body.removeChild(popup); }, 300);
    }, 1800);
}

// بوب اب الخطأ
function showErrorPopup(lang) {
    const message = lang === 'ar' ? 'يرجى اختيار المقاس أولاً' : 'Please select a size first';
    const popup = document.createElement('div');
    popup.className = 'success-popup error-popup';
    popup.innerHTML = '<div class="success-popup-content"><div class="success-icon error-icon">!</div><p class="success-message">' + message + '</p></div>';
    document.body.appendChild(popup);
    
    setTimeout(function() { popup.classList.add('show'); }, 10);
    setTimeout(function() {
        popup.classList.remove('show');
        setTimeout(function() { document.body.removeChild(popup); }, 300);
    }, 1500);
}

// بعد تحميل الصفحة
window.addEventListener('load', function() {
    console.log('✅ صفحة المنتج تحملت');
    
    loadProduct();
    updateTexts(currentLang);
    
    // زر إضافة للسلة
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            if (!validateSize()) {
                showErrorPopup(currentLang);
                return;
            }
            
            const selectedSize = document.querySelector('input[name="size"]:checked').value;
            const abayaLock = document.getElementById('abayaLock');
            const liningColor = document.getElementById('liningColor');
            const secondaryColor = document.getElementById('secondaryColor');
            const notes = document.getElementById('notes');
            
            const orderData = {
                productId: productId,
                productName: products[productId].name[currentLang],
                size: selectedSize,
                options: {
                    abayaLock: abayaLock ? abayaLock.checked : false,
                    liningColor: liningColor ? liningColor.checked : false,
                    secondaryColor: secondaryColor ? secondaryColor.checked : false
                },
                notes: notes ? notes.value : '',
                timestamp: new Date().toISOString()
            };
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(orderData);
            localStorage.setItem('cart', JSON.stringify(cart));
            
            showSuccessPopup(currentLang);
            
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    
    console.log('✅ المنتج جاهز');
});

console.log('✅ Product script loaded');