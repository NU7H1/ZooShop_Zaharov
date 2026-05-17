<template>
  <div>
    <div class="d-flex align-center mb-6">
      <v-icon color="#FF8C00" class="mr-2" size="28">mdi-sale</v-icon>
      <h2 class="text-h5 font-weight-bold">Акции</h2>
    </div>

    <!-- Баннеры акций -->
    <v-row class="mb-6">
      <v-col v-for="promo in promos" :key="promo.id" cols="12" sm="6" md="4">
        <v-card :color="promo.color" rounded="lg" class="pa-4" flat>
          <div class="d-flex align-center mb-2">
            <v-icon color="white" class="mr-2">{{ promo.icon }}</v-icon>
            <span class="text-white font-weight-bold text-h6">{{ promo.title }}</span>
          </div>
          <p class="text-white text-body-2 mb-3">{{ promo.description }}</p>
          <v-chip color="white" text-color="#FF8C00" size="small" variant="flat">
            До {{ promo.until }}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>

    <!-- Товары со скидкой -->
    <h3 class="text-h6 font-weight-bold mb-4">Товары по акции</h3>
    <v-row>
      <v-col
        v-for="product in saleProducts"
        :key="product.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card variant="outlined" class="h-100 d-flex flex-column" style="border-color: #ff8c00;">
          <div style="position: relative;">
            <v-img :src="product.image" height="180" cover class="bg-grey-lighten-2" />
            <v-chip
              color="#FF8C00"
              size="small"
              variant="flat"
              style="position: absolute; top: 8px; left: 8px; color: white; font-weight: bold;"
            >
              -{{ product.discount }}%
            </v-chip>
          </div>

          <v-card-title class="text-subtitle-1 font-weight-bold pt-3 text-black">
            {{ product.name }}
          </v-card-title>
          <v-card-text class="flex-grow-1">
            <div class="text-body-2 text-grey-darken-1 mb-2">{{ product.description }}</div>
            <div class="d-flex align-center gap-2">
              <span class="text-h6 font-weight-bold" style="color: #FF8C00;">
                {{ discountedPrice(product) }} ₽
              </span>
              <span class="text-body-2 text-grey text-decoration-line-through ml-2">
                {{ product.price }} ₽
              </span>
            </div>
          </v-card-text>
          <v-card-actions class="pt-0 pb-3">
            <v-btn color="#FF8C00" variant="flat" block @click="addToCartLocal(product)">
              <v-icon left>mdi-cart-plus</v-icon>
              В корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="2000" color="#FF8C00">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import allProducts from '../assets/products.json';

export default {
  name: 'salesPage',
  inject: ['addToCart'],
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      promos: [
        {
          id: 1,
          title: 'Скидка 20% на корма',
          description: 'На все виды сухих кормов для кошек и собак',
          icon: 'mdi-food',
          color: '#FF8C00',
          until: '31 мая',
        },
        {
          id: 2,
          title: 'Игрушки 2 по цене 1',
          description: 'При покупке двух игрушек — третья в подарок',
          icon: 'mdi-toy-brick',
          color: '#E67E22',
          until: '25 мая',
        },
        {
          id: 3,
          title: 'Бесплатная доставка',
          description: 'При заказе от 2000 ₽ доставка бесплатно',
          icon: 'mdi-truck-delivery',
          color: '#D35400',
          until: '1 июня',
        },
      ],
      // берём первые 8 товаров и добавляем им скидку
      saleProducts: allProducts.slice(0, 8).map((p, i) => ({
        ...p,
        discount: [10, 15, 20, 25][i % 4],
      })),
    };
  },
  methods: {
    discountedPrice(product) {
      return Math.round(product.price * (1 - product.discount / 100));
    },
    addToCartLocal(product) {
      this.addToCart(product, 1);
      this.snackbarText = `«${product.name}» добавлен в корзину`;
      this.snackbar = true;
    },
  },
};
</script>