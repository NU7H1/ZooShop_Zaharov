<template>
  <v-app class="app-root">
    <Navbar
      @toggle-sidebar="drawer = !drawer"
      :cart-count="cartCount"
      :is-logged-in="isLoggedIn"
      v-model:search="searchQuery"
      @login-success="onUserLogin"
      @logout="onUserLogout"
    />
    <Sidebar v-model:drawer="drawer" />
    <v-main class="app-main">
      <div class="app-content">
        <v-container fluid>
          <router-view />
        </v-container>
      </div>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './src/components/UI/Navbar.vue';
import Sidebar from './src/components/UI/Sidebar.vue';
import AppFooter from './src/components/UI/AppFooter.vue';
import {
  loadCart,
  saveCart,
  loadFavorites,
  saveFavorites,
  mergeGuestCartIntoUser,
} from './src/utils/storage.js';

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
      isLoggedIn: () => this.isLoggedIn,
    };
  },
  data() {
    return {
      drawer: true,
      cartItems: [],
      searchQuery: '',
      favorites: [],
      userId: null,
      isLoggedIn: false,
    };
  },
  computed: {
    cartCount() {
      return this.cartItems.reduce((sum, i) => sum + i.qty, 0);
    },
  },
  mounted() {
    this.initFromSession();
  },
  watch: {
    cartItems: {
      deep: true,
      handler() {
        this.persistCart();
      },
    },
    favorites: {
      deep: true,
      handler() {
        this.persistFavorites();
      },
    },
  },
  methods: {
    initFromSession() {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        this.userId = userId;
        this.isLoggedIn = true;
        this.cartItems = loadCart(userId);
        this.favorites = loadFavorites(userId);
      } else {
        this.cartItems = loadCart(null);
      }
    },
    persistCart() {
      saveCart(this.userId, this.cartItems);
    },
    persistFavorites() {
      if (this.userId) {
        saveFavorites(this.userId, this.favorites);
      }
    },
    onUserLogin({ userId }) {
      this.userId = userId;
      this.isLoggedIn = true;
      this.cartItems = mergeGuestCartIntoUser(userId);
      this.favorites = loadFavorites(userId);
    },
    onUserLogout() {
      this.userId = null;
      this.isLoggedIn = false;
      this.favorites = [];
      this.cartItems = loadCart(null);
    },
    addToCart(product, qty = 1) {
      const existing = this.cartItems.find(i => i.id === product.id);
      if (existing) {
        existing.qty += qty;
      } else {
        this.cartItems.push({ ...product, qty });
      }
    },
    toggleFavorite(product) {
      if (!this.isLoggedIn) return;
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

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.app-root.v-application {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-main {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  min-height: calc(100vh - 64px);
}

.app-content {
  flex: 1 0 auto;
  display: block;
}
</style>
