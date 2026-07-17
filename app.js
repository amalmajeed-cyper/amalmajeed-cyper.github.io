document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbarScroll();
  initPortfolioFilter();
  initLightbox();
  initContactForm();
  
  // Wait for GSAP and ScrollTrigger to load via CDN before running scroll animations
  if (typeof gsap !== 'undefined') {
    initScrollAnimations();
  } else {
    document.body.classList.add('no-gsap');
    // Fallback simple reveal class toggler using IntersectionObserver if CDN is blocked
    initCSSReveals();
  }
});

/* --- CUSTOM CURSOR --- */
function initCustomCursor() {
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorOutline = document.querySelector('.custom-cursor-outline');
  
  if (!cursorDot || !cursorOutline) return;
  
  // Track mouse coordinates
  let mouseX = 0;
  let mouseY = 0;
  
  // Current cursor coordinates (for interpolation smoothing)
  let outlineX = 0;
  let outlineY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate position for the dot
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
  });
  
  // Interpolated smooth tracking for the outline circle
  function animateOutline() {
    // 0.15 represents the interpolation speed
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  
  // Expand on hover
  const hoverables = document.querySelectorAll('a, button, .portfolio-item, .filter-btn, .form-group input, .form-group textarea, .form-group select');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    item.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
}

/* --- NAVBAR SCROLL STATE --- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --- PORTFOLIO FILTER --- */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length === 0 || portfolioItems.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        const itemType = item.getAttribute('data-type');
        
        if (filterValue === 'all' || itemType === filterValue) {
          item.style.display = 'block';
          // Smooth fade-in
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          // Wait for transition before hiding
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
      
      // Refresh GSAP ScrollTrigger to adjust heights
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    });
  });
}

/* --- LIGHTBOX MODAL --- */
function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = document.querySelector('.lightbox-content');
  const lightboxClose = document.querySelector('.lightbox-close');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (!lightbox || !lightboxContent || !lightboxClose) return;
  
  portfolioItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Prevent triggers on specific actions if needed
      const img = item.querySelector('.portfolio-img');
      const isVideo = item.classList.contains('video-item');
      
      lightboxContent.innerHTML = ''; // Clear previous content
      
      if (isVideo) {
        // Create mock video element
        const video = document.createElement('video');
        video.src = item.getAttribute('data-video') || '';
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        lightboxContent.appendChild(video);
      } else if (img) {
        // Create image clone
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        lightboxContent.appendChild(newImg);
      }
      
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  });
  
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Pause any playing videos
    const video = lightboxContent.querySelector('video');
    if (video) video.pause();
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* --- CONTACT FORM --- */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capture form values
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const project = form.querySelector('#project-type').value;
    
    // Premium Toast/Notification Feedback
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerText;
    
    submitBtn.innerText = 'Sending details...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.style.backgroundColor = '#28a745'; // Success Green
      submitBtn.innerText = 'Sent successfully!';
      
      // Reset after brief delay
      setTimeout(() => {
        form.reset();
        submitBtn.style.backgroundColor = '';
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        
        // Float labels back down
        form.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
          input.dispatchEvent(new Event('input'));
        });
      }, 2000);
      
    }, 1500);
  });
}

/* --- GSAP SCROLL ANIMATIONS --- */
function initScrollAnimations() {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // 1. Hero Parallax
  gsap.to('.hero-bg', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 30,
    ease: 'none'
  });
  
  // 2. Hero Heading entrance
  gsap.from('.hero-content > *', {
    y: 60,
    opacity: 0,
    duration: 1.4,
    stagger: 0.2,
    ease: 'power4.out'
  });
  
  // 3. Section Titles Reveal
  const titles = document.querySelectorAll('.section-title-wrapper');
  titles.forEach(title => {
    gsap.from(title.children, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });
  });
  
  // 4. Portfolio Grid Entrance
  gsap.from('.portfolio-item', {
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1,
    ease: 'power3.out'
  });
  
  // 5. Process Step Animations (Timeline)
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach(step => {
    const content = step.querySelector('.process-content');
    const visual = step.querySelector('.process-visual');
    const badge = step.querySelector('.process-badge');
    
    // Content entrance (slides from left/right)
    const isEven = step.matches(':nth-child(even)');
    
    gsap.from(content, {
      scrollTrigger: {
        trigger: step,
        start: 'top 80%'
      },
      x: isEven ? 80 : -80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
    
    gsap.from(visual, {
      scrollTrigger: {
        trigger: step,
        start: 'top 80%'
      },
      x: isEven ? -80 : 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });
    
    gsap.from(badge, {
      scrollTrigger: {
        trigger: step,
        start: 'top 80%'
      },
      scale: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    });
  });
  
  // 6. Contact Form & Info reveal
  gsap.from('.contact-info > *', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%'
    },
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
  });
  
  gsap.from('.contact-form-wrapper', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 75%'
    },
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
  });
}

/* --- FALLBACK INTERSECTION OBSERVER REVEALS --- */
function initCSSReveals() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  reveals.forEach(element => {
    observer.observe(element);
  });
}
