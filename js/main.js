document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    let lastScroll = 0;

    // Мобильное меню с улучшенной анимацией
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        toggleMenu();
    });
    
    // Функция переключения состояния меню
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        // Меняем иконку на крестик при открытии меню
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Разрешаем прокрутку страницы
        }
    }

    // Закрытие меню при клике на пункт меню с анимацией
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            // Возвращаем иконку-бургер
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Разрешаем прокрутку страницы
        });
    });

    // Закрытие меню при клике вне меню
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            
            // Возвращаем иконку-бургер
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Разрешаем прокрутку страницы
        }
    });

    // Скрытие/показ навигации при скролле
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            mainNav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && !mobileMenu.classList.contains('active')) {
            // Скролл вниз - скрываем меню
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            // Скролл вверх - показываем меню
            mainNav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}); 