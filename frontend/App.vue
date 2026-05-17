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
      getUser: () => this.currentUser,
      setUser: this.setUser,
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
      currentUser: JSON.parse(localStorage.getItem('zooUser') || 'null'),
    };
  },
  watch: {
    currentUser(val) {
      if (!val && this.$route.path !== '/login') {
        this.$router.push('/login');
      }
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
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
    setUser(user) {
      this.currentUser = user;
      if (user) {
        localStorage.setItem('zooUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('zooUser');
      }
    },
  },
};
</script>