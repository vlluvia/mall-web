<template>
  <div class="home">
    <div class="title">
      <img src="../../static/index1.gif" style="margin-left: 35%"/>
      <!--      </span>-->
      <div class="title-input">
        <el-input class="te" placeholder="请输入内容" v-model="inputText">
          <el-button slot="append" icon="el-icon-search" @click="searchConfirm"></el-button>
        </el-input>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName"
               type="card" class="content-tabs" :stretch=true>
        <el-tab-pane id="0" key="0" label="0">
          <span slot="label"><i class="el-icon-date"></i> 首页</span>
        </el-tab-pane>
        <el-tab-pane id="9" key="9" label="9">
          <span slot="label">
              <img style="vertical-align: middle;" height="23" width="23" src="../assets/img/icon/beijing.png">
              北京
          </span>
        </el-tab-pane>
        <el-tab-pane
          v-for="(item,index) in typeList" :key="''+item.id"
          :name="''+item.id" :label="item.name" v-if="index > 0"></el-tab-pane>
      </el-tabs>
      <router-view @child-msg="get"></router-view>
    </div>
  </div>
</template>

<script>
import {getGoodsTypeList} from "../api/mall";
import {getGoodsTypeListClient} from '../api/mall';

export default {
  name: "MallContent",
  data() {
    return {
      activeIndex2: '1',
      inputText: '',
      typeList: [
        // {name: '首页', id: 0},
        // {name: '北京', id: 1},
        // {name: '上海', id: 2},
        // {name: '杭州', id: 3},
        // {name: '深圳', id: 4}
      ],
      activeName: 0,
    };
  },
  mounted() {
    this.getGoodsType();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    get(msg) {
      this.activeName = '' + msg;
    },
    searchConfirm() {
      if (this.inputText.trim().length <= 0) {
        this.$message.error('输入不能为空');
        return;
      }
      this.$router.push(`/mall/goodsList/0/${this.inputText}`);
    },getGoodsType() {
      const res = getGoodsTypeListClient();
      res
        .then((data) => {
          this.typeList = data;
        })
        .catch((e) => {
          this.$message.error('商品获取失败');
        })
    },
  },

  watch: {
    activeName: function (val) { //监听切换状态-计划单
      if (val === '0') {
        this.$router.push('/mall/s/index');

      } else {
        console.log(val)
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
}

.title-img {
  width: 400px;
  height: 100px;
}

.title-input {
  /*float: left;*/
  width: 25%;
  height: 40%;
  margin-left: 65%;
  margin-top: 2%;
  margin-bottom: 2%;
}

.content {
  margin: 0 auto;
  font-size: 18px;
}

.content-tabs {
  width: 80%;
  margin: 0 auto;
  font-size: 18px;
}

.te >>> input {
  /*color: #2f334d;*/
  background-color: #e6e8eb;
}
</style>
