<template>
  <div class="home">
    <div class="title">
      <img src="../../static/index1.gif" class="title-img"/>
      <!--<div class="title-input">-->
        <!--<el-input placeholder="请输入内容" v-model="inputText" style="float: right;">-->
          <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
        <!--</el-input>-->
      <!--</div>-->
    </div>
    <div class="content">
      <el-tabs v-model="activeName"
               type="card" class="content-tabs">
        <el-tab-pane
          v-for="(item,index) in typeList" :key="''+item.id"
          :name="''+item.id" :label="item.name"></el-tab-pane>
      </el-tabs>
      <router-view @child-msg="get"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MallContent",
    data() {
      return {
        activeIndex2: '1',
        inputText: '',
        typeList: [
          {name: '首页', id: 0},
          {name: '时尚服装', id: 1},
          {name: '数码产品', id: 2},
          {name: '食品饮料', id: 3},
          {name: '家用电器', id: 4}
        ],
        activeName: 0,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      get(msg) {
        this.activeName = ''+msg;
      }
    },
    watch: {
      activeName: function (val) { //监听切换状态-计划单
        if (val === '0') {
          this.$router.push('/mall/s/index');
        } else {
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
