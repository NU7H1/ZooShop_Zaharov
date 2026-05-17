<template>
  <v-app>
    <Navbar
      @toggle-sidebar="drawer = !drawer"
      :cart-count="cartItems.length"
      v-model:search="searchQuery"
    />
    <Sidebar v-model:drawer="drawer" />
    <v-main style="display: flex; flex-direction: column; min-height: 100vh;">
      <v-container fluid style="flex: 1;">
        <router-view />
      </v-container>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './src/components/UI/Navbar.vue';
import Sidebar from './src/components/UI/Sidebar.vue';
import AppFooter from './src/components/UI/AppFooter.vue';

export default {
  name: 'App',
  components: { Navbar, Sidebar, AppFooter },
  provide() {
    return {
      getCart: () => this.cartItems,
      addToCart: this.addToCart,
      getSearch: () => this.searchQuery,
      getFavorites: () => this.favorites,
      toggleFavorite: this.toggleFavorite,
      isFavorite: (id) => this.favorites.some(f => f.id === id),
      removeFromFavorites: this.removeFromFavorites,
    };
  },
  data() {
    return {
      drawer: true,
      cartItems: [],
      searchQuery: '',
      favorites: [],
    };
  },
  methods: {
    addToCart(product, qty = 1) {
      const existing = this.cartItems.find(i => i.id === product.id);
      if (existing) {
        existing.qty += qty;
      } else {
        this.cartItems.push({ ...product, qty });
      }
    },
    toggleFavorite(product) {
      const idx = this.favorites.findIndex(f => f.id === product.id);
      if (idx === -1) {
        this.favorites.push(product);
      } else {
        this.favorites.splice(idx, 1);
      }
    },
    removeFromFavorites(id) {
      const idx = this.favorites.findIndex(f => f.id === id);
      if (idx !== -1) this.favorites.splice(idx, 1);
    },
  },
};
</script>