<template>
  <div>
    <v-card color="#FF8C00" dark class="pa-5 mb-8" rounded="lg">
      <v-card-title class="text-h4">Лучшие предложения недели!</v-card-title>
      <v-card-text class="text-h6">
        Скидка 20% на корма для кошек и собак
      </v-card-text>
      <v-btn variant="outlined" color="white" to="/sales">
        <v-icon start>mdi-sale</v-icon>
        Акции
      </v-btn>
    </v-card>

    <h2 class="text-h5 font-weight-bold mb-4">Популярные товары</h2>

    <div v-if="loading" class="text-center py-10">
      <v-progress-circular indeterminate color="#FF8C00" />
    </div>

    <v-row v-else>
      <v-col
        v-for="product in featuredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          variant="outlined"
          class="h-100 d-flex flex-column product-card"
          style="border-color: #ff8c00; cursor: pointer;"
          @click="openProduct(product)"
        >
          <v-img :src="product.image" height="180" cover class="bg-grey-lighten-2" />
          <v-card-title class="text-h6 font-weight-bold pt-3 text-black">
            {{ product.name }}
          </v-card-title>
          <v-card-text class="flex-grow-1">
            <div class="text-body-2 text-grey-darken-1 mb-2">{{ product.description }}</div>
            <div class="text-h6 font-weight-bold" style="color: #ff8c00">{{ product.price }} ₽</div>
          </v-card-text>
          <v-card-actions class="pt-0 pb-3 d-flex" style="gap: 8px;">
            <v-btn color="#FF8C00" variant="flat" style="flex:1" @click.stop="addToCartLocal(product)">
              <v-icon start>mdi-cart-plus</v-icon>
              В корзину
            </v-btn>
            <v-btn
              v-if="loggedIn"
              :color="isFavorite(product.id) ? 'red' : 'grey'"
              variant="tonal"
              icon
              @click.stop="toggleFavorite(product)"
            >
              <v-icon size="18">{{ isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="productDialog" max-width="700" scrollable>
      <v-card v-if="selectedProduct" rounded="xl">
        <v-btn
          icon
          variant="text"
          style="position:absolute;top:12px;right:12px;z-index:10;"
          @click="productDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row no-gutters>
          <v-col cols="12" sm="5">
            <v-img :src="selectedProduct.image" height="320" cover style="border-radius: 24px 0 0 24px;" />
          </v-col>
          <v-col cols="12" sm="7">
            <v-card-text class="pa-6">
              <h2 class="text-h5 font-weight-bold text-black mb-2">{{ selectedProduct.name }}</h2>
              <p class="text-body-1 text-grey-darken-1 mb-4">{{ selectedProduct.description }}</p>
              <v-divider class="mb-4" />
              <div class="text-h4 font-weight-bold mb-6" style="color: #FF8C00">{{ selectedProduct.price }} ₽</div>
              <v-btn color="#FF8C00" variant="flat" block size="large" class="mb-2" @click="addToCartFromDialog">
                <v-icon start>mdi-cart-plus</v-icon>
                В корзину
              </v-btn>
              <v-btn
                v-if="loggedIn"
                :color="isFavorite(selectedProduct.id) ? 'red' : '#FF8C00'"
                variant="outlined"
                block
                size="large"
                @click="toggleFavorite(selectedProduct)"
              >
                <v-icon start>{{ isFavorite(selectedProduct.id) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                {{ isFavorite(selectedProduct.id) ? 'Убрать из избранного' : 'В избранное' }}
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="2000" color="#FF8C00">{{ snackbarText }}</v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  inject: [
    'addToCart',
    'toggleFavorite',
    'isFavorite',
    'isLoggedIn',
    'productService',
  ],
  data() {
    return {
      loading: false,
      featuredProducts: [],
      productDialog: false,
      selectedProduct: null,
      snackbar: false,
      snackbarText: '',
    };
  },
  computed: {
    loggedIn() {
      return this.isLoggedIn();
    },
  },
  mounted() {
    this.loadFeatured();
  },
  methods: {
    async loadFeatured() {
      this.loading = true;
      try {
        const products = await this.productService.getProducts();
        this.featuredProducts = products.filter(p => !p.hidden).slice(0, 4);
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    openProduct(product) {
      this.selectedProduct = product;
      this.productDialog = true;
    },
    addToCartLocal(product) {
      this.addToCart(product, 1);
      this.snackbarText = `«${product.name}» добавлен в корзину`;
      this.snackbar = true;
    },
    addToCartFromDialog() {
      this.addToCart(this.selectedProduct, 1);
      this.snackbarText = `«${this.selectedProduct.name}» добавлен в корзину`;
      this.snackbar = true;
      this.productDialog = false;
    },
  },
};
</script>

<style scoped>
.product-card {
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.product-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 24px rgba(255, 140, 0, 0.18) !important;
}
</style>
