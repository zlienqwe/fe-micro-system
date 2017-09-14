<template>
    <div class="editpopup">
        <el-dialog title="编辑博客" :visible.sync="editPopupVisible" :before-close="asdasdasdasd">
            <PosterForm v-if="editPopupVisible"></PosterForm>
        </el-dialog>
    </div>
</template>

<script>
//  import store from '../store/index'
//  import EditPosterForm from './EditPosterForm.vue'
import PosterForm from './PosterForm.vue'
  export default {
    name: 'editpopup',
    data () {
      return {
      }
    },
    methods: {
      asdasdasdasd(){
        this.$store.commit('hideEditPopup');
        this.$store.commit('editPosterDataChange', {});
      }
    },
    created() {

    },
    computed:{
      editPopupVisible :{
        get: function () {
          return this.$store.state.editPopupVisible;
        },
        set: function (newValue) {
        }
      }
    },
    watch: {

    },
    components:{
      PosterForm
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
