<template>
  <div class="Land">
    <el-tabs type="border-card">
      <el-tab-pane label="登录">
        <el-form :model="ruleForm"  status-icon :rules="rules" ref="ruleForm"
                 label-width="100px" class="demo-ruleForm">
          <el-form-item prop="name" label="姓名">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
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
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!--<el-radio-group v-model="labelPosition" size="small">-->
    <!--<el-radio-button label="login">登录</el-radio-button>-->
    <!--<el-radio-button label="register">注册</el-radio-button>-->
    <!--</el-radio-group>-->
    <!--<div style="margin: 20px;"></div>-->
    <!--<el-form :model="ruleForm" v-if="labelPosition==='login'" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
    <!--<el-form-item prop="name" label="姓名">-->
    <!--<el-input v-model="ruleForm.name"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="密码" prop="pass">-->
    <!--<el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" @click="submitFormLogin('ruleForm')">提交</el-button>-->
    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->

    <!--<el-form :model="ruleForm2" v-if="labelPosition==='register'" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">-->
    <!--<el-form-item prop="name" label="姓名">-->
    <!--<el-input v-model="ruleForm2.name"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="密码" prop="pass">-->
    <!--<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="确认密码" prop="checkPass">-->
    <!--<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>-->
    <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
  </div>
</template>


<script>
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
        } else if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
          callback();
        } else if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
          callback();
        } else {
          callback();
        }

      };
      var validatePass2 = (rule, value, callback) => {
        console.log(value)
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'login',
        ruleForm: {
          name: '',
          pass: ''
        },
        ruleForm2: {
          pass: '',
          checkPass: '',
          name: ''
        },
        rules2: {
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          name: [{required: true, message: '不能为空', trigger: 'blur'},
            {pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文', trigger: 'blur'}],
        }, rules: {
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          name: [{required: true, message: '不能为空', trigger: 'blur'},
            {pattern: /^[\u4E00-\u9FA5]+$/, message: '用户名只能为中文', trigger: 'blur'}],
        }
      };
    },
    methods: {
      submitFormLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$router.push({path: '/mall'})
          } else {
            console.log('error submit!!');
          }
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$router.push({path: '/mall'})
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
  html, body {
    width: 100%;
    height: 100%;
    /*background: url(../../build/beijin.jpg) no-repeat;*/
    background-size: 100% 100%;
  }

  #app .topzi {
    font-size: 40px;
    margin-bottom: 20px;
  }

  #app .Land {
    width: 25%;
    position: fixed;
    top: 20%;
    left: 0;
    right: 0;
    margin: 0 auto;
    /*border: 1px solid #000;*/
    padding: 40px;
  }
</style>
