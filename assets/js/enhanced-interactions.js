// Enhanced Interactions for RAG Services
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for animations
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

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.process-step, .eval-card, .enterprise-feature, .compliance-card, .benefit-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Enhanced hover effects for process steps and compliance cards
    const interactiveCards = document.querySelectorAll('.process-step, .compliance-card');
    interactiveCards.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-8px) scale(1.02)';
            step.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: radial-gradient(circle, rgba(66, 133, 244, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 0;
            `;
            
            step.style.position = 'relative';
            step.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });

        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateY(-4px) scale(1)';
            step.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
        });
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const backgrounds = document.querySelectorAll('.gcp-rag-architecture::before, .evaluation-focus::before');
        
        backgrounds.forEach(bg => {
            if (bg) {
                bg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    });

    // Dynamic counter animation for highlight points
    const highlightPoints = document.querySelectorAll('.highlight-point strong');
    const animateCounters = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.match(/\d+/)?.[0]);
                
                if (number) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        target.textContent = text.replace(/\d+/, Math.floor(current));
                    }, 30);
                }
                counterObserver.unobserve(target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, observerOptions);
    highlightPoints.forEach(point => counterObserver.observe(point));

    // Add loading states for tech badges
    const techBadges = document.querySelectorAll('.tech-badge.featured');
    techBadges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.animation = 'pulse 2s infinite, fadeInUp 0.6s ease-out';
        }, index * 100);
    });

    // Smooth scrolling for internal links
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

    // Add CSS for ripple animation if not already present
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '';
        });

        button.addEventListener('click', (e) => {
            // Add click ripple effect
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                animation: buttonRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });

    // Add button ripple animation
    if (!document.querySelector('#button-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'button-ripple-styles';
        style.textContent = `
            @keyframes buttonRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16)); // ~60fps
