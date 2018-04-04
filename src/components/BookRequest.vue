<template>

  <div id="bookRequest">
    <div class="btn-group" style="margin-bottom: 10px;">
        <div class="col-lg-6 " style="float: right;padding-right: 0px">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" id="txtSearch" v-model="searchInputTitle" @keyup.enter="searchBookList"/>
            <div class="input-group-btn">
              <button id="searchButton" class="btn act-button" type="submit" @click="searchBookList">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
        </div>
    </div>


    <div class="book-request-table act-table-responsive">
      <v-client-table :data="tableData" :columns="columns" :options="options">
        <div slot="no" slot-scope="props">
          {{props.index}}
        </div>
        <div slot="title" slot-scope="props" style="text-align:left;">
          <popper :options="{placement: 'right'}">
          <div class="popper">
            <img style="width:100px; height:100px;" v-bind:src="props.row.image">
          </div>
          <a class="ellipsis" slot="reference" v-bind:href="props.row.link"  target="_blank" v-html="props.row.title">
          </a>
        </popper>
        </div>
        <div class="ellipsis" slot="author" slot-scope="props" v-html="props.row.author"></div>

        <div slot="status" slot-scope="props">
          <Button class="btn btn-primary" v-if="props.row.status=='' || props.row.status=='취소'" @click="requestBook(props.row, props.index)" > 신청</Button>
          <span  v-else-if="props.row.status !=''" > {{props.row.status}}</span>
        </div>

          <div slot="dateForMobile" slot-scope="props">
            출판일 : {{props.row.publishedDate}}&nbsp;&nbsp;<Button class="btn btn-primary" v-if="props.row.status=='' || props.row.status=='취소'" @click="requestBook(props.row, props.index)" > 신청</Button>
            <span  v-else-if="props.row.status !=''" >/ {{props.row.status}}</span>

          </div>
        </v-client-table>
        <div class="table-no-result" v-if="tableData.length === 0">No matching records</div>
    </div>

  </div>
</template>

<script>

  // import axios from 'axios'
  // import FirebaseDao from '../utils/FirebaseDao'
  import Book from "../utils/Book";
  import VuePopper from 'vue-popperjs'
  import 'vue-popperjs/dist/css/vue-popper.css';

  // const fb = new FirebaseDao();
export default {
  name: 'BookRequest',
  components: {
    'popper': VuePopper
  },
  data: function(){
      return {
        searchInputTitle:'',
        columns: ['no', 'title', 'author','publisher', 'dateForMobile', 'publishedDate','status'],
        tableData: [],
        options: {
          headings: {
            no: 'No.',
            title: "제목",
            author: "저자",
            publisher: "출판사",
            publishedDate: "출판일",
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
        this.fireStore.readAllBooksForCheckIFWeHave((registedBooks) => {
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
        book.publishedDate = this.changeDateFormat(value.pubdate)
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
    requestBook: function (bookInfo, no) {

      let bookTitle = this.removeBTag(bookInfo.title) ;

      this.$swal({
        // add a custom html tags by defining a html method.
        html: '<div>제목 : ' + bookTitle+ '</div>',
        input: 'text',
        inputPlaceholder: 'Enter your name here',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then((result) => {

        if(result.value === ""){
          this.$swal(
            '이름이 입력되지 않았습니다.'
          )
        }else if(result.value !== undefined){

          const applier = result.value;
          this.$swal({
            title: '책 신청 완료',
            html: bookTitle,
          }).then(() => {
            // console.log('applier : ', applier);
            var book = new Book(bookInfo.isbn, bookTitle, this.removeBTag(bookInfo.author), this.changeDateFormat(bookInfo.publishedDate), bookInfo.publisher,"신청중", bookInfo.link, bookInfo.image, applier);
            this.fireStore.insertBook(book);
            this.tableData[no-1].status = '신청중'
          })
        }
      });
    },
    removeBTag: function (beforeBtag) {
      return beforeBtag.replace(/<b>/gi, "").replace(/<\/b>/gi, "")
    },
    changeDateFormat: function(date){
      return date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .book-request-table thead th:nth-child(5){
    display: none;
  }
  .book-request-table td:nth-child(5){
    display: none;
  }
  .table-no-result {
    display: none;
  }
  @media only screen and (max-width: 800px) {
    .book-request-table td:nth-child(1){
      display: none;
    }
    .book-request-table td:nth-child(4){
      display: none;
    }
    .book-request-table td:nth-child(6){
      display: none;
    }
    .book-request-table td:nth-child(7){
      display: none;
    }
    .book-request-table td:nth-child(5){
      display: block;
    }
    .table-no-result {
      display: block;
      font-size: 15px;
      font-weight: bold;
    }
  }
</style>
