import firebase from 'firebase'
import config from '../assets/config'
import $ from 'jquery'

// const firebase = require("firebase");
// require("firebase/firestore");
firebase.initializeApp(config.FIREBASE_CONFIG);


// Get a reference to the database
// service

export default class FirebaseDao {

  constructor() {
    this.database = firebase.database();
  }

  readBooks(filterType, searchKeyword, callback) {
    let query = this.database.ref('books/').orderByChild('status');

    if(filterType !='전체'){
      query = query.equalTo(filterType);
    }

    query.once('value').then((snapshot) =>{
      var arr = [];
      //Firebase database에서 조회 시 결과가 object로 넘어와서 배열로 변경 함
      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();

        if(item.status !='취소') {
          if (this.isSearchedWithoutKeyword(searchKeyword)
            || this.isSearchedWithKeywordAndMatched(searchKeyword, item)) {
            item.no = arr.length + 1;
            arr.push(item);
          }
        }
      })
      // console.log(retArr);
      callback(arr);
    }).catch(err => {
        console.log('Error getting documents', err);
    });
  }

  readAllBooksForCheckIFWeHave(callback) {
    this.database.ref('books/').once('value').then((snapshot) =>{
      var returnArr = [];

      snapshot.forEach((childSnapshot) =>{
        var item = childSnapshot.val();

        returnArr.push(item);
      });

      return callback(returnArr);
    }).catch(err => {
        console.log('Error getting documents', err);
      });
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

  readAllRequestedBooks(filterType, searchKeyword, callback) {
    this.database.ref('books/').orderByChild('createdDate').once('value').then((snapshot)=>{
      let arr = [];
      let count = snapshot.numChildren();

      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();

        if (this.isSearchedWithoutKeyword(searchKeyword)
          || this.isSearchedWithKeywordAndMatched(searchKeyword, item)){
          item.no = count--;
          arr.unshift(item);
        }
      });
      // console.log(returnArr)
      return callback(arr);
    }).catch(err => {
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
    this.database.ref('books/' +isbn).update({
      updatedDate : new Date().toISOString(),
      status : status
    })
  }

}
