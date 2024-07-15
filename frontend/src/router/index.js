import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import EquipedeComptable from '../components/EquipedeComptable.vue';
import EquipedeCommerce from '../components/EquipedeCommerce.vue';
import DashboardView from '../components/DashboardView.vue';
import LoginPage from '../components/LoginPage.vue';
import supabase from '../supabase';
import { getUserRole } from '../utils/auth';
import { useRole, setRole, clearRole } from '../utils/role';

const routes = [
  { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true, roles: ['admin', 'compta', 'commerce'] } },
  { path: '/test2', name: 'EquipedeComptable', component: EquipedeComptable, meta: { requiresAuth: true, roles: ['admin', 'compta'] } },
  { path: '/test3', name: 'EquipedeCommerce', component: EquipedeCommerce, meta: { requiresAuth: true, roles: ['admin', 'commerce'] } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/login', name: 'LoginPage', component: LoginPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const roleState = useRole();
  const { data: { session } } = await supabase.auth.getSession();

  if (session && session.user) {
    const user = session.user;
    const role = await getUserRole(user.id);
    await setRole(role);

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (to.meta.roles.includes(roleState.role)) {
        next();
      } else {
        next({ name: 'LoginPage' });
      }
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      await clearRole();

      if (!sessionStorage.getItem('hasRefreshedLogin')) {
        sessionStorage.setItem('hasRefreshedLogin', 'true');
        location.reload();
      } else {
        sessionStorage.removeItem('hasRefreshedLogin');
        next();
      }
    } else {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        next({ name: 'LoginPage' });
      } else {
        next();
      }
    }
  }
});

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    if (!sessionStorage.getItem('hasRefreshedRouteChange')) {
      sessionStorage.setItem('hasRefreshedRouteChange', 'true');
      location.reload();
    } else {
      sessionStorage.removeItem('hasRefreshedRouteChange');
    }
  }
});

export default router;
