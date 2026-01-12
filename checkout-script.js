// الحصول على اللغة من URL
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
        const text = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });
}

// بيانات المنتجات
const products = {
    'P1': { name: { ar: 'هتان 1', en: 'HATTAN 1' }, image: 'P1.png' },
    'P2': { name: { ar: 'هتان 2', en: 'HATTAN 2' }, image: 'P2.png' },
    'P3': { name: { ar: 'غضى', en: 'GHADA' }, image: 'P3.png' },
    'P4': { name: { ar: 'بارق', en: 'BAREQ' }, image: 'P4.png' }
};

// عرض ملخص الطلب
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderSummary = document.getElementById('orderSummary');
    
    if (cart.length === 0) {
        const emptyMsg = currentLanguage === 'ar' ? 'السلة فارغة' : 'Cart is empty';
        orderSummary.innerHTML = `<p class="empty-order">${emptyMsg}</p>`;
        return;
    }
    
    let summaryHTML = '';
    
    cart.forEach(item => {
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
        
        summaryHTML += `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${productImages[item.productId] || 'P1.png'}" alt="${item.productName}">
                </div>
                <div class="order-item-details">
                    <div class="order-item-name">${item.productName}</div>
                    <div class="order-item-info">
                        ${sizeLabel} ${item.size}
                        ${options.length > 0 ? '<br>' + options.join(' • ') : ''}
                        ${item.notes ? '<br>' + (currentLanguage === 'ar' ? 'ملاحظات: ' : 'Notes: ') + item.notes : ''}
                    </div>
                </div>
            </div>
        `;
    });
    
    const totalLabel = currentLanguage === 'ar' ? 'إجمالي المنتجات:' : 'Total Items:';
    const itemsLabel = currentLanguage === 'ar' ? 'منتج' : 'items';
    
    summaryHTML += `
        <div class="order-total">
            <span class="order-total-text">
                ${totalLabel}
                <span class="order-total-number">${cart.length}</span>
                ${itemsLabel}
            </span>
        </div>
    `;
    
    orderSummary.innerHTML = summaryHTML;
}

// معالجة النموذج
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        const msg = currentLanguage === 'ar' 
            ? 'السلة فارغة!' 
            : 'Cart is empty!';
        alert(msg);
        return;
    }
    
    const formData = {
        fullName: this.fullName.value,
        phone: this.phone.value,
        city: this.city.value,
        address: this.address.value,
        notes: this.notes.value,
        items: cart,
        timestamp: new Date().toISOString()
    };
    
    // حفظ الطلب
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(formData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // مسح السلة
    localStorage.removeItem('cart');
    
    // رسالة نجاح
    const successMsg = currentLanguage === 'ar'
        ? 'تم استلام طلبك بنجاح! سنتواصل معك قريباً.'
        : 'Your order has been received successfully! We will contact you soon.';
    
    alert(successMsg);
    
    // العودة للصفحة الرئيسية
    window.location.href = 'index.html';
});

// تحميل الملخص وتحديث النصوص
displayOrderSummary();
updateTexts(currentLanguage);