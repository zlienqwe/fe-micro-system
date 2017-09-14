<template>
    <div class="login">
        <el-form :label-position="labelPosition" ref="formLabelAlign"  label-width="80px" :model="formLabelAlign">
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

            <el-form-item>
                <el-button type="primary" @click="submitForm('formLabelAlign')">登陆</el-button>
                <el-button @click="resetForm('formLabelAlign')">重置</el-button>
                <el-button @click="register()" type="text">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import store from '../store/index'

  const md5Base64 = require('md5-base64');

  export default {
    name: 'login',
    data() {

      return {
        labelPosition: 'right',
        formLabelAlign: {
          username: '',
          password: '',
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var password_md5 = md5Base64(this.formLabelAlign.password);
            var api = process.env.API_ROOT + '/login'
            this.$http.post(api, {
              username: this.formLabelAlign.username,
              password: password_md5
            }).then(response => {
              if (response.data.flag == 1) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                store.commit('login');
                this.$router.replace({path: '/in/loginhomepage'})
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'error'
                });
                this.resetForm('formLabelAlign')
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
      register(){
        this.$router.replace({path: '/register'})
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

    .login {
        padding: 30px 100px;
        max-width: 500px;
        margin: 0 auto;
    }
</style>
