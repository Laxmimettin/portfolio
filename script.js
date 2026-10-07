// --- Typewriter Effect ---
const typewriterEl = document.getElementById("typewriter");
const phrases = ["CSE Student", "Software Engineer", "Web Developer"];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function type() {
  const current = phrases[phraseIndex];
  typewriterEl.textContent = current.substring(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 60);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, isDeleting ? 1500 : 400);
  }
}

type();

// --- Custom Cursor Interactivity ---
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Expand cursor tracking circles on link hovers
document
  .querySelectorAll("a, .btn, .project-card, .skill-card")
  .forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "45px";
      cursor.style.height = "45px";
      cursor.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
    });
    link.addEventListener("mouseleave", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.backgroundColor = "transparent";
    });
  });

// --- Resume Viewer ---
const resumeLink = document.querySelector(".download-resume");
const resumeModal = document.getElementById("resume-modal");
const closeResumeModal = document.querySelector(".resume-close");

if (resumeLink && resumeModal) {
  resumeLink.addEventListener("click", (e) => {
    e.preventDefault();
    resumeModal.classList.add("active");
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
}

if (closeResumeModal && resumeModal) {
  const closeModal = () => {
    resumeModal.classList.remove("active");
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  closeResumeModal.addEventListener("click", closeModal);
  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
}

// --- Mobile Navigation Menu Toggle ---
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.position = "absolute";
  navLinks.style.top = "70px";
  navLinks.style.left = "0";
  navLinks.style.width = "100%";
  navLinks.style.background = "rgba(10, 12, 16, 0.95)";
  navLinks.style.padding = "20px";
});

// --- Smart Dynamic Navbar Scroll Links Indicator ---
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href").slice(1) === current) {
      a.classList.add("active");
    }
  });
});

// --- Pure Vanilla JS 3D Card Tilt Effect ---
const cards = document.querySelectorAll("[data-tilt]");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotational force degree variables
    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});
