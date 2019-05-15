<template>
  <div class="cart">
    <div v-if="carts.length>0">
      <el-table
        :data="carts"
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
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="cartFooter">
        <span>应付金额：</span>
        <span class="total">{{'￥'+totalAmount}}</span>
        <el-button style="float: right;margin-right: 180px" type="success" @click="settleAccounts">下单</el-button>
      </div>
    </div>
    <p class="emptyTips" v-else>购物车还是空滴~</p>
  </div>
</template>

<script>
  import {getCart,deleteCart,addOrders} from '../api/mall';
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "Cart",
    computed: {
      ...mapState([
        'clientToken',
        'clientName'
      ]),
      totalAmount() {
        let amount = 0;
        this.carts.map((item, index) => {
          amount += item.total;
        })
        return amount;
      }
    },
    data() {
      return {
        carts: []
      }
    },
    methods: {
      settleAccounts() {
        const res = addOrders({
          token: this.clientToken,
          carts:this.carts
        });
        res
          .then((data) => {
            this.$message({
              message: '下单成功',
              type: 'success'
            });
            this.getCarts();
          })
          .catch((e) => {
            this.$message.error('下单失败');
          })
      },
      handleDelete(index, row) {
        // console.log(index,row.id);
        const res = deleteCart({
          token: this.clientToken,
          cartId: row.id
        });
        res
          .then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getCarts();
          })
          .catch((e) => {
            this.$message.error('删除失败');
          })
      },
      getCarts() {
        const res = getCart({
          token: this.clientToken
        });
        res
          .then((data) => {
            this.carts = data;
          })
          .catch((e) => {
            this.$message.error('删除失败');

          })
      }
    },
    mounted() {
      this.getCarts();
    },

    watch: {
      $route(to, from) {
        this.getCarts();
      }
    }
  }
</script>

<style scoped>
  .cartFooter {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 10px 10px;
    border: 1px solid #e6e8eb;
    border-top: none;
    background-color: #f5f5f5;
    position: relative;
  }

  .total {
    color: #be4141;
    font-size: 25px;
    font-weight: 600;
  }

  .emptyTips {
    width: 200px;
    text-align: center;
    display: block;
    margin: 30px auto;
    color: @thirdColor;
    font-size: 20px;
  }

</style>
