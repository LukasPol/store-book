export class Book {
  cover: string;
  title: string;
  author: string;
  year: string;
  price: number;
  publisher: string;
  quantity: number;
  countCart: number;

  constructor(json) {
    this.cover = json.cover;
    this.title = json.title;
    this.author = json.author;
    this.year = json.year;
    this.price = json.price;
    this.publisher = json.publisher;
    this.quantity = json.quantity;
    this.countCart = 1;
  }
}

