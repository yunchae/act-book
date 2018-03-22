<template>
  <div id="app">
      <nav class="navbar navbar-default col-lg-11"
           style="float:none;margin: 0px auto 50px auto;width:90.2%">
        <div class="container-fluid">
          <!-- Brand and toggsle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="ssr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand">Act-Book</a>
          </div>

          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li id="btnBookList" v-bind:class="{active:isList}" @click="selectNav">
                <router-link to="/booklist">목록조회 </router-link>
              </li>
              <li id="btnBookRequest" v-bind:class="{active:isRequest}" @click="selectNav">
                <router-link to="/bookrequest">도서신청</router-link>
              </li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>

    <div class="container col-lg-11" style="float: none" >
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isList : true,
      isRequest: false
    }
  },
  methods: {
    selectNav: function(e) {

//        console.log('e.target.pathname', e.target);

        if(e.target.pathname === '/booklist'){
          this.isList = true;
          this.isRequest = false;
        }else if(e.target.pathname === '/bookrequest'){
//          console.log('bookrequest', e.target.pathname)
          this.isRequest = true;
          this.isList = false;
//          console.log('this.isRequest',this.isRequest)
//          console.log('this.isList', this.isList)
        }
    }

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
