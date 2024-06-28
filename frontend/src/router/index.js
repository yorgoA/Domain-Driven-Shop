import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/HomePage.vue';
import EquipedeComptable from '../components/EquipedeComptable.vue';
import EquipedeCommerce from '../components/EquipedeCommerce.vue';
import DashboardView from '../components/DashboardView.vue';
import EquipedeDirection from '../components/EquipedeDirection.vue';
import LoginPage from '../components/LoginPage.vue';
import supabase from '../supabase';
import { getUserRole } from '../utils/auth';

const routes = [
  { path: '/', name: 'Home', component: Homepage, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/test2', name: 'EquipedeComptable', component: EquipedeComptable, meta: { requiresAuth: true, roles: ['admin', 'compta'] } },
  { path: '/test3', name: 'EquipedeCommerce', component: EquipedeCommerce, meta: { requiresAuth: true, roles: ['admin', 'commerce'] } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/direction', name: 'EquipedeDirection', component: EquipedeDirection, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/login', name: 'LoginPage', component: LoginPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    if (to.name !== 'LoginPage') {
      next({ name: 'LoginPage' });
    } else {
      next();
    }
    return;
  }

  const user = session.user;
  if (!user) {
    next({ name: 'LoginPage' });
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      const role = await getUserRole(user.id);
      if (to.meta.roles.includes(role)) {
        next();
      } else {
        next({ name: 'LoginPage' });
      }
    } catch (error) {
      console.error('Error fetching user role:', error.message);
      next({ name: 'LoginPage' });
    }
  } else {
    next();
  }
});

export default router;
