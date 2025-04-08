document.addEventListener('DOMContentLoaded', () => {
    const newNoteBtn = document.getElementById('newNoteBtn');
    const notesContainer = document.querySelector('.notes-container');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Apply saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', darkModeToggle.checked);
    });

    // Load notes from localStorage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    
    // Render existing notes
    notes.forEach(note => {
        createNoteElement(note);
    });
    
    // Add new note
    newNoteBtn.addEventListener('click', () => {
        const newNote = {
            id: Date.now(),
            content: ''
        };
        notes.push(newNote);
        saveNotes();
        createNoteElement(newNote);
    });
    
    function createNoteElement(note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.dataset.id = note.id;
        
        const textarea = document.createElement('textarea');
        textarea.value = note.content;
        textarea.placeholder = 'Write your note here...';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '×';
        
        noteElement.appendChild(textarea);
        noteElement.appendChild(deleteBtn);
        notesContainer.appendChild(noteElement);
        
        // Save note content when changed
        textarea.addEventListener('input', () => {
            note.content = textarea.value;
            saveNotes();
        });
        
        // Delete note
        deleteBtn.addEventListener('click', () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            noteElement.remove();
        });
    }
    
    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}); 