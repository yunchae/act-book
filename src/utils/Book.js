class Book{
  constructor(isbn, title, author, publishedDate,publisher, status, link, image, applier){
    this.isbn = isbn;
    this.title=title;
    this.author=author;
    this.publishedDate = publishedDate;
    this.publisher = publisher;
    this.status=status;
    this.createdDate=new Date().toISOString();
    this.updatedDate=new Date().toISOString();
    this.link=link;
    this.image=image;
    this.applier = applier
  }
}


export default (isbn, title, author, publishingDate, publisher, status, link, image, applier) =>
                new Book(isbn, title, author, publishingDate, publisher, status, link, image, applier);
