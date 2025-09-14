// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Legacy contact form handling (replaced by enhanced version below)
// Keeping for compatibility

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-stats .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize fade-in effect when page loads
window.addEventListener('load', () => {
    // Animate hero elements sequentially
    const heroElements = [
        '.hero-title',
        '.hero-subtitle', 
        '.hero-description',
        '.hero-buttons',
        '.profile-pic'
    ];
    
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        }
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Duplicate skills for seamless loop
const skillsContainer = document.querySelector('.skills-container');
const skillsSlider = document.querySelector('.skills-slider');
const originalSkills = skillsContainer.innerHTML;
skillsContainer.innerHTML = originalSkills + originalSkills;

// Mouse wheel control for skills slider
skillsSlider.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    skillsContainer.classList.add('smooth-transition');
    
    if (e.deltaY > 0) {
        // Scroll down - go to last skill
        skillsContainer.style.transform = 'translateX(-75%)';
    } else {
        // Scroll up - go to first skill
        skillsContainer.style.transform = 'translateX(0)';
    }
    
    setTimeout(() => {
        skillsContainer.classList.remove('smooth-transition');
        skillsContainer.style.transform = '';
    }, 1200);
});

// Add CSS for active nav link and button effects
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3498db !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #3498db;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-item {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add button ripple effects
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            btn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Toggle projects visibility
function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.project-card.hidden');
    const expandBtn = document.querySelector('.expand-btn');
    const expandText = document.querySelector('.expand-text');
    const expandIcon = document.querySelector('.expand-icon');
    
    if (hiddenProjects[0].style.display === 'block') {
        hiddenProjects.forEach(project => {
            project.style.display = 'none';
        });
        expandText.textContent = 'View More Projects';
        expandBtn.classList.remove('expanded');
    } else {
        hiddenProjects.forEach(project => {
            project.style.display = 'block';
        });
        expandText.textContent = 'View Less Projects';
        expandBtn.classList.add('expanded');
    }
}

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 100);
    }
});



// Enhanced Form Validation
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.querySelector('.btn-text');
const btnLoading = document.querySelector('.btn-loading');
const formSuccess = document.getElementById('form-success');

// WhatsApp Form Handler
const whatsappForm = document.getElementById('whatsapp-form');
if (whatsappForm) {
    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            const whatsappMessage = `Hi! I'm ${name}\n\nEmail: ${email}\nSubject: ${subject}\n\nMessage: ${message}`;
            const whatsappURL = `https://wa.me/917721809744?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, '_blank');
        } else {
            alert('Please fill in all fields');
        }
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous validation
    clearValidation();
    
    // Validate name
    if (!name.value.trim()) {
        showError('name', 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        showSuccess('name');
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('email', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('email', 'Please enter a valid email');
        isValid = false;
    } else {
        showSuccess('email');
    }
    
    // Validate subject
    if (!subject.value.trim()) {
        showError('subject', 'Subject is required');
        isValid = false;
    } else {
        showSuccess('subject');
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError('message', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        showSuccess('message');
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    field.classList.add('error');
    field.classList.remove('success');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function showSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    field.classList.add('success');
    field.classList.remove('error');
    errorElement.classList.remove('show');
}

function clearValidation() {
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        field.classList.remove('error', 'success');
        errorElement.classList.remove('show');
    });
}

// Resume Download
document.getElementById('download-resume').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create a simple resume content
    const resumeContent = `
KAUSTUBH WARE
AI/ML Engineer, Data Analyst & Geospatial Specialist

Contact:
Email: kaustubhware12@gmail.com
Phone: +91 7721809744
Location: Pune, India
GitHub: https://github.com/kaustubhware
LinkedIn: https://www.linkedin.com/in/kaustubhware12/

EDUCATION:
MSC-CA (Data Science) - Symbiosis Institute (CGPA: 9.5)
BSC Computer Science - Savitribai Phule Pune University (CGPA: 7.69)

EXPERIENCE:
Data Analyst Intern - Bosch Pvt Ltd (March 25 - July 25)
- Logistics and warehouse data analysis
- Supply chain optimization
- Automated dashboard development

SKILLS:
- Geospatial: QGIS, GEE, Geopandas, Folium, Leaflet, GDAL
- Machine Learning: Python, TensorFlow, PyTorch, XGBoost
- Data Analysis: Pandas, NumPy, Power BI, SQL
- Web Development: Django, Flask, FastAPI, JavaScript

CERTIFICATIONS:
- Google Earth Engine Certified (2024)
- AWS Machine Learning Specialty (2024)
- TensorFlow Developer Certificate (2023)
    `;
    
    // Create and download file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kaustubh_Ware_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show feedback
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    this.style.background = '#27ae60';
    
    setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = '';
    }, 2000);
});

// Lazy Loading for Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Enhanced Testimonials Animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('fade-in-up');
});

// Blog Cards Hover Effects
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Page Transitions (Simplified)
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

// Apply fade-in only to main sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        fadeObserver.observe(section);
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});



// Performance Optimization
let ticking = false;

function updateScrollEffects() {
    // Batch scroll-based updates here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});