import firebase from 'firebase'
import config from '../assets/config'

firebase.initializeApp(config.FIREBASE_CONFIG);

// Get a reference to the database service

export default class FirebaseDao {

  constructor() {
    this.database = firebase.database();
  }

  readAllBooks(callback){
    this.database.ref('books/').once('value').then(function(snapshot){
      var returnArr = [];

      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();

        returnArr.push(item);
      });

      return callback(returnArr);
    })
  }

  readAllRequestedBooks(searchKeyword, callback){
    var standardDate = new Date('2018-03-27')
    let idx=1;

    this.database.ref('books/').orderByChild('createdDate').startAt(standardDate.toISOString()).once('value').then(function(snapshot){
      var returnArr = [];

      snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();

        if (searchKeyword.length == 0
          || (searchKeyword.length > 0 && item.title.toUpperCase().indexOf(searchKeyword.toUpperCase()) > -1)){
          item.no = idx++;
          returnArr.push(item);
        }
      });
      console.log(returnArr)
      return callback(returnArr);
    })
  }

  readBooks(filterType, searchKeyword, callback) {
    let query = this.database.ref('books/').orderByChild('status');

    if(filterType !='전체'){
      query = query.equalTo(filterType);
    }

    query.once('value').then(function(snapshot){
      var retArr = [];
      var idx = 1;
      //Firebase database에서 조회 시 결과가 object로 넘어와서 배열로 변경 함
      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();

        if(item.status !='취소') {
          if (searchKeyword.length == 0
            || (searchKeyword.length > 0 && item.title.toUpperCase().indexOf(searchKeyword.toUpperCase()) > -1)) {
            item.no = idx++;
            retArr.push(item);
          }
        }
      })
      console.log(retArr);
      callback(retArr);
    })
  }
  isSearchedWithoutKeyword(searchKeyword) {
    return searchKeyword.length == 0;
  }

  isSearchedWithKeywordAndMatched(searchKeyword, item) {
    return searchKeyword.length > 0 && item.title.toUpperCase().indexOf(searchKeyword.toUpperCase()) > -1;
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
      status : book.status
    })
  }

  updateBook(isbn, status){
    this.database.ref('books/' +isbn).update({
      updatedDate : new Date().toISOString(),
      status : status
    })
  }
}
