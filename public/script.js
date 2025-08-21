// Enhanced Mobile Navigation and Responsive Functionality

// Show/hide the Back to Top button on scroll
window.onscroll = function () {
  const btn = document.getElementById("backToTop");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// Enhanced DOM Content Loaded with better organization
document.addEventListener("DOMContentLoaded", function () {
  initializeBackToTop();
  initializeProfileDropdown();
  initializeMobileNavigation();
  initializeSmoothScrolling();
  initializeImageLoading();
  initializeAnimations();
  initializeTouchSupport();
  initializePerformanceOptimizations();
});

// Back to Top functionality
function initializeBackToTop() {
  const btn = document.getElementById("backToTop");
  if (btn) {
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

});

  
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');

    themeIcon.classList.toggle('fa-moon', !isLight);
    themeIcon.classList.toggle('fa-sun', isLight);

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });




}

// Enhanced Profile Dropdown Functionality
function initializeProfileDropdown() {
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");
  
  if (profileBtn && profileDropdown) {
    // Toggle profile dropdown with enhanced UX
    profileBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("active");
      
      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });

    // Close dropdown when clicking outside with improved detection
    document.addEventListener("click", function (e) {
      if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove("active");
      }
    });

    // Close dropdown on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        profileDropdown.classList.remove("active");
      }
    });

    // Enhanced profile action buttons
    initializeProfileActions();
    
    // Load user data
    loadUserData();
  }
}

// Initialize profile action buttons with better feedback
function initializeProfileActions() {
  const editProfileBtn = document.querySelector(".edit-profile");
  const viewStatsBtn = document.querySelector(".view-stats");
  const logoutBtn = document.querySelector(".logout");

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
        window.location.href = "edit-profile.html";
        document.getElementById("profileDropdown").classList.remove("active");
      }, 150);
    });
  }

  if (viewStatsBtn) {
    viewStatsBtn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
        window.location.href = "view-stats.html";
        document.getElementById("profileDropdown").classList.remove("active");
      }, 150);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
        if (confirm("Are you sure you want to logout?")) {
          alert("Logout functionality will be implemented here!");
          document.getElementById("profileDropdown").classList.remove("active");
        }
      }, 150);
    });
  }
}

// Enhanced Mobile Navigation Functionality
function initializeMobileNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector(".nav__links");
  const navToggleLabel = document.querySelector(".nav-toggle-label");

  console.log("Initializing mobile navigation");
  console.log("navToggle:", navToggle);
  console.log("navLinks:", navLinks);
  console.log("navToggleLabel:", navToggleLabel);

  if (navToggle && navLinks) {
    // Enhanced toggle functionality
    navToggle.addEventListener("change", function () {
      if (this.checked) {
        openMobileNav();
      } else {
        closeMobileNav();
      }
    });

    // Close mobile nav when clicking on a link with smooth transition
    const navLinkItems = navLinks.querySelectorAll("a");
    navLinkItems.forEach((link, index) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 150);

        // Close nav with delay for smooth transition
        setTimeout(() => {
          closeMobileNav();
          
          // Smooth scroll to target
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 200);
      });
    });

    // Enhanced outside click detection
    document.addEventListener("click", function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && !navToggleLabel.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Close on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMobileNav();
      }
    });

    // Handle window resize for responsive behavior
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });

    // Add touch gesture support for mobile
    initializeTouchGestures();
  }
}

// Open mobile navigation with enhanced animations
function openMobileNav() {
  const navLinks = document.querySelector(".nav__links");
  const body = document.body;
  
  console.log("Opening mobile nav, navLinks:", navLinks);
  console.log("NavLinks display before:", getComputedStyle(navLinks).display);
  
  navLinks.classList.add("active");
  body.classList.add("nav-open");
  body.style.overflow = "hidden";
  
  console.log("NavLinks display after adding active:", getComputedStyle(navLinks).display);
  console.log("NavLinks classes:", navLinks.classList.toString());
  
  // Add entrance animation for nav items
  const navItems = navLinks.querySelectorAll("li");
  navItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(50px)";
    
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, 100 + (index * 100));
  });
}

// Close mobile navigation with smooth transition
function closeMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector(".nav__links");
  const body = document.body;
  
  console.log("Closing mobile nav, navLinks:", navLinks);
  console.log("NavLinks display before closing:", getComputedStyle(navLinks).display);
  
  if (navToggle) navToggle.checked = false;
  navLinks.classList.remove("active");
  body.classList.remove("nav-open");
  body.style.overflow = "";
  
  console.log("NavLinks display after removing active:", getComputedStyle(navLinks).display);
  console.log("NavLinks classes:", navLinks.classList.toString());
  
  // Reset nav items for next opening
  const navItems = navLinks.querySelectorAll("li");
  navItems.forEach(item => {
    item.style.opacity = "";
    item.style.transform = "";
  });
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// Enhanced Image Loading with better error handling
function initializeImageLoading() {
  const images = document.querySelectorAll("img");
  console.log(`Found ${images.length} images on the page`);
  
  images.forEach((img, index) => {
    console.log(`Image ${index + 1}: ${img.src}`);
    
    // Ensure images are visible by default
    img.style.display = "block";
    img.style.opacity = "1";
    img.style.visibility = "visible";
    
    // Enhanced image loading with better error handling
    const testImg = new Image();
    testImg.onload = function() {
      console.log(`✓ Image loaded successfully: ${img.src}`);
      img.style.opacity = "1";
      img.style.display = "block";
      img.classList.add("loaded");
    };
    
    testImg.onerror = function() {
      console.error(`✗ Failed to load image: ${img.src}`);
      // Keep image visible even if it fails to load
      img.style.opacity = "0.5";
      img.style.display = "block";
      img.classList.add("error");
      
      // Add fallback styling
      img.style.background = "linear-gradient(135deg, var(--primary-color-light), var(--primary-color-extra-light))";
      img.style.borderRadius = "10px";
    };
    
    // Start loading the image
    testImg.src = img.src;
    
    // Direct event listeners for immediate feedback
    img.addEventListener("load", function () {
      console.log(`Direct load successful: ${this.src}`);
      this.style.opacity = "1";
      this.style.display = "block";
      this.classList.add("loaded");
    });
    
    img.addEventListener("error", function () {
      console.error(`Direct load failed: ${this.src}`);
      this.style.opacity = "0.5";
      this.style.display = "block";
      this.classList.add("error");
    });
  });
}

// Enhanced Animations with Intersection Observer
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".explore__card, .price__card, .join__card, .class__content, .review__content");
  animateElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Enhanced Touch Support for Mobile Devices
function initializeTouchSupport() {
  let touchStartY = 0;
  let touchEndY = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", function (e) {
    touchStartY = e.changedTouches[0].screenY;
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", function (e) {
    touchEndY = e.changedTouches[0].screenY;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diffY = touchStartY - touchEndY;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffY) > swipeThreshold || Math.abs(diffX) > swipeThreshold) {
      if (Math.abs(diffY) > Math.abs(diffX)) {
        // Vertical swipe
        if (diffY > 0) {
          console.log("Swipe up detected");
          // Could be used for navigation or other interactions
        } else {
          console.log("Swipe down detected");
          // Close mobile nav if open
          const navToggle = document.getElementById("nav-toggle");
          if (navToggle && navToggle.checked) {
            closeMobileNav();
          }
        }
      } else {
        // Horizontal swipe
        if (diffX > 0) {
          console.log("Swipe left detected");
        } else {
          console.log("Swipe right detected");
        }
      }
    }
  }
}

// Touch gesture support for mobile navigation
function initializeTouchGestures() {
  const navLinks = document.querySelector(".nav__links");
  let startX = 0;
  let currentX = 0;

  navLinks.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  navLinks.addEventListener("touchmove", function (e) {
    currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    if (diff > 50) {
      // Swipe left to close nav
      closeMobileNav();
    }
  });
}

// Performance Optimizations
function initializePerformanceOptimizations() {
  // Debounce scroll events
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(function () {
      // Handle scroll-based animations or effects here
    }, 16); // ~60fps
  });

  // Debounce resize events
  let resizeTimeout;
  window.addEventListener("resize", function () {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(function () {
      // Handle resize-based adjustments here
    }, 250);
  });

  // Optimize for mobile performance
  if ('serviceWorker' in navigator) {
    // Service worker registration for better performance
    console.log("Service Worker support detected");
  }
}

// Function to load user data with enhanced error handling
function loadUserData() {
  try {
    // Load user data from localStorage or use default values
    const savedUserData = JSON.parse(localStorage.getItem('userData')) || {};
    
    // Default user data
    const defaultUserData = {
      firstName: "John",
      lastName: "Doe",
      membership: "Premium Member",
      age: 25,
      weight: 75,
      height: 175,
      fitnessGoal: "Weight Loss",
      membershipPlan: "Monthly Plan",
      joinDate: "15 Jan 2024"
    };

    // Merge saved data with defaults
    const userData = { ...defaultUserData, ...savedUserData };
    
    // Calculate BMI
    const bmi = ((userData.weight / Math.pow(userData.height / 100, 2))).toFixed(1);

    // Update profile elements with user data
    const elements = {
      userName: `${userData.firstName} ${userData.lastName}`,
      userMembership: userData.membership || `${userData.membershipPlan} Member`,
      userAge: `${userData.age} years`,
      userWeight: `${userData.weight} kg`,
      userHeight: `${userData.height} cm`,
      userBMI: bmi,
      userGoal: userData.fitnessGoal,
      userPlan: userData.membershipPlan,
      userJoinDate: userData.joinDate
    };

    Object.keys(elements).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = elements[id];
      }
    });

    console.log("User data loaded successfully");
  } catch (error) {
    console.error("Error loading user data:", error);
  }
}

// Add enhanced CSS for better mobile experience
const enhancedStyle = document.createElement("style");
enhancedStyle.textContent = `
  /* Enhanced mobile navigation styles */
  @media (max-width: 768px) {
    .nav__links {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-toggle-label span {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Prevent body scroll when mobile nav is open */
    body.nav-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
    }
    
    /* Smooth transitions for all interactive elements */
    .btn, .price__btn, .btn1, .explore__nav span, .review__nav span {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Better touch targets */
    .btn, .price__btn, .btn1 {
      min-height: 44px;
      min-width: 44px;
    }
    
    /* Improved focus states for accessibility */
    .btn:focus, .price__btn:focus, .btn1:focus {
      outline: 2px solid var(--secondary-color);
      outline-offset: 2px;
    }
    
    /* Enhanced image loading states */
    img.loaded {
      opacity: 1 !important;
      transition: opacity 0.3s ease;
    }
    
    img.error {
      opacity: 0.5 !important;
      filter: grayscale(1);
    }
    
    /* Animation classes */
    .animated {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  }
  
  /* Enhanced accessibility */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
document.head.appendChild(enhancedStyle);

