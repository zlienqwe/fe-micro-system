<template>
    <div class="posterform">
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
                <el-button type="primary" @click="onSubmit('form')">
                    <span v-if="createOrEdit === 'add'">立即创建</span>
                    <span v-else>编辑</span></el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

  export default {
    name: 'posterform',
    data () {
      return {
        authorsList: [],
      }
    },
    methods: {
      onSubmit(formname) {
        this.$refs[formname].validate((valid) => {
          if (valid) {
            if(this.createOrEdit === 'add'){
              var api = process.env.API_ROOT + '/post/new'
              this.form.user_id = 1;
              this.$http.post(api, this.form).then(response => {
                if(response.data.flag){
                  this.$message({
                    message: '发布成功',
                    type: 'success'
                  });
                  this.$router.push({path: `/`})
                }else {
                  this.$message({
                    message: response.data.msg,
                    type: 'error'
                  });
                }
              })
            }else {
              var api = process.env.API_ROOT + '/post/edit'
              this.$http.post(api, this.form).then(response => {
                if(response.data.flag){
                  this.$message({
                    message: '编辑成功',
                    type: 'success'
                  });
                  this.$store.commit('hideEditPopup');
                  this.$store.commit('editPosterDataChange', {});
                }else {
                  this.$message({
                    message: response.data.msg,
                    type: 'error'
                  });
                }
              });

            }
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

    },
    computed:{
      form :{
        get: function () {
          return this.$store.state.editPosterData;
        },
        set: function (newValue) {
        }
      },
      createOrEdit: {
        get: function () {
          return this.$store.state.formForWhat;
        },
        set: function () {

        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
