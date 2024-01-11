<template>
  <section class="vh-100 d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card rounded-lg">
            <img src="/src/assets/image/logo.png" class="card-img-top rounded mx-auto d-block" alt="Logo" style="max-width: 200px;">
            <div class="card-body">
              <form @submit.prevent="login">
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
                  <button type="submit" class="btn btn-primary btn-block">Iniciar Sesion</button>
                </div>
              </form>
            </div>
          </div>
          <div class="text-center mt-3">
            <p>No tiene cuenta? <router-link to="/register">Registrese aca</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { login } from '../api';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const token = await login(this.email, this.password);
        // Guardar el token en el almacenamiento local (localStorage)
        localStorage.setItem('token', token);
        // Redirigir al dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
  },
};
</script>

<style>
.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
</style>