// Resources data and rendering functionality

// Sample recent resources data
const recentResources = [
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

// Function to render recent resources on the homepage
function renderRecentResources() {
  const container = document.getElementById('recent-resources-container');
  if (!container) return;
  
  // Clear any existing content
  container.innerHTML = '';
  
  // Create and append resource cards
  recentResources.forEach(resource => {
    const card = createResourceCard(resource);
    container.appendChild(card);
  });
}

// Function to create a resource card
function createResourceCard(resource) {
  const card = document.createElement('div');
  card.className = 'resource-card';
  card.setAttribute('data-id', resource.id);
  card.setAttribute('data-year', resource.year);
  card.setAttribute('data-subject', resource.subject.toLowerCase().replace(' ', '-'));
  card.setAttribute('data-type', resource.type);
  
  // Determine icon based on resource type
  let typeIcon = 'fa-file-alt';
  if (resource.type === 'assignment') typeIcon = 'fa-tasks';
  if (resource.type === 'notes') typeIcon = 'fa-sticky-note';
  if (resource.type === 'study-material') typeIcon = 'fa-book';
  
  card.innerHTML = `
    <div class="resource-img" style="background-image: url('${resource.previewUrl}'); background-size: cover; background-position: center;">
      <i class="fas ${typeIcon}"></i>
    </div>
    <div class="resource-details">
      <div class="resource-meta">
        <span class="resource-type">${resource.typeLabel}</span>
        <span class="resource-year">${resource.year}</span>
      </div>
      <h3 class="resource-title">${resource.title}</h3>
      <p class="resource-subject">${resource.subject}</p>
      <div class="resource-actions">
        <a href="javascript:void(0)" class="download-btn" onclick="openResourcePreview('${resource.id}')">
          <i class="fas fa-download"></i> Download
        </a>
        <span class="resource-size">${resource.size}</span>
      </div>
    </div>
  `;
  
  return card;
}

// Initialize recent resources on homepage
document.addEventListener('DOMContentLoaded', () => {
  renderRecentResources();
  
  // Make openResourcePreview globally available
  window.openResourcePreview = (resourceId) => {
    // Find the resource in our data
    const resource = recentResources.find(r => r.id === resourceId);
    if (!resource) return;
    
    // Create and show modal
    const previewModal = document.createElement('div');
    previewModal.className = 'modal';
    previewModal.id = 'resource-preview-modal';
    
    previewModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">${resource.title}</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="preview-container" style="background-image: url('${resource.previewUrl}'); background-size: cover; background-position: center;">
            <img src="${resource.previewUrl}" alt="${resource.title} preview">
          </div>
          <div class="preview-info">
            <h3>${resource.title}</h3>
            <div class="preview-meta">
              <span><i class="fas fa-calendar"></i> ${resource.year}</span>
              <span><i class="fas fa-graduation-cap"></i> ${resource.subject}</span>
              <span><i class="fas fa-file"></i> ${resource.typeLabel}</span>
              <span><i class="fas fa-weight"></i> ${resource.size}</span>
            </div>
            <p>This resource contains comprehensive materials for ${resource.subject} studies. 
               It's been reviewed by faculty and is an excellent study aid.</p>
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
  };
});