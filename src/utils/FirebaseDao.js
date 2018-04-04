import firebase from 'firebase'
import config from '../assets/config'

firebase.initializeApp(config.FIREBASE_CONFIG);

export default class FirebaseDao {

  constructor() {
    this.database = firebase.database();
  }

  queryStatusOrderedBooksBy(filterType) {
    let query = this.database.ref('books/').orderByChild('status');

    if(filterType != '전체'){
      query = query.equalTo(filterType);
    }
    return query.once('value');
  }

  readAllBooksBy(callback, filterType = '전체', searchKeyword = '', isCanceledIncluded = true) {
    this.queryStatusOrderedBooksBy(filterType).then((snapshot)=>{
      let returnBooks = [];

      snapshot.forEach((childSnapshot) => {
        let book = childSnapshot.val();

        if(this.isKeywordValidated(searchKeyword, book)){
          if(isCanceledIncluded){
            returnBooks.push(book);
          }else if(this.isNotCanceledBook(book)){
            returnBooks.push(book);
          }
        }
      });

      callback(this.sortBooksByCreatedDateDesc(returnBooks));
    }).catch(err => {
        console.log('Error getting documents', err);
    });
  }

  sortBooksByCreatedDateDesc(books) {
    return books.sort(function (a, b) {
      if (a.createdDate < b.createdDate) {
        return 1;
      } else if (a.createdDate > b.createdDate) {
        return -1;
      }
      return 0;
    });
  }

  isNotCanceledBook(book) {
    return book.status != '취소';
  }

  isKeywordValidated(searchKeyword, book) {
    if(searchKeyword.length == 0){
      return true;
    }
    if (searchKeyword.length > 0 && book.title.toUpperCase().indexOf(searchKeyword.toUpperCase()) > -1){
      return true;
    }
    return false;
  }

  insertBook(book) {
    this.database.ref('books/' + book.isbn).set({
      isbn: book.isbn,
      title : book.title,
      author : book.author,
      publishedDate : book.publishedDate,
      publisher : book.publisher,
      createdDate : book.createdDate,
      updatedDate : book.updatedDate,
      status : book.status,
      link : book.link,
      image : book.image,
      applier : book.applier
    })
  }

  updateBook(isbn, status){
    this.database.ref('books/' +isbn).update({
      updatedDate : new Date().toISOString(),
      status : status
    })
  }

}
