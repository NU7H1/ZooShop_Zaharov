<template>
  <v-app-bar color="#000000" dark flat app elevation="2">
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')" />

    <div class="d-flex align-center">
      <v-icon color="#FF8C00">mdi-store</v-icon>
      <v-toolbar-title class="ml-2 text-white">ЗооМаркет</v-toolbar-title>
    </div>

    <v-spacer />

    <v-text-field
      :model-value="search"
      @update:model-value="onSearch"
      density="compact"
      variant="solo"
      placeholder="Поиск товаров"
      prepend-inner-icon="mdi-magnify"
      :append-inner-icon="search ? 'mdi-close' : ''"
      @click:append-inner="clearSearch"
      hide-details
      single-line
      class="mx-4"
      style="max-width: 300px"
      bg-color="white"
      @keydown.enter="goToShop"
    />

    <v-menu
      v-if="isLoggedIn"
      v-model="favMenu"
      :close-on-content-click="false"
      location="bottom end"
      offset="8"
      max-width="360"
    >
      <template #activator="{ props }">
        <v-btn icon style="color: white;" class="mr-1" v-bind="props">
          <v-badge :content="favoritesCount" :model-value="favoritesCount > 0" color="#FF8C00" overlap>
            <v-icon>mdi-heart-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card rounded="lg" elevation="8" class="popup-panel">
        <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
          <span class="text-h6 font-weight-bold">
            <v-icon color="red" class="mr-1">mdi-heart</v-icon>
            Избранное
          </span>
          <v-btn icon size="small" variant="text" @click="favMenu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4 popup-panel__body">
          <div v-if="favoriteItems.length === 0" class="text-center py-8">
            <v-icon size="56" color="grey-lighten-1">mdi-heart-off</v-icon>
            <div class="text-body-1 text-grey mt-3">Избранное пусто</div>
          </div>
          <div v-else>
            <div
              v-for="item in favoriteItems"
              :key="item.id"
              class="d-flex align-center mb-3 pa-2 rounded-lg popup-item"
            >
              <v-img :src="item.image" width="56" height="56" cover rounded="lg" class="flex-shrink-0" />
              <div class="ml-3 flex-grow-1 overflow-hidden">
                <div class="text-body-2 font-weight-bold text-black text-truncate">{{ item.name }}</div>
                <div class="text-body-2 font-weight-bold" style="color: #FF8C00">{{ item.price }} ₽</div>
              </div>
              <div class="d-flex flex-column" style="gap: 4px;">
                <v-btn icon size="x-small" variant="text" color="#FF8C00" @click="addToCartFromFav(item)">
                  <v-icon size="16">mdi-cart-plus</v-icon>
                </v-btn>
                <v-btn icon size="x-small" variant="text" color="red" @click="removeFav(item.id)">
                  <v-icon size="16">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>

    <v-menu
      v-model="cartMenu"
      :close-on-content-click="false"
      location="bottom end"
      offset="8"
      max-width="360"
    >
      <template #activator="{ props }">
        <v-btn icon style="color: white;" class="mr-1" v-bind="props">
          <v-badge :content="cartCount" :model-value="cartCount > 0" color="#FF8C00" overlap>
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card rounded="lg" elevation="8" class="popup-panel">
        <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
          <span class="text-h6 font-weight-bold">
            <v-icon color="#FF8C00" class="mr-1">mdi-cart</v-icon>
            Корзина
          </span>
          <v-btn icon size="small" variant="text" @click="cartMenu = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4 popup-panel__body">
          <div v-if="cartItems.length === 0" class="text-center py-8">
            <v-icon size="56" color="grey-lighten-1">mdi-cart-off</v-icon>
            <div class="text-body-1 text-grey mt-3">Корзина пуста</div>
          </div>
          <div v-else>
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="d-flex align-center mb-3 pa-2 rounded-lg popup-item"
            >
              <v-img :src="item.image" width="56" height="56" cover rounded="lg" class="flex-shrink-0" />
              <div class="ml-3 flex-grow-1 overflow-hidden">
                <div class="text-body-2 font-weight-bold text-black text-truncate">{{ item.name }}</div>
                <div class="text-caption text-grey-darken-1">{{ item.price }} ₽ × {{ item.qty }}</div>
                <div class="text-body-2 font-weight-bold" style="color: #FF8C00">
                  {{ item.price * item.qty }} ₽
                </div>
              </div>
              <v-btn icon size="x-small" variant="text" color="grey" @click="removeFromCart(item.id)">
                <v-icon size="16">mdi-close</v-icon>
              </v-btn>
            </div>

            <v-divider class="my-3" />

            <div class="d-flex justify-space-between align-center mb-3">
              <span class="text-body-1 font-weight-bold">Итого:</span>
              <span class="text-h6 font-weight-bold" style="color: #FF8C00">{{ totalPrice }} ₽</span>
            </div>

            <v-btn
              color="#FF8C00"
              variant="flat"
              block
              size="large"
              :loading="orderLoading"
              @click="placeOrder"
            >
              <v-icon start>mdi-credit-card-outline</v-icon>
              Оформить заказ
            </v-btn>
            <v-btn variant="text" color="grey" block class="mt-1" size="small" @click="clearCart">
              Очистить корзину
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>

    <div v-if="isLoggedIn">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text" class="text-none text-white">
            <v-icon left color="#FF8C00">mdi-account-circle</v-icon>
            {{ userName }}
            <v-chip v-if="userRole === 'admin'" size="x-small" color="#FF8C00" class="ml-1">
              Admin
            </v-chip>
          </v-btn>
        </template>
        <v-list>
          <v-list-item prepend-icon="mdi-account" title="Профиль" to="/profile" />
          <v-list-item
            v-if="userRole === 'admin'"
            prepend-icon="mdi-shield-crown"
            title="Панель админа"
            to="/admin"
          />
          <v-divider />
          <v-list-item prepend-icon="mdi-logout" title="Выйти" @click="logout" />
        </v-list>
      </v-menu>
    </div>

    <v-btn v-else variant="text" class="text-white" @click="$refs.loginDialog.open()">
      <v-icon left>mdi-login</v-icon>
      Войти
    </v-btn>

    <LoginDialog ref="loginDialog" @login-success="onLoginSuccess" />

    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" color="#FF8C00" multi-line>
      {{ snackbarText }}
    </v-snackbar>
  </v-app-bar>
</template>

<script>
import LoginDialog from './LoginDialog.vue';

export default {
  name: 'Navbar',
  components: { LoginDialog },
  inject: ['getCart', 'addToCart', 'getFavorites', 'removeFromFavorites', 'orderService'],
  emits: ['toggle-sidebar', 'update:search', 'login-success', 'logout'],
  props: {
    cartCount: { type: Number, default: 0 },
    search: { type: String, default: '' },
    isLoggedIn: { type: Boolean, default: false },
  },
  data() {
    return {
      cartMenu: false,
      favMenu: false,
      snackbar: false,
      snackbarText: '',
      snackbarTimeout: 2000,
      orderLoading: false,
      userName: '',
      userRole: '',
      userId: null,
    };
  },
  computed: {
    cartItems() {
      return this.getCart();
    },
    favoriteItems() {
      return this.getFavorites();
    },
    favoritesCount() {
      return this.favoriteItems.length;
    },
    totalPrice() {
      return this.cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    },
  },
  mounted() {
    this.checkAuth();
  },
  watch: {
    isLoggedIn(val) {
      if (!val) {
        this.favMenu = false;
        this.userName = '';
        this.userRole = '';
        this.userId = null;
      } else {
        this.checkAuth();
      }
    },
  },
  methods: {
    checkAuth() {
      const name = sessionStorage.getItem('userName');
      const role = sessionStorage.getItem('userRole');
      const id = sessionStorage.getItem('userId');
      if (name) {
        this.userName = name;
        this.userRole = role || 'client';
        this.userId = id;
      }
    },
    onLoginSuccess({ userName, role, userId }) {
      this.userName = userName;
      this.userRole = role;
      this.userId = userId;
      this.$emit('login-success', { userName, role, userId });
    },
    logout() {
      sessionStorage.clear();
      this.userName = '';
      this.userRole = '';
      this.userId = null;
      this.favMenu = false;
      this.$emit('logout');
      this.$router.push('/');
    },
    onSearch(val) {
      this.$emit('update:search', val);
      if (val && this.$route.path !== '/shop') {
        this.$router.push('/shop');
      }
    },
    clearSearch() {
      this.$emit('update:search', '');
    },
    goToShop() {
      if (this.$route.path !== '/shop') this.$router.push('/shop');
    },
    removeFromCart(id) {
      const cart = this.getCart();
      const idx = cart.findIndex(i => i.id === id);
      if (idx !== -1) cart.splice(idx, 1);
    },
    clearCart() {
      const cart = this.getCart();
      cart.splice(0, cart.length);
    },
    addToCartFromFav(item) {
      this.addToCart(item, 1);
      this.snackbarText = `«${item.name}» добавлен в корзину`;
      this.snackbarTimeout = 2000;
      this.snackbar = true;
    },
    removeFav(id) {
      this.removeFromFavorites(id);
    },
    async placeOrder() {
      if (!this.isLoggedIn) {
        this.cartMenu = false;
        this.$refs.loginDialog.open();
        return;
      }
      const cart = this.getCart();
      if (cart.length === 0) return;

      this.orderLoading = true;
      try {
        await this.orderService.createOrder({
          userId: this.userId,
          userName: this.userName,
          items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
          total: this.totalPrice,
        });
        this.clearCart();
        this.cartMenu = false;
        this.snackbarText = 'Заказ оформлен! С вами скоро свяжутся для подтверждения.';
        this.snackbarTimeout = 4500;
        this.snackbar = true;
      } catch {
        this.snackbarText = 'Ошибка при оформлении заказа';
        this.snackbarTimeout = 2000;
        this.snackbar = true;
      } finally {
        this.orderLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.popup-panel {
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.popup-panel__body {
  overflow-y: auto;
  max-height: calc(70vh - 64px);
}

.popup-item {
  border: 1px solid #FFE0B2;
}
</style>
