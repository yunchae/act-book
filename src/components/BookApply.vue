<template>
  <div>
    <p>avc</p>
  <!--<Button slot="status" @click="buttonBookApplyClick" slot-scope="props">신청</Button>-->
  </div>
</template>
<script>
  export default {
    name: 'BookApply',
    props: {},

    methods: {
      buttonBookApplyClick: function(){
        console.log(this.props)
//        this.api.searchBook(encodeURI(this.searchInputTitle)).then((data)=>{

//          this.convertToFinalResult(data.data);
        }
    },
    created: function(){
      console.log('aaa');
    }
  }
</script>

