<template>

  <div id="bookRequest">
    <div class="btn-group" style="margin-bottom: 10px;">
        <div class="col-xs-6 " style="float: right;padding-right: 0px">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" id="txtSearch"/>
            <div class="input-group-btn">
              <button class="btn btn-primary" type="submit">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
        </div>
</div>



    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
export default {
  name: 'BookRequest',
  data: function(){
      return {
        columns: ['no', 'title', 'author','publisher','publishing_date','status'],
        tableData: '',
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
  created: function() {
    this.tableData = [
      { no: 1, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 2, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 3, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 4, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 5, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 6, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 7, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 8, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 9, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 10, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 11, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 12, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" },
      { no: 13, title: "new 자바의 정석", author: "20", publisher:"시나공", publishing_date:"2018", status:"신청중" }
    ]

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
