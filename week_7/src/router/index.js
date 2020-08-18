import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   component: () => import('../views/frontend/Home.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('../views/frontend/index.vue'),
  //     },
  //     {
  //       path: 'about',
  //       component: () => import('../views/frontend/About.vue'),
  //     },
  //     {
  //       path: 'products',
  //       component: () => import('../views/frontend/Products.vue'),
  //     },
  //     {
  //       path: 'product/:id',
  //       component: () => import('../views/frontend/Product.vue'),
  //     },
  //     {
  //       path: 'cart',
  //       component: () => import('../views/frontend/Cart.vue'),
  //     },
  //     {
  //       path: 'checkout',
  //       component: () => import('../views/frontend/Checkout.vue'),
  //     },
  //   ],
  // },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/backend/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/backend/layout/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'storages',
        component: () => import('../views/backend/Storages.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
});

export default router;
