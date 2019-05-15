<template>
  <div class="comments">
    <el-table
      v-loading="loading"
      :data="comments"
      style="width: 100%">
      <el-table-column
        label="用户"
        prop="nickname">
      </el-table-column>
      <el-table-column
        label="商品"
        prop="goodsName">
      </el-table-column>
      <el-table-column
        label="评论"
        prop="comment">
      </el-table-column>
      <el-table-column
        label="评论时间"
        prop="time">
      </el-table-column>
      <el-table-column
        label="评分"
        prop="starValue">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteComments(scope.row)" type="text" size="small">删除</el-button>
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
  import {getComments,delComment} from '../../api/admin';

  export default {
    name: "Comments",
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        comments:[],
        loading: true,
        totalSize:0
      }
    },
    computed: {
      ...mapState([
        'adminToken',
        'adminName'
      ]),
    },
    methods:{
      deleteComments(row){
        const res = delComment({
          commentId: row.id,
          token: this.adminToken
        });
        res
          .then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.handleCommentList();
          })
          .catch((e) => {
            this.$message.error('删除失败');
          })
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleCommentList();
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.handleCommentList();
      },
      handleCommentList(){
        const res = getComments(this.currentPage,this.pagesize);
        res
          .then((data) => {
            this.comments = data.list;
            this.totalSize = data.total;
            this.loading = false;
          })
          .catch((e) => {
            this.$message.error('评论获取失败');
          })
      }
    },
    mounted() {
      this.handleCommentList();
    },
    watch: {
      $route(to, from) {
        this.handleCommentList();
      }
    }
  }
</script>

<style scoped>

</style>
