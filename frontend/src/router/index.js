import { createRouter, createWebHistory } from 'vue-router';
import DataView from '@/components/EquipedeDirection.vue';
import DataViewTest2 from '@/components/EquipedeCommerce.vue';
import DataViewTest3 from '@/components/EquipedeComptable.vue';
import Dashboard from '@/components/Dashboard.vue';


const routes = [
  { path: '/', name: 'EquipedeDirection', component: DataView },
  { path: '/test2', name: 'EquipedeCommerce', component: DataViewTest2 },
  { path: '/test3', name: 'EquipedeComptable', component: DataViewTest3 },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
