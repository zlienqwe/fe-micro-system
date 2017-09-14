<template>
    <div class="register">
        <el-form :label-position="labelPosition" :rules="rules" ref="formLabelAlign"  label-width="80px" :model="formLabelAlign">
            <el-form-item label="用户名" prop="username"
                          :rules="[
                            { required: true, message: '用户名不能为空'}
                ]">
                <el-input v-model="formLabelAlign.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password"
                          :rules="[
                            { required: true, message: '密码不能为空'}
                  ]">
                <el-input v-model="formLabelAlign.password" type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="formLabelAlign.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formLabelAlign')">注册</el-button>
                <el-button @click="resetForm('formLabelAlign')">重置</el-button>
                <el-button @click="login()" type="text">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  const md5Base64 = require('md5-base64');

  export default {
    name: 'login',
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formLabelAlign.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        labelPosition: 'right',
        formLabelAlign: {
          username: '',
          password: '',
          checkPass: ''
        },
        rules: {
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var password_md5 = md5Base64(this.formLabelAlign.password);
            var api = process.env.API_ROOT + '/reg'
            this.$http.post(api, {
              username: this.formLabelAlign.username,
              password: password_md5
            }).then(response => {
              if (response.data.flag == 1) {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                this.login();
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                });
                this.resetForm('formLabelAlign');
              }
            }, response => {
              // error callback
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login(){
        this.$router.replace({path: '/login'})
      }
    },
    created() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .body {
        background-color: #ececec;
        border-radius: 5px;
        min-height: 500px;
    }

    .register {
        padding: 30px 100px;
        max-width: 500px;
        margin: 0 auto;
    }
</style>
