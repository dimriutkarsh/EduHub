// Question Papers JavaScript

// Sample question papers data with corrected file paths
const questionPapers = [
  {
    id: 'qp1',
    title: 'Sessional Examination',
    subject: 'physics',
    subjectLabel: 'Physics',
    year: '2025',
    gradeYear: '1',
    type: 'midterm',
    typeLabel: 'Sessional Examination',
    size: '2.4 MB',
    downloadUrl: 'https://drive.google.com/file/d/1ir6TSWSNuWw_bhGNEyjfMo6C7kAyY4gy/view?usp=drive_link',
    previewUrl: 'https://img.freepik.com/free-vector/background-about-physics_1284-698.jpg?t=st=1746775614~exp=1746779214~hmac=5081f147c7d1d4acba7cc928aa303178b184be6a3d7caa817f7e4d526c173178&w=826'
  },
  {
    id: 'qp2',
    title: 'External Examination',
    subject: 'Electronics',
    subjectLabel: 'Electronics',
    year: '2024',
    gradeYear: '1',
    type: 'final',
    typeLabel: 'final',
    size: '1.8 MB',
    downloadUrl: 'https://drive.google.com/file/d/1m9DV5jq5VNsA3fz5sC-5IM3AR44oFQwX/view?usp=sharing',
    previewUrl: 'https://www.iieinstitutionkerala.com/uploads/diploma_courses/ElectronicsEngineering.jpg'
  },
  {
    id: 'qp3',
    title: 'External Examination',
    subject: 'Chemistry',
    subjectLabel: 'Chemistry',
    year: '2024',
    gradeYear: '1',
    type: 'final',
    typeLabel: 'final',
    size: '1.8 MB',
    downloadUrl: 'https://drive.google.com/file/d/1m9DV5jq5VNsA3fz5sC-5IM3AR44oFQwX/view?usp=sharing',
    previewUrl: 'https://www.openaccessgovernment.org/wp-content/uploads/2019/04/dreamstime_s_126032651.jpg'
  },
  {
    id: 'qp4',
    title: 'External Examination',
    subject: 'Mechanical',
    subjectLabel: 'Mechanical',
    year: '2024',
    gradeYear: '1',
    type: 'final',
    typeLabel: 'final',
    size: '1.8 MB',
    downloadUrl: 'https://drive.google.com/file/d/1wWv5ziJOrPcniOgTap7FfV98EFRPBlDh/view?usp=sharing',
    previewUrl: 'https://www.discoverengineering.org/wp-content/uploads/2023/12/mj_11208_2.jpg'
  },
  {
    id: 'qp5',
    title: 'External Examination',
    subject: 'Electrical',
    subjectLabel: 'Electrical',
    year: '2024',
    gradeYear: '1',
    type: 'final',
    typeLabel: 'final',
    size: '1.8 MB',
    downloadUrl: 'https://drive.google.com/file/d/1T8uWKN32RgG7VeHWG7-60rk_kFFu9wMA/view?usp=sharing',
    previewUrl: 'https://raviniaplumbing.com/wp-content/webp-express/webp-images/uploads/2023/08/Common-Electrical-Tools-to-Know-About-1-scaled.jpg.webp'
  },
  {
    id: 'qp6',
    title: 'External Examination',
    subject: 'Mathematics',
    subjectLabel: 'Mathematics',
    year: '2024',
    gradeYear: '1',
    type: 'final',
    typeLabel: 'final',
    size: '1.8 MB',
    downloadUrl: 'https://drive.google.com/file/d/1Jpj3zD9U_s-56nLlaOc3-I6gGfCh9aAB/view?usp=sharing',
    previewUrl: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

// State for filtered papers
let filteredPapers = [...questionPapers];
const itemsPerPage = 6;
let currentPage = 1;

// Create question paper card
function createQuestionPaperCard(paper) {
  const card = document.createElement('div');
  card.className = 'resource-card';
  card.setAttribute('data-id', paper.id);
  card.setAttribute('data-year', paper.year);
  card.setAttribute('data-grade', paper.gradeYear);
  card.setAttribute('data-subject', paper.subject);
  card.setAttribute('data-type', paper.type);
  
  card.innerHTML = `
    <div class="resource-img" style="background-image: url('${paper.previewUrl}'); background-size: cover; background-position: center;">
      <i class="fas fa-file-alt"></i>
    </div>
    <div class="resource-details">
      <div class="resource-meta">
        <span class="resource-type">${paper.typeLabel}</span>
        <span class="resource-year">${paper.year}</span>
      </div>
      <h3 class="resource-title">${paper.title}</h3>
      <p class="resource-subject">${paper.subjectLabel}</p>
      <div class="resource-actions">
        <a href="javascript:void(0)" class="download-btn" onclick="openQuestionPaperPreview('${paper.id}')">
          <i class="fas fa-download"></i> Download
        </a>
        <span class="resource-size">${paper.size}</span>
      </div>
    </div>
  `;
  
  return card;
}

// Render filtered papers with pagination
function renderQuestionPapers() {
  const container = document.getElementById('question-papers-container');
  if (!container) return;
  
  // Clear any existing content
  container.innerHTML = '';
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPapers = filteredPapers.slice(startIndex, endIndex);
  
  // Create and append resource cards
  paginatedPapers.forEach(paper => {
    const card = createQuestionPaperCard(paper);
    container.appendChild(card);
  });
  
  // Update count
  const countElement = document.getElementById('count-number');
  if (countElement) {
    countElement.textContent = filteredPapers.length;
  }
  
  // Update pagination
  updatePagination();
}

// Update pagination controls
function updatePagination() {
  const pagination = document.getElementById('pagination-numbers');
  if (!pagination) return;
  
  // Clear existing pagination
  pagination.innerHTML = '';
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);
  
  // Create pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
    pageButton.setAttribute('data-page', i);
    pageButton.textContent = i;
    
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderQuestionPapers();
      
      // Scroll to top of resources section
      const resourcesSection = document.querySelector('.resources-section');
      if (resourcesSection) {
        resourcesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    pagination.appendChild(pageButton);
  }
  
  // Setup prev/next buttons
  const prevButton = document.querySelector('.pagination-btn[data-page="prev"]');
  const nextButton = document.querySelector('.pagination-btn[data-page="next"]');
  
  if (prevButton) {
    prevButton.disabled = currentPage === 1;
    prevButton.style.opacity = currentPage === 1 ? '0.5' : '1';
    
    // Remove old event listeners by cloning the button
    const newPrevButton = prevButton.cloneNode(true);
    prevButton.parentNode.replaceChild(newPrevButton, prevButton);
    
    newPrevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderQuestionPapers();
        // Scroll to top of resources section
        const resourcesSection = document.querySelector('.resources-section');
        if (resourcesSection) {
          resourcesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
  
  if (nextButton) {
    nextButton.disabled = currentPage === totalPages;
    nextButton.style.opacity = currentPage === totalPages ? '0.5' : '1';
    
    // Remove old event listeners by cloning the button
    const newNextButton = nextButton.cloneNode(true);
    nextButton.parentNode.replaceChild(newNextButton, nextButton);
    
    newNextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderQuestionPapers();
        // Scroll to top of resources section
        const resourcesSection = document.querySelector('.resources-section');
        if (resourcesSection) {
          resourcesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}

// Apply filters function
function applyFilters() {
  const yearFilter = document.getElementById('academic-year-filter').value;
  const gradeYearFilter = document.getElementById('grade-year-filter').value;
  const subjectFilter = document.getElementById('subject-filter').value;
  const examTypeFilter = document.getElementById('exam-type-filter').value;
  const searchText = document.getElementById('resource-search').value.toLowerCase();
  
  // Filter papers based on selected criteria
  filteredPapers = questionPapers.filter(paper => {
    const yearMatch = !yearFilter || paper.year === yearFilter;
    const gradeMatch = !gradeYearFilter || paper.gradeYear === gradeYearFilter;
    const subjectMatch = !subjectFilter || paper.subject === subjectFilter;
    const typeMatch = !examTypeFilter || paper.type === examTypeFilter;
    const searchMatch = !searchText || 
                       paper.title.toLowerCase().includes(searchText) || 
                       paper.subjectLabel.toLowerCase().includes(searchText);
    
    return yearMatch && gradeMatch && subjectMatch && typeMatch && searchMatch;
  });
  
  // Reset to first page
  currentPage = 1;
  
  // Re-render papers
  renderQuestionPapers();
  
  // Show feedback that filters were applied
  showFilterAppliedFeedback();
}

// Show filter applied feedback
function showFilterAppliedFeedback() {
  const applyBtn = document.getElementById('apply-filters');
  if (applyBtn) {
    // Store original text
    const originalText = applyBtn.textContent;
    
    // Change text and add visual feedback
    applyBtn.textContent = "Filters Applied";
    applyBtn.style.backgroundColor = 'var(--success)';
    
    // Reset after short delay
    setTimeout(() => {
      applyBtn.textContent = originalText;
      applyBtn.style.backgroundColor = '';
    }, 1500);
  }
}

// Preview and download function
function openQuestionPaperPreview(paperId) {
  // Find the paper in our data
  const paper = questionPapers.find(p => p.id === paperId);
  if (!paper) return;
  
  // Create and show modal
  const previewModal = document.createElement('div');
  previewModal.className = 'modal';
  previewModal.id = 'question-paper-preview-modal';
  
  previewModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">${paper.title}</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="preview-container">
          <img src="${paper.previewUrl}" alt="${paper.title} preview">
        </div>
        <div class="preview-info">
          <h3>${paper.title}</h3>
          <div class="preview-meta">
            <span><i class="fas fa-calendar"></i> ${paper.year}</span>
            <span><i class="fas fa-graduation-cap"></i> ${paper.subjectLabel}</span>
            <span><i class="fas fa-file"></i> ${paper.typeLabel}</span>
            <span><i class="fas fa-weight"></i> ${paper.size}</span>
          </div>
          <p>This question paper contains all questions from the ${paper.year} ${paper.typeLabel} 
             for ${paper.subjectLabel}. It includes both multiple choice and written sections.</p>
          <div class="preview-actions">
            <a href="${paper.downloadUrl}" class="btn btn-primary download-btn" target="_blank" rel="noopener noreferrer">
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
  
  // Direct download functionality
  const downloadBtn = previewModal.querySelector('.download-btn');
  downloadBtn.addEventListener('click', (e) => {
    // Create a notification that download has started
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> Download started for "${paper.title}"`;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '20px';
    notification.style.padding = '15px 20px';
    notification.style.backgroundColor = 'var(--success)';
    notification.style.color = 'white';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(20px)';
    notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  });
}

// Initialize question papers on page load
document.addEventListener('DOMContentLoaded', () => {
  // Render initial papers
  renderQuestionPapers();
  
  // Get references to filters
  const academicYearFilter = document.getElementById('academic-year-filter');
  const gradeYearFilter = document.getElementById('grade-year-filter');
  const subjectFilter = document.getElementById('subject-filter');
  const examTypeFilter = document.getElementById('exam-type-filter');
  const searchInput = document.getElementById('resource-search');
  const searchBtn = document.getElementById('resource-search-btn');
  const applyFiltersBtn = document.getElementById('apply-filters');
  
  // Populate filters with unique values from our data
  if (academicYearFilter) {
    // Get unique years from data
    const years = [...new Set(questionPapers.map(paper => paper.year))].sort().reverse();
    
    // Clear existing options except the first one
    const firstOption = academicYearFilter.options[0];
    academicYearFilter.innerHTML = '';
    academicYearFilter.appendChild(firstOption);
    
    // Add year options
    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      academicYearFilter.appendChild(option);
    });
  }
  
  // Highlight active filters and reset them on page load
  const resetFilters = () => {
    if (academicYearFilter) academicYearFilter.value = '';
    if (gradeYearFilter) gradeYearFilter.value = '';
    if (subjectFilter) subjectFilter.value = '';
    if (examTypeFilter) examTypeFilter.value = '';
    if (searchInput) searchInput.value = '';
  };
  
  // Clear filters button functionality
  const createResetButton = () => {
    // Check if it already exists
    if (document.getElementById('reset-filters')) return;
    
    const resetBtn = document.createElement('button');
    resetBtn.id = 'reset-filters';
    resetBtn.className = 'btn btn-outline';
    resetBtn.textContent = 'Reset Filters';
    resetBtn.style.marginLeft = '10px';
    
    resetBtn.addEventListener('click', () => {
      resetFilters();
      filteredPapers = [...questionPapers];
      currentPage = 1;
      renderQuestionPapers();
    });
    
    // Add after apply filters button
    if (applyFiltersBtn && applyFiltersBtn.parentNode) {
      applyFiltersBtn.parentNode.appendChild(resetBtn);
    }
  };
  
  createResetButton();
  
  // Set up event listeners for filters
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', applyFilters);
  }
  
  if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        applyFilters();
      }
    });
  }
  
  // Make preview function globally available
  window.openQuestionPaperPreview = openQuestionPaperPreview;
  
  // Add event listeners for filter changes 
  [academicYearFilter, gradeYearFilter, subjectFilter, examTypeFilter].forEach(filter => {
    if (filter) {
      filter.addEventListener('change', () => {
        // Highlight the changed filter
        filter.style.borderColor = 'var(--accent-color)';
        filter.style.boxShadow = '0 0 0 2px rgba(255, 193, 7, 0.2)';
        
        // Reset after a short delay
        setTimeout(() => {
          filter.style.borderColor = '';
          filter.style.boxShadow = '';
        }, 500);
      });
    }
  });
  
  // Add custom styling for search input
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.style.borderColor = 'var(--primary-color)';
      searchInput.style.boxShadow = '0 0 0 2px rgba(10, 25, 47, 0.2)';
    });
    
    searchInput.addEventListener('blur', () => {
      searchInput.style.borderColor = '';
      searchInput.style.boxShadow = '';
    });
  }
  
  // Add success message on page load
  console.log('Question Papers Portal initialized successfully.');
  console.log('All filters and search functionality are now working.');
});

// Add CSS for feedback animations
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .filter-active {
      border-color: var(--accent-color) !important;
      box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.2) !important;
    }
    
    .download-notification {
      animation: slideInUp 0.3s ease forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Visual feedback for active filters */
    .filter-group select:focus {
      border-color: var(--primary-color);
      outline: none;
    }
    
    /* Success color for download button */
    .download-btn {
      position: relative;
      overflow: hidden;
    }
    
    .download-btn::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: all 0.5s ease;
    }
    
    .download-btn:hover::after {
      left: 100%;
    }
  `;
  
  document.head.appendChild(style);
});