<template>
  <div class="home">
    <div class="Land">
      <el-tabs type="border-card">
        <el-tab-pane label="登录">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                   label-width="100px" class="demo-ruleForm">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="ruleForm.pwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitFormLogin('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"
                   label-width="100px" class="demo-ruleForm">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input type="password" v-model="ruleForm2.pwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPwd">
              <el-input type="password" v-model="ruleForm2.checkPwd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
  import {mapMutations} from 'vuex'
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
        } else if (this.ruleForm2.checkPwd !== '') {
          this.$refs.ruleForm2.validateField('checkPwd');
          callback();
        } else if (this.ruleForm.checkPwd !== '') {
          this.$refs.ruleForm.validateField('checkPwd');
          callback();
        } else {
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
            {required: true, validator: validatePass, trigger: 'blur'}
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
                alert(e)
              })
          } else {
            console.log('error submit!!');
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
                alert(e)
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
  .home{
    width: 100%;
    height: 100%;
    background-color: #1a2260;
    background-size: 100% 100%;
  }

  .topzi {
    font-size: 40px;
    margin-bottom: 20px;
  }

  .Land {
    width: 25%;
    position: fixed;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
    /*border: 1px solid #000;*/
    /*background-color: #1a2260;*/
    padding: 40px;
  }
</style>
