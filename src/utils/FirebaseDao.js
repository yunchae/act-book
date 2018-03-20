import firebase from 'firebase'
import config from '../assets/config'

firebase.initializeApp(config.FIREBASE_CONFIG);

// Get a reference to the database service
var database;

export default class FirebaseDao {
  constructor() {
    database = firebase.database();
  }

  readBooks(callback) {
    database.ref('books/').once('value').then(function(snapshot){
      callback(snapshot.val());
    })
  }

  insertBook(book) {
    database.ref('books/' + book.isbn).set({
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
    database.ref('books/' + book.isbn).update({
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
