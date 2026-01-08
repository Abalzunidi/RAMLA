// فتح وإغلاق المنيو
const menuIcon = document.getElementById('menuIcon');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

function toggleMenu() {
    menuIcon.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // منع السكرول عند فتح المنيو
    if (menuOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// فتح المنيو من الأيقونة
menuIcon.addEventListener('click', toggleMenu);

// إغلاق المنيو من علامة X
menuClose.addEventListener('click', function() {
    menuIcon.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// إغلاق المنيو عند الضغط على أي رابط
const menuLinks = document.querySelectorAll('.menu-list a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        menuIcon.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// إغلاق المنيو عند الضغط على الخلفية
menuOverlay.addEventListener('click', function(e) {
    if (e.target === menuOverlay) {
        menuIcon.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});