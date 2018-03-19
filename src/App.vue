<template>
  <div id="app">

    <nav class="navbar navbar-default" style="margin-bottom: 50px">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand">Act-Book</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li v-bind:class="{active:isList}" @click="selectNav">
              <router-link to="/booklist">목록조회 </router-link>
            </li>
            <li v-bind:class="{active:isRequest}" @click="selectNav">
              <router-link to="/bookrequest">도서신청</router-link>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
    <router-view/>
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

        if(e.target.pathname === '/booklist'){
          this.isList = true;
          this.isRequest = false;
        }else if(e.target.pathname === '/bookrequest'){
          this.isRequest = true;
          this.isList = false;
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
