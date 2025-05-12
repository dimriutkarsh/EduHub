document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const subjectsContainer = document.getElementById('subjects-container');
  const noteTypeModal = document.getElementById('note-type-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const noteTypeOptions = document.querySelectorAll('.note-type-option');
  
  // Subject data with URLs
  const subjects = [
    {
      id: 'mathematics',
      title: 'Mathematics',
      icon: 'fa-calculator',
      description: 'Tutorial sheets and formula sheets',
      notesCount: 42,
      short_url: 'https://drive.google.com/file/d/1ir6TSWSNuWw_bhGNEyjfMo6C7kAyY4gy/view?usp=drive_link',
      regular_url: 'https://drive.google.com/file/d/1ir6TSWSNuWw_bhGNEyjfMo6C7kAyY4gy/view?usp=drive_link'
    },
    {
      id: 'physics',
      title: 'Physics',
      icon: 'fa-atom',
      description: 'practicals and Assignments of Engineering Physics',
      notesCount: 36,
      short_url: 'https://drive.google.com/file/d/1ir6TSWSNuWw_bhGNEyjfMo6C7kAyY4gy/view?usp=drive_link',
      regular_url: ''
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      icon: 'fa-flask',
      description: 'practicals and assignments of Engineering Chemistry',
      notesCount: 28,
      short_url: '',
      regular_url: ''
    },
    {
      id: 'computer-science',
      title: 'Computer Science',
      icon: 'fa-laptop-code',
      description: 'Notes on programming, algorithms, data structures, and more',
      notesCount: 54,
      short_url: '',
      regular_url: ''
    },
    {
      id: 'Engineering Drawing',
      title: 'Engineering Drawings',
      icon: 'fa-dna',
      description: 'charts and steps to make your work easy',
      notesCount: 33,
      short_url: '',
      regular_url: ''
    },
    {
      id: 'electronics',
      title: 'Electronics',
      icon: 'fa-microchip',
      description: 'practicals and Assignments of Basic Electronics Engineering',
      notesCount: 25,
      short_url: '',
      regular_url: ''
    },
    {
      id: 'Electrical',
      title: 'Electrical',
      icon: 'fa-book',
      description: 'practicals and Assignments of Basic Electrical Engineering',
      notesCount: 31,
      short_url: '',
      regular_url: ''
    },
    {
      id: 'Mechanical',
      title: 'Mechanical',
      icon: 'fa-landmark',
      description: 'practicals of Basic Mechanical Engineering',
      notesCount: 27,
      short_url: '',
      regular_url: ''
    }
  ];
  
  // Initialize the page
  function init() {
    loadSubjectsFromStorage();
    renderSubjects();
    setupEventListeners();
  }

  // Load subjects from localStorage
  function loadSubjectsFromStorage() {
    const savedSubjects = localStorage.getItem('eduHubSubjects');
    if (savedSubjects) {
      const parsed = JSON.parse(savedSubjects);
      subjects.forEach((subject, index) => {
        if (index < parsed.length) {
          subject.short_url = parsed[index].short_url || '';
          subject.regular_url = parsed[index].regular_url || '';
        }
      });
    } else {
      localStorage.setItem('eduHubSubjects', JSON.stringify(subjects));
    }
  }
  
  // Render subject cards
  function renderSubjects() {
    subjectsContainer.innerHTML = '';
    
    subjects.forEach((subject, index) => {
      const subjectCard = document.createElement('div');
      subjectCard.className = 'subject-card';
      subjectCard.dataset.id = subject.id;
      subjectCard.style.setProperty('--animation-order', index);
      
      subjectCard.innerHTML = `
        <div class="subject-icon">
          <i class="fas ${subject.icon}"></i>
        </div>
        <div class="subject-details">
          <h3 class="subject-title">${subject.title}</h3>
          <p class="subject-description">${subject.description}</p>
          <div class="subject-meta">
            <span>${subject.notesCount} Notes</span>
            <span><i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      `;
      
      subjectsContainer.appendChild(subjectCard);
    });
  }
  
//   // Show note type selection modal
//   function showNoteTypeModal(subjectId) {
//     const subject = subjects.find(s => s.id === subjectId);
//     if (!subject) return;
    
//     // Update modal title to include subject
//     const modalTitle = document.querySelector('.modal-title');
//     modalTitle.textContent = `Select Notes Type: ${subject.title}`;
    
//     noteTypeModal.classList.add('active');
    
//     // Update event listeners for note type options
//     noteTypeOptions.forEach(option => {
//       const type = option.dataset.type;
      
//       // Remove old event listeners
//       const newOption = option.cloneNode(true);
//       option.parentNode.replaceChild(newOption, option);
      
//       // Add new event listener
//       newOption.addEventListener('click', function() {
//         const url = type === 'short' ? subject.short_url : subject.regular_url;
        
//         if (url) {
//           window.open(url, '_blank');
//           noteTypeModal.classList.remove('active');
//         } else {
//           alert(`No ${type === 'short' ? 'short notes' : 'regular notes'} available for ${subject.title}. Please configure the link in admin settings.`);
//         }
//       });
//     });
//   }
  
  // Setup event listeners
  function setupEventListeners() {
    // Subject card click
    subjectsContainer.addEventListener('click', function(e) {
      const subjectCard = e.target.closest('.subject-card');
      if (subjectCard) {
        const subjectId = subjectCard.dataset.id;
        showNoteTypeModal(subjectId);
      }
    });
    
    // Close modal button
    closeModalBtn.addEventListener('click', function() {
      noteTypeModal.classList.remove('active');
    });
    
    
    // Close modal when clicking outside
    noteTypeModal.addEventListener('click', function(e) {
      if (e.target === noteTypeModal) {
        noteTypeModal.classList.remove('active');
      }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && noteTypeModal.classList.contains('active')) {
        noteTypeModal.classList.remove('active');
      }
    });
  }
  
  // Initialize the page
  init();
});


