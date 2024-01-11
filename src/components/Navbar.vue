<template>
    <nav class="navbar-expand-lg navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
            <img src="/src/assets/image/logo.png" alt="Logo" class="logo-image" />
        </router-link>        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/dashboard">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/profile">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-white" to="/favorite">Favorite</router-link>
            </li>
          </ul>
        <div class="d-flex align-items-center">
          <span class="me-2 text-white">{{ username }}</span>
          <button class="btn btn-link text-white" @click="logout">
            <i class="bi bi-box-arrow-right"></i>
          </button>
        </div>
        </div>
      </div>
    </nav>
  </template>

  <script>
import { fetchUserData, logout } from '../api';

export default {
  data() {
    return {
      username: '',
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const username = await fetchUserData();
        this.username = username;
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.redirectToLogin();
      }
    },
    async logout() {
      try {
        await logout();
        this.redirectToLogin();
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
    redirectToLogin() {
      window.location.href = '/login';
    },
  },
};
</script>


  <style>
  .logo-image {
    width: 50px;
    height: 50px;
  }
  </style>