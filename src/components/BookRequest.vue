<template>

  <div id="bookRequest">
    <div class="btn-group" style="margin-bottom: 10px;">
        <div class="col-xs-6 " style="float: right;padding-right: 0px">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" id="txtSearch" v-model="searchInputTitle" @keyup.enter="searchBookList"/>
            <div class="input-group-btn">
              <button id="searchButton" class="btn btn-primary" type="submit" @click="searchBookList">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
        </div>
</div>



    <v-client-table :data="tableData" :columns="columns" :options="options">
      <div slot="title" slot-scope="props" style="text-align:left;">
        <popper :options="{placement: 'right'}">
        <div class="popper">
          <img style="width:100px; height:100px;" v-bind:src="props.row.image">
        </div>
        <a slot="reference" v-bind:href="props.row.link"  target="_blank" v-html="props.row.title">
        </a>
      </popper>
      </div>

      <div slot="status" slot-scope="props">
        <Button  v-if="props.row.status==''" @click="requestBook(props.row)" > 신청</Button>
        <p  v-else-if="props.row.status !=''" > {{props.row.status}}</p>
      </div>

    </v-client-table>
  </div>
</template>

<script>

  import axios from 'axios'
  import FirebaseDao from '../utils/FirebaseDao'
  import Book from "../utils/Book";
  import VuePopper from 'vue-popperjs'
  import 'vue-popperjs/dist/css/vue-popper.css';

  const fb = new FirebaseDao();
export default {
  name: 'BookRequest',
  components: {
    'popper': VuePopper
  },
  data: function(){
      return {
        searchInputTitle:'',
        columns: ['no', 'title', 'author','publisher','publishedDate','status'],
        tableData: [],
        options: {
          headings: {
            no: 'No.',
            title: "제목",
            author: "저자",
            publisher: "출판사",
            publishedDate: "출판년도",
            status: "상태"
          },
          filterable: false, // 필터 사용 여부 또는 필터 적용할 컬럼 설정
          perPage: 10, // 한페이지에 보여줄 리스트 개수 (초기값)
          perPageValues: [10, 20, 30, 40, 50], // 한페이지에 보여줄 리스트 개수를 설정하는 값 리스트
  //        columnsDisplay: "desktop"
          // see the options API
          //https://www.npmjs.com/package/vue-tables-2
        }
      }
  },
  methods: {
    searchBookList: function(){
      this.api.searchBook(encodeURI(this.searchInputTitle)).then((data)=>{
        //var res = $.parseJSON('[' + data.data + ']');

//        console.log('data.data',data.data)

        fb.readAllBooks((registedBooks) => {
//          console.log('data.data', registedBooks)
          //this.convertToFinalResult(res[0].items, registedBooks);
          this.convertToFinalResult(data.data, registedBooks);
        })
      })
    },
    convertToFinalResult: function(param, registedBooks){
      //let data = param;
      let data = param.items;
      let finalData = []

      data.forEach((value, index) => {

        let book = {}
        book.no = index + 1
        book.title = value.title
        book.author = value.author
        book.publisher = value.publisher
        book.publishedDate = value.pubdate
        book.isbn = value.isbn
        book.status = ''
        book.link = value.link
        book.image = value.image

        this.checkBookStatus(registedBooks, book);

        finalData.push(book);
      })

      this.tableData = finalData;
    },
    checkBookStatus: function (registedBooks, book) {
      for (let i = 0; i < registedBooks.length; i++) {
        if (book.isbn === registedBooks[i].isbn) {
          book.status = registedBooks[i].status;
          break;
        }
      }
    },
    requestBook: function (bookInfo) {

      let bookTitle = this.removeBTag(bookInfo);

      this.$swal({
        title: "<i>신청완료!</i>",
        html: bookTitle,
        confirmButtonText: "<u>확인</u>",
      });

      var book = new Book(bookInfo.isbn, bookTitle, bookInfo.author, this.changeDateFormat(bookInfo.publishedDate), bookInfo.publisher,"신청중", bookInfo.link, bookInfo.image);
      fb.insertBook(book);

      this.tableData[bookInfo.no - 1].status = '신청중'
    },
    removeBTag: function (bookInfo) {
      let bookTitle = bookInfo.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")
      return bookTitle;
    },
    changeDateFormat: function(date){
      return date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8)
    }
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
