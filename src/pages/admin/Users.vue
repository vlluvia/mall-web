<template>
  <div class="comments">
    <el-table
      v-loading="loading"
      :data="users"
      style="width: 100%">
      <el-table-column
        label="用户账号"
        prop="account">
      </el-table-column>
      <el-table-column
        label="用户昵称"
        prop="nickname">
      </el-table-column>
      <el-table-column
        label="收件人"
        prop="recipient">
      </el-table-column>
      <el-table-column
        label="用户手机号"
        prop="phone">
      </el-table-column>
      <el-table-column
        label="用户地址"
        prop="address">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteUsers(scope.row)" type="text" size="small">删除</el-button>
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
  import {getUsers,deleteUser} from '../../api/admin';

  export default {
    name: "Users",
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        users: [],
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
    methods: {
      deleteUsers: function (row) {
        const res = deleteUser({
          userId: row.id,
          token: this.adminToken
        })
        res
          .then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.handleUserList();
          })
          .catch((e) => {
            this.$message.error('删除失败');
          })
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.handleUserList();
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.handleUserList();
      },
      handleUserList() {
        const res = getUsers(this.currentPage, this.pagesize);
        res
          .then((data) => {
            this.users = data.list;
            this.totalSize = data.total;
            this.loading = false;
          })
          .catch((e) => {
            this.$message.error('列表获取失败');
          })
      }
    },
    mounted() {
      this.handleUserList();
    },
    watch: {
      $route(to, from) {
        this.handleUserList();
      }
    }
  }
</script>

<style scoped>

</style>
