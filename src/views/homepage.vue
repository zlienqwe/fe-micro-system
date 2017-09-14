<template>
    <div class="homepage">
        <EditPopup></EditPopup>
        <MainNav></MainNav>
        <el-row>
            <el-col class="el-col" v-for="poster in posterItems" :key="poster.id" :xs="12" :sm="8" :md="6" :lg="4">
                <PosterItem :posteritem='poster' @deleteThisPost="deleteSomePoster" @editThisPost="editThisPoster"></PosterItem>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import PosterItem from '../components/PosterItem.vue'
  import MainNav from '../components/Navheader.vue'
  import EditPopup from '../components/EditPopup.vue'

  export default {
    name: 'homepage',
    data() {
      return {
        posterItems : [],
        editData: {}
      }
    },
    methods: {
      getCurrentUserPoster(){
        var api = process.env.API_ROOT + '/post'
        this.$http.get(api).then(response => {
          console.log(response.data.data)
          this.posterItems = response.data.data;
        })
      },
      editThisPoster(data){
        this.editData = data
        console.log(this.editData)
      },
      deleteSomePoster(data){
        var that = this;
        for(var i = 0; i < this.posterItems.length; i++){
          if(that.posterItems[i].id === data){
            that.posterItems.splice(i, 1);
          }
        }
      },
    },
    created() {
      this.getCurrentUserPoster()
    },
    components: {
      PosterItem,
      MainNav,
      EditPopup
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
    }
</style>
