<template>
  <div class="order">
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部订单" name="1"></el-tab-pane>
      <el-tab-pane label="待付款" name="2"></el-tab-pane>
      <el-tab-pane label="待发货" name="3"></el-tab-pane>
      <el-tab-pane label="已发货" name="4"></el-tab-pane>
      <el-tab-pane label="已完成" name="5"></el-tab-pane>
    </el-tabs>
    <el-table

      :data="getOrdersData"
      style="width: 100%">
      <el-table-column
        label="商品信息"
        prop="goodsName">
      </el-table-column>
      <el-table-column
        label="单价"
        prop="goodsPrice">
      </el-table-column>
      <el-table-column
        label="数量"
        prop="goodsCount">
      </el-table-column>
      <el-table-column
        label="小计"
        prop="total">
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
  import {getOrders,deleteOrder} from '../api/mall';
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "Order",
    computed:{
      ...mapState([
        'clientToken',
        'clientName'
      ]),
      getOrdersData(){
        if (this.activeName === "1") {
           return this.orders;
        }else if(this.activeName === "2"){
            return this.orders.filter((item) => {
              return item.pay === false
            })
        }else if(this.activeName === "3"){
          return this.orders.filter((item) => {
            return item.send === false
          })
        }else if(this.activeName === "4"){
          return this.orders.filter((item) => {
            return item.send === true
          })
        }else if(this.activeName === "5"){
          return this.orders.filter((item) => {
            return item.finish === true
          })
        }
      }
    },
    data() {
      return {
        activeName: "1",
        orders: []
      }
    },
    methods:{
      handleDelete(index, row){

      },
      getOrder(){
        const res = getOrders({
          token: this.clientToken
        });
        res
          .then((data) => {
            this.orders = data;
          })
          .catch((e) => {
            this.$message.error('数据获取失败');
          })
      }
    },
    mounted() {
      this.getOrder();
    },

    watch: {
      $route(to, from) {
        this.getOrder();
      }
    }
  }
</script>

<style scoped>

</style>
