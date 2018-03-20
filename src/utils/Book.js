export default  class Book{
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
//
//
// let createBook = function(isbn, title, author, publishingDate, publisher, status) {
//
//   return new Book(isbn, title, author, publishingDate, publisher, status)
// }
//
//
// export default createBook;
//

// let book = {
//   isbn : "",
//   title : "",
//   author : "",
//   publishing_date : "",
//   publisher : "",
//   createDate : new Date(),
//   updateDate : new Date(),
//   status : ""
// }

// export default book;
