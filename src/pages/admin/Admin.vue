<template>
  <div class="home" :style="{width:width+'px',height:height+'px'}">
    <div class="container">
      <div class="bgPic"></div>
      <div class="contain login-container">
        <h3 class="title">管理员登录</h3>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                     label-width="0px" class="demo-ruleForm">
              <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;"  @click="submitFormLogin('ruleForm')">
                  登录
                </el-button>
                <el-button style="width:100%; margin-left: 0;margin-top: 10px" @click="resetForm('ruleForm')">重置
                </el-button>
              </el-form-item>
            </el-form>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapMutations} from 'vuex'
  import {getClientSize} from '../../util/util';
  import {login, signup} from '../../api/mall';

  export default {
    name: "Admin",
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }

      };
      return {
        labelPosition: 'login',
        ruleForm: {
          name: '',
          pwd: ''
        },
        rules: {
          pwd: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          name: [{required: true, message: '不能为空', trigger: 'blur'}]
        }
      };
    },
    computed: {
      width() {
        return getClientSize().width;
      },
      height() {
        return getClientSize().height;
      },
    },
    methods: {
      ...mapMutations({
        setAdminName: 'SET_ADMIN_NAME',
        setAdminToken: 'SET_ADMIN_TOKEN'
      }),
      submitFormLogin(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            const res = login({
              account: this.ruleForm.name,
              pwd: this.ruleForm.pwd
            });
            res
              .then((data) => {
                if (data.admin) {
                  this.setAdminName(data.nickname);
                  this.setAdminToken(data.token);
                  this.$router.push({path: '/mall-admin/goods'})
                } else {
                  this.$message.error('你不是管理员');
                }
              })
              .catch((e) => {
                this.$message.error('登录失败');
              })
          } else {
            console.log('error submit!!');
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .bgPic {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("http://01.minipic.eastday.com/20170508/20170508000002_d41d8cd98f00b204e9800998ecf8427e_7.jpeg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #CCCCCC;
    background-attachment: fixed;
  }

  .contain {
    width: 360px;
    height: 360px;
    /*background: rgba(255, 255, 255, 1);*/
    position: absolute;
    top: 90px;
    left: 450px;
  }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 10px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    /*margin: 180px auto;*/
    /*width: 450px;*/
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    opacity: 0.9;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
