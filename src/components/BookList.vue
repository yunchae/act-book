<template>

  <div id="bookList">
    <!--<div class="col-sm-12">-->

      <!--<div class="btn-group" style="margin-left:10px;width:100%" data-toggle="buttons">-->
        <!--<label class="btn active">-->
          <!--<input type="radio" name="options" id="option1" autocomplete="off" checked> 전체-->
        <!--</label>-->

        <!--<label class="btn">-->
          <!--<input type="radio" name="options" id="option2" autocomplete="off" > 보유-->
        <!--</label>-->

        <!--<label class="btn">-->
          <!--<input type="radio" name="options" id="option3" autocomplete="off" > 신청중-->
        <!--</label>-->

        <!--<div class="col-lg-6">-->
          <!--<div class="input-group">-->
            <!--<input type="text" class="form-control" placeholder="책 제목만 검색 가능합니다">-->
            <!--<span class="input-group-btn">-->
        <!--<button class="btn btn-secondary" type="button">Go!</button>-->
      <!--</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->

    <v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data () {
    return {
      columns: ['No', '제목', '저자','출판사','출판년도','상태'],
      tableData: [
        { No: 1, 제목: "자바의 정석", 저자: "20", 출판사:"시나공", 출판년도:"2018", 상태:"신청중" },
        { No: 2, 제목: "자바의 정석", 저자: "20", 출판사:"시나공", 출판년도:"2018", 상태:"신청중" },
        { No: 3, 제목: "자바의 정석", 저자: "20", 출판사:"시나공", 출판년도:"2018", 상태:"신청중" }
      ],
      options: {
          filterable: false
        // see the options API
        //https://www.npmjs.com/package/vue-tables-2
      }
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
