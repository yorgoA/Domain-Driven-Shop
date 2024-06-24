import { createRouter, createWebHistory } from 'vue-router';
import DataView from '@/components/DataView.vue';
import DataViewTest2 from '@/components/DataViewTest2.vue';
import DataViewTest3 from '@/components/DataViewTest3.vue';

const routes = [
  { path: '/', name: 'DataView', component: DataView },
  { path: '/test2', name: 'DataViewTest2', component: DataViewTest2 },
  { path: '/test3', name: 'DataViewTest3', component: DataViewTest3 }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
