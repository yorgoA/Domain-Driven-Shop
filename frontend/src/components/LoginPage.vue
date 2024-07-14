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
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.header {
  margin-bottom: 20px;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
}

.login-container {
  background: rgba(255, 255, 255, 0.2);
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.login-container h2 {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.b-form-group {
  margin-bottom: 1rem;
}

.login-button {
  width: 100%;
  font-size: 1.1rem;
  padding: 0.5em;
  border-radius: 5px;
}
</style>
