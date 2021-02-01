<template>
  <div class="goods">
    <el-tabs v-model="activeName"
             type="card" class="content-tabs">
      <el-tab-pane
        v-for="(item,index) in typeList" :key="''+item.id"
        :name="''+item.id" :label="item.name"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <el-button type="success" plain style="margin-bottom: 20px" @click="addGoods">新增商品</el-button>
      <el-row>
        <el-col
          v-loading="loading"
          :span="8" v-for="(item,index) in goodsList" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.img" class="image">
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="buttons">
                <el-button type="primary" plain @click="editGoods(item.id)">编辑</el-button>
                <el-button type="danger" plain @click="deleteGoods(item.id)"> 删除</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getGoodsListByType} from '../../api/mall';
  import {delGoods} from '../../api/admin';

  export default {
    name: "Goods",
    data() {
      return {
        typeList: [
          {name: '北京', id: 1},
          {name: '上海', id: 2},
          {name: '杭州', id: 3},
          {name: '深圳', id: 4}
        ],
        activeName: "1",
        goodsList: [],
        loading: true,
      }
    },
    methods: {
      editGoods(i){
        this.$router.push({path: '/mall-admin/goods/update/'+i})
      },
      addGoods(){
        this.$router.push({path: '/mall-admin/goods/0'})
      },
      deleteGoods(id) {
        const res = delGoods(id);
        res
          .then((data)=>{
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getGoodsList(this.activeName)
          })
          .catch((e)=>{
            this.$message.error('删除失败');
          })
      },
      getGoodsList(id){
        const res = getGoodsListByType(id);
        res
          .then((data)=>{
            this.goodsList = data;
            this.loading = false;
          })
          .catch((e)=>{
            this.$message.error('商品获取失败');
          })
      }
    },
    mounted(){
      this.getGoodsList(this.activeName);
    },
    watch: {
      $route(to, from) {
        this.activeName = this.$route.params.typeId;
        this.getGoodsList(this.activeName);
      },
      activeName: function (val) {
        this.activeName =  '' +val;
        this.getGoodsList(val);
      },
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 230px;
    display: block;
  }
  .buttons{
    width: 100%;
    margin-top: 5px;
  }
</style>
