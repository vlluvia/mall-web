<template>
  <div class="data">
    <el-form
      label-position="left"
      ref="form" :model="form" label-width="120px">
      <el-form-item label="昵称：">
        <el-input v-model="form.name">hello</el-input>
      </el-form-item>
      <el-form-item label="账号：">
        <el-input disabled v-model="form.account">1111@qq.com</el-input>
      </el-form-item>
      <el-form-item label="收件人：">
        <el-input v-model="form.recipient">张三</el-input>
      </el-form-item>
      <el-form-item label="收件地址：">
        <el-input v-model="form.address">啊速度很快i</el-input>
      </el-form-item>
      <el-form-item label="联系电话：">
        <el-input v-model="form.phone">5646841</el-input>
      </el-form-item>
      <el-form-item label="修改密码：">
        <el-input v-model="form.password">123456789</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import {myData, updateData} from '../api/mall';

  export default {
    name: "Data",
    data() {
      return {
        form: {
          name: '',
          id: '',
          account: '',
          recipient: '',
          address: '',
          phone: '',
          password: '',
        }
      }
    },
    computed: {
      ...mapState([
        'clientToken',
        'clientName'
      ]),
    },
    methods: {
      ...mapMutations({
        clientLogout: 'CLIENT_LOGOUT',
      }),
      get() {
        const res = myData({
          token: this.clientToken
        })
        res
          .then((data) => {
            this.form = data
          })
          .catch((e) => {
            alert(e)
          })
      },
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            const res = updateData({
              token: this.clientToken,
              name: this.form.name,
              id: this.form.id,
              account: this.form.account,
              recipient: this.form.recipient,
              address: this.form.address,
              phone: this.form.phone,
              password: this.form.password,
            })
            res
              .then((data) => {
                alert("更改成功");
                if(data ==="logout"){
                  this.clientLogout();
                  this.$router.push("/login");
                }
              })
              .catch((e) => {
                alert(e)
              })
          } else {
            console.log('error submit!!');
          }
        });
      }
    },

    mounted() {
      this.get();
    },

    watch: {
      $route(to, from) {
        this.get();
      }
    }
  }
</script>

<style scoped>
  .data {
    width: 40%;
    margin: 20px 20px;
    padding: 20px 20px;
  }
</style>
