<template>
  <div class="">
    <div class="container d-flex justify-content-center mb-3 pt-5">
      <h2>Bienvenido al Centro de Frases</h2>
    </div>

    <div class="container d-flex justify-content-center mb-3 pt-2">
      <label for="">Ingrese el número de frases que quiere ver en pantalla</label>
    </div>
    <div class=" container d-flex justify-content-center mb-3">
      <div class="input-group">
        <input type="number" v-model="number" min="1" placeholder="Ingrese el número de frases" class="form-control">
        <div class="input-group-append">
          <button @click="fetchNumberQuotes" class="btn btn-primary" title="Obtener frases">
            <i class="bi bi-arrow-right"></i>
          </button>
          <button @click="fetchQuote" class="btn btn-primary ml-3" title="Actualizar frases">
            <i class="bi bi-arrow-clockwise"></i>          
          </button>
        </div>
      </div>
    </div>

    <div class="container ">
      <div class="row">
        <div v-for="quote in quotes" :key="quote.id" class="card col-sm-6 pl-2">
  
          <div class="card-body">
            <blockquote class="blockquote mb-0">
              <p>{{ quote.quote }}</p>
            </blockquote>
            <button @click="addToFavorites(quote.quote)" class="btn btn-danger btn-icon">
              <i class="bi bi-heart"></i>
            </button>      
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { fetchUserData, fetchQuotes, fetchNumberQuotes, logout, addToFavorites } from '../api';

export default {
  data() {
    return {
      username: '',
      quotes: [],
      number: 0,
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
        this.fetchQuote();
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.redirectToLogin();
      }
    },
    async fetchQuote() {
      try {
        const quotes = await fetchQuotes();
        this.quotes = quotes;
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    },
    async fetchNumberQuotes() {
      try {
        const quotes = await fetchNumberQuotes(this.number);
        this.quotes = quotes;
        console.log(this.quotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    },
    async addToFavorites(quoteId) {
      console.log(quoteId);
      try {
        await addToFavorites(quoteId);
      } catch (error) {
        console.error('Error adding quote to favorites:', error);
      }
    },

  },
};
  </script>
  
  <style scoped>
.dashboard {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.card {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color:black;
}
  </style>