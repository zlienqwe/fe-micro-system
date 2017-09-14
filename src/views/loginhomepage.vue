<template>
    <div class="homepage">
        <el-row type="flex">
            <el-col class="el-col" v-for="poster in posterItems" :key="poster.id" :xs="12" :sm="8" :md="6" :lg="4">
                <posteritem :posteritem='poster'></posteritem>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import posteritem from '../components/PosterItem.vue'

  export default {
    name: 'loginhomepage',
    data() {
      return {
        posterItems: []
      }
    },
    components: {
      posteritem
    },
    methods: {
      getCurrentUserPoster() {
        var api = process.env.API_ROOT + '/post/search'
        this.$http.post(api, {
          user_id: 1
        }).then(response => {
          console.log(response.data.data)
          this.posterItems = response.data.data;
        })
      }
    },
    created() {
      this.getCurrentUserPoster()
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
    .el-col{
        padding:10px;
    }
</style>
