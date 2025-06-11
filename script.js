// Navigation functionality
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

// Update active navigation on scroll
window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.name.value;
    const email = this.email.value;
    const subject = this.subject.value;
    const message = this.message.value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Create mailto link
    const mailtoLink = `mailto:alex.developer@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your default email client should open now.');
    
    // Reset form
    this.reset();
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

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.7
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.bar span');
            skillBars.forEach(bar => {
                bar.style.width = bar.style.width || '0%';
                bar.style.animation = 'skillLoad 2s ease-in-out forwards';
            });
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Add CSS animation for skill bars
const style = document.createElement('style');
style.textContent = `
    @keyframes skillLoad {
        from {
            width: 0%;
        }
        to {
            width: var(--skill-width);
        }
    }
    
    .progress:nth-child(1) .bar span {
        --skill-width: 95%;
    }
    
    .progress:nth-child(2) .bar span {
        --skill-width: 90%;
    }
    
    .progress:nth-child(3) .bar span {
        --skill-width: 85%;
    }
    
    .progress:nth-child(4) .bar span {
        --skill-width: 80%;
    }
    
    .progress:nth-child(5) .bar span {
        --skill-width: 75%;
    }
    
    .skills-column:nth-child(2) .progress:nth-child(1) .bar span {
        --skill-width: 95%;
    }
    
    .skills-column:nth-child(2) .progress:nth-child(2) .bar span {
        --skill-width: 90%;
    }
    
    .skills-column:nth-child(2) .progress:nth-child(3) .bar span {
        --skill-width: 85%;
    }
    
    .skills-column:nth-child(2) .progress:nth-child(4) .bar span {
        --skill-width: 88%;
    }
    
    .skills-column:nth-child(2) .progress:nth-child(5) .bar span {
        --skill-width: 82%;
    }
`;
document.head.appendChild(style);

// Add loading animation for page elements
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.service-box, .education-box, .project-box');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add hover effects for social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) translateY(-5px) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0) rotate(0deg)';
    });
});

// Add click tracking for analytics (optional)
document.querySelectorAll('.btn, .social-icons a').forEach(element => {
    element.addEventListener('click', function() {
        console.log('Button clicked:', this.textContent || this.title || 'Social Icon');
    });
});

// Add responsive navigation toggle for mobile (if needed)
const createMobileMenu = () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Create menu toggle button for mobile
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.display = 'none';
    menuToggle.style.fontSize = '2rem';
    menuToggle.style.color = '#b74b4b';
    menuToggle.style.cursor = 'pointer';
    
    // Add toggle functionality
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    header.appendChild(menuToggle);
    
    // Show/hide menu toggle based on screen size
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
        } else {
            menuToggle.style.display = 'none';
            nav.classList.remove('active');
        }
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
};

// Initialize mobile menu
createMobileMenu(); 