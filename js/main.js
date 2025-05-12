// Main JavaScript for AcademicHub

// Toggle mobile menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animate hamburger menu
    menuToggle.classList.toggle('active');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.navbar')) {
    navLinks.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
  }
});

// Search functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `pages/search-results.html?q=${encodeURIComponent(query)}`;
    }
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
}

// Resource search in individual pages
const resourceSearch = document.getElementById('resource-search');
const resourceSearchBtn = document.getElementById('resource-search-btn');

if (resourceSearchBtn && resourceSearch) {
  resourceSearchBtn.addEventListener('click', () => {
    const query = resourceSearch.value.trim().toLowerCase();
    filterResourcesBySearch(query);
  });

  resourceSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      resourceSearchBtn.click();
    }
  });
}

// Function to filter resources by search query
function filterResourcesBySearch(query) {
  const resourcesContainer = document.querySelector('.resources-grid');
  if (!resourcesContainer) return;
  
  const resourceCards = resourcesContainer.querySelectorAll('.resource-card');
  let matchCount = 0;
  
  resourceCards.forEach(card => {
    const title = card.querySelector('.resource-title').textContent.toLowerCase();
    const subject = card.querySelector('.resource-subject').textContent.toLowerCase();
    
    if (title.includes(query) || subject.includes(query)) {
      card.style.display = 'block';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update count
  const countElement = document.getElementById('count-number');
  if (countElement) {
    countElement.textContent = matchCount;
  }
  
  // Show message if no results
  let noResultsMsg = document.getElementById('no-results-message');
  if (matchCount === 0) {
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('p');
      noResultsMsg.id = 'no-results-message';
      noResultsMsg.className = 'no-results';
      noResultsMsg.textContent = 'No resources found matching your search.';
      resourcesContainer.appendChild(noResultsMsg);
    }
  } else if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

// Filter application for resource pages
const applyFiltersBtn = document.getElementById('apply-filters');

if (applyFiltersBtn) {
  applyFiltersBtn.addEventListener('click', () => {
    applyFilters();
  });
}

// Function to apply filters
function applyFilters() {
  let yearFilter = document.getElementById('year-filter');
  let subjectFilter = document.getElementById('subject-filter');
  let typeFilter = document.getElementById('exam-type-filter') || document.getElementById('format-filter');
  
  const yearValue = yearFilter ? yearFilter.value : '';
  const subjectValue = subjectFilter ? subjectFilter.value : '';
  const typeValue = typeFilter ? typeFilter.value : '';
  
  const resourcesContainer = document.querySelector('.resources-grid');
  if (!resourcesContainer) return;
  
  const resourceCards = resourcesContainer.querySelectorAll('.resource-card');
  let matchCount = 0;
  
  resourceCards.forEach(card => {
    const cardYear = card.getAttribute('data-year');
    const cardSubject = card.getAttribute('data-subject');
    const cardType = card.getAttribute('data-type');
    
    const yearMatch = !yearValue || cardYear === yearValue;
    const subjectMatch = !subjectValue || cardSubject === subjectValue;
    const typeMatch = !typeValue || cardType === typeValue;
    
    if (yearMatch && subjectMatch && typeMatch) {
      card.style.display = 'block';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Update count
  const countElement = document.getElementById('count-number');
  if (countElement) {
    countElement.textContent = matchCount;
  }
  
  // Handle no results
  let noResultsMsg = document.getElementById('no-results-message');
  if (matchCount === 0) {
    if (!noResultsMsg) {
      noResultsMsg = document.createElement('p');
      noResultsMsg.id = 'no-results-message';
      noResultsMsg.className = 'no-results';
      noResultsMsg.textContent = 'No resources found matching your filters.';
      resourcesContainer.appendChild(noResultsMsg);
    }
  } else if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

// Pagination functionality
const paginationNumbers = document.getElementById('pagination-numbers');
const paginationButtons = document.querySelectorAll('.pagination-btn');

if (paginationNumbers) {
  const pageButtons = paginationNumbers.querySelectorAll('.pagination-number');
  pageButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      pageButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Here would be logic to load page content
      // For demo purposes, we'll just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

if (paginationButtons) {
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-page');
      const activeButton = document.querySelector('.pagination-number.active');
      if (!activeButton) return;
      
      const currentPage = parseInt(activeButton.getAttribute('data-page'));
      const totalPages = document.querySelectorAll('.pagination-number').length;
      
      let newPage = currentPage;
      if (action === 'prev' && currentPage > 1) {
        newPage = currentPage - 1;
      } else if (action === 'next' && currentPage < totalPages) {
        newPage = currentPage + 1;
      }
      
      if (newPage !== currentPage) {
        const newActiveButton = document.querySelector(`.pagination-number[data-page="${newPage}"]`);
        if (newActiveButton) {
          activeButton.classList.remove('active');
          newActiveButton.classList.add('active');
          // Here would be logic to load page content
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });
}

// Resource preview functionality
function openResourcePreview(resourceId) {
  // In a real application, you would fetch the resource data
  // For now, we'll use sample data
  const previewModal = document.createElement('div');
  previewModal.className = 'modal';
  previewModal.id = 'resource-preview-modal';
  
  const resource = getSampleResource(resourceId);
  
  previewModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">${resource.title}</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="preview-container">
          <img src="${resource.previewImg}" alt="${resource.title} preview">
        </div>
        <div class="preview-info">
          <h3>${resource.title}</h3>
          <div class="preview-meta">
            <span><i class="fas fa-calendar"></i> ${resource.year}</span>
            <span><i class="fas fa-graduation-cap"></i> ${resource.subject}</span>
            <span><i class="fas fa-file"></i> ${resource.type}</span>
            <span><i class="fas fa-weight"></i> ${resource.size}</span>
          </div>
          <p>${resource.description}</p>
          <div class="preview-actions">
            <a href="${resource.downloadUrl}" class="btn btn-primary download-btn">
              <i class="fas fa-download"></i> Download
            </a>
            <button class="btn btn-outline close-preview">Close Preview</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(previewModal);
  
  // Animation for smooth appearance
  setTimeout(() => {
    previewModal.classList.add('active');
  }, 10);
  
  // Close modal functionality
  const closeButtons = previewModal.querySelectorAll('.close-modal, .close-preview');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      previewModal.classList.remove('active');
      setTimeout(() => {
        previewModal.remove();
      }, 300);
    });
  });
  
  // Close on outside click
  previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) {
      previewModal.classList.remove('active');
      setTimeout(() => {
        previewModal.remove();
      }, 300);
    }
  });
}

// Sample resource data for preview
function getSampleResource(id) {
  // In a real app, this would fetch from a database
  return {
    id: id,
    title: 'Data Structures and Algorithms Final Exam 2023',
    subject: 'Computer Science',
    year: '2023',
    type: 'Final Exam',
    size: '2.4 MB',
    description: 'This is the final examination paper for Data Structures and Algorithms course from the Spring semester of 2023. It includes questions on array manipulations, linked lists, trees, graphs, and algorithmic complexity analysis.',
    previewImg: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    downloadUrl: '#'
  };
}

// Initialize Particles.js if it exists on the page
const particlesContainer = document.getElementById('particles-js');
if (particlesContainer && typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#ffffff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}