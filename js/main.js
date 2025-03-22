/**
 * main.js - Enhanced interactive elements for LiDAR Property Assessment website
 * Created for Dylan O'Donnell's academic project
 * 
 * Features:
 * - Smooth scrolling for navigation links
 * - Active section highlighting
 * - Scroll-based animations
 * - Sticky header with smart behavior
 * - Form validation
 * - Image zoom functionality
 * - Theme switching
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initSmoothScrolling();
    initActiveNavHighlighting();
    initScrollAnimations();
    initStickyHeader();
    initContactForm();
    initImageZoom();
    initThemeSwitcher();
    initMobileMenu();
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without reloading page
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Highlight active navigation links based on scroll position
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    function highlightActiveLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Check which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                
                // Update main nav links
                navLinks.forEach(link => {
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
                // Update sidebar links
                sidebarLinks.forEach(link => {
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Apply active styles
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Initial check
}

/**
 * Scroll animations for content elements
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .finding-card, .tool-item, .application-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        // Set initial state as invisible
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        
        observer.observe(element);
    });
}

/**
 * Sticky header behavior
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled down
        if (currentScrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction (for mobile)
        if (window.innerWidth < 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Image zoom functionality for research images
 */
function initImageZoom() {
    const researchImages = document.querySelectorAll('.research-image');
    
    researchImages.forEach(img => {
        // Add zoom indicator
        const zoomIndicator = document.createElement('div');
        zoomIndicator.classList.add('zoom-indicator');
        zoomIndicator.innerHTML = '<i class="fas fa-search-plus"></i>';
        img.parentNode.style.position = 'relative';
        img.parentNode.appendChild(zoomIndicator);
        
        // Setup zoom functionality
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay');
            
            const zoomedImg = document.createElement('img');
            zoomedImg.src = this.src;
            zoomedImg.alt = this.alt;
            zoomedImg.classList.add('zoomed-image');
            
            const closeButton = document.createElement('button');
            closeButton.classList.add('overlay-close');
            closeButton.innerHTML = '<i class="fas fa-times"></i>';
            
            overlay.appendChild(zoomedImg);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);
            
            // Prevent body scrolling when overlay is open
            document.body.style.overflow = 'hidden';
            
            // Close zoom on button click or overlay click
            closeButton.addEventListener('click', closeZoom);
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeZoom();
            });
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeZoom();
            });
            
            function closeZoom() {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }
        });
    });
}

/**
 * Theme switcher functionality
 */
/**
 * main.js - Enhanced interactive elements for LiDAR Property Assessment website
 * Created for Dylan O'Donnell's academic project
 * 
 * Features:
 * - Smooth scrolling for navigation links
 * - Active section highlighting
 * - Scroll-based animations
 * - Sticky header with smart behavior
 * - Form validation
 * - Image zoom functionality
 * - Theme switching
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initSmoothScrolling();
    initActiveNavHighlighting();
    initScrollAnimations();
    initStickyHeader();
    initContactForm();
    initImageZoom();
    initThemeSwitcher();
    initMobileMenu();
});

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without reloading page
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Highlight active navigation links based on scroll position
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    function highlightActiveLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Check which section is in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                
                // Update main nav links
                navLinks.forEach(link => {
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
                
                // Update sidebar links
                sidebarLinks.forEach(link => {
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Apply active styles
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Initial check
}

/**
 * Scroll animations for content elements
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.content-section, .finding-card, .tool-item, .application-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        // Set initial state as invisible
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        
        observer.observe(element);
    });
}

/**
 * Sticky header behavior
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add shadow when scrolled down
        if (currentScrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction (for mobile)
        if (window.innerWidth < 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

/**
 * Image zoom functionality for research images
 */
function initImageZoom() {
    const researchImages = document.querySelectorAll('.research-image');

    researchImages.forEach(img => {
        // Add zoom indicator
        const zoomIndicator = document.createElement('div');
        zoomIndicator.classList.add('zoom-indicator');
        zoomIndicator.innerHTML = '<i class="fas fa-search-plus"></i>';
        img.parentNode.style.position = 'relative';
        img.parentNode.appendChild(zoomIndicator);

        // Setup zoom functionality
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay');

            const zoomedImg = document.createElement('img');
            zoomedImg.src = this.src;
            zoomedImg.alt = this.alt;
            zoomedImg.classList.add('zoomed-image');

            const closeButton = document.createElement('button');
            closeButton.classList.add('overlay-close');
            closeButton.innerHTML = '<i class="fas fa-times"></i>';

            overlay.appendChild(zoomedImg);
            overlay.appendChild(closeButton);
            document.body.appendChild(overlay);

            // Prevent body scrolling when overlay is open
            document.body.style.overflow = 'hidden';

            // Close zoom on button click or overlay click
            closeButton.addEventListener('click', closeZoom);
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeZoom();
            });

            // Close on escape key (with proper cleanup)
            function handleEscapeKey(e) {
                if (e.key === 'Escape') closeZoom();
            }

            document.addEventListener('keydown', handleEscapeKey);

            function closeZoom() {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                    document.body.style.overflow = '';

                    // Remove the event listener after closing
                    document.removeEventListener('keydown', handleEscapeKey);
                }
            }
        });
    });
}


/**
 * Theme switcher functionality
 */
function initThemeSwitcher() {
    // Create theme switcher button
    const themeButton = document.createElement('button');
    themeButton.classList.add('theme-switch');
    themeButton.innerHTML = '<i class="fas fa-adjust"></i>';
    themeButton.setAttribute('title', 'Toggle dark/light mode');
    
    // Add to document
    document.body.appendChild(themeButton);
    
    // Check for saved preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeButton.classList.add('dark-active');
    }
    
    // Toggle theme on click
    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeButton.classList.add('dark-active');
        } else {
            localStorage.setItem('theme', 'light');
            themeButton.classList.remove('dark-active');
        }
    });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    // Check if we need to create mobile menu toggle
    if (window.innerWidth <= 768) {
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('mobile-menu-toggle');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Insert before the navLinks element
            nav.insertBefore(menuToggle, navLinks);
            
            // Toggle menu on button click
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                
                // Update icon
                const icon = this.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('nav')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        }
    }
}
// Fix for theme switcher to ensure it's added to all pages
function initThemeSwitcher() {
    // Create theme switcher button if it doesn't exist yet
    if (!document.querySelector('.theme-switch')) {
        const themeButton = document.createElement('button');
        themeButton.classList.add('theme-switch');
        themeButton.innerHTML = '<i class="fas fa-adjust"></i>';
        themeButton.setAttribute('title', 'Toggle dark/light mode');
        
        // Add to document
        document.body.appendChild(themeButton);
    }
    
    // Reference the button (whether newly created or existing)
    const themeButton = document.querySelector('.theme-switch');
    
    // Check for saved preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeButton.classList.add('dark-active');
    }
    
    // Toggle theme on click
    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeButton.classList.add('dark-active');
        } else {
            localStorage.setItem('theme', 'light');
            themeButton.classList.remove('dark-active');
        }
    });

    // Apply theme on page load (before any interactions)
    document.addEventListener('DOMContentLoaded', function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeButton) {
                themeButton.classList.add('dark-active');
            }
        }
    });
}

// Call this function immediately to ensure the theme button is added
// This ensures it works even if the main.js initialization order changes
(function() {
    // Wait a short time to ensure the DOM is ready
    setTimeout(initThemeSwitcher, 100);
})();
/**
 * Contact form validation and interaction
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Reset error states
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Check required fields
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            email.classList.add('error');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }
        
        // Display form status
        const formStatus = document.createElement('div');
        formStatus.classList.add('form-status');
        
        if (isValid) {
            // Simulate form submission
            formStatus.textContent = 'Thank you for your message! We will be in touch soon.';
            formStatus.classList.add('success');
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                formStatus.remove();
            }, 5000);
        } else {
            formStatus.textContent = 'Please fill in all required fields correctly.';
            formStatus.classList.add('error');
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                formStatus.remove();
            }, 3000);
        }
        
        // Add status message to the form
        contactForm.appendChild(formStatus);
    });
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
    // Check if we need to create mobile menu toggle
    if (window.innerWidth <= 768) {
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-toggle')) {
            const nav = document.querySelector('nav');
            const navLinks = document.querySelector('.nav-links');
            
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('mobile-menu-toggle');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            // Insert before the navLinks element
            nav.insertBefore(menuToggle, navLinks);
            
            // Toggle menu on button click
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                
                // Update icon
                const icon = this.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('nav')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        }
    }
}

/**
 * Contact form validation and interaction
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        // Reset error states
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Check required fields
        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            email.classList.add('error');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }
        
        // Display form status
        const formStatus = document.createElement('div');
        formStatus.classList.add('form-status');
        
        if (isValid) {
            // Simulate form submission
            formStatus.textContent = 'Thank you for your message! We will be in touch soon.';
            formStatus.classList.add('success');
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                formStatus.remove();
            }, 5000);
        } else {
            formStatus.textContent = 'Please fill in all required fields correctly.';
            formStatus.classList.add('error');
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                formStatus.remove();
            }, 3000);
        }
        
        // Add status message to the form
        contactForm.appendChild(formStatus);
    });
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}