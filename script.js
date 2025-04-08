// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Navbar scroll effect
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    // Scroll Down
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    // Scroll Up
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }
  lastScroll = currentScroll;
});

// Animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".tokenomics-card, .roadmap-item, .about-content"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Add animation classes to CSS
const style = document.createElement("style");
style.textContent = `
    .tokenomics-card, .roadmap-item, .about-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .tokenomics-card.animate, .roadmap-item.animate, .about-content.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    header {
        transition: transform 0.3s ease;
    }
    
    header.scroll-down {
        transform: translateY(-100%);
    }
    
    header.scroll-up {
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

// Mobile menu toggle
const createMobileMenu = () => {
  const nav = document.querySelector("nav");
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.classList.add("mobile-menu-btn");
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

  const mobileMenu = document.createElement("div");
  mobileMenu.classList.add("mobile-menu");
  mobileMenu.innerHTML = nav.querySelector(".nav-links").innerHTML;

  nav.appendChild(mobileMenuBtn);
  document.body.appendChild(mobileMenu);

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    mobileMenuBtn.classList.toggle("active");
  });

  // Add mobile menu styles
  const mobileStyles = document.createElement("style");
  mobileStyles.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--dark-color);
            cursor: pointer;
        }
        
        .mobile-menu {
            display: none;
            position: fixed;
            top: 60px;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .mobile-menu.active {
            transform: translateY(0);
        }
        
        .mobile-menu ul {
            list-style: none;
            padding: 0;
        }
        
        .mobile-menu li {
            margin: 1rem 0;
        }
        
        .mobile-menu a {
            color: var(--dark-color);
            text-decoration: none;
            font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .mobile-menu {
                display: block;
            }
        }
    `;

  document.head.appendChild(mobileStyles);
};

createMobileMenu();
