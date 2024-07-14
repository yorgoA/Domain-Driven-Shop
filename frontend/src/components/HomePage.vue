<template>
  <div class="home-container">
    <div class="header">
      <h1>Welcome to the Data BO of the Domain-Driven-Shop</h1>
    </div>
    <div class="content">
      <p>Here you will be able to access your available charts according to your role: <span class="role">{{ role }}</span></p>
    </div>
  </div>
</template>

<script>
import { useRole } from '../utils/role';

export default {
  name: 'HomePage',
  setup() {
    const roleState = useRole();
    return { role: roleState.role };
  }
};
</script>
