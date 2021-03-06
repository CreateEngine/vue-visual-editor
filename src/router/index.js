import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/preview-page',
    component: () => import('@/components/CanvasPanel/PreviewPage/PreviewPage.vue'),
  },
  {
    path: '/',
    component: () => import('@/index.vue'),
  },
];


const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
