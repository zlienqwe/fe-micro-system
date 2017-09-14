<template>
    <div class="editform">
        <el-form ref="form" :model="form" label-width="80px">
            <!--<el-form-item label="作者">-->
            <!--<el-select v-model="form.user_id" placeholder="请选择作者：">-->
            <!--<el-option v-for="author in authorsList" :label="author.username" :value="author.id" :key="author.id"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="标题：" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">编辑</el-button>
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
      }
    },
    methods: {
      onSubmit() {
        var api = process.env.API_ROOT + '/post/edit'
        console.log(this.form)
        this.$http.post(api, this.form).then(response => {
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
        })
        this.$store.commit('hideEditPopup');
        this.$store.commit('editPosterDataChange', {});
      },
      getAuthorList() {
        var api = process.env.API_ROOT + '/authors'
        this.$http.get(api).then(response => {
          this.authorsList = response.data.author;
        })
      },
      resetForm(resetForm){
        this.$refs[resetForm].resetFields();
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
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
