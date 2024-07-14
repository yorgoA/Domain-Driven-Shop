<template>
  <div class="navbar-container">
    <b-navbar toggleable="lg" class="custom-navbar" v-if="showNav">
      <b-container>
        <b-navbar-brand href="#" class="navbar-brand">
          <router-link to="/" class="brand-link">
            <i class="bi bi-shop"></i> Domain-Driven-Shop
          </router-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="navbar-items">
            <b-nav-item v-if="role === 'admin'" :to="{ name: 'Home' }" exact>
              <i class="bi bi-house"></i> Home
            </b-nav-item>
            <b-nav-item v-if="role === 'admin'" :to="{ name: 'EquipedeDirection' }">
              <i class="bi bi-briefcase"></i> Direction
            </b-nav-item>
            <b-nav-item v-if="['admin', 'compta'].includes(role)" :to="{ name: 'EquipedeComptable' }">
              <i class="bi bi-table"></i> Comptable
            </b-nav-item>
            <b-nav-item v-if="['admin', 'commerce'].includes(role)" :to="{ name: 'EquipedeCommerce' }">
              <i class="bi bi-table"></i> Commerce
            </b-nav-item>
            <b-nav-item v-if="role === 'admin'" :to="{ name: 'Dashboard' }">
              <i class="bi bi-speedometer2"></i> Dashboard
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="navbar-logout">
            <b-button @click="logout" class="logout-button">Logout</b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import supabase from '../supabase';
import { useRole, setRole, clearRole } from '../utils/role';
import { getUserRole } from '../utils/auth';

export default {
  name: 'NavBar',
  setup() {
    const roleState = useRole();
    return { roleState, role: roleState.role };
  },
  data() {
    return {
      showNav: true
    };
  },
  watch: {
    $route(to) {
      this.updateNavVisibility(to);
    },
    role() {
      this.updateNavVisibility(this.$route);
    },
    roleState: {
      deep: true,
      handler() {
        this.updateNavVisibility(this.$route);
      }
    }
  },
  async mounted() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session && session.user) {
      const user = session.user;
      const role = await getUserRole(user.id);
      await setRole(role); 
    }
    this.updateNavVisibility(this.$route);
  },
  methods: {
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        await clearRole();  // Clear the role
        this.$router.push({ name: 'LoginPage' }); // Redirect to login page
      }
    },
    updateNavVisibility(route) {
      if (route && route.name) {
        this.showNav = route.name !== 'LoginPage';
      } else {
        this.showNav = true;
      }
    }
  }
}
</script>

<style scoped>

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.brand-link {
  text-decoration: none;
  color: #fff8f8;
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-items {
  flex: 1;
}

.navbar-logout {
  margin-left: auto;
}

.logout-button {
  margin-left: auto;
}

.router-link-exact-active {
  border-radius: 5px;
  color: #fff !important;
}
</style>
