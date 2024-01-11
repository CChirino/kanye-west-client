<template>
  <div class="profile">
    <h2 class="mb-4">Perfil de usuario</h2>
    <div class="mb-3">
      <p><strong>Nombre:</strong> {{ name }} {{ lastname }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
    </div>

    <h3 class="mb-3">Actualizar información</h3>
    <div class="mb-3">
      <label for="newName" class="form-label">Nuevo nombre:</label>
      <input type="text" id="newName" v-model="newName" class="form-control">
    </div>
    <div class="mb-3">
      <label for="newLastname" class="form-label">Nuevo Apellido:</label>
      <input type="text" id="newLastname" v-model="newLastname" class="form-control">
    </div>
    <div class="mb-3">
      <label for="newEmail" class="form-label">Nuevo email:</label>
      <input type="email" id="newEmail" v-model="newEmail" class="form-control">
    </div>
    <button @click="updateProfile" class="btn btn-primary">Actualizar</button>
  </div>
</template>

<script>
import { fetchUserProfile, updateProfile } from '../api';

export default {
  data() {
    return {
      name: '',
      lastname: '',
      email: '',
      newName: '',
      newEmail: '',
      newLastname: '',
    };
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const userProfile = await fetchUserProfile();
        this.name = userProfile.name;
        this.lastname = userProfile.lastname;
        this.email = userProfile.email;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async updateProfile() {
      try {
        const data = {};

        if (this.newName) {
          data.name = this.newName;
        }

        if (this.newLastname) {
          data.lastname = this.newLastname;
        }

        if (this.newEmail) {
          data.email = this.newEmail;
        }

        await updateProfile(data);
        this.fetchUserProfile();

        // Limpiar los campos de entrada
        this.newName = '';
        this.newEmail = '';
        this.newLastname = '';
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    },
  },
};
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

input {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}
</style>