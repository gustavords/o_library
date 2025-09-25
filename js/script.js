const myLibrary = [];

function Book ( title, author, read )
{
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID();
    this.read = read;
    this.hasReadBook = () => { return this.read === false ? read = `no` : read = `yes`; };
    this.description = () => { return `Book title: ${ this.title }, Author: ${ this.author }, Read:${ this.hasReadBook() }` };
};

function addBookToLibrary ( title, author, read )
{
    const book = new Book( title, author, read );
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
        const read_ckb_lbl = document.createElement( `label` );
        const read_ckb = document.createElement( `input` );
        const delete_btn = document.createElement( `button` );

        read_ckb_lbl.textContent = `read: ${ book.read }`
        read_ckb.name = `read`
        read_ckb.type = `checkbox`;
        read_ckb.checked = book.read;
        read_ckb.classList.add( `read` );
        // read_ckb.dataset.id = `${ book.id }`;

        delete_btn.classList.add( `delete` );
        delete_btn.value = `delete`;
        delete_btn.textContent = `delete`;
        // delete_btn.dataset.id = `${ book.id }`;

        bookCard.classList.add( `book_card` );
        bookCard.dataset.id = `${ book.id }`;

        display.appendChild( bookCard );
        bookCard.appendChild( bookInfo );
        bookCard.appendChild( read_ckb_lbl );
        read_ckb_lbl.appendChild( read_ckb )
        bookCard.appendChild( delete_btn );
        bookInfo.textContent = `${ book.description() }`
    } );

    deleteBookButton();
    readBookCheckbox();
}

function deleteBookButton ()
{
    const book_cards = document.querySelectorAll( `.book_card` );

    book_cards.forEach( ( button ) =>
    {
        button.addEventListener( `click`, ( e ) =>
        {
            if ( e.target.value === `delete` )
            {
                removeBookFromLibrary( button.dataset.id );
            }
        } );
    } );


}

function readBookCheckbox ()
{
    const book_cards = document.querySelectorAll( `.book_card` );

    book_cards.forEach( ( button ) =>
    {
        button.addEventListener( `click`, ( e ) =>
        {
            if ( e.target.name === `read` )
            {
                changeReadCheckbox( button.dataset.id, e.target.checked )
            }
        } );
    } );
}

function changeReadCheckbox ( id, boolean )
{
    let index = 0;
    myLibrary.forEach( ( book ) =>
    {
        if ( id === book.id )
        {
            book.read = boolean;
            book.hasReadBook();
            console.log( `changed ` );
        }
        index++
    } );

    displayLibrary();
}

function removeBookFromLibrary ( id )
{
    let index = 0;
    myLibrary.forEach( ( book ) =>
    {
        if ( id === book.id )
        {
            myLibrary.splice( index, 1 );
            console.log( `deleted` );
        }
        index++
    } );

    displayLibrary();
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
        addBookToLibrary( b_title.value, b_author.value, true );
        displayLibrary();
        clearForm();
    } )

    modal_close_btn.addEventListener( `click`, () =>
    {
        clearForm();
    } );
}

addBookToLibrary( `Foundation`, `Isaac Asimov`, false );
addBookToLibrary( `Lord of the Rings`, `J.R.R. Tolkien`, false );
addBookToLibrary( `Harry Potter`, `J.K. Rowling`, true );

displayLibrary();
modalForm();
