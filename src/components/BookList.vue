<template>
  <div id="bookList">
    <div class="btn-group" style="margin-bottom: 10px">
      <div style="margin-left: 5px; float: left;margin-bottom: 10px" >
        <label class="radio-inline">
          <input id='all' type="radio" name="optradio" value="전체" v-model="searchOpt" @click="readBooksByStatus">전체
        </label>
        <label class="radio-inline">
          <input type="radio" name="optradio" value="보유" v-model="searchOpt" @click="readBooksByStatus">보유
        </label>
        <label class="radio-inline">
          <input type="radio" name="optradio" value="신청중" v-model="searchOpt" @click="readBooksByStatus">신청중
        </label>
      </div>

      <div class="col-lg-6" style="float: right; padding-right: 0px">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" id="txtSearch" v-model="keyword" @keyup.enter="readBooksByFilter"/>
          <div class="input-group-btn">
            <button class="btn act-button" type="submit" @click="readBooksByFilter">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="book-list-table act-table-responsive">
      <v-client-table :data="tableData" :columns="columns" :options="options">
        <div slot="no" slot-scope="props">
          {{tableData[props.index-1].no = props.index}}
        </div>
        <div slot="title" slot-scope="props" style="text-align:left;">
          <a class="ellipsis" v-bind:href="props.row.link"  target="_blank" v-html="props.row.title"></a>
        </div>
        <div class="ellipsis" slot="author" slot-scope="props">{{props.row.author}}</div>
        <div slot="dateForMobile" slot-scope="props">출판일 : {{props.row.publishedDate}} / {{props.row.status}} </div>
      </v-client-table>
    </div>
  </div>
</template>

<script>

  const NotIncludeCanceledBook = false;
export default {
  name: 'BookList',
  data: function () {
    return {
      searchOpt: '전체',
      keyword: '',
      tableData: [],
      columns: ['no', 'title', 'author', 'publisher','dateForMobile', 'publishedDate', 'status'],
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
      }
    }
  },
  created: function () {
    this.readBooksByFilter();
  },
  methods: {
    readBooksByStatus: function(e){
      this.searchOpt = e.target.value;
      this.readBooksByFilter();
    },
    readBooksByFilter: function(){
      this.fireStore.readAllBooksBy(this.setTableData, this.searchOpt, this.keyword, NotIncludeCanceledBook);
    },
    setTableData: function(value){
      this.tableData = value;
    }
  }
}
</script>

<style>
  .book-list-table thead th:nth-child(5){
    display: none;
  }
  .book-list-table td:nth-child(5){
    display: none;
  }
  @media only screen and (max-width: 800px) {
    .book-list-table td:nth-child(1){
      display: none;
    }
    .book-list-table td:nth-child(4){
      display: none;
    }
    .book-list-table td:nth-child(6){
      display: none;
    }
    .book-list-table td:nth-child(7){
      display: none;
    }
    .book-list-table td:nth-child(5){
      display: block;
    }
  }
</style>
