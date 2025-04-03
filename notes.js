// Load notes from localStorage when page loads
document.addEventListener("DOMContentLoaded", loadNotes);

function saveNote() {
    let noteTitle = document.getElementById("noteTitle").value;
    let noteContent = document.getElementById("noteContent").value;

    if (noteTitle.trim() === "" || noteContent.trim() === "") {
        alert("Title and Note cannot be empty!");
        return;
    }

    // Get existing notes from localStorage
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    // Add new note
    notes.push({ title: noteTitle, text: noteContent });

    // Save updated notes back to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));

    // Clear input fields
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";

    // Reload notes
    loadNotes();
}

function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        let noteElement = document.createElement("div");
        noteElement.classList.add("note");
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <button onclick="deleteNote(${index})">X</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1); // Remove selected note
    localStorage.setItem("notes", JSON.stringify(notes)); // Save changes
    loadNotes();
}
