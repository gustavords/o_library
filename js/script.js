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
        const bookCard = document.createElement( `div` );
        const bookInfo = document.createElement( `p` );
        const delete_btn = document.createElement( `button` );

        delete_btn.classList.add( `delete` );
        delete_btn.value = `delete`;
        delete_btn.textContent = `delete`;

        display.appendChild( bookCard );
        bookCard.appendChild( bookInfo );
        bookCard.appendChild( delete_btn );
        bookInfo.textContent = `${ book.description() }`
    } );

    deleteBtn();
}

function deleteBtn ()
{
    const delete_btns = document.querySelectorAll( `.delete` );
    delete_btns.forEach( ( button ) =>
    {
        button.addEventListener( `click`, ( e ) =>
        {
            e.target.value === `delete` ? console.log( `it is delete button` ) : console.log( `nope` );
        } );
    } );
}

function modalForm ()
{
    const addBook_btn = document.querySelector( `#add_book` );
    const dialog = document.querySelector( `#dialog` );
    const confirm_btn = document.querySelector( `#confirm_btn` )
    const b_title = document.querySelector( `#b_title` );
    const b_author = document.querySelector( `#b_author` );
    const modal_close_btn = document.querySelector( `#modal_novalidate_close` );
    const clearForm = () =>
    {
        b_title.value = ``;
        b_author.value = ``;
    }

    addBook_btn.addEventListener( `click`, () =>
    {
        dialog.showModal();
    } );

    confirm_btn.addEventListener( `click`, ( e ) =>
    {
        e.preventDefault(); // We don't want to submit this fake form
        dialog.close();
    } );

    dialog.addEventListener( `close`, ( e ) =>
    {
        if ( b_title.value === `` || b_author.value === `` ) { return };
        addBookToLibrary( b_title.value, b_author.value );
        displayLibrary();
        clearForm();
    } )

    modal_close_btn.addEventListener( `click`, () =>
    {
        clearForm();
    } );
}



addBookToLibrary( `Foundation`, `Isaac Asimov` );
addBookToLibrary( `Lord of the Rings`, `J.R.R. Tolkien` );
addBookToLibrary( `Harry Potter`, `J.K. Rowling` );

displayLibrary();
modalForm();
