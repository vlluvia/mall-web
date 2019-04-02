<template>
  <div class="home">
    <div class="Head">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b">
        <el-menu-item index="1" style="margin-left: 10%" @click="main">Mall-首选购物网站</el-menu-item>
        <el-menu-item index="2" style="margin-left: 55%" @click="tologin">{{handleName}}</el-menu-item>
        <el-menu-item index="3" :disabled="personDisable" @click="person">个人中心</el-menu-item>
        <el-menu-item index="4" :disabled="personDisable" @click="logout">退出登录</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';

  export default {
    name: "Mall",
    data() {
      return {
        activeIndex: '1',
      };
    },
    computed:{
      ...mapState([
        'clientToken',
        'clientName'
      ]),
      handleName(){
        return this.clientName === ""?"请登录":"欢迎："+this.clientName
      },
      personDisable(){
        return this.clientName === ""
      }
    },
    methods: {
      ...mapMutations({
        clientLogout: 'CLIENT_LOGOUT',
      }),
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      person() {
        this.$router.push("/mall/person/cart");
      },
      main() {
        this.$router.push("/");
      },
      tologin() {
        if (this.clientName==="") {
          this.$router.push("/login");
        }else {
          this.$router.push("/");
        }
      },
      logout(){
        this.clientLogout();
        this.$router.go(0);
      }
    },

  }
</script>

<style scoped>

</style>
