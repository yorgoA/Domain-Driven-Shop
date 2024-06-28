<template>
  <b-navbar toggleable="lg" class="custom-navbar" v-if="role">
    <b-container>
      <b-navbar-brand href="#">
        <i class="bi bi-shop"></i> Domain-Driven-Shop
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="role === 'admin'" to="/" exact>
            <i class="bi bi-house"></i> Home
          </b-nav-item>
          <b-nav-item v-if="role === 'admin'" to="/direction">
            <i class="bi bi-briefcase"></i> Direction
          </b-nav-item>
          <b-nav-item v-if="['admin', 'compta'].includes(role)" to="/test2">
            <i class="bi bi-table"></i> Comptable
          </b-nav-item>
          <b-nav-item v-if="['admin', 'commerce'].includes(role)" to="/test3">
            <i class="bi bi-table"></i> Commerce
          </b-nav-item>
          <b-nav-item v-if="role === 'admin'" to="/dashboard">
            <i class="bi bi-speedometer2"></i> Dashboard
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button @click="logout" class="position-absolute top-0 end-0" variant="danger">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import supabase from '../supabase';
import { getUserRole } from '../utils/auth';

export default {
  name: 'NavBar',
  data() {
    return {
      role: null
    };
  },
  async created() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      console.error('No active session found!', error);
      return;
    }

    const user = session.user;
    if (!user) {
      console.error('User found:', user);
      return;
    }

    console.log('User found:', user);

    try {
      const role = await getUserRole(user.id);
      this.role = role;
      console.log('User role:', role);
    } catch (error) {
      console.error('Error fetching user role:', error.message);
    }
  },
  methods: {
    async logout() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        this.$router.push({ name: 'LoginPage' });
      }
    }
  }
}
</script>

<style scoped>
.custom-navbar {
  background-color: #89ae89; 
}

.router-link-exact-active {
  background-color: #6e8e6e;
  border-radius: 5px;
  color: #fff !important;
}
</style>
