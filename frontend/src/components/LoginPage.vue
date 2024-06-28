<template>
  <div class="login-container">
    <h1>Login</h1>
    <b-form @submit.prevent="login">
      <b-form-group label="Email" label-for="email-input">
        <b-form-input id="email-input" v-model="email" type="email" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="password-input">
        <b-form-input id="password-input" v-model="password" type="password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import supabase from '../supabase';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      });

      if (error) {
        console.error('Error logging in:', error.message);
      } else {
        console.log('Logged in user:', data);
        const user = data.user;
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (roleError || !roleData) {
          console.error('Error fetching user role:', roleError ? roleError.message : 'No role found for this user');
        } else {
          const role = roleData.role;

          // Redirect based on user role
          setTimeout(() => {
            if (role === 'admin') {
              this.$router.push({ name: 'Dashboard' });
            } else if (role === 'compta') {
              this.$router.push({ name: 'EquipedeComptable' });
            } else if (role === 'commerce') {
              this.$router.push({ name: 'EquipedeCommerce' });
            } else {
              this.$router.push({ name: 'Home' });
            }
          }, 2000);
        }
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
