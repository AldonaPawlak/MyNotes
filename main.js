const TITLE_CLASS = `title`;
const CONTENT_CLASS = `content`;
const REMOVE_CLASS = `remove`;
const NOTE_CLASS = `note`;

const DEFAULT_TITLE_VALUE = `Title`;
const DEFAULT_DESCRIPTION_VALUE = `Description`;

const CROSS_SIGN = `&times`;

const LOCAL_STORAGE_KEY = `my-notes`;

recoverNotesFromLocalStorage();
bindAddNoteButton();

// Adds notes given from local storage if it exists
function recoverNotesFromLocalStorage()
{
    let jsonArray = localStorage.getItem(LOCAL_STORAGE_KEY);
    let notes = JSON.parse(jsonArray);
    if (notes){
        notes.forEach(element => {
            if (typeof createNote === "function") {
                createNote(element.title, element.content);
            }
        });
    }
}

// Binds button to create new div with initial inputs
function bindAddNoteButton()
{
    let addNoteButton = document.querySelector(`nav`);
    addNoteButton.addEventListener(`click`, function(){
        if (typeof createNote === "function") {
            createNote(DEFAULT_TITLE_VALUE, DEFAULT_DESCRIPTION_VALUE);
        }
    });
}

// Creates an empty note
function createNote(title, description)
{
    let notesDiv = document.querySelector(`#notes`);
    let singleNoteDiv = document.createElement(`div`);

    setupSingleNoteDiv(singleNoteDiv, title, description);
    notesDiv.appendChild(singleNoteDiv);
    updateLocalStorage();
}

// Creates div with class note, with inputs inside
function setupSingleNoteDiv(div, title, description)
{
    div.setAttribute(`class`, NOTE_CLASS);

    let inputTitle = createInputTag(TITLE_CLASS, title);
    let inputContent = createInputTag(CONTENT_CLASS, description);
    let removeButton = createRemoveButton(div);

    [inputTitle, inputContent, removeButton].forEach(element => {
        div.appendChild(element);
    });
}

// Creates title input with class and value
function createInputTag(className, value)
{
    let inputTag = document.createElement(`input`);
    inputTag.setAttribute(`class`, className);
    inputTag.setAttribute(`value`, value);
    inputTag.addEventListener(`keyup`, updateLocalStorage);
    return inputTag;
}

// Creates removing button in note
function createRemoveButton(div)
{
    let notesDiv = document.querySelector(`#notes`);

    let divTag = document.createElement(`div`);
    divTag.setAttribute(`class`, REMOVE_CLASS);

    divTag.addEventListener(`click`, function() {
        notesDiv.removeChild(div);
        updateLocalStorage();
    })

    divTag.innerHTML = CROSS_SIGN;
    return divTag;
}

// Converts all notes to JSON and adds it to local storage
function updateLocalStorage()
{
    let notes = [];
    let notesActual = document.querySelectorAll(`.note`);

    notesActual.forEach(element => {
        let note = {
            title: element.querySelector(`.title`).value,
            content: element.querySelector(`.content`).value
        }
        notes.push(note);
    });

    let jsonArray = JSON.stringify(notes);
    localStorage.setItem(LOCAL_STORAGE_KEY, jsonArray);
}