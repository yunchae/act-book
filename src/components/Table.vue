<template>
  <div id="people">
    <!--<v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>-->
  </div>
</template>

<script>

  import resource from '../assets/resources'
  import $ from 'jquery';
  import FirebaseDao from '../utils/FirebaseDao'

  const fb = new FirebaseDao();

export default {
  name: 'Table',
  data : function() {
    return {
      books : []
    }
  },
  created : function() {

    let data = resource.BOOKS;

    // $.map(data.books, (bookInfo) => {
    //
    //     var book = this.createBook(bookInfo.isbn, bookInfo.title,bookInfo.author, bookInfo.publishedDate, bookInfo.publisher, bookInfo.status, bookInfo.link, bookInfo.image, '');
    //     fb.insertBook(book);
    //   });

    // console.log('data', data)
    // console.log('arr', arr)

    // arr.forEach( (bookInfo) =>{
    //   var book = this.createBook(bookInfo.isbn, bookInfo.title,bookInfo.author, bookInfo.publishedDate, bookInfo.publisher, bookInfo.status, bookInfo.link, bookInfo.image, '');
    //   fb.insertBook(book);
    // })


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*h1, h2 {*/
  /*font-weight: normal;*/
/*}*/
/*ul {*/
  /*list-style-type: none;*/
  /*padding: 0;*/
/*}*/
/*li {*/
  /*display: inline-block;*/
  /*margin: 0 10px;*/
/*}*/
/*a {*/
  /*color: #42b983;*/
/*}*/
</style>
