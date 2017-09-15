<template>
    <div>
        <MainNav></MainNav>
        <div class="loginpost">
            <PosterForm></PosterForm>
        </div>
    </div>
</template>

<script>
  import MainNav from '../components/Navheader.vue'
  import PosterForm from '../components/PosterForm.vue'
  export default {
    name: 'loginhomepage',
    data() {
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
      onSubmit() {
        var api = process.env.API_ROOT + '/post/new'
        this.$http.post(api, this.form).then(response => {
          this.$message({
            message: '发布成功',
            type: 'success'
          });

          this.$router.push({path: `/`})
        })
      },
      getAuthorList() {
        var api = process.env.API_ROOT + '/authors'
        this.$http.get(api).then(response => {
          console.log(response.data.data)
          this.authorsList = response.data.author;
        })
      }
    },
    created() {
      this.getAuthorList();
      this.$store.commit('formForWhatChange', 'add')
    },
    components: {
      MainNav,
      PosterForm
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .body {
        background-color: #ececec;
        border-radius: 5px;
        min-height: 500px;
    }

    .loginpost {
        padding: 30px 100px;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }

    .el-select {
        display: block;
    }
</style>
