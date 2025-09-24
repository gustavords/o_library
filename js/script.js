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

function displayLibrary ()
{
    const display = document.querySelector( `.library_display` );

    //clean display
    while ( display.firstChild )
    {
        display.removeChild( display.lastChild );
    }

    myLibrary.forEach( ( book ) =>
    {
        const bookCard = document.createElement( `p` );
        display.appendChild( bookCard );
        bookCard.textContent = `${ book.description() }`
    } );
}

function modalForm ()
{
    const addBook_btn = document.querySelector( `#add_book` );
    const dialog = document.querySelector( `#dialog` );
    const confirmBtn = document.querySelector( `#confirmBtn` )
    const b_title = document.querySelector( `#b_title` );
    const b_author = document.querySelector( `#b_author` );

    addBook_btn.addEventListener( `click`, () =>
    {
        dialog.showModal();
    } );
    
    confirmBtn.addEventListener( `click`, ( e ) =>
    {
        e.preventDefault(); // We don't want to submit this fake form
        dialog.close();
    } );

    dialog.addEventListener( "close", () =>
    {
        if ( b_title.value == `` || b_author.value == `` ) { return };
        addBookToLibrary( b_title.value, b_author.value );
        displayLibrary();
    } )
}

addBookToLibrary( `Foundation`, `Isaac Asimov` );
addBookToLibrary( `Lord of the Rings`, `J.R.R. Tolkien` );
addBookToLibrary( `Harry Potter`, `J.K. Rowling` );

modalForm();