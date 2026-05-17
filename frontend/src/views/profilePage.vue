<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-icon color="#FF8C00" class="mr-2" size="28">mdi-account-circle</v-icon>
      <h2 class="text-h5 font-weight-bold">Профиль</h2>
    </div>

    <v-card variant="outlined" style="border-color: #FF8C00;" rounded="lg" class="mb-6 pa-4">
      <div class="d-flex align-center">
        <v-avatar color="#FF8C00" size="56" class="mr-4">
          <v-icon size="32" color="white">mdi-account</v-icon>
        </v-avatar>
        <div>
          <div class="text-h6 font-weight-bold">{{ userName }}</div>
          <v-chip size="x-small" color="#FF8C00" variant="tonal" class="mt-1">
            {{ userRole === 'admin' ? 'Администратор' : 'Клиент' }}
          </v-chip>
        </div>
      </div>
    </v-card>

    <v-tabs v-model="tab" color="#FF8C00" class="mb-4">
      <v-tab value="orders">
        <v-icon start>mdi-package-variant</v-icon>
        Мои заказы
      </v-tab>
      <v-tab value="favorites">
        <v-icon start>mdi-heart</v-icon>
        Избранное
      </v-tab>
    </v-tabs>

    <div v-if="tab === 'orders'">
      <div v-if="loading" class="text-center py-10">
        <v-progress-circular indeterminate color="#FF8C00" />
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-10">
        <v-icon size="64" color="grey-lighten-1">mdi-package-variant-closed</v-icon>
        <div class="text-body-1 text-grey mt-3">Заказов пока нет</div>
      </div>

      <v-card
        v-for="order in orders"
        :key="order.id"
        variant="outlined"
        rounded="lg"
        class="mb-4"
        style="border-color: #FFE0B2;"
      >
        <v-card-text>
          <div class="d-flex align-center justify-space-between mb-3">
            <div>
              <div class="text-body-2 font-weight-bold">Заказ #{{ order.id }}</div>
              <div class="text-caption text-grey-darken-1">
                {{ formatDate(order.createdAt) }}
              </div>
            </div>
            <v-chip :color="statusColor(order.status)" size="small" variant="tonal">
              {{ statusLabel(order.status) }}
            </v-chip>
          </div>

          <v-divider class="mb-3" />

          <div
            v-for="item in order.items"
            :key="item.id"
            class="d-flex justify-space-between text-body-2 mb-1"
          >
            <span class="text-grey-darken-1">{{ item.name }} × {{ item.qty }}</span>
            <span class="font-weight-bold">{{ item.price * item.qty }} ₽</span>
          </div>

          <v-divider class="my-3" />

          <div class="d-flex justify-space-between">
            <span class="font-weight-bold">Итого:</span>
            <span class="font-weight-bold" style="color: #FF8C00;">{{ order.total }} ₽</span>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <div v-if="tab === 'favorites'">
      <div v-if="favorites.length === 0" class="text-center py-10">
        <v-icon size="64" color="grey-lighten-1">mdi-heart-outline</v-icon>
        <div class="text-body-1 text-grey mt-3">Избранное пусто</div>
      </div>

      <v-row>
        <v-col
          v-for="product in favorites"
          :key="product.id"
          cols="12" sm="6" md="4" lg="3"
        >
          <v-card variant="outlined" class="h-100 d-flex flex-column" style="border-color: #ff8c00;">
            <v-img :src="product.image" height="160" cover class="bg-grey-lighten-2" />
            <v-card-title class="text-subtitle-1 font-weight-bold pt-3 text-black">
              {{ product.name }}
            </v-card-title>
            <v-card-text class="flex-grow-1">
              <div class="text-body-2 text-grey-darken-1 mb-1">{{ product.description }}</div>
              <div class="font-weight-bold" style="color: #FF8C00;">{{ product.price }} ₽</div>
            </v-card-text>
            <v-card-actions class="pt-0 pb-3" style="gap: 8px;">
              <v-btn color="#FF8C00" variant="flat" style="flex:1" @click="addToCartLocal(product)">
                <v-icon start size="16">mdi-cart-plus</v-icon>
                В корзину
              </v-btn>
              <v-btn color="red" variant="tonal" icon @click="removeFavorite(product.id)">
                <v-icon size="18">mdi-heart-off</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-snackbar v-model="snackbar" :timeout="2000" color="#FF8C00">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'profilePage',
  inject: ['getFavorites', 'removeFromFavorites', 'addToCart', 'orderService'],
  data() {
    return {
      tab: 'orders',
      orders: [],
      loading: false,
      snackbar: false,
      snackbarText: '',
      userName: sessionStorage.getItem('userName') || '',
      userRole: sessionStorage.getItem('userRole') || 'client',
    };
  },
  computed: {
    favorites() {
      return this.getFavorites();
    },
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      this.loading = true;
      try {
        const userId = sessionStorage.getItem('userId');
        const role = sessionStorage.getItem('userRole');
        this.orders = await this.orderService.getOrders(userId, role);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    addToCartLocal(product) {
      this.addToCart(product, 1);
      this.snackbarText = `«${product.name}» добавлен в корзину`;
      this.snackbar = true;
    },
    removeFavorite(id) {
      this.removeFromFavorites(id);
    },
    formatDate(iso) {
      return new Date(iso).toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    },
    statusLabel(status) {
      return {
        pending:   'Обрабатывается',
        collected: 'Собран',
        shipped:   'Отправлен',
        done:      'Завершён',
        cancelled: 'Отменён',
      }[status] ?? status;
    },
    statusColor(status) {
      return {
        pending:   'orange',
        collected: 'blue',
        shipped:   'purple',
        done:      'green',
        cancelled: 'red',
      }[status] ?? 'grey';
    },
  },
};
</script>