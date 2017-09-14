import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../views/homepage.vue'
import Login from '../views/login.vue'
import Post from '../views/post.vue'
import Detail from '../views/detail.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage,
      alias: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
    {
      path: '/poster/:poster_id',
      name: 'detail',
      component: Detail,
    }
  ]
})
