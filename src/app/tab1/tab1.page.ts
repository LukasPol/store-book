import { Component, OnInit } from '@angular/core';
import { Book } from './../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
    console.log(this.books);
  }

  getBooks() {
    this.books = this.bookService.getBooks();
  }

  addToCart(book: Book) {
    this.bookService.addToCart(book);
  }
}
