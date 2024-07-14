<template>
  <div class="page-container">
    <div class="header">
      <h1>Welcome to the Data BO of the Domain-Driven-Shop</h1>
    </div>
    <div class="login-container">
      <b-form @submit.prevent="login">
        <b-form-group label="Email" label-for="email-input">
          <b-form-input id="email-input" v-model="email" type="email" required></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password-input">
          <b-form-input id="password-input" v-model="password" type="password" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="login-button">Login</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import supabase from '../supabase';
import { getUserRole } from '../utils/auth';
import { setRole } from '../utils/role';

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
        const user = data.user;
        const role = await getUserRole(user.id);
        await setRole(role);  
        this.$router.push({ name: 'Home' }); 
      }
    }
  }
}
</script>

<style scoped>
</style>
