import Vue from 'vue'
import Router from 'vue-router'
import Cerebro_new from '@/components/Cerebro_new'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cerebro_new',
      component: Cerebro_new
    }
  ]
})
