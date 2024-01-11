<template>
  <section class="vh-100 d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card rounded-lg">
            <img src="/src/assets/image/logo.png" class="card-img-top rounded mx-auto d-block" alt="Logo" style="max-width: 200px;">
            <div class="card-body">
              <form @submit.prevent="register">

                <div class="form-group">
                  <label for="name"> Nombre</label>
                  <input type="text" id="name" class="form-control" v-model="name" required>
                </div>

                <div class="form-group">
                  <label for="lastname">Apellido</label>
                  <input type="text" id="lastname" class="form-control" v-model="lastname" required>
                </div>

                <!-- Email input -->
                <div class="form-group">
                  <label for="email">Correo Electronico</label>
                  <input type="email" id="email" class="form-control" v-model="email" required>
                </div>

                <!-- Password input -->
                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" id="password" class="form-control" v-model="password" required>
                </div>

                <!-- Submit button -->
                <div class="pt-3">
                  <button type="submit" class="btn btn-primary btn-block">Registro</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { register } from '../api';

export default {
  data() {
    return {
      name: '',
      lastname: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async register() {
      try {
        await register({
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        });
        // Registro exitoso, puedes redirigir al usuario a la página de inicio de sesión
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },
  },
};
</script>