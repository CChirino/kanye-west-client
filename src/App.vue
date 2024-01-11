<template>
  <div class="flex mb-4">
    <div class="w-full bg-gray-500 h-12" v-if="sessionStarted && hasToken">
      <Navbar />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import { getToken } from './api';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
      sessionStarted: false,
      hasToken: false,
    };
  },
  mounted() {
    this.checkSession();
  },
  methods: {
    checkSession() {
      const token = localStorage.getItem('token');
      this.sessionStarted = !!token;
      this.hasToken = !!token;
    },
  },
};
</script>