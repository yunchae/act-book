<template>

  <div id="bookList">

    <div class="btn-group" style="margin-bottom: 10px">
<div style="margin-left: 5px; float: left" >
      <label class="radio-inline">
        <input type="radio" name="optradio">전체
      </label>
      <label class="radio-inline">
        <input type="radio" name="optradio">보유
      </label>
      <label class="radio-inline">
        <input type="radio" name="optradio">신청중
      </label>
</div>
      <!--<div class="row">-->
        <div class="col-lg-6" style="float: right; padding-right: 0px">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search" id="txtSearch"/>
            <div class="input-group-btn">
              <button class="btn btn-primary" type="submit">
                <span class="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
        </div>
      <!--</div>-->
</div>



    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
  import FirebaseDao from '../utils/FirebaseDao'
export default {
  name: 'BookList',
  data: function () {
    return {
      tableData: [],
      columns: ['no', 'title', 'author', 'publisher', 'publishing_date', 'status'],
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
        //          columnsDisplay: "desktop"
        // see the options API
        //https://www.npmjs.com/package/vue-tables-2
      }
    }
  },
  created: function () {
    const fb = new FirebaseDao();
    fb.readBooks((value) => {
//      console.log(typeof value + ', ' + value);
      this.tableData = value;

    })
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
