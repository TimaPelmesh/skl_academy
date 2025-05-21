document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    let lastScroll = 0;

    // Мобильное меню
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Закрытие меню при клике на пункт меню
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Скрытие/показ навигации при скролле
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            mainNav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !mobileMenu.classList.contains('active')) {
            // Скролл вниз
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            // Скролл вверх
            mainNav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}); 