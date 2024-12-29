// Do your work here...
console.log('Hello, world!');

document.addEventListener("DOMContentLoaded", function () {
    const bookForm = document.getElementById("bookForm");
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");
  
    const books = [];
  
    const renderBooks = () => {
      incompleteBookList.innerHTML = "";
      completeBookList.innerHTML = "";
  
      books.forEach((book) => {
        const bookElement = document.createElement("div");
        bookElement.setAttribute("data-bookid", book.id);
        bookElement.setAttribute("data-testid", "bookItem");
        bookElement.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">
              ${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}
            </button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button data-testid="bookItemEditButton">Edit Buku</button>
          </div>
        `;
  
        const isCompleteButton = bookElement.querySelector(
          '[data-testid="bookItemIsCompleteButton"]'
        );
        const deleteButton = bookElement.querySelector(
          '[data-testid="bookItemDeleteButton"]'
        );
  
        isCompleteButton.addEventListener("click", () => {
          book.isComplete = !book.isComplete;
          renderBooks();
        });
  
        deleteButton.addEventListener("click", () => {
          const index = books.findIndex((b) => b.id === book.id);
          books.splice(index, 1);
          renderBooks();
        });
  
        if (book.isComplete) {
          completeBookList.appendChild(bookElement);
        } else {
          incompleteBookList.appendChild(bookElement);
        }
      });
    };
  
    bookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("bookFormTitle").value;
      const author = document.getElementById("bookFormAuthor").value;
      const year = document.getElementById("bookFormYear").value;
      const isComplete = document.getElementById("bookFormIsComplete").checked;
  
      const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
      };
  
      books.push(newBook);
      renderBooks();
  
      bookForm.reset();
    });
  });
  