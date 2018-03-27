import firebase from 'firebase'
import config from '../assets/config'

firebase.initializeApp(config.FIREBASE_CONFIG);

// Get a reference to the database service

export default class FirebaseDao {

  constructor() {
    this.database = firebase.database();
  }

  readBooks(filterType, searchKeyword, callback) {
    let query = this.database.ref('books/').orderByChild('status');

    if(filterType !='전체'){
      query = query.equalTo(filterType);
    }

    function isSearchedWithoutKeyword() {
      return searchKeyword.length == 0;
    }

    function isSearchedWithKeywordAndMatched(searchKeyword, item) {
      return searchKeyword.length > 0 && item.title.indexOf(searchKeyword) > -1;
    }

    query.once('value').then(function(snapshot){
      var retArr = [];
      var idx = 1;
      //Firebase database에서 조회 시 결과가 object로 넘어와서 배열로 변경 함
      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();

        if (isSearchedWithKeywordAndMatched(searchKeyword, item)
          || isSearchedWithoutKeyword()){
          item.no = idx++;
          retArr.push(item);
        }
      })
      console.log(retArr);
      callback(retArr);
    })
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

  updateBook(book){
    this.database.ref('books/' + book.isbn).update({
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
}
