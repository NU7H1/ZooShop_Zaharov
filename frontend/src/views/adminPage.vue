<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-icon color="#FF8C00" class="mr-2" size="28">mdi-shield-crown</v-icon>
      <h2 class="text-h5 font-weight-bold">Панель администратора</h2>
    </div>

    <v-tabs v-model="tab" color="#FF8C00" class="mb-6">
      <v-tab value="orders">
        <v-icon start>mdi-package-variant</v-icon>
        Заказы
      </v-tab>
      <v-tab value="products">
        <v-icon start>mdi-store</v-icon>
        Товары
      </v-tab>
    </v-tabs>

    <div v-if="tab === 'orders'">
      <v-btn-toggle
        v-model="orderFilter"
        color="#FF8C00"
        variant="tonal"
        divided
        density="compact"
        class="mb-5 flex-wrap"
      >
        <v-btn value="all" size="small">Все</v-btn>
        <v-btn value="pending" size="small">Обрабатывается</v-btn>
        <v-btn value="collected" size="small">Собран</v-btn>
        <v-btn value="shipped" size="small">Отправлен</v-btn>
        <v-btn value="done" size="small">Завершён</v-btn>
        <v-btn value="cancelled" size="small">Отменён</v-btn>
      </v-btn-toggle>

      <div v-if="loadingOrders" class="text-center py-10">
        <v-progress-circular indeterminate color="#FF8C00" />
      </div>

      <div v-else-if="filteredOrders.length === 0" class="text-center py-10">
        <v-icon size="64" color="grey-lighten-1">mdi-package-variant-closed</v-icon>
        <div class="text-body-1 text-grey mt-3">Заказов нет</div>
        <div class="text-caption text-grey mt-1">
          Заказы появятся здесь когда клиенты оформят их через корзину
        </div>
      </div>

      <v-card
        v-for="order in filteredOrders"
        :key="order.id"
        variant="outlined"
        rounded="lg"
        class="mb-4"
        style="border-color: #FFE0B2;"
      >
        <v-card-text>
          <div class="d-flex align-center justify-space-between mb-3">
            <div>
              <div class="font-weight-bold">Заказ #{{ order.id }}</div>
              <div class="text-caption text-grey-darken-1">
                {{ order.userName }} · {{ formatDate(order.createdAt) }}
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

          <div class="d-flex align-center justify-space-between">
            <span class="font-weight-bold" style="color: #FF8C00;">
              Итого: {{ order.total }} ₽
            </span>
            <v-select
              :model-value="order.status"
              @update:model-value="updateStatus(order, $event)"
              :items="statusOptions"
              item-title="label"
              item-value="value"
              density="compact"
              variant="outlined"
              hide-details
              style="max-width: 200px;"
              color="#FF8C00"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>

    <div v-if="tab === 'products'">
      <div v-if="loadingProducts" class="text-center py-10">
        <v-progress-circular indeterminate color="#FF8C00" />
      </div>

      <v-row v-else>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12" sm="6" md="4" lg="3"
        >
          <v-card
            variant="outlined"
            class="h-100 d-flex flex-column"
            :style="{
              borderColor: product.hidden ? '#ccc' : '#FF8C00',
              opacity: product.hidden ? 0.5 : 1,
            }"
            rounded="lg"
          >
            <v-img :src="product.image" height="140" cover class="bg-grey-lighten-2" />
            <v-card-title class="text-subtitle-2 font-weight-bold pt-2 text-black">
              {{ product.name }}
            </v-card-title>
            <v-card-text class="flex-grow-1 py-1">
              <div class="font-weight-bold" style="color: #FF8C00;">{{ product.price }} ₽</div>
              <v-chip v-if="product.hidden" size="x-small" color="grey" variant="tonal" class="mt-1">
                Скрыт
              </v-chip>
            </v-card-text>
            <v-card-actions class="pb-3">
              <v-btn
                :color="product.hidden ? 'green' : 'grey'"
                variant="tonal"
                block
                size="small"
                @click="toggleVisibility(product)"
              >
                <v-icon start size="16">
                  {{ product.hidden ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
                {{ product.hidden ? 'Показать' : 'Скрыть' }}
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
import allProducts from '../assets/products.json';

export default {
  name: 'adminPage',
  inject: ['orderService'],
  data() {
    return {
      tab: 'orders',
      orders: [],
      products: allProducts.map(p => ({ ...p, hidden: p.hidden || false })),
      orderFilter: 'all',
      loadingOrders: false,
      loadingProducts: false,
      snackbar: false,
      snackbarText: '',
      statusOptions: [
        { value: 'pending',   label: 'Обрабатывается' },
        { value: 'collected', label: 'Собран' },
        { value: 'shipped',   label: 'Отправлен' },
        { value: 'done',      label: 'Завершён' },
        { value: 'cancelled', label: 'Отменён' },
      ],
    };
  },
  computed: {
    filteredOrders() {
      if (this.orderFilter === 'all') return this.orders;
      return this.orders.filter(o => o.status === this.orderFilter);
    },
  },
  mounted() {
    this.loadOrders();
  },
  methods: {
    async loadOrders() {
      this.loadingOrders = true;
      try {
        this.orders = await this.orderService.getOrders(null, 'admin');
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingOrders = false;
      }
    },
    async updateStatus(order, newStatus) {
      try {
        await this.orderService.updateStatus(order.id, newStatus);
        order.status = newStatus;
        this.snackbarText = 'Статус обновлён';
        this.snackbar = true;
      } catch (e) {
        this.snackbarText = 'Ошибка обновления статуса';
        this.snackbar = true;
      }
    },
    async toggleVisibility(product) {
      try {
        const res = await fetch(`http://localhost:3021/api/products/${product.id}/visibility`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hidden: !product.hidden }),
        });
        const updated = await res.json();
        product.hidden = updated.hidden;
        this.snackbarText = updated.hidden ? 'Товар скрыт' : 'Товар показан';
        this.snackbar = true;
      } catch (e) {
        console.error(e);
        this.snackbarText = 'Ошибка';
        this.snackbar = true;
      }
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