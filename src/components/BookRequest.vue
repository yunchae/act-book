<template>

  <div id="bookRequest">
    <div class="btn-group" style="margin-bottom: 10px;">
        <div class="col-xs-6 " style="float: right;padding-right: 0px">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" id="txtSearch" v-model="searchInputTitle"/>
            <div class="input-group-btn">
              <button id="searchButton" class="btn btn-primary" type="submit" @click="searchBookList">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
        </div>
</div>



    <v-client-table :data="tableData" :columns="columns" :options="options">
      <div slot="status" slot-scope="props">
        <Button v-if="props.row.status==''"  > 신청</Button>
        <p v-else-if="props.row.status !=''" > {{props.row.status}}</p>
      </div>
    </v-client-table>
  </div>
</template>

<script>

  import axios from 'axios'

export default {
  name: 'BookRequest',
  data: function(){
      return {
        searchInputTitle:'',
        columns: ['no', 'title', 'author','publisher','publishing_date','status'],
        tableData: [],
        options: {
          headings: {
            no: 'No.',
            title: "제목",
            author: "저자",
            publisher: "출판사",
            publishing_date: "출판년도",
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

       this.convertToFinalResult(data.data);
      })
    },
    convertToFinalResult: function(param){
      let data = param.items;
      let finalData = []

      data.forEach((value, index) => {

        let book = {}
        book.no = index + 1
        book.title = value.title
        book.author = value.author
        book.publisher = value.publisher
        book.publishing_date = value.pubdate
        book.isbn = value.isbn
        book.status = ''

        finalData.push(book);
      })

      this.tableData = finalData;
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
