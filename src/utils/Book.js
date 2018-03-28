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
  constructor(isbn, title, author, publishedDate,publisher, status, link, image){
    this.isbn = isbn;
    this.title=title;
    this.author=author;
    this.publishedDate = publishedDate;
    this.publisher = publisher;
    this.status=status;
    this.createdDate=new Date().toISOString();
    this.updatedDate=new Date().toISOString();
    this.link=link;
    this.image=image
  }
}


export default (isbn, title, author, publishingDate, publisher, status, link, image) =>
                new Book(isbn, title, author, publishingDate, publisher, status, link, image);
