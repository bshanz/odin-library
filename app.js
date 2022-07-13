// cache the DOM

const submitBook = document.getElementById("submitBook");
const logIn = document.getElementsByClassName("log-in");
const title = document.getElementById("book-title-dom");
const author = document.getElementById("author-dom");
const pages = document.getElementById("pages-dom");
const read = document.getElementById("read-button");
const readDom = document.getElementById("read-dom");
const grid = document.getElementById("grid");
const remove = document.getElementById("remove-button");
const form = document.querySelector("form");

// create library array

const myLibrary = [];

// create book class

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      return `${title}, ${author}, ${pages}, ${read}`;
    };
  }
}

// create book constructor (now using a class instead above)

/*function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title}, ${author}, ${pages}, ${read}`;
  };
}*/

// enable user to click submitBook

form.addEventListener("submit", (e) => {
  // let page load first
  e.preventDefault();

  // create new book
  const book1 = new Book(
    title.value,
    author.value,
    pages.value,
    readDom.checked
  );

  // Javascript form validation to make sure all fields are filled
  if (title.value === "" || author.value === "" || pages.value === "") {
    alert(
      "Please fill out the title, author, and pages fields. Pages must be a number."
    );
    return false;
  } else {
    // add ID to new book
    book1.id = `${book1.title}${book1.author}${book1.pages}`;

    // add new book to myLibrary

    myLibrary.push(book1);
    // close the form modal

    modal.style.display = "none";
    // reset the form
    document.querySelector("form").reset();

    // create elements

    const bookCard = document.createElement("div");
    const upperCard = document.createElement("div");
    const bookTitle = document.createElement("div");
    const bookAuthor = document.createElement("div");
    const bookPages = document.createElement("div");
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    // append to DOM

    grid.appendChild(bookCard);
    bookCard.classList.add("book-card");

    bookCard.appendChild(upperCard);
    upperCard.classList.add("upper-card");

    upperCard.appendChild(bookTitle);
    upperCard.appendChild(bookAuthor);
    upperCard.appendChild(bookAuthor);
    upperCard.appendChild(bookPages);

    bookCard.appendChild(readButton);
    bookCard.appendChild(deleteButton);

    // add values
    bookTitle.innerText = book1.title;
    bookAuthor.innerText = book1.author;
    bookPages.innerText = `${book1.pages} pages`;
    readButton.value = `${book1.title}${book1.author}${book1.pages}`;
    deleteButton.innerHTML = "Remove";
    deleteButton.value = `${book1.title}${book1.author}${book1.pages}`;

    // add classes and IDs
    if (book1.read === true) {
      readButton.classList.add("read-button");
      readButton.innerHTML = "Read";
    } else {
      readButton.classList.add("not-read-button");
      readButton.innerHTML = "Not read";
    }
    bookTitle.classList.add("book-title");
    bookAuthor.classList.add("author");
    bookPages.classList.add("pages");
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("id", "remove-button");

    // add event listener to dynamic book card to remove it

    deleteButton.addEventListener("click", removeButton);

    // add event listener to dynamic book card to change red status
    readButton.addEventListener("click", changeRead);
  }
});

// enable user to delete dynamic books
function removeButton(e) {
  const target = e.target;
  target.parentNode.remove();
}

function changeRead(e) {
  //const target = e.target;
  for (let i = 0; i < myLibrary.length; i++) {
    if (
      e.target.value === myLibrary[i].id &&
      e.target.classList.contains("read-button")
    ) {
      e.target.classList.remove("read-button");
      e.target.classList.add("not-read-button");
      e.target.innerHTML = "Not Read";
      myLibrary[i].read = false;
    } else if (
      e.target.value === myLibrary[i].id &&
      e.target.classList.contains("not-read-button")
    ) {
      e.target.classList.add("read-button");
      e.target.classList.remove("not-read-button");
      e.target.innerHTML = "Read";
      myLibrary[i].read = true;
    } else {
    }
  }
}

// enable user to change read on default card

read.addEventListener("click", (e) => {
  const target = e.target;
  if (e.target.classList.contains("read-button")) {
    e.target.classList.remove("read-button");
    e.target.classList.add("not-read-button");
    e.target.innerHTML = "Not Read";
  } else {
    e.target.classList.add("read-button");
    e.target.classList.remove("not-read-button");
    e.target.innerHTML = "Read";
  }
});

// enabled user to delete default card books

remove.addEventListener("click", (e) => {
  const target = e.target;
  target.parentNode.remove();
});

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//validate form with JS

function validateForm() {
  if (title.value === "") {
    alert("Title must be filled out");
    return false;
  }
}
