const myLibrary = [];

function Book ( title, author )
{
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID();
    this.description = () => { return `Book title: ${ this.title }, Author: ${ this.author }, ID:${ this.id }` };
};

function addBookToLibrary ( title, author )
{
    const book = new Book( title, author );
    myLibrary.push( book );
}

addBookToLibrary( `Foundation`, `Isaac Asimov` );
addBookToLibrary( `Lord of the Rings`, `J.R.R. Tolkien` );
addBookToLibrary( `Harry Potter`, `J.K. Rowling` );

function displayLibrary ()
{
    const display = document.querySelector( `.library_display` );

    myLibrary.forEach( ( book ) =>
    {
        display.textContent += `${book.description()}`
    } );
}

displayLibrary();