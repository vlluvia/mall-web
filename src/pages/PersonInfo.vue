<template>
  <div class="Personal">
    <ul class="titleList">
      <li :class="{selected:curPath==='/mall/person/cart'}" @click="navTo('/mall/person/cart')">购物车</li>
      <li :class="{selected:curPath==='/mall/person/order'}" @click="navTo('/mall/person/order')">我的订单</li>
      <li :class="{selected:curPath==='/mall/person/data'}" @click="navTo('/mall/person/data')">修改资料</li>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PersonInfo",
    methods: {
      navTo(route) {
        this.$router.push(route)
      },
    },
    watch: {
      '$route'(to, from) {
        this.curPath = to.path;
      }
    },
    data() {
      return {
        curPath: this.$route.path
      }
    }
  }
</script>

<style scoped>
  .Personal {
    padding-top: 20px;
  }

  .titleList {
    width: 180px;
    border: 1px solid #e6e8eb;
    padding: 20px 0;
    display: inline-block;
    overflow: hidden;
    margin-left: 150px;
  }

  li {
    width: 100%;
    margin: 20px 0;
    padding-left: 30px;
    color: #7d7d7d;
    font-size: 15px;
    cursor: pointer;
    border-left: 2px solid transparent;
  }

  .selected {
    border-left: 2px solid #b4a078;
    color: #b4a078;
  }

  .content {
    width: 65%;
    margin-left: 30px;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
  }
</style>
