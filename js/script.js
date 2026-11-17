/* =====================================================
   Team website script (CSC 216, Lab 2)
   Loaded on every page with `defer`, so the HTML is
   fully parsed before any of this code runs.
   ===================================================== */

/* ---------- 1. Shared: runs on every page ---------- */

// Put the current year in the footer.
const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Open and close the navigation menu on small screens.
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Dark mode, remembered across pages and visits.
const themeToggle = document.querySelector('.theme-toggle');
const THEME_KEY = 'team-theme';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark', isDark);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
  }
}

applyTheme(localStorage.getItem(THEME_KEY) || 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  });
}



/* ---------- 2. Projects page ---------- */

const projects = [
  { title: 'Personal Portfolio Website', category: 'web', description: 'A responsive website showcasing a person’s background, skills, projects, and contact information.' },
  { title: 'Simple Calculator', category: 'javascript', description: 'A simple calculator developed using HTML, CSS, and JavaScript.' },
  { title: 'Git Collaboration Practice', category: 'git', description: 'A team exercise practicing Git commits, branches, and collaboration.' },
  { title: 'Responsive Landing Page', category: 'web', description: 'A modern landing page with a clear message, strong visuals, and calls to action.' },
  { title: 'Interactive Quiz App', category: 'javascript', description: 'A JavaScript quiz that tracks answers, scores, and instant feedback for learners.' },
  { title: 'Team Blog', category: 'web', description: 'A simple blog layout for publishing updates, ideas, and project milestones.' },
  { title: 'Digital Clock', category: 'javascript', description: 'A live clock built with JavaScript to display the current time and date.' },
  { title: 'Branching Practice', category: 'git', description: 'An exercise focused on creating, merging, and managing Git branches safely.' },
  { title: 'Version Control Portfolio', category: 'git', description: 'A Git-based portfolio that showcases commits, workflows, and collaborative teamwork.' }
];

const categoryNames = { web: 'Web design', javascript: 'JavaScript', git: 'Git' };

const projectList = document.querySelector('#project-list');
const projectCount = document.querySelector('#project-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectSearch = document.querySelector('#project-search');
let activeProjectFilter = 'all';

function renderProjects() {
  const query = projectSearch ? projectSearch.value.trim().toLowerCase() : '';
  const visible = projects.filter((project) => {
    const matchesCategory = activeProjectFilter === 'all' || project.category === activeProjectFilter;
    const searchableText = `${project.title} ${categoryNames[project.category]} ${project.description}`.toLowerCase();
    const matchesSearch = searchableText.includes(query);
    return matchesCategory && matchesSearch;
  });

  projectList.replaceChildren();

  visible.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'card';

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = categoryNames[project.category];

    const heading = document.createElement('h3');
    heading.textContent = project.title;

    const text = document.createElement('p');
    text.textContent = project.description;

    card.append(tag, heading, text);
    projectList.append(card);
  });

  if (visible.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-state';
    emptyMessage.textContent = 'No projects match your search. Try another name or category.';
    projectList.append(emptyMessage);
  }

  projectCount.textContent = `Showing ${visible.length} of ${projects.length} projects`;
}

if (projectList) {
  renderProjects();

  if (projectSearch) {
    projectSearch.addEventListener('input', renderProjects);
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      activeProjectFilter = button.dataset.filter;
      renderProjects();
    });
  });
}



/* ---------- 3. Contact page ---------- */

const form = document.querySelector('#contact-form');

if (form) {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const messageInput = document.querySelector('#message');
  const charCount = document.querySelector('#char-count');
  const statusEl = document.querySelector('#form-status');

  // Live character counter.
  messageInput.addEventListener('input', () => {
    charCount.textContent = messageInput.value.length;
  });

  // Show (or clear) the error message under one field.
  function showError(input, message) {
    const errorEl = document.querySelector(`#${input.id}-error`);
    errorEl.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  // Check every field. Returns true only if all are valid.
  function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Please enter your name.');
      isValid = false;
    } else {
      showError(nameInput, '');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Enter an email address like name@example.com.');
      isValid = false;
    } else {
      showError(emailInput, '');
    }

    if (messageInput.value.trim().length < 20) {
      showError(messageInput, 'Your message needs at least 20 characters.');
      isValid = false;
    } else {
      showError(messageInput, '');
    }

    return isValid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusEl.textContent = '';

    if (!validateForm()) {
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    const firstName = nameInput.value.trim().split(' ')[0];
    statusEl.textContent = `Thanks, ${firstName}! Your message is ready. (We connect this form to a real server later.)`;
    form.reset();
    charCount.textContent = '0';
  });
}
