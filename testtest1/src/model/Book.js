function Book (slots) {
    this.isbn = slots.isbn;
    this.title = slots.title;
    this.year = slots.year;
};
Book.instances = {};

Book.convertRow2Obj = function (bookRow) {
    var book = new Book(bookRow);
    return book;

};
Book.loadAll = function (){
    var key ="", keys = [], booksString="", books = {}, i = 0;
    try{
        if (localStorage.getItem("books")){
            booksString = localStorage.getItem("books");
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);

    }
    if (booksString) {
        books = JSON.parse( booksString);
        keys = Object.keys( books);
        console.log(keys.length + "books loaded.");
        for (i=0; i < keys.length; i++){
            key = keys[i];
            Book.instances[key] = Book.convertRow2Obj(books[key]);
        }
    }
};
Book.saveAll = function(){
    var booksString = "", error=false,
        nmrOfBooks = Object.keys (Book.instances).lenght;
    try {
        booksString = JSON.stringify(Book.instances);
        localStorage.setItem("books" , booksString);

    } catch (e) {
        alert ("Error when writing to Local Storage\n" + e);
        error=true;

    }
    if (!error) console.log(nmrOfBooks + "books saved.");

};
Book.add = function (slots){
    var book = new Book(slots);
    Book.instances[slots.isbn]= book;
    console.log("Book" + slots.isbn + "created:!");

};
Book.update = function (slots) {
    var book = Book.instances[slots.isbn];
    var year = parseInt(slots.year);
    if (book.title !== slots.title) { book.title = slots.title;};
    if (book.year !== slots.year) { book.year = year;}
    console.log("Book" + slots.isbn + "modified!");

};
Book.destroy = function (isbn){
    if (Book.instances[isbn]){
        console.log("Book" + isbn + "deleted");
        delete Book.instances[isbn];

    }else{
        console.log("There is no book with ISBN" + isbn + " in the database!");
    }
};
Book.createTestData = function (){
    Book.instances["23"] = new Book ({isbn:"23", title:"Erich Fromm - Anatomija ljudske destruktivnosti I-II", year:1984});
    Book.instances["37"] = new Book ({isbn:"37", title:" Albert Hochheimer - Zlatna groznica", year:1961});
    Book.instances["9"] = new Book({isbn:"9", title:"Alfred Adler - Individualna psihologija", year:1928});
    Book.instances["24"] = new Book ({isbn:"24", title: "Agata Christie - Iskričavi cijanid", year:1944});
    Book.instances["48"] = new Book ({isbn:"48", title: "Rebeka West - Crno jagnje sivi soko", year:1941});
    Book.instances["67"] = new Book ({isbn:"67", title: "Sigmund Freud - Tumačenje snova I-II", year: 1899});
    Book.saveAll();

};
Book.clearData = function(){
    if (confirm("Da li želite da uklonite sve podatke o knjigama?")){
        Book.instances = {};
        localStorage.setItem("books", "{}");

    }
};
