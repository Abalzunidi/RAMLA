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
        const message = currentLang === 'ar' 
            ? 'يرجى اختيار المقاس أولاً' 
            : 'Please select a size first';
        alert(message);
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
    
    // رسالة تأكيد
    const successMessage = currentLang === 'ar'
        ? 'تمت إضافة المنتج للسلة بنجاح!'
        : 'Product added to cart successfully!';
    alert(successMessage);
    
    // العودة للصفحة الرئيسية
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
});

// تحميل المنتج وتحديث النصوص
loadProduct();
updateTexts(currentLang);