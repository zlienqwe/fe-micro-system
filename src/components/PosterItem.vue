<template>
    <div class="posteritem">
        <el-card :body-style="{ padding: '0px' }">
            <i class="el-icon-close icon" @click="deleteDetail()"></i>
            <div style="padding: 14px;" @click="gotoDetail()">
                <h3>{{ posteritem.title }}</h3>
                <div class="bottom clearfix">
                    <p>
                        {{ posteritem.content }}
                    </p>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: 'navheader',
    data () {
      return{

      }
    },
    props:[
      'posteritem'
    ],
    methods: {
      gotoDetail(){
        this.$store.commit('showEditPopup');
        this.$store.commit('editPosterDataChange', this.posteritem);
        this.$store.commit('formForWhatChange', 'edit')
      },
      deleteDetail(){
        this.$confirm('此操作将永久删除该微博, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var api = process.env.API_ROOT + '/post/delete'
          this.$http.post(api, {
            id: this.posteritem.id
          }).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$emit('deleteThisPost', this.posteritem.id)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },

    created() {
    },
    watch: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .posteritem{
        cursor: pointer;
        height: 120px;
        position: relative;
        padding: 10px;
        transition: all .3s ease-in-out;
    }
    .posteritem:hover{
        transform: scale(1.05);
    }

    .posteritem .icon{
        position: absolute;
        right: 20px;
        top: 20px;
        color: #e4e4e4;
    }
    .posteritem .el-card{
        height: 100%;
    }
    .posteritem:hover .el-card{
        box-shadow: 1px 1px 10px 2px #CCC;
        -webkit-box-shadow: 1px 1px 10px 2px #CCC;
        -moz-box-shadow: 1px 1px 10px 2px #CCC;
        -webkit-transition: all .4s;
        transition: all .3s ease-in-out;
    }

    .posteritem .el-card .el-card__body{
        height: 100%;
    }

    .posteritem .el-card h3{
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .posteritem .el-card p{
        overflow: hidden;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -moz-box-orient: block-axis;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
    }
</style>
