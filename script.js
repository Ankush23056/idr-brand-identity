/**
 * Institute of Digital Risk
 * Vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Set current year in footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent body scrolling when menu open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Sticky Navbar Shadow on Scroll ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavHighlight();
    });

    // --- Smooth Scroll is handled by CSS (scroll-behavior: smooth), 
    // but we add active state tracking for nav items here
    const sections = document.querySelectorAll('section');
    
    function updateActiveNavHighlight() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust for navbar height
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if link href ends with the current section ID
            if (current && link.getAttribute('href').endsWith(`#${current}`)) {
                link.classList.add('active');
            }
        });
    }

    // --- Contact Form Submission Interaction ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Simple validation simulation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name && email) {
                // Loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate network request
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = 'Send Inquiry';
                    submitBtn.disabled = false;
                    
                    formStatus.textContent = 'Thank you! Your inquiry has been secured. We will be in touch shortly.';
                    formStatus.style.color = '#FF6B00'; // Brand Orange
                    
                    // Clear message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                }, 1000);
            }
        });
    }

    // Trigger initial check for scroll position
    updateActiveNavHighlight();
});
