// import firebase from 'firebase'
import config from '../assets/config'
//
// firebase.initializeApp(config.FIREBASE_CONFIG);


const firebase = require("firebase");
require("firebase/firestore");
firebase.initializeApp(config.FIREBASE_CONFIG);


// Get a reference to the database
// service

export default class FirebaseDao {

  constructor() {
    this.firestore = firebase.firestore();
  }

  readBooks(filterType, searchKeyword, callback) {
    let booksQuery = this.firestore.collection('books')

    if (filterType != '전체') {
      booksQuery = booksQuery.where('status', '==', filterType).orderBy('title', 'asc')
    } else {
      booksQuery = booksQuery.orderBy('status', 'asc').orderBy('title', 'asc');
    }

    booksQuery.get().then(snapshot => {
      var retArr = [];
      var idx = 1;
      //Firebase database에서 조회 시 결과가 object로 넘어와서 배열로 변경 함
      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.data();

        if (item.status != '취소') {
          if (this.isSearchedWithoutKeyword(searchKeyword)
            || this.isSearchedWithKeywordAndMatched(searchKeyword, item)) {
            item.no = idx++;
            retArr.push(item);
          }
        }
      })
      // console.log(retArr);
      callback(retArr);
    })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  }

  readAllBooksForCheckIFWeHave(callback) {
    let booksQuery = this.firestore.collection('books')

    booksQuery.get().then(snapshot => {
      var returnArr = [];

      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.data();

        returnArr.push(item);
      });

      return callback(returnArr);
    })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  insertBook(book) {
    this.firestore.collection('books').doc(book.isbn).set({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      publishedDate: book.publishedDate,
      publisher: book.publisher,
      createdDate: book.createdDate,
      updatedDate: book.updatedDate,
      status: book.status,
      link: book.link,
      image: book.image,
      applier : book.applier
    })
  }

  readAllRequestedBooks(searchKeyword, callback) {
    let booksQuery = this.firestore.collection('books').orderBy('createdDate', 'desc').orderBy('title', 'asc')

    booksQuery.get().then(snapshot => {
      var returnArr = [];

      snapshot.forEach((childSnapshot) => {

        var item = childSnapshot.data();
        if (this.isSearchedWithoutKeyword(searchKeyword)
          || this.isSearchedWithKeywordAndMatched(searchKeyword, item)) {
          item.no = returnArr.length + 1;
          returnArr.push(item);
        }
      });
      // console.log(returnArr)
      return callback(returnArr);
    })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  isSearchedWithoutKeyword(searchKeyword) {
    return searchKeyword.length == 0;
  }

  isSearchedWithKeywordAndMatched(searchKeyword, item) {
    return searchKeyword.length > 0 && item.title.toUpperCase().indexOf(searchKeyword.toUpperCase()) > -1;
  }

  updateBook(isbn, status){
    let booksQuery = this.firestore.collection('books').doc(isbn)
    let updatedDate = new Date().toISOString()
    booksQuery.update({status : status,updatedDate: updatedDate })
  }

}
