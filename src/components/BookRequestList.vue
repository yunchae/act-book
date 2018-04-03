<template>

  <div id="bookList">

    <div class="btn-group" style="margin-bottom: 10px">
      <div style="margin-left: 5px; float: left; margin-bottom: 10px" >
        <label class="radio-inline">
          <input id='all' type="radio" name="optradio" value="전체" v-model="searchOpt" @click="getBooksByStatus">전체
        </label>
        <label class="radio-inline">
          <input type="radio" name="optradio" value="보유" v-model="searchOpt" @click="getBooksByStatus">보유
        </label>
        <label class="radio-inline">
          <input type="radio" name="optradio" value="신청중" v-model="searchOpt" @click="getBooksByStatus">신청중
        </label>
        <label class="radio-inline">
          <input type="radio" name="optradio" value="취소" v-model="searchOpt" @click="getBooksByStatus">취소
        </label>
      </div>
      <div class="col-lg-6" style="float: right; padding-right: 0px">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" id="txtSearch" v-model="keyword" @keyup.enter="readBooksByFilter"/>
          <div class="input-group-btn">
            <button id="btnGetList" class="btn act-button" type="submit" @click="readBooksByFilter">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </div>
        </div>
      </div>
      <!--</div>-->
    </div>
    <div class="act-table-responsive book-request-list-table">
      <v-client-table :data="tableData" :columns="columns" :options="options" >
        <div slot="title" slot-scope="props" style="text-align:left;">
            <a class="ellipsis" v-bind:href="props.row.link"  target="_blank" v-html="props.row.title">
            </a>
        </div>
        <div class="ellipsis" slot="author" slot-scope="props">{{props.row.author}}</div>
        <div slot="createdDate" slot-scope="props">{{ props.row.createdDate.substring(0,10)}}</div>
        <div slot="dateForMobile" slot-scope="props">출판일 : {{props.row.publishedDate}} / 신청일 : {{props.row.createdDate.substring(0,10)}}</div>

        <div slot="status" slot-scope="props">
          <select  v-model="props.row.status" @change="statusChanged(props.row.no, props.row.isbn, $event)">
            <option>신청중</option>
            <option>보유</option>
            <option>취소</option>
          </select>
        </div>

        <div slot="applierAndStatus" slot-scope="props">
          <select  v-model="props.row.status" @change="statusChanged(props.row.no, props.row.isbn, $event)">
            <option>신청중</option>
            <option>보유</option>
            <option>취소</option>
          </select>
          <span v-if="props.row.applier != ''">&nbsp;(신청자 : {{props.row.applier}})</span>
        </div>
      </v-client-table>
    </div>
  </div>
</template>

<script>
  // import FirebaseDao from '../utils/FirebaseDao'
  // const fb = new FirebaseDao();
  export default {
    name: 'BookRequestList',
    data: function () {
      return {
        searchOpt: '전체',
        keyword: '',
        tableData: [],
        columns: ['no', 'title', 'author', 'publisher', 'dateForMobile', 'publishedDate', 'createdDate', 'applier','status', 'applierAndStatus'],
        options: {
          headings: {
            no: 'No.',
            title: "제목",
            author: "저자",
            publisher: "출판사",
            publishedDate: "출판일",
            createdDate: "신청일",
            applier : '신청자',
            status: "상태"
          },
//          sortable: ['title', 'publishedDate', 'status'],
          filterable: false, // 필터 사용 여부 또는 필터 적용할 컬럼 설정
          perPage: 10, // 한페이지에 보여줄 리스트 개수 (초기값)
          perPageValues: [10, 20, 30, 40, 50], // 한페이지에 보여줄 리스트 개수를 설정하는 값 리스트
        }
      }
    },
    created: function () {
      this.readBooksByFilter();
    },
    methods: {
      statusChanged: function(rowNo, isbn, e){
        let selectedStatus = e.target.value;
        this.fireStore.updateBook(isbn, selectedStatus);
        this.tableData[rowNo-1].status = selectedStatus;
      },
      readBooksByFilter: function(){
//        console.log('keyword: ',this.keyword);
        this.fireStore.readAllRequestedBooks(this.searchOpt, this.keyword, this.setTableData);
      },
      getBooksByStatus: function(e){
        this.searchOpt = e.target.value;
        this.readBooksByFilter();
      },
      setTableData: function(value){
        this.tableData = value;
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .book-request-list-table thead th:nth-child(5){
    display: none;
  }
  .book-request-list-table td:nth-child(5){
    display: none;
  }
  .book-request-list-table thead th:nth-child(10){
    display: none;
  }
  .book-request-list-table td:nth-child(10){
    display: none;
  }
  @media only screen and (max-width: 800px) {
    .book-request-list-table td:nth-child(1){
      display: none;
    }
    .book-request-list-table td:nth-child(4){
      display: none;
    }
    .book-request-list-table td:nth-child(7){
      display: none;
    }
    .book-request-list-table td:nth-child(8){
      display: none;
    }
    .book-request-list-table td:nth-child(6){
      display: none;
    }
    .book-request-list-table td:nth-child(5){
      display: block;
    }
    .book-request-list-table td:nth-child(9){
      display: none;
    }
    .book-request-list-table td:nth-child(10){
      display: block;
    }
  }
</style>
