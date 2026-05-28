// ============================================
// 1. CONTACT FORM
// ============================================
const form = document.getElementById('darkContactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! I will get back to you soon. (Demo)');
    form.reset();
  });
}

// ============================================
// 2. SMOOTH SCROLL NAV LINKS
// ============================================
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ============================================
// 3. SKILLS FILTER
// ============================================
const categoryButtons = document.querySelectorAll('.skill-cat');
const skillItems = document.querySelectorAll('.skill-item');

categoryButtons.forEach(button => {
  button.addEventListener('click', function() {

    const classList = this.classList;
    let selectedCategory = '';

    if (classList.contains('skill-all'))           selectedCategory = 'all';
    if (classList.contains('skill-frontend'))      selectedCategory = 'frontend';
    if (classList.contains('skill-backend'))       selectedCategory = 'backend';
    if (classList.contains('skill-mobile'))        selectedCategory = 'mobile';
    if (classList.contains('skill-tools'))         selectedCategory = 'tools';
    if (classList.contains('skill-methodologies')) selectedCategory = 'methodologies';

    // Mark active button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    // Show or hide skill items
    skillItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      if (selectedCategory === 'all') {
        item.style.display = 'block'; // show EVERYTHING
      } else if (itemCategory === selectedCategory) {
        item.style.display = 'block'; // show matching
      } else {
        item.style.display = 'none';  // hide non-matching
      }
    });
  });
});

// ============================================
// 4. SCROLL REVEAL ANIMATION
// ============================================

// Get all elements that have the "reveal" class
const revealElements = document.querySelectorAll('.reveal');

// Create the observer — it watches elements
const observer = new IntersectionObserver((entries) => {

  // "entries" is a list of every watched element that changed visibility
  entries.forEach(entry => {

    // entry.isIntersecting = true means it's now visible on screen
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Stop watching it after it's revealed — no need to watch anymore
      observer.unobserve(entry.target);
    }
  });

}, {
  threshold: 0.15 // trigger when 15% of the element is visible
});

// Tell the observer to watch each reveal element
revealElements.forEach(el => observer.observe(el));

// ============================================
// 5. PROJECTS CAROUSEL
// ============================================
const cards = document.querySelectorAll('.project-card-new');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;

// Show only the active card
function showCard(index) {
  cards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  cards[index].classList.add('active');
  dots[index].classList.add('active');
  current = index;
}

// Initialize — show first card
showCard(0);

// Next button
nextBtn.addEventListener('click', () => {
  const next = (current + 1) % cards.length;
  showCard(next);
});

// Previous button
prevBtn.addEventListener('click', () => {
  const prev = (current - 1 + cards.length) % cards.length;
  showCard(prev);
});

// Dot navigation
dots.forEach(dot => {
  dot.addEventListener('click', function() {
    showCard(parseInt(this.getAttribute('data-index')));
  });
});