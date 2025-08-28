// Hero Section Component TypeScript

document.addEventListener('DOMContentLoaded', function (): void {
    // Menu functionality
    const menuButton = document.getElementById('mobile-menu-button') as HTMLButtonElement | null;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLElement | null;
    const menuOverlay = document.getElementById('menu-overlay') as HTMLElement | null;
    const closeMenuButton = document.getElementById('close-menu') as HTMLButtonElement | null;
    const hamburger = menuButton?.querySelector('.hamburger') as HTMLElement | null;

    if (!menuButton || !mobileMenu || !menuOverlay || !closeMenuButton || !hamburger) {
        // Hero section menu elements not found - this is expected on some pages
        return;
    }

    function openMenu(): void {
        if (mobileMenu && menuOverlay && hamburger && menuButton) {
            mobileMenu.classList.add('open');
            menuOverlay.classList.add('open');
            hamburger.classList.add('open');
            document.body.classList.add('menu-open');
            menuButton.setAttribute('aria-expanded', 'true');
        }
    }

    function closeMenu(): void {
        if (mobileMenu && menuOverlay && hamburger && menuButton) {
            mobileMenu.classList.remove('open');
            menuOverlay.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.classList.remove('menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    }

    menuButton.addEventListener('click', function (e: Event): void {
        e.preventDefault();
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeMenuButton.addEventListener('click', function (e: Event): void {
        e.preventDefault();
        closeMenu();
    });

    menuOverlay.addEventListener('click', function (): void {
        closeMenu();
    });

    document.addEventListener('keydown', function (e: KeyboardEvent): void {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', function (): void {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });

    // Close menu when clicking on navigation links
    const navLinks = mobileMenu.querySelectorAll('a[href^="#"]') as NodeListOf<HTMLAnchorElement>;
    navLinks.forEach(link => {
        link.addEventListener('click', function (): void {
            closeMenu();
        });
    });
});
