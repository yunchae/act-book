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
      callback(snapshot.val());
    })
  }

  insertBook(book) {
    this.database.ref('books/' + book.isbn).set({
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

export function readBooks2(){
  firebase.database().ref('books/').once('value').then(function(snapshot){
    return snapshot.val();
  })

}
