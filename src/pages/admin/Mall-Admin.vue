<template>
  <div class="home" :style="{width:width+'px',height:height+'px'}">
    <div class="Head">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1" style="margin-left: 10%">Mall-首选购物网站-后台</el-menu-item>
        <el-menu-item index="2" style="margin-left: 55%">{{handleName}}</el-menu-item>
        <el-menu-item index="3" @click="logout">退出登录</el-menu-item>
      </el-menu>
    </div>
    <div class="Content">
      <div class="left-content">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen">
          <el-menu-item index="1" @click="navTo('/mall-admin/goods/goodsList/1/all')">
            <i class="el-icon-menu"></i>
            <span slot="title" >商品管理</span>
          </el-menu-item>
          <el-menu-item index="2" @click="navTo('/mall-admin/orders')">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="navTo('/mall-admin/comments')">
            <i class="el-icon-document"></i>
            <span slot="title">留言管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="navTo('/mall-admin/users')">
            <i class="el-icon-setting"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right-content">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {getClientSize} from '../../util/util';
  export default {
    name: "Mall-Admin",
    data() {
      return {
        activeIndex: '1',
        isCollapse: true
      };
    },
    computed:{
      ...mapState([
        'adminToken',
        'adminName'
      ]),
      width() {
        return getClientSize().width;
      },
      height() {
        return getClientSize().height;
      },
      handleName(){
        return this.adminName === ""?"请登录":"欢迎："+this.adminName
      },
      personDisable(){
        return this.adminName === ""
      }
    },
    methods:{
      ...mapMutations({
        clientLogout: 'CLIENT_LOGOUT',
      }),
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        this.clientLogout();
        this.$router.push({path: '/adminLogin'})
      },
      navTo(route) {
        if (this.curPath === route) {
          return;
        }
        this.$router.push(route)
      },
    }
  }
</script>

<style >
  /*.el-menu-vertical-demo:not(.el-menu--collapse) {*/
    /*width: 200px;*/
    /*min-height: 400px;*/
  /*}*/
  .home{
    padding: 0px;
  }
  .Content{
    width: 100%;
  }
  .left-content{
    margin-left: 5%;
    width: 350px;
    display: inline-block;
    overflow: hidden;
  }
  .right-content{
    width: 65%;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    margin-top: 30px;
    margin-left: 3%;
  }
</style>
