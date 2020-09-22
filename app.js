console.log('Notes app');

let addBtn = document.getElementById('addBtn');
// add event to click create notes
addBtn.addEventListener('click', () => {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();

});

// read localstorage and show in document

const showNotes = () => {
    let html = "";

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.forEach((value, index) => {
        html += `<div class="noteCard card my-3 ml-2 " style="width: 16rem;">
            <div class="card-body px-2 ">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p class="card-text">${value}</p>
                <button onclick="deleteNote(this.id)" class="btn btn-primary" id="${index}">Delete Note</button>
            </div>
        </div>`
    });

    let addNotes = document.getElementById('notes');

    if (notesObj.length != 0) {
        addNotes.innerHTML = html;
    } else {
        addNotes.innerHTML = 'Nothing a note';
    }

}
showNotes();

// delete notes function
const deleteNote = index => {
    console.log('del', index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj))

    showNotes();
}

// searching text

let search = document.getElementById('searchTxt');

search.addEventListener('input', () => {
    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(element => {
        let textVal = element.getElementsByTagName('p')[0].innerText;
        if (textVal.includes(inputVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })

})