pl.view.createBook = {
    setupUserInterface: function (){
        var saveButton = document.forms['Book'].commit;
        Book.loadAll();
        saveButton.addEventListener("click",
            pl.view.createBook.handleSaveButtonClickEvent);
        window.addEventListener("beforeunload", function (){
            Book.saveAll();
        });

    },
    handleSaveButtonClickEvent:function (){
        var formE1 = document.forms['Book'];
        var slots = { isbn: formE1.isbn.value,
            title: formE1.title.value,
            year: formE1.year.value};
        Book.add(slots);
        formE1.reset();
    }
};
