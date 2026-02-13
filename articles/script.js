// Скрипт для статей SKL Academy

document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const burgerIcon = document.querySelector('.burger-icon');
  
  if (mobileMenuButton && mobileMenu) {
    // При загрузке страницы скрываем меню
    mobileMenu.style.opacity = '0';
    mobileMenu.style.visibility = 'hidden';
    mobileMenu.style.height = '0';
    mobileMenu.style.overflow = 'hidden';
    mobileMenuButton.setAttribute('aria-expanded', 'false');

    mobileMenuButton.addEventListener('click', function() {
      const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';

      if (!expanded) {
        // Открываем меню
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.opacity = '1';
        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.height = 'auto';
        mobileMenu.style.transform = 'translateY(0)';
        mobileMenuButton.setAttribute('aria-expanded', 'true');
        
        // Активируем иконку бургера
        if (burgerIcon) {
          burgerIcon.classList.add('is-active');
        }
      } else {
        // Закрываем меню
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.height = '0';
        mobileMenu.style.transform = 'translateY(-20px)';
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        
        // Деактивируем иконку бургера
        if (burgerIcon) {
          burgerIcon.classList.remove('is-active');
        }
      }
      
      // Для линий внутри бургера
      document.querySelectorAll('.burger-icon .line').forEach(line => {
        line.classList.toggle('active');
      });
    });

    // Закрываем меню при клике по ссылке внутри мобильного меню
    mobileMenu.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', () => {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.height = '0';
        mobileMenu.style.transform = 'translateY(-20px)';
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        if (burgerIcon) {
          burgerIcon.classList.remove('is-active');
        }
        document.querySelectorAll('.burger-icon .line').forEach(line => {
          line.classList.remove('active');
        });
      });
    });
  }

  // Активация ссылок в оглавлении при скролле
  const tableOfContents = document.querySelector('.table-of-contents');
  if (tableOfContents) {
    const tocLinks = tableOfContents.querySelectorAll('a');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      
      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    });
  }

  // Функция для открытия Telegram
  window.openTelegram = function() {
    window.open('https://t.me/tima_pelmeshka', '_blank');
  };

  // Кнопки копирования кода
  document.querySelectorAll('.code-block').forEach(block => {
    const codeContent = block.querySelector('.code-block-content');
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Копировать';
    copyButton.setAttribute('aria-label', 'Копировать код');
    
    copyButton.addEventListener('click', function() {
      const code = codeContent.textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyButton.textContent = 'Скопировано!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
          copyButton.textContent = 'Копировать';
          copyButton.classList.remove('copied');
        }, 2000);
      });
    });
    
    block.appendChild(copyButton);
  });

  // Скрываем дату и информацию о SKL Academy в шапке статьи
  const hideElements = () => {
    try {
      // Скрываем дату (элемент с иконкой календаря)
      const dateElement = document.querySelector('.flex.items-center .fas.fa-calendar-alt');
      if (dateElement) {
        const parentElement = dateElement.closest('.flex.items-center');
        if (parentElement) {
          parentElement.style.display = 'none';
        }
      }

      // Скрываем информацию о SKL Academy (элемент с иконкой пользователя)
      const authorElement = document.querySelector('.flex.items-center .fas.fa-user');
      if (authorElement) {
        const parentElement = authorElement.closest('.flex.items-center');
        if (parentElement) {
          parentElement.style.display = 'none';
        }
      }
    } catch (error) {
      console.log('Элементы даты или автора не найдены');
    }
  };

  // Запускаем функцию скрытия элементов
  hideElements();
}); 