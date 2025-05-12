/**
 * Admin configuration for managing subject URLs
 * Allows administrators to configure Google Drive links for each subject
 */
document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const adminToggleBtn = document.getElementById('admin-config-toggle');
  const adminConfigModal = document.getElementById('admin-config-modal');
  const closeAdminModalBtn = document.getElementById('close-admin-modal');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const subjectList = document.getElementById('subject-list');
  const linkSubjectSelect = document.getElementById('link-subject');
  const linkTypeSelect = document.getElementById('link-type');
  const driveLinkInput = document.getElementById('drive-link');
  const saveLinkBtn = document.getElementById('save-link');
  const linksTbody = document.getElementById('links-tbody');
  const saveSubjectsBtn = document.getElementById('save-subjects');
  
  // Check if eduHub object is available (defined in notes.js)
  if (!window.eduHub) {
    console.error('eduHub object not found. Make sure notes.js is loaded before notes-config.js');
    return;
  }
  
  // Initialize admin config
  function init() {
    setupEventListeners();
    populateSubjectDropdown();
    populateSubjectList();
    populateLinksTable();
  }
  
  // Setup admin event listeners
  function setupEventListeners() {
    // Admin toggle button
    adminToggleBtn.addEventListener('click', function() {
      adminConfigModal.classList.add('active');
      populateSubjectList(); // Refresh data when opening modal
      populateLinksTable();
    });
    
    // Close admin modal
    closeAdminModalBtn.addEventListener('click', function() {
      adminConfigModal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    adminConfigModal.addEventListener('click', function(e) {
      if (e.target === adminConfigModal) {
        adminConfigModal.classList.remove('active');
      }
    });
    
    // Tab switching
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.dataset.tab;
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show selected tab pane
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById(tabId + '-tab').classList.add('active');
      });
    });
    
    // Save link button
    saveLinkBtn.addEventListener('click', function() {
      const subjectId = linkSubjectSelect.value;
      const noteType = linkTypeSelect.value;
      const url = driveLinkInput.value.trim();
      
      if (!subjectId || !noteType || !url) {
        alert('Please fill in all fields');
        return;
      }
      
      // Save the URL
      const success = window.eduHub.updateSubjectUrl(subjectId, noteType, url);
      if (success) {
        alert(`${noteType === 'short' ? 'Short' : 'Regular'} notes link for ${getSubjectTitle(subjectId)} has been updated.`);
        driveLinkInput.value = '';
        populateLinksTable();
        populateSubjectList();
      } else {
        alert('Failed to update link. Subject not found.');
      }
    });
    
    // Save subjects button
    saveSubjectsBtn.addEventListener('click', function() {
      alert('Subject changes have been saved.');
      adminConfigModal.classList.remove('active');
    });
  }
  
  // Populate subject dropdown
  function populateSubjectDropdown() {
    const subjects = window.eduHub.getSubjects();
    linkSubjectSelect.innerHTML = '';
    
    subjects.forEach(subject => {
      const option = document.createElement('option');
      option.value = subject.id;
      option.textContent = subject.title;
      linkSubjectSelect.appendChild(option);
    });
  }
  
  // Populate subject list in admin tab
  function populateSubjectList() {
    const subjects = window.eduHub.getSubjects();
    subjectList.innerHTML = '';
    
    subjects.forEach(subject => {
      const subjectItem = document.createElement('div');
      subjectItem.className = 'subject-item';
      
      subjectItem.innerHTML = `
        <div class="subject-item-header">
          <div class="subject-item-title">${subject.title}</div>
        </div>
        <div class="subject-item-links">
          <div class="subject-item-link">
            <span>Short Notes:</span>
            <span>${subject.short_url ? 'Configured ✓' : 'Not Configured ✗'}</span>
            <button class="edit-link-btn" data-subject="${subject.id}" data-type="short">
              ${subject.short_url ? 'Edit' : 'Add'}
            </button>
          </div>
          <div class="subject-item-link">
            <span>Regular Notes:</span>
            <span>${subject.regular_url ? 'Configured ✓' : 'Not Configured ✗'}</span>
            <button class="edit-link-btn" data-subject="${subject.id}" data-type="regular">
              ${subject.regular_url ? 'Edit' : 'Add'}
            </button>
          </div>
        </div>
      `;
      
      subjectList.appendChild(subjectItem);
    });
    
    // Add event listeners to edit buttons
    const editButtons = subjectList.querySelectorAll('.edit-link-btn');
    editButtons.forEach(button => {
      button.addEventListener('click', function() {
        const subjectId = this.dataset.subject;
        const noteType = this.dataset.type;
        
        // Switch to links tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabButtons[1].classList.add('active');
        
        tabPanes.forEach(pane => pane.classList.remove('active'));
        document.getElementById('links-tab').classList.add('active');
        
        // Pre-fill the form
        linkSubjectSelect.value = subjectId;
        linkTypeSelect.value = noteType;
        
        // Focus on the URL input
        driveLinkInput.focus();
      });
    });
  }
  
  // Populate links table
  function populateLinksTable() {
    const subjects = window.eduHub.getSubjects();
    linksTbody.innerHTML = '';
    
    subjects.forEach(subject => {
      // Add short URL row if exists
      if (subject.short_url) {
        addLinkRow(subject, 'short');
      }
      
      // Add regular URL row if exists
      if (subject.regular_url) {
        addLinkRow(subject, 'regular');
      }
    });
    
    // If no links, show message
    if (linksTbody.children.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="4" style="text-align: center;">No links configured yet.</td>`;
      linksTbody.appendChild(row);
    }
  }
  
  // Add a row to the links table
  function addLinkRow(subject, type) {
    const row = document.createElement('tr');
    const url = type === 'short' ? subject.short_url : subject.regular_url;
    
    row.innerHTML = `
      <td>${subject.title}</td>
      <td>${type === 'short' ? 'Short Notes' : 'Regular Notes'}</td>
      <td>
        <a href="${url}" target="_blank" title="${url}">
          ${truncateUrl(url)}
        </a>
      </td>
      <td>
        <button class="edit-link-btn" data-subject="${subject.id}" data-type="${type}">
          Edit
        </button>
        <button class="delete-link-btn" data-subject="${subject.id}" data-type="${type}">
          Delete
        </button>
      </td>
    `;
    
    linksTbody.appendChild(row);
    
    // Add event listeners to buttons
    const editBtn = row.querySelector('.edit-link-btn');
    const deleteBtn = row.querySelector('.delete-link-btn');
    
    editBtn.addEventListener('click', function() {
      linkSubjectSelect.value = subject.id;
      linkTypeSelect.value = type;
      driveLinkInput.value = url;
      driveLinkInput.focus();
    });
    
    deleteBtn.addEventListener('click', function() {
      if (confirm(`Are you sure you want to delete the ${type} notes link for ${subject.title}?`)) {
        window.eduHub.updateSubjectUrl(subject.id, type, '');
        populateLinksTable();
        populateSubjectList();
      }
    });
  }
  
  // Helper: Get subject title from ID
  function getSubjectTitle(id) {
    const subject = window.eduHub.getSubjects().find(s => s.id === id);
    return subject ? subject.title : '';
  }
  
  // Helper: Truncate URL for display
  function truncateUrl(url) {
    return url.length > 40 ? url.substring(0, 37) + '...' : url;
  }
  
  // Initialize
  init();
});