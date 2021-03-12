import { BookService } from './../services/book.service';
import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  implements OnInit{

  private books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.books.subscribe(books => {
      this.books = books;
    });
  }

  ionViewDidEnter() {
    this.getBooksCart();
    console.log(this.books);
  }

  getBooksCart() {
    this.books = this.bookService.getBooksFromStorage();
    console.log(this.books);
  }

  addCountBook(book: Book) {
    this.bookService.addToCart(book);
    this.bookService.changeBook();

  }

  removeBook(book: Book){
    this.bookService.removeToCart(book);
    this.bookService.changeBook();
  }
}
