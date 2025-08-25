// Hero Section Component JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Menu functionality
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuButton = document.getElementById('close-menu');
    const hamburger = menuButton?.querySelector('.hamburger');
    
    if (!menuButton || !mobileMenu || !menuOverlay || !closeMenuButton || !hamburger) {
        console.warn('Hero section menu elements not found');
        return;
    }
    
    function openMenu() {
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('open');
        hamburger.classList.add('open');
        document.body.classList.add('menu-open');
    }
    
    function closeMenu() {
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.classList.remove('menu-open');
    }
    
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    closeMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
    });
    
    menuOverlay.addEventListener('click', function() {
        closeMenu();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
});
