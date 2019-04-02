<template>
  <div class="home">
    <div class="home-title">
      <el-carousel :interval="4000" class="carouselBlock">
        <el-carousel-item v-for="item in carouselData" :key="item.id" class="carouselContainer">
          <img :src="item.url" class="carouselImg"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <section class="newGoods section">
        <SectionHeader title="人气推荐" tips="最火最潮商品，为您挑选" moreText="更多推荐>"/>
        <Slick
          :ulWidth="(266*11)+(10*(12-1))"
          :showWidth="(266*6)+(10*2)"
          :height="360"
        >
          <ul class="goodsList" :style="{width:`${(266*12)+(10*(11))}px`}" slot="list">
            <GoodsItem
              v-for="(item,index) in goodsList.slice(10,22)"
              :style="{marginRight: (index+1)%6===0?'50px':'50px'}"
              :key="+item.id"
              :id="item.id"
              :img="item.img"
              :name="item.name"
              :price="item.price"
            />
          </ul>
        </Slick>
      </section>
      <section class="typeSection section" v-for="(item,index) in typeList.slice(1)" :key="item.id">
        <SectionHeader :title="item.name" tips="" moreText="查看更多>" @click.native="selectType(item.id)"/>
        <ul class="content">
          <GoodsItem
            v-for="(item,index) in filterGoodsByType(item.id).slice(0,5)"
            :style="{marginRight: (index+1)%4===0?'80px':'80px'}"
            :key="+item.id"
            :id="item.id"
            :img="item.img"
            :name="item.name"
            :price="item.price"
          />
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import SectionHeader from '../components/SectionHeader';
  import GoodsItem from '../components/GoodsItem';
  import Slick from '../components/Slick';
  import ZoomImg from '../components/ZoomImg';
  import {getGoods} from '../api/mall';

  export default {
    name: "MallIndex",
    components: {
      SectionHeader,
      GoodsItem,
      Slick,
      ZoomImg
    },
    mounted() {

      const res = getGoods();
      res
        .then((data) => {
          this.goodsList = data;
        })
        .catch((e) => {
          alert(e);
        });

    },
    methods: {
      filterGoodsByType(typeid) {
        return this.goodsList.filter((item) => {
          return item.typeId === typeid;
        });
      },
      navTo(route) {
        this.$router.push(route);
      },
      selectType(typeId) {
        if (typeId == -1) {
          return;
        }
        this.$emit('child-msg', typeId);
        this.navTo('/mall/goodsList/' + typeId + '/all');
      },
    },
    data() {
      return {
        typeList: [
          {name: '首页', id: 0},
          {name: '时尚服装', id: 1},
          {name: '数码产品', id: 2},
          {name: '食品饮料', id: 3},
          {name: '家用电器', id: 4}
        ],
        carouselData: [
          {url: require('../assets/img/banner1.jpg'), title: '图1', id: 1},
          {url: require('../assets/img/banner2.jpg'), title: '图2', id: 2},
          {url: require('../assets/img/banner3.jpg'), title: '图3', id: 3},
        ],
        goodsList: [
          {id: 1, typeId: '1', img: require('../assets/img/goods/goods1.png'), name: 'goods1', price: 1.1},
          {id: 2, typeId: '1', img: require('../assets/img/goods/goods2.jpg'), name: 'goods2', price: 2.2},
          {id: 3, typeId: '1', img: require('../assets/img/goods/goods3.jpg'), name: 'goods3', price: 3.3},
          {id: 4, typeId: '2', img: require('../assets/img/goods/goods4.jpg'), name: 'goods4', price: 4.4},
          {id: 5, typeId: '2', img: require('../assets/img/goods/goods5.jpg'), name: 'goods5', price: 5.5},
          {id: 6, typeId: '3', img: require('../assets/img/goods/goods6.jpg'), name: 'goods6', price: 6.6},
          {id: 7, typeId: '4', img: require('../assets/img/goods/goods6.jpg'), name: 'goods6', price: 6.6},
        ]
      }
    }
  }
</script>
<style>
  @import "../assets/css/var.less";

  .home {
    width: 100%;
    height: 100%;
  }

  .el-carousel__container {
    height: 100%;
  }

  .carouselBlock {
    width: 90%;
    height: 600px;
    position: relative;
    margin: 0 auto;
  }

  .carouselImg {
    height: 100%;
    width: 100%;
  }

  .home-title {
    width: 100%;
    height: 600px;
  }

  .container {
    width: 90%;
    margin: 0 auto;
  }

  .section {
    padding: 10px;
    margin: 0 auto;
  }

</style>
