import { createRouter, createWebHistory } from 'vue-router';

import BoardView from '../views/BoardView.vue';
import ListView from '../views/ListView.vue';

const routes = [
    {
      path: '/',
      name: 'BoardView',
      component: BoardView,
    },
    {
      path: '/list',
      name: 'ListView',
      component: ListView,
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;