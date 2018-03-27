<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br/>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import FirebaseDao from  '@/utils/FirebaseDao';
import { readBooks2 } from '@/utils/FirebaseDao';
import Book from "../utils/Book";
export default {
  name: 'HelloWorld',
  created() {
    const firebase = new FirebaseDao();
    alert('here')
    var book = new Book("ISBN11112314", "title-new Book","ken","2017-09-12", "시공사","신청중");
    firebase.insertBook(book);

    book = new Book("8994492038 9788994492032","Java</b>의 정석 (최신 <b>Java</b> 8.0 포함)","남궁성","도우출판","20160127","보유");
    firebase.insertBook(book);
    book = new Book("8968483558 9788968483554","모던 웹을 위한 JavaScript + jQuery 입문 (ECMAScript 5/6, jQuery 3.X 대응)","윤인성","한빛미디어","20170501","보유");
    firebase.insertBook(book);
    book = new Book("1185578218 9791185578217","어서와 <b>Java</b>는 처음이지! (JDK8로 배우는 자바 프로그래밍)","천인국","인피니티북스","20151125","보유");
    firebase.insertBook(book);

    firebase.readBooks((value ) => {
      console.log(value);
    });
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
