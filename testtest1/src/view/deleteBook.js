pl.view.deleteBook = {
    setupUserInterface: function (){
        var deleteButton = document.forms['Book'].commit;
        var selectE1 = document.forms['Book'].selectBook;
        var key = "", keys = [], book = null, optionE1 = null, i =0;
        Book.loadAll();
        keys = Object.keys(Book.instances);
        for ( i =0; i<keys.length; i++){
            key = keys[i];
            book = Book.instances[key];
            optionE1 = document.createElement("option");
            optionE1.text = book.title;
            optionE1.value = book.isbn;
            selectE1.add (optionE1, null);
        }
        deleteButton.addEventListener("click",
            pl.view.deleteBook.handleDeleteButtonClickEvent);
        window.addEventListener("beforeunload", function (){
            Book.saveAll();
        });


    },
    handleDeleteButtonClickEvent: function (){
        var selectE1 = document.forms['Book'].selectBook;
        var isbn = selectE1.value;
        if (isbn) {
            Book.destroy(isbn);
            selectE1.remove(selectE1.selectedIndex);
        }
    }
};