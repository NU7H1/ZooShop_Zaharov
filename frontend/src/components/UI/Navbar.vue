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

    <v-btn icon style="color: white" class="mr-2">
      <v-icon>mdi-heart-outline</v-icon>
    </v-btn>

    <v-btn icon style="color: white" @click="cartDrawer = true">
      <v-badge :content="cartCount" :model-value="cartCount > 0" color="#FF8C00" overlap>
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text" class="text-none text-white">
          <v-icon left color="#FF8C00">mdi-account-circle</v-icon>
          {{ currentUser?.name }}
          <v-chip v-if="currentUser?.role === 'admin'" size="x-small" color="#FF8C00" class="ml-1">
            Admin
          </v-chip>
        </v-btn>
      </template>
      <v-list>
        <v-list-item prepend-icon="mdi-account" title="Профиль" to="/profile" />
        <v-list-item
          v-if="currentUser?.role === 'admin'"
          prepend-icon="mdi-shield-crown"
          title="Панель админа"
          to="/admin"
        />
        <v-divider />
        <v-list-item prepend-icon="mdi-logout" title="Выйти" @click="logout" />
      </v-list>
    </v-menu>

    <!-- Панель корзины -->
    <v-navigation-drawer
      v-model="cartDrawer"
      location="right"
      temporary
      width="340"
    >
      <div class="pa-4">
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="text-h6 font-weight-bold">
            <v-icon color="#FF8C00" class="mr-1">mdi-cart</v-icon>
            Корзина
          </span>
          <v-btn icon size="small" variant="text" @click="cartDrawer = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <v-divider class="mb-4" />

        <!-- Пусто -->
        <div v-if="cartItems.length === 0" class="text-center py-10">
          <v-icon size="64" color="grey-lighten-1">mdi-cart-off</v-icon>
          <div class="text-body-1 text-grey mt-3">Корзина пуста</div>
        </div>

        <!-- Список товаров -->
        <div v-else>
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="d-flex align-center mb-3 pa-2 rounded-lg"
            style="border: 1px solid #FFE0B2;"
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

          <v-divider class="my-4" />

          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-body-1 font-weight-bold">Итого:</span>
            <span class="text-h6 font-weight-bold" style="color: #FF8C00">{{ totalPrice }} ₽</span>
          </div>

          <v-btn color="#FF8C00" variant="flat" block size="large" @click="placeOrder">
            <v-icon left>mdi-credit-card-outline</v-icon>
            Оформить заказ
          </v-btn>
          <v-btn variant="text" color="grey" block class="mt-1" size="small" @click="clearCart">
            Очистить корзину
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Снэкбар -->
    <v-snackbar v-model="snackbar" :timeout="2000" color="#FF8C00">
      {{ snackbarText }}
    </v-snackbar>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  emits: ['toggle-sidebar', 'update:search'],
  inject: ['getCart', 'addToCart', 'getUser', 'setUser'],
  props: {
    cartCount: { type: Number, default: 0 },
    search: { type: String, default: '' },
  },
  data() {
    return {
      cartDrawer: false,
      snackbar: false,
      snackbarText: '',
    };
  },
  computed: {
    currentUser() {
      return this.getUser();
    },
    cartItems() {
      return this.getCart();
    },
    totalPrice() {
      return this.cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    },
  },
  methods: {
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
      if (this.$route.path !== '/shop') {
        this.$router.push('/shop');
      }
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
    async placeOrder() {
      const user = this.getUser();
      if (!user) return;
      const cart = this.getCart();
      if (cart.length === 0) return;

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            userName: user.name,
            items: cart.map(i => ({
              id: i.id,
              name: i.name,
              price: i.price,
              qty: i.qty,
            })),
            total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
          }),
        });

        if (res.ok) {
          this.clearCart();
          this.cartDrawer = false;
          this.snackbarText = 'Заказ оформлен!';
          this.snackbar = true;
        }
      } catch (e) {
        this.snackbarText = 'Ошибка при оформлении заказа';
        this.snackbar = true;
      }
    },
    logout() {
      this.setUser(null);
      localStorage.removeItem('zooUser');
      this.$router.push('/login');
    },
  },
};
</script>