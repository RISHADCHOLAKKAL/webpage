document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('toggle-theme');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }
    
    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            createConfetti();
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            createConfetti();
        }
    });
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav ul');
    const navItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const fab = document.querySelector('.fab');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            fab.classList.add('active');
        } else {
            fab.classList.remove('active');
        }
    });
    
    fab.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Gallery functionality
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    // Sample gallery images (in a real app, you might fetch these from an API)
    const galleryImages = [
        { src: '18.jpg', category: 'art', caption: 'Beautiful Nature' },
        { src: '7.jpg', category: 'nature', caption: 'Beautiful Nature' },
        { src: '17.jpg', category: 'tech', caption: 'Pucha sir' },
        { src: '6.jpeg', category: 'tech', caption: 'Anathor cat' },
        { src: '19.jpg', category: 'nature', caption: 'Modern Sculpture' },
        { src: '12.jpg', category: 'art', caption: 'Sonata' },
        { src: '20.jpg', category: 'art', caption: 'Beautiful Nature' },
        { src: '21.jpg', category: 'art', caption: 'Beautiful Nature' },
        { src: '22.jpg', category: 'nature', caption: 'AI Robot' },
        { src: '16.jpg', category: 'tech', caption: 'Zoro' },
        { src: '24.jpg', category: 'art', caption: 'Abstract Art' },
        { src: '23.jpg', category: 'tech', caption: 'My wolrd' }
    ];
    
    // Load gallery images
    function loadGalleryImages(filter = 'all') {
        galleryGrid.innerHTML = '';
        
        const filteredImages = filter === 'all' 
            ? galleryImages 
            : galleryImages.filter(img => img.category === filter);
        
        filteredImages.forEach(img => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = img.category;
            
            galleryItem.innerHTML = `
                <img src="${img.src}" alt="${img.caption}">
                <div class="item-overlay">
                    <h3>${img.caption}</h3>
                    <p>Click to enlarge</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', function() {
                modalImg.src = img.src;
                modalCaption.textContent = img.caption;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    // Filter gallery images
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter images
            const filter = this.dataset.filter;
            loadGalleryImages(filter);
            
            // Add animation to gallery items
            animateGalleryItems();
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Initialize gallery
    loadGalleryImages();
    
    // Animate gallery items on load
    setTimeout(animateGalleryItems, 500);
    
    function animateGalleryItems() {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-content')) {
                    animateSkillBars();
                }
                
                if (entry.target.classList.contains('project-card')) {
                //    entry.target.style.animation = 'fadeInUp 1s ease forwards';
                   // entry.target.style.opacity = '0';
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-content, .project-card').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize project cards on DOM load
document.addEventListener('DOMContentLoaded', function() {
   const projectCards = document.querySelectorAll('.project-card');
    
    // Add hover effects to project cards
   projectCards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Click effect
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('project-link')) {
                const projectType = this.dataset.project;
                alert(`Opening ${projectType} project...`);
                // In a real implementation, you would navigate to the project page
            }
        });
    });
    
    // Make sure the projects section is visible
    document.getElementById('projects').style.display = 'block';
});
    
    // Confetti effect
    function createConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#ff7675', '#74b9ff', '#55efc4'];
        
        // Create particles
        for (let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 8 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * 360,
                rotation: Math.random() * 0.2 - 0.1
            });
        }
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.angle);
                
                ctx.fillStyle = particle.color;
                ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                
                ctx.restore();
                
                particle.y += particle.speed;
                particle.angle += particle.rotation;
                
                if (particle.y > canvas.height) {
                    particle.y = -particle.size;
                    particle.x = Math.random() * canvas.width;
                }
            });
            
            if (Date.now() - startTime < 2000) {
                requestAnimationFrame(draw);
            }
        }
        
        const startTime = Date.now();
        draw();
    }
    
    // Initialize confetti canvas
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.id = 'confetti-canvas';
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '1000';
    document.body.appendChild(confettiCanvas);
    
    // Add animation to hero buttons on hover
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
    
    // Add animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            const after = this.querySelector('::after') || this.nextElementSibling;
            if (after) {
                after.style.width = '100%';
                setTimeout(() => {
                    after.style.width = '50px';
                }, 500);
            }
        });
    });
    
    // Add parallax effect to background elements
    window.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const bgElements = document.querySelectorAll('.bg-elements > div');
        bgElements.forEach((element, index) => {
            const speed = 0.05 + (index * 0.01);
            const xPos = -(x * 50 * speed) + 50;
            const yPos = -(y * 50 * speed) + 50;
            
            element.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
    
    // Add animation to logo on load
    const logo = document.querySelector('.logo');
    setTimeout(() => {
        logo.style.setProperty('--before-width', '100%');
    }, 1000);
});