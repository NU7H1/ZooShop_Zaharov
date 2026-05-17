<template>
  <div>
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <v-card variant="outlined" class="h-100 d-flex flex-column" style="border-color: #ff8c00">
          <v-img :src="product.image" height="180" cover class="bg-grey-lighten-2" />
          <v-card-title class="text-h6 font-weight-bold pt-3 text-black">
            {{ product.name }}
          </v-card-title>
          <v-card-text class="flex-grow-1">
            <div class="text-body-2 text-grey-darken-1 mb-2">{{ product.description }}</div>
            <div class="text-h6 font-weight-bold" style="color: #ff8c00">{{ product.price }} ₽</div>
          </v-card-text>
          <v-card-actions class="pt-0 pb-3">
            <v-btn color="#FF8C00" variant="flat" block @click="addToCart(product)">
              <v-icon left>mdi-cart-plus</v-icon>
              В корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="2000" color="#FF8C00">
      Товар добавлен в корзину
    </v-snackbar>
  </div>
</template>

<script>
import { filterStore } from '../store/filterStore';   // <- ИСПРАВЛЕНО
import allProducts from '../assets/products.json';    // <- путь к products.json в src/assets

export default {
  name: 'shopPage',
  data() {
    return {
      snackbar: false,
      allProducts: allProducts,
    };
  },
  computed: {
    selectedCategory() {
      return this.$route.query.category || 'common';
    },
    filteredProducts() {
      let result = this.allProducts;
      if (this.selectedCategory === 'common') {
        result = result.filter(p => p.category === 'common');
      } else if (this.selectedCategory === 'cat') {
        result = result.filter(p => p.category === 'cat');
      } else if (this.selectedCategory === 'dog') {
        result = result.filter(p => p.category === 'dog');
      }
      if (filterStore.priceMin !== null) {
        result = result.filter(p => p.price >= filterStore.priceMin);
      }
      if (filterStore.priceMax !== null) {
        result = result.filter(p => p.price <= filterStore.priceMax);
      }
      return result;
    },
  },
  methods: {
    addToCart(product) {
      this.snackbar = true;
      console.log('Добавлено в корзину:', product.name);
    },
  },
};
</script>