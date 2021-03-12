import { Injectable, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  @Output()
  books: EventEmitter<Book[]> = new EventEmitter<Book[]>();

  covers = [
    'https://images-na.ssl-images-amazon.com/images/I/51owFbA6enL.jpg',
    'https://m.media-amazon.com/images/I/514uOsEywAL.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/514GbfM-F4L._SX347_BO1,204,203,200_.jpg'
  ];
  constructor() { }

  getBooks(id: string = ''){
    const books = [];
    for (let b = 0 ; b < 3; b ++) {
      let json = {
        cover: this.covers[b],
        title: `titulo ${b}`,
        author: `autor ${b}`,
        year: `${b}${b}${b}${b}`,
        price: 20.00,
        quantity: 50 + b,
        publisher: `editora ${b}`
      }
      let book = new Book(json);
      books.push(book);
    }
    return books;
  }

  addToCart(book: Book) {
    const booksStorage = this.getBooksFromStorage();

    const bookIndex = booksStorage.findIndex( b => b.title === book.title);

    if (bookIndex >= 0) {
      const bookFind = booksStorage.splice(bookIndex, 1)[0];

      bookFind.countCart += 1;

      booksStorage.splice(bookIndex, 1, bookFind);
    }else {
      booksStorage.push(book);
    }

    localStorage.setItem('booksCart', JSON.stringify(booksStorage));
  }

  removeToCart(book: Book) {
    const booksStorage = this.getBooksFromStorage();

    const bookIndex = booksStorage.findIndex( b => b.title === book.title);

    if (bookIndex >= 0) {
      const bookFind = booksStorage.splice(bookIndex, 1)[0];

      bookFind.countCart -= 1;

      if (bookFind.countCart > 0) {
        booksStorage.splice(bookIndex, 1, bookFind);
      }
    }

    localStorage.setItem('booksCart', JSON.stringify(booksStorage));
  }

  getBooksFromStorage(): Book[] {
    let booksStorage = JSON.parse(localStorage.getItem('booksCart'));

    if (booksStorage === undefined || booksStorage === null) {
      booksStorage =  [];
    }

    return booksStorage;
  }

  changeBook() {
    this.books.emit(this.getBooksFromStorage());
  }
}
