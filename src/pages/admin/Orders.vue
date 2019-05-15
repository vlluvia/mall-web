<template>
  <div class="order">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="1"></el-tab-pane>
      <el-tab-pane label="待付款" name="2"></el-tab-pane>
      <el-tab-pane label="待发货" name="3"></el-tab-pane>
      <el-tab-pane label="已发货" name="4"></el-tab-pane>
      <el-tab-pane label="已完成" name="5"></el-tab-pane>
    </el-tabs>
    <el-table
      v-loading="loading"
      :data="orderList"
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
      <el-table-column
        v-if="activeName==='3'"
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deliverGoods(scope.row)" type="text" size="small">发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {adminOrderLists,deliverOrderGoods} from '../../api/admin';

  export default {
    name: "Orders",
    data(){
      return{
        currentPage:1,
        pagesize:10,
        orderList: [],
        activeName: "1",
        loading: true,
        totalSize:0
      }
    },
    computed: {
      ...mapState([
        'adminToken',
        'adminName'
      ]),

      getOrdersData(){
        this.handleOrderList(this.activeName);
      }
    },
    methods: {
      deliverGoods(row) {
        const res = deliverOrderGoods({
          goodsId: row.id,
          token: this.adminToken
        });
        res
          .then((data) => {
            this.$message({
              message: '发货成功',
              type: 'success'
            });
            this.handleOrderList(this.activeName);
          })
          .catch((e) => {
            this.$message.error('发货失败');
          })
      },
      handleClick(tab, event) {
        this.loading = true;
        this.activeName= tab.name;
        this.handleOrderList(tab.name);
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleOrderList(this.activeName);
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.handleOrderList(this.activeName);
      },
      handleOrderList(i) {
        const res = adminOrderLists(i,this.currentPage,this.pagesize);
        res
          .then((data) => {
            this.orderList = data.list;
            this.totalSize = data.total;
            this.loading = false;
          })
          .catch((e) => {
            this.$message.error('订单获取失败');
          })
      }
    },
    mounted() {
      this.handleOrderList(this.activeName);
    },
    watch: {
      $route(to, from) {
        this.handleOrderList(this.activeName);
      }
    }
  }
</script>

<style scoped>

</style>
