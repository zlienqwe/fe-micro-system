<template>
    <div class="addposterform">
        <el-form ref="form" :model="form" label-width="80px">
            <!--<el-form-item label="作者">-->
            <!--<el-select v-model="form.user_id" placeholder="请选择作者：">-->
            <!--<el-option v-for="author in authorsList" :label="author.username" :value="author.id" :key="author.id"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="标题：" prop="title"
                          :rules="[
                            { required: true, message: '标题不能为空'}
                ]">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="content"
                          :rules="[
                            { required: true, message: '内容不能为空'}
                ]">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

  export default {
    name: 'editform',
    data () {
      return {
        authorsList: [],
        form: {
          user_id: '1',
          title: '',
          content: ''
        }
      }
    },
    methods: {
      onSubmit(formname) {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            var api = process.env.API_ROOT + '/post/new'
            this.$http.post(api, this.form).then(response => {
              this.$message({
                message: '发布成功',
                type: 'success'
              });

              this.$router.push({path: `/`})
            })
          }
        })
      },
      getAuthorList() {
        var api = process.env.API_ROOT + '/authors'
        this.$http.get(api).then(response => {
          this.authorsList = response.data.author;
        })
      },
      resetForm(){
        this.$refs['form'].resetFields();
      }
    },
    created() {
      this.getAuthorList();
    },
    watch: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
