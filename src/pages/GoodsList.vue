<template>
  <div>GoodsList {{goodsId}}</div>
</template>

<script>
  export default {
    name: "GoodsList",
    data () {
      return {
        goodsId:0,
        goodsList:[],
        sortMode:0,//0默认，1价格升序，2价格降序
      }
    },
    computed:{

    },
    methods: {

    },
    watch:{
      $route(to,from){
        this.sortMode = 0;
        if(!this.isSearchPage){
          // this.getGoodsList(this.typeId);
          this.goodsId=to.params.keyword;
        }else{
          this.goodsId=to.params.keyword;
          // this.searchGoods(to.params.keyword);
        }
      }
    }
  }
</script>

<style scoped>

</style>
