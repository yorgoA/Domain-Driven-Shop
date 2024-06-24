<template>
    <b-navbar toggleable="lg" class="custom-navbar">
      <b-container>
        <b-navbar-brand href="#">
          <i class="bi bi-shop"></i> Domain-Driven-Shop
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/" exact>
              <i class="bi bi-table"></i> Direction
            </b-nav-item>
            <b-nav-item to="/test2">
              <i class="bi bi-table"></i> Comptable
            </b-nav-item>
            <b-nav-item to="/test3">
              <i class="bi bi-table"></i> Commerce
            </b-nav-item>
            <b-nav-item to="/dashboard">
              <i class="bi bi-speedometer2"></i> Dashboard <!-- Lien vers Dashboard -->
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped>
  .custom-navbar {
    background-color: #89ae89; 
  }
  </style>
  