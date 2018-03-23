import firebase from 'firebase'
import config from '../assets/config'

firebase.initializeApp(config.FIREBASE_CONFIG);

// Get a reference to the database service

export default class FirebaseDao {

  constructor() {
    this.database = firebase.database();
  }

  readBooks(callback) {
    this.database.ref('books/').once('value').then(function(snapshot){
      var retArr = [];

      //Firebase database에서 조회 시 결과가 object로 넘어와서 배열로 변경 함
      snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        retArr.push(item);
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
