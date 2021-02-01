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
          :showWidth="(266*4)+(10*2)"
          :height="360"
        >
          <ul class="goodsList" :style="{width:`${(266*12)+(10*(11))}px`}" slot="list">
            <GoodsItem
              v-for="(item,index) in hotGoodsList"
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

import {getGoods, getHotGoodsList} from '../api/mall';
import {mapState, mapMutations} from 'vuex';

export default {
  name: "MallIndex",
  components: {
    SectionHeader,
    GoodsItem,
    Slick,
    ZoomImg,
  },
  computed: {
    ...mapState([
      'clientToken',
      'clientName'
    ]),
  },
  mounted() {
    const res = getGoods();
    res
      .then((data) => {
        this.goodsList = data;
        this.hotGoodsList = this.goodsList.slice(10, 22);
      })
      .catch((e) => {
        this.$message.error('数据获取失败');
      });

    if (this.clientName !== "") {
      const res2 = getHotGoodsList({
        token: this.clientToken
      })
      res2
        .then((data) => {
          this.hotGoodsList = data;
        })
        .catch((e) => {
          this.$message.error('数据获取失败');
        });
    }

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
      searchText: '',
      tips: ['aa', 'bb', 'cc'],
      typeList: [
        {name: '首页', id: 0},
        {name: '北京', id: 1},
        {name: '上海', id: 2},
        {name: '杭州', id: 3},
        {name: '深圳', id: 4}
      ],
      carouselData: [
        {url: require('../assets/img/banner1.jpg'), title: '图1', id: 1},
        {url: require('../assets/img/banner2.jpg'), title: '图2', id: 2},
        {url: require('../assets/img/banner3.jpg'), title: '图3', id: 3},
      ],
      goodsList: [],
      hotGoodsList: []
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
