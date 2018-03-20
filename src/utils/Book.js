// export default  class Book{
//   constructor(isbn, title, author, publishedDate,publisher, status){
//     this.isbn = isbn;
//     this.title=title;
//     this.author=author;
//     this.publishedDate = publishedDate;
//     this.publisher = publisher;
//     this.status=status;
//     this.createdDate=new Date().toISOString();
//     this.updatedDate=new Date().toISOString();
//   }
// }

class Book{
  constructor(isbn, title, author, publishedDate,publisher, status){
    this.isbn = isbn;
    this.title=title;
    this.author=author;
    this.publishedDate = publishedDate;
    this.publisher = publisher;
    this.status=status;
    this.createdDate=new Date().toISOString();
    this.updatedDate=new Date().toISOString();
  }
}


export default (isbn, title, author, publishingDate, publisher, status) =>
                new Book(isbn, title, author, publishingDate, publisher, status);
