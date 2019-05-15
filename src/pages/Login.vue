<template>
  <div id="main" :style="{width:width+'px',height:height+'px'}">
    <div class="container">
      <div class="bgPic"></div>
      <div class="contain login-container">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录" name="first">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" lalert
                     class="demo-ruleForm ">
              <el-form-item prop="name">
                <el-input type="name" v-model="ruleForm.name" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input type="password" v-model="ruleForm.pwd" placeholder="密码"></el-input>
              </el-form-item>
              <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="submitFormLogin('ruleForm')">
                  登录
                </el-button>
                <el-button style="width:100%; margin-left: 0;margin-top: 10px" @click="resetForm('ruleForm')">重置
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="second">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                     class="demo-ruleForm ">
              <el-form-item prop="name">
                <el-input type="name" v-model="ruleForm2.name" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input type="password" v-model="ruleForm2.pwd" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="checkPwd">
                <el-input type="password" v-model="ruleForm2.checkPwd" placeholder="确认密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;"  @click="submitForm('ruleForm2')">
                  注册
                </el-button>
                <el-button style="width:100%; margin-left: 0;margin-top: 10px" @click="resetForm('ruleForm2')">重置
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>

      </div>

    </div>
  </div>
</template>


<script>
  import {mapMutations} from 'vuex'
  import {getClientSize} from '../util/util';
  import {login, signup} from '../api/mall';

  export default {
    name: "Login",
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (this.ruleForm2.pwd2 === '') {
          callback(new Error('请输入密码'));
        }else {
          callback();
        }

      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (this.ruleForm2.pwd2 === '') {
          callback(new Error('请输入密码'));
        }else {
          callback();
        }

      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        checked: 1,
        activeName: 'first',
        labelPosition: 'login',
        ruleForm: {
          name: '',
          pwd: ''
        },
        ruleForm2: {
          pwd: '',
          checkPwd: '',
          name: ''
        },
        rules2: {
          pwd: [
            {required: true, validator: validatePass3, trigger: 'blur'}
          ],
          checkPwd: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          name: [{required: true, message: '不能为空', trigger: 'blur'}]
        }, rules: {
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
        setClientName: 'SET_CLIENT_NAME',
        setClientToken: 'SET_CLIENT_TOKEN'
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
                this.setClientName(data.nickname);
                this.setClientToken(data.token);
                this.$router.push({path: '/mall'})
              })
              .catch((e) => {
                this.$message.error('登录失败');
              })
          } else {
            this.$message.error('登录失败');
          }
        });
      },
      submitForm(ruleForm2) {
        this.$refs[ruleForm2].validate((valid) => {
          if (valid) {
            const res = signup({
              account: this.ruleForm2.name,
              pwd: this.ruleForm2.pwd
            })
            res
              .then((data) => {
                this.setClientName(data.nickname);
                this.setClientToken(data.token);
                this.$router.push({path: '/mall'})
              })
              .catch((e) => {
                this.$message.error('注册失败');
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
  #main {
  }

  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .bgPic {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("http://www.17sucai.com/preview/66735/2018-04-23/%E6%9E%81%E5%AE%A2%E5%95%86%E5%9F%8E/img/register/b3_1.jpg");
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
    left: 800px;
  }

  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
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
