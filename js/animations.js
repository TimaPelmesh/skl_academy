document.addEventListener('DOMContentLoaded', () => {
    // Плавное появление элементов при скролле
    const fadeInElements = document.querySelectorAll('.tech-section, .hero-text, .hero-description');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        fadeInObserver.observe(element);
    });
    
    // Анимация частиц в фоне
    function animateParticles() {
        const particlesBackground = document.querySelector('.particles-background');
        if (!particlesBackground) return;
        
        // Создаем частицы для фона
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Случайное положение
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const size = Math.random() * 5 + 1;
            const opacity = Math.random() * 0.5 + 0.1;
            const animDuration = Math.random() * 20 + 10;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animation = `float ${animDuration}s infinite ease-in-out`;
            
            particlesBackground.appendChild(particle);
        }
    }
    
    // Плавное перемещение к якорям при клике
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const navHeight = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Закрыть мобильное меню после клика
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Пульсирующий эффект для кнопок
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.classList.add('pulse');
        });
        
        button.addEventListener('mouseout', () => {
            button.classList.remove('pulse');
        });
    });
    
    // Запуск анимации частиц
    animateParticles();
}); 