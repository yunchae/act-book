<template>

  <div id="bookList">

    <div class="btn-group" style="margin-bottom: 10px">
      <div class="col-lg-6" style="float: right; padding-right: 0px">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" id="txtSearch" v-model="keyword" @keyup.enter="readBooksByFilter"/>
          <div class="input-group-btn">
            <button class="btn btn-primary" type="submit" @click="readBooksByFilter">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </div>
        </div>
      </div>
      <!--</div>-->
    </div>

    <v-client-table :data="tableData" :columns="columns" :options="options">
      <div slot="title" slot-scope="props" style="text-align:left;">
          <a v-bind:href="props.row.link"  target="_blank" v-html="props.row.title">
          </a>
      </div>

      <div slot="createdDate" slot-scope="props">{{ props.row.createdDate.substring(0,10)}}</div>

      <div slot="status" slot-scope="props">
        <select  v-model="props.row.status" @change="statusChanged(props.row.isbn, $event)">
          <option>신청중</option>
          <option>보유</option>
          <option>취소</option>
        </select>
      </div>
    </v-client-table>
  </div>
</template>

<script>
  import FirebaseDao from '../utils/FirebaseDao'
  const fb = new FirebaseDao();
  export default {
    name: 'BookRequestList',
    data: function () {
      return {
        keyword: '',
        tableData: [],
        columns: ['no', 'title', 'author', 'publisher', 'publishedDate', 'createdDate','status'],
        options: {
          headings: {
            no: 'No.',
            title: "제목",
            author: "저자",
            publisher: "출판사",
            publishedDate: "출판일",
            createdDate: "신청일",
            status: "상태"
          },
          sortable: ['title', 'publishedDate', 'status'],
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
      statusChanged: function(isbn, e){
        fb.updateBook(isbn, e.target.value);

      },
      readBooksByFilter: function(){
        console.log('keyword: ',this.keyword);
        fb.readAllRequestedBooks(this.keyword, this.setTableData);
      },
      setTableData: function(value){
        this.tableData = value;
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
