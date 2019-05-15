<template>
  <div class="GoodsList">
    <div class="sortBox">
      <span class="title">排序：</span>
      <span :class="['normal',{selected:sortMode===0}]" @click="changeSortMode(0)">默认</span>
      <span :class="['normal',{selected:sortMode!==0}]" @click="changeSortMode(3)">
        价格
        <i :class="['iconfont','icon-arrows-4-7',{'selected':sortMode===1}]"></i><i
        :class="['iconfont','icon-arrows-4-7',{'selected':sortMode===2}]"></i>
      </span>
    </div>
    <ul class="result">
      <GoodsItem
        v-for="(item,index) in sortedList"
        :style="{marginRight: (index+1)%4===0?'0px':'120px'}"
        :key="+item.id"
        :id="item.id"
        :img="item.img"
        :name="item.name"
        :price="item.price"
      />
      <p class="noGoods" v-if="goodsList.length<=0">抱歉，没有找到相关商品~</p>
    </ul>

  </div>
</template>

<script>
  import GoodsItem from '../components/GoodsItem';
  import {getGoodsListByType,getGoodsListByName} from '../api/mall';

  export default {
    name: "GoodsList",
    components: {
      GoodsItem
    },
    data () {
      return {
        goodsId:0,
        goodsList:[],
        sortMode:0,//0默认，1价格升序，2价格降序
      }
    },
    computed:{
      isSearchPage(){
        return Number(this.typeId) === 0;
      },
      typeId(){
        return this.$route.params.typeId || 0;
      },
      keyword(){
        return this.$route.params.keyword || '';
      },
      sortedList() {
        let temList = this.goodsList.slice();
        if (this.sortMode === 0) {
          return temList;
        } else if (this.sortMode === 1) {
          return temList.sort((a, b) => {
            return a.price - b.price;
          })
        } else if (this.sortMode === 2) {
          return temList.sort((a, b) => {
            return b.price - a.price;
          })
        }
      }
    },

    methods: {
      changeSortMode(mode) {
        if (mode === 3) {
          this.sortMode = this.sortMode === 1 ? 2 : 1;
        } else {
          this.sortMode = 0;
        }
      },
      getGoodsList(id){
        const res = getGoodsListByType(id);
        res
          .then((data)=>{
            this.goodsList = data;
          })
          .catch((e)=>{
            this.$message.error('数据获取失败');
          })
      }
    },
    mounted(){
      if(!this.isSearchPage) {
        this.getGoodsList(this.typeId);
      }else{
        const res = getGoodsListByName(this.keyword);
        res
          .then((data)=>{
            this.goodsList = data;
          })
          .catch((e)=>{
            this.$message.error('数据获取失败');
          })
      }
    },
    watch:{
      $route(to,from){
        this.sortMode = 0;
        if(!this.isSearchPage){
          this.getGoodsList(this.typeId);
          // this.goodsId=this.typeId;
        }else{
          const res = getGoodsListByName(this.keyword);
          res
            .then((data)=>{
              this.goodsList = data;
            })
            .catch((e)=>{
              this.$message.error('数据获取失败');
            })
        }
      }
    }
  }
</script>

<style>
  @import "../assets/css/var.less";

  .GoodsList {
    width: 80%;
    margin: 0 auto;
  }
  .sortBox {
    width: 90%;
    border-top: 1px dotted #e6e8eb;
    border-bottom: 1px dotted #e6e8eb;
    margin: 30px auto;
    padding-bottom: 30px;
    padding-top: 30px;
  }
  .title {
    color: #7d7d7d;
    display: inline-block;
    margin-right: 10px;
  }

  .normal {
    cursor: pointer;
    color: #7d7d7d;
    display: inline-block;
    margin-right: 10px;
  }

  .iconfont {
    color: #7d7d7d;
    display: inline-block;
    position: relative;
    left: -3px;
  }

  .selected {
    color: #b4a078;
  }
  .noGoods {
    margin: 38px auto;
    text-align: center;
    color: #b4a078;
    font-size: 18px;
  }
  span {
    font-size: 13px;
  }
  .result{
    width: 90%;
    margin-left: 80px;
  }
</style>
