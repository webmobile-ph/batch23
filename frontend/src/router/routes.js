
const routes = [
  {
    path: '/',
    // component: () => import('layouts/MyLayout.vue'),
    component: () => import('pages/todo.vue')
    // children: [
    //   { path: '', component: () => import('pages/Index.vue') }
    // ]
  },
  {
    path: '/chart',
    component: () => import('pages/chart.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
