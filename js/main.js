document.addEventListener('DOMContentLoaded', function() {
    // ===============================================
    // Interactive Background Animation
    // ===============================================
    // Create the background canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'background-canvas';
    
    // Style the canvas
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.7';
    canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks
    
    // Add the canvas as the first child of the body
    document.body.prepend(canvas);
    
    // Get the canvas context
    const ctx = canvas.getContext('2d');
    
    // House shapes for particles
    const houseShapes = [
        // Simple house
        function(x, y, size, ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - size/2, y + size/2);
            ctx.lineTo(x - size/2, y + size);
            ctx.lineTo(x + size/2, y + size);
            ctx.lineTo(x + size/2, y + size/2);
            ctx.closePath();
            ctx.fill();
        },
        // Building silhouette
        function(x, y, size, ctx) {
            ctx.beginPath();
            ctx.rect(x - size/3, y, 2*size/3, size);
            ctx.fill();
        },
        // Tower/high-rise
        function(x, y, size, ctx) {
            ctx.beginPath();
            ctx.rect(x - size/4, y, size/2, size);
            ctx.fill();
        }
    ];
    
    // Particle class
    class Particle {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.shapeIndex = Math.floor(Math.random() * houseShapes.length);
            this.opacity = 0.2 + Math.random() * 0.3;
            this.linkDistance = 150;
        }
        
        update() {
            // Move the particle
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(37, 99, 235, ${this.opacity})`;
            houseShapes[this.shapeIndex](this.x, this.y, this.size, ctx);
        }
    }
    
    // Initialize particle array
    let particles = [];
    
    // Function to resize canvas and reset particles
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Reset particles based on screen size
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000); // Adjusted for performance
        particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const size = 5 + Math.random() * 15;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push(new Particle(x, y, size));
        }
    }
    
    // Add mouse interaction
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };
    
    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Animation loop
    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles with lines
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < particles[i].linkDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(37, 99, 235, ${0.1 * (1 - distance/particles[i].linkDistance)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            
            // Mouse interaction - push particles away
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    
                    particles[i].x += forceDirectionX * force * 2;
                    particles[i].y += forceDirectionY * force * 2;
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize and start animation
    resizeCanvas();
    animate();
    
    // Reset mouse position when mouse leaves window
    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    // ===============================================
    // Feature Card Expansion
    // ===============================================
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const header = card.querySelector('.feature-header');
        const expanded = card.querySelector('.feature-expanded');
        
        if (header && expanded) {
            header.addEventListener('click', () => {
                card.classList.toggle('active');
            });
        }
    });
    
    // ===============================================
    // Smooth Scrolling for Anchor Links
    // ===============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===============================================
    // Navigation Highlight on Scroll
    // ===============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // ===============================================
    // Form Submission Handling
    // ===============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Normally you would send the form data to a server here
            // This is just a simulation for the demo
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission delay
            setTimeout(() => {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success fade-in';
                successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
                successMessage.style.color = 'var(--success)';
                successMessage.style.padding = '1rem';
                successMessage.style.marginTop = '1rem';
                successMessage.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
                successMessage.style.borderRadius = '5px';
                
                // Reset form and show success message
                contactForm.reset();
                contactForm.appendChild(successMessage);
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('fade-in');
                    successMessage.classList.add('fade-out');
                    setTimeout(() => {
                        contactForm.removeChild(successMessage);
                    }, 500);
                }, 5000);
            }, 1500);
        });
    }
    
    // ===============================================
    // Mobile Navigation Toggle (for smaller screens)
    // ===============================================
    // This will be implemented if you decide to add a mobile menu button
    const createMobileNav = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (!nav || !navLinks) return;
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none';
        
        // Add button to nav
        nav.insertBefore(mobileMenuBtn, navLinks);
        
        // Function to check screen size and toggle mobile menu
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navLinks.classList.add('mobile-nav');
                navLinks.style.display = 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                navLinks.classList.remove('mobile-nav');
                navLinks.style.display = 'flex';
            }
        }
        
        // Toggle mobile menu on button click
        mobileMenuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'none') {
                navLinks.style.display = 'flex';
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                navLinks.style.display = 'none';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // Check screen size on load and resize
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    // Add this to your main.js or create a new demo.js file
document.addEventListener('DOMContentLoaded', function() {
    // Toggle between table and chart views
    const toggleTable = document.getElementById('toggleTable');
    const toggleChart = document.getElementById('toggleChart');
    const tableView = document.getElementById('tableView');
    const chartView = document.getElementById('chartView');
    
    if (toggleTable && toggleChart && tableView && chartView) {
        toggleTable.addEventListener('click', function() {
            toggleTable.classList.add('active');
            toggleChart.classList.remove('active');
            tableView.style.display = 'block';
            chartView.style.display = 'none';
        });
        
        toggleChart.addEventListener('click', function() {
            toggleChart.classList.add('active');
            toggleTable.classList.remove('active');
            chartView.style.display = 'block';
            tableView.style.display = 'none';
            
            // Create chart if it hasn't been created yet
            if (!chartCreated) {
                createAccuracyChart();
                chartCreated = true;
            }
        });
    }
    
    // Chart creation flag
    let chartCreated = false;
    
    // Create accuracy chart using basic canvas drawing
    function createAccuracyChart() {
        const chartContainer = document.getElementById('accuracyChartContainer');
        
        if (!chartContainer) return;
        
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = chartContainer.clientWidth;
        canvas.height = chartContainer.clientHeight;
        chartContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Chart data from the table
        const measurementNames = [
            'Room Width', 
            'Room Length', 
            'Ceiling Height', 
            'Door Frame', 
            'Window Height',
            'Average'
        ];
        
        const accuracyPercentages = [99.91, 99.89, 99.82, 99.78, 99.37, 99.75];
        
        // Chart settings
        const chartMargin = { top: 30, right: 30, bottom: 50, left: 60 };
        const chartWidth = canvas.width - chartMargin.left - chartMargin.right;
        const chartHeight = canvas.height - chartMargin.top - chartMargin.bottom;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set some styling
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw chart title
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#1e293b';
        ctx.fillText('Measurement Accuracy Comparison', canvas.width / 2, 20);
        
        // Draw y-axis
        ctx.beginPath();
        ctx.moveTo(chartMargin.left, chartMargin.top);
        ctx.lineTo(chartMargin.left, chartHeight + chartMargin.top);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw x-axis
        ctx.beginPath();
        ctx.moveTo(chartMargin.left, chartHeight + chartMargin.top);
        ctx.lineTo(chartWidth + chartMargin.left, chartHeight + chartMargin.top);
        ctx.stroke();
        
        // Draw y-axis grid lines and labels
        ctx.font = '10px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#64748b';
        
        // We'll show from 99% to 100% for better visualization of small differences
        for (let i = 0; i <= 10; i++) {
            const y = chartHeight + chartMargin.top - (i * (chartHeight / 10));
            const value = 99 + (i / 10);
            
            // Grid line
            ctx.beginPath();
            ctx.moveTo(chartMargin.left, y);
            ctx.lineTo(chartWidth + chartMargin.left, y);
            ctx.strokeStyle = 'rgba(100, 116, 139, 0.1)';
            ctx.stroke();
            
            // Label
            ctx.fillText(value.toFixed(1) + '%', chartMargin.left - 10, y + 4);
        }
        
        // Y-axis title
        ctx.save();
        ctx.translate(20, chartHeight / 2 + chartMargin.top);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('Accuracy', 0, 0);
        ctx.restore();
        
        // Draw bars
        const barWidth = (chartWidth / measurementNames.length) * 0.7;
        const barSpacing = (chartWidth / measurementNames.length) * 0.3;
        
        for (let i = 0; i < measurementNames.length; i++) {
            const x = chartMargin.left + (i * (barWidth + barSpacing)) + (barSpacing / 2);
            
            // Calculate height (scaled to show 99-100% range)
            const barHeightPercent = (accuracyPercentages[i] - 99) * 10; // Scale the 0.1%-1% range to 0-100%
            const barHeight = (barHeightPercent / 100) * chartHeight;
            
            // Bar
            ctx.fillStyle = i === measurementNames.length - 1 ? '#2563eb' : '#4f46e5';
            ctx.fillRect(x, chartHeight + chartMargin.top - barHeight, barWidth, barHeight);
            
            // Label
            ctx.fillStyle = '#1e293b';
            ctx.textAlign = 'center';
            ctx.font = '10px Inter, sans-serif';
            
            // Rotate and position x-axis labels
            ctx.save();
            ctx.translate(x + barWidth / 2, chartHeight + chartMargin.top + 10);
            ctx.rotate(Math.PI / 4); // 45-degree angle
            ctx.fillText(measurementNames[i], 0, 0);
            ctx.restore();
            
            // Value on top of bar
            ctx.fillStyle = '#2563eb';
            ctx.textAlign = 'center';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.fillText(
                accuracyPercentages[i].toFixed(2) + '%', 
                x + barWidth / 2, 
                chartHeight + chartMargin.top - barHeight - 5
            );
        }
        
        // Add a note about scale
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'right';
        ctx.font = 'italic 10px Inter, sans-serif';
        ctx.fillText('Note: Y-axis shows 99%-100% range', canvas.width - 10, canvas.height - 10);
    }
    
    // Initialize interactions for model control buttons
    const controlButtons = document.querySelectorAll('.control-button');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            // This would actually control the model in a production environment
            // For now, just add a visual feedback
            this.classList.add('active');
            
            // Remove active class after a brief delay
            setTimeout(() => {
                this.classList.remove('active');
            }, 300);
            
            // Alert user that this is a demo feature
            if (!this.hasAttribute('data-clicked')) {
                this.setAttribute('data-clicked', 'true');
                const featureName = this.textContent.trim();
                alert(`The ${featureName} feature would control the 3D model in a production environment. This is a demonstration of the UI.`);
            }
        });
    });
});
    // Initialize mobile navigation
    createMobileNav();
    
    // ===============================================
    // Page Transition Effects
    // ===============================================
    // Add fade-in effect to content sections
    const contentSections = document.querySelectorAll('section > .container');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        contentSections.forEach(section => {
            section.classList.add('section-hidden');
            sectionObserver.observe(section);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        contentSections.forEach(section => {
            section.classList.add('fade-in');
        });
    }
});

// Add CSS class for the fade-in sections
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: none;
        }
        
        .fade-in {
            animation: fadeInSection 1s forwards;
        }
        
        @keyframes fadeInSection {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-out {
            animation: fadeOutSection 0.5s forwards;
        }
        
        @keyframes fadeOutSection {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(30px);
            }
        }
        
        /* Mobile Navigation Styling */
        .mobile-nav {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.95);
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            z-index: 1000;
        }
        
        .mobile-menu-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary);
            cursor: pointer;
        }
        
        .nav-links.mobile-nav li {
            margin: 1rem 0;
        }
        
        .active {
            color: var(--primary) !important;
        }
        
        .active::after {
            width: 100% !important;
        }
    </style>
    
`);