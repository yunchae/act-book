<template>
  <div id="people">
    <!--<v-client-table :data="tableData" :columns="columns" :options="options"></v-client-table>-->
    <v-client-table :data="tableData" :columns="columns">
      <a slot="edit" slot-scope="props" class="fa fa-edit" :href="edit(props.row.id)"></a>
    </v-client-table>
  </div>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {
      columns: ['id', 'name', 'age'],
      tableData: [
        { id: 1, name: "John", age: "20" },
        { id: 2, name: "Jane", age: "24" },
        { id: 3, name: "Susan", age: "16" },
        { id: 4, name: "Chris", age: "55" },
        { id: 5, name: "Dan", age: "40" }
      ],
      options: {
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
