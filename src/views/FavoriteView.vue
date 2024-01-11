<template>
  <div class="favorites">
    <h2 class="mb-3">Tus citas favoritas</h2>
    <div class="row">
      <div v-for="favorite in favorites" :key="favorite.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card">
          <div class="card-body">
            <p class="card-text">{{ favorite.quote }}</p>
            <button @click="deleteFavorite(favorite.id)" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchFavorites, deleteFavorite } from '../api';

export default {
  data() {
    return {
      favorites: [],
    };
  },
  mounted() {
    this.fetchFavorites();
  },
  methods: {
    async fetchFavorites() {
      try {
        const favorites = await fetchFavorites();
        this.favorites = favorites;
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    },
    async deleteFavorite(favoriteId) {
      try {
        await deleteFavorite(favoriteId);
        console.log('Favorite quote deleted');
        this.fetchFavorites();
      } catch (error) {
        console.error('Error deleting favorite quote:', error);
      }
    },
  },
};
</script>
<style scoped>
  .favorites {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .card {
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: black;
  }
</style>