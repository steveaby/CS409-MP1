/* Your JS here. */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

const nav = $("#main-nav");
const navLinks = $$(".nav-links a");
const positionIndicator = $("#position-indicator .indicator-fill");
const carouselTrack = $(".carousel-track");
const carouselSlides = $$(".carousel-slide", carouselTrack);
const prevBtn = $(".carousel-nav.prev");
const nextBtn = $(".carousel-nav.next");
const yearSpan = $("#year");
const projectBackdrop = $("#project-modal .modal-backdrop");
const projectClose = $("#project-modal .modal-close");
const projectTitle = $("#project-modal-title");
const projectDesc = $("#project-modal-description");
const projectModal = $("#project-modal");
const modalBackdrop = $(".modal-backdrop", projectModal);
const modalClose = $(".modal-close", projectModal);
const modalTitle = $("#project-modal-title");
const modalDesc = $("#project-modal-description");
const modalIcon = $("#project-modal-icon");
const projectCards = $$(".projects-grid .card");

// Navbar shrink on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("shrink");
  } else {
    nav.classList.remove("shrink");
  }
  updateIndicator();
});

// Smooth scrolling for nav links

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      window.scrollTo({
        top: targetEl.offsetTop - nav.offsetHeight,
        behavior: "smooth"
      });
    }
  });
});


// Position indicator (progress bar + active link)

function updateIndicator() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  positionIndicator.style.width = `${scrolled}%`;


  let currentSectionId = "";
  $$(".stripe").forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= nav.offsetHeight + 50 && rect.bottom > nav.offsetHeight + 50) {
      currentSectionId = sec.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
  });
}
updateIndicator();

// Carousel

let currentSlide = 0;
function showSlide(index) {
  if (index < 0) index = carouselSlides.length - 1;
  if (index >= carouselSlides.length) index = 0;
  currentSlide = index;
  const offset = -index * 100;
  carouselTrack.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));


setInterval(() => showSlide(currentSlide + 1), 6000);

// Modal
projectCards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const desc = card.getAttribute("data-description");
    const icon = card.querySelector(".card-icon").innerHTML;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalIcon.innerHTML = icon; 

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
  });
});

function closeProjectModal() {
  projectModal.classList.remove("active");
  projectModal.setAttribute("aria-hidden", "true");
}

modalBackdrop.addEventListener("click", closeProjectModal);
modalClose.addEventListener("click", closeProjectModal);
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeProjectModal();
});

function closeModal() {
  const panel = modal.querySelector(".modal-panel");

  panel.style.animation = "modalSlideOut 0.4s ease forwards";
  modalBackdrop.style.animation = "backdropFadeOut 0.4s ease forwards";

  setTimeout(() => {
    modal.classList.remove("active");
    panel.style.animation = "";         
    modalBackdrop.style.animation = ""; 
    modal.setAttribute("aria-hidden", "true");
  }, 400);
}

// Mobile nav toggle
const navToggleBtn = document.getElementById('nav-toggle');
const navLinksEl = document.querySelector('.nav-links');

if (navToggleBtn && navLinksEl) {
  navToggleBtn.addEventListener('click', () => {
    const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
    navToggleBtn.setAttribute('aria-expanded', String(!expanded));
    navLinksEl.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinksEl.classList.remove('active');
      navToggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinksEl.contains(e.target) && !navToggleBtn.contains(e.target)) {
      navLinksEl.classList.remove('active');
      navToggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

const heroVideo = document.querySelector('.heromovie-video');
if (heroVideo) {
  heroVideo.play().catch(() => {
    document.body.addEventListener('click', () => heroVideo.play());
  });
}
// Footer year
yearSpan.textContent = new Date().getFullYear();
