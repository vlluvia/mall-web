<template>
  <div class="home">
    <div class="Head">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1" style="margin-left: 10%">Mall-首选购物网站</el-menu-item>
        <el-menu-item index="2" style="margin-left: 55%">欢迎：aaa</el-menu-item>
        <el-menu-item index="3" disabled>个人中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">退出登录</a></el-menu-item>
      </el-menu>
    </div>
    <div class="title">
      <img src="../../static/index1.gif" class="title-img"/>
      <div class="title-input">
        <el-input placeholder="请输入内容" v-model="inputText" style="float: left;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName"
               type="card" class="content-tabs">
        <el-tab-pane
          v-for="(item,index) in typeList" :key="item.id"
          :name="item.id" :label="item.name"></el-tab-pane>
      </el-tabs>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Mall",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        inputText: '',
        typeList: [
          {name:'首页',id:'0'},
          {name:'时尚服装',id:'1'},
          {name:'数码产品',id:'2'},
          {name:'食品饮料',id:'3'},
          {name:'家用电器',id:'4'}
        ],
        activeName: 0,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    watch : {
      activeName:function(val) { //监听切换状态-计划单
        if (val==='0'){
          this.$router.push('/mall/index');
        }else {
          let urlStr = '/mall/goodsList/' + val + '/all';
          this.$router.push(urlStr);
        }
        // 注释，根据val的不同，跳转到不同
      },
    }
  }
</script>

<style scoped>
  .title {
    width: 100%;
    height: 250px;
  }

  .title-img {
    float: left;
    width: 600px;
    margin-left: 35%;
  }

  .title-input {
    float: left;
    width: 25%;
    height: 40%;
    margin-top: 4%;
  }

  .content {
    margin: 0 auto;
  }
  .content-tabs{
    width: 80%;
    margin: 0 auto;
  }
</style>
