import { createApp, h } from 'vue';
import App from './App.vue';
import router from './router';
import { useRole, setRole } from './utils/role';
import supabase from './supabase';
import { getUserRole } from './utils/auth';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './global.css'; 
async function initializeApp() {
  const app = createApp({
    setup() {
      const roleState = useRole();

      (async () => {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session before if from main", session);
        if (session && session.user) {
          console.log("Session from main", session);
          const user = session.user;
          const role = await getUserRole(user.id);
          setRole(role); 
        }
      })();

      return { roleState };
    },
    render: () => h(App),
  });

  app.use(BootstrapVue3);
  app.use(router);
  app.mount('#app');
}

initializeApp();
