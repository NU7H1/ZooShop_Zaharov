<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-5">
      <h2 class="text-h5 font-weight-bold">
        <v-icon color="#FF8C00" class="mr-1">{{ categoryIcon }}</v-icon>
        {{ pageTitle }}
        <span v-if="searchQuery" class="text-body-1 text-grey-darken-1 ml-2">
          — поиск: «{{ searchQuery }}»
        </span>
      </h2>
      <v-btn color="#FF8C00" variant="tonal" prepend-icon="mdi-tune" @click="filterDrawer = true">
        Фильтр
        <v-badge v-if="activeFiltersCount > 0" :content="activeFiltersCount" color="black" inline class="ml-1" />
      </v-btn>
    </div>

    <!-- Нет результатов -->
    <div v-if="filteredProducts.length === 0" class="text-center py-16">
      <v-icon size="72" color="grey-lighten-1">mdi-magnify-close</v-icon>
      <div class="text-h6 text-grey mt-3">Ничего не найдено</div>
      <div class="text-body-2 text-grey-darken-1 mt-1">Попробуйте изменить запрос или фильтры</div>
    </div>

    <!-- Сетка товаров -->
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12" sm="6" md="4" lg="3"
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
          <v-card-actions class="pt-0 pb-3">
            <v-btn color="#FF8C00" variant="flat" block @click.stop="addToCartLocal(product)">
              <v-icon left>mdi-cart-plus</v-icon>
              В корзину
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Модалка товара -->
    <v-dialog v-model="productDialog" max-width="700" scrollable>
      <v-card v-if="selectedProduct" rounded="xl">
        <v-btn icon variant="text" style="position:absolute;top:12px;right:12px;z-index:10;" @click="productDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-row no-gutters>
          <v-col cols="12" sm="5">
            <v-img :src="selectedProduct.image" height="320" cover style="border-radius: 24px 0 0 24px;" />
          </v-col>
          <v-col cols="12" sm="7">
            <v-card-text class="pa-6">
              <v-chip size="small" :color="categoryChipColor(selectedProduct.category)" variant="tonal" class="mb-3">
                <v-icon start size="14">{{ categoryChipIcon(selectedProduct.category) }}</v-icon>
                {{ categoryChipLabel(selectedProduct.category) }}
              </v-chip>
              <h2 class="text-h5 font-weight-bold text-black mb-2">{{ selectedProduct.name }}</h2>
              <p class="text-body-1 text-grey-darken-1 mb-4">{{ selectedProduct.description }}</p>
              <v-divider class="mb-4" />
              <div class="d-flex align-center mb-6">
                <span class="text-h4 font-weight-bold" style="color: #FF8C00">{{ selectedProduct.price }} ₽</span>
                <v-chip size="small" color="green" variant="tonal" class="ml-3">
                  <v-icon start size="12">mdi-check-circle</v-icon>
                  В наличии
                </v-chip>
              </div>
              <div class="d-flex align-center mb-5">
                <span class="text-body-2 text-grey-darken-1 mr-4">Количество:</span>
                <v-btn icon size="small" variant="outlined" color="#FF8C00" @click="qty > 1 && qty--">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="mx-4 text-h6 font-weight-bold">{{ qty }}</span>
                <v-btn icon size="small" variant="outlined" color="#FF8C00" @click="qty++">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="text-body-2 text-grey-darken-1 mb-5">
                Итого: <span class="font-weight-bold text-black">{{ selectedProduct.price * qty }} ₽</span>
              </div>
              <v-btn color="#FF8C00" variant="flat" block size="large" class="mb-2" @click="addToCartFromDialog">
                <v-icon left>mdi-cart-plus</v-icon>
                В корзину
              </v-btn>
              <v-btn variant="outlined" color="#FF8C00" block size="large">
                <v-icon left>mdi-heart-outline</v-icon>
                В избранное
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <!-- Фильтр-панель -->
    <v-navigation-drawer v-model="filterDrawer" location="right" temporary width="300">
      <div class="pa-4">
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="text-h6 font-weight-bold">Фильтры</span>
          <v-btn icon size="small" variant="text" @click="filterDrawer = false"><v-icon>mdi-close</v-icon></v-btn>
        </div>
        <v-divider class="mb-4" />
        <div class="mb-4">
          <div class="text-subtitle-2 font-weight-bold mb-2 text-grey-darken-2">
            <v-icon size="16" class="mr-1">mdi-tag-outline</v-icon> Категория
          </div>
          <v-btn-toggle v-model="filterCategory" color="#FF8C00" variant="tonal" divided density="compact" class="flex-wrap">
            <v-btn value="all" size="small"><v-icon size="16" start>mdi-apps</v-icon>Все</v-btn>
            <v-btn value="common" size="small"><v-icon size="16" start>mdi-package-variant</v-icon>Общие</v-btn>
            <v-btn value="cat" size="small"><v-icon size="16" start>mdi-cat</v-icon>Кошки</v-btn>
            <v-btn value="dog" size="small"><v-icon size="16" start>mdi-dog</v-icon>Собаки</v-btn>
          </v-btn-toggle>
        </div>
        <v-divider class="mb-4" />
        <div class="mb-4">
          <div class="text-subtitle-2 font-weight-bold mb-1 text-grey-darken-2">
            <v-icon size="16" class="mr-1">mdi-currency-rub</v-icon> Цена: до {{ priceMax }} ₽
          </div>
          <v-slider v-model="priceMax" :min="100" :max="3000" :step="50" color="#FF8C00" track-color="#FFE0B2" hide-details thumb-label />
          <div class="d-flex justify-space-between text-caption text-grey"><span>100 ₽</span><span>3 000 ₽</span></div>
        </div>
        <v-divider class="mb-4" />
        <div class="mb-6">
          <div class="text-subtitle-2 font-weight-bold mb-2 text-grey-darken-2">
            <v-icon size="16" class="mr-1">mdi-sort</v-icon> Сортировка
          </div>
          <v-radio-group v-model="sortBy" hide-details density="compact">
            <v-radio label="По умолчанию" value="default" color="#FF8C00" />
            <v-radio label="Цена: по возрастанию" value="price_asc" color="#FF8C00" />
            <v-radio label="Цена: по убыванию" value="price_desc" color="#FF8C00" />
            <v-radio label="По названию" value="name" color="#FF8C00" />
          </v-radio-group>
        </div>
        <v-btn color="#FF8C00" variant="flat" block class="mb-2" @click="filterDrawer = false">Применить</v-btn>
        <v-btn variant="outlined" color="#FF8C00" block @click="resetFilters">Сбросить</v-btn>
      </div>
    </v-navigation-drawer>

    <v-snackbar v-model="snackbar" :timeout="2000" color="#FF8C00">{{ snackbarText }}</v-snackbar>
  </div>
</template>

<script>
import allProducts from '../assets/products.json';

const CATEGORY_META = {
  all:    { label: 'Магазин',      icon: 'mdi-store' },
  common: { label: 'Общие товары', icon: 'mdi-package-variant' },
  cat:    { label: 'Кошки',        icon: 'mdi-cat' },
  dog:    { label: 'Собаки',       icon: 'mdi-dog' },
};

export default {
  name: 'shopPage',
  inject: ['getCart', 'addToCart', 'getSearch'],
  data() {
    return {
      filterDrawer: false,
      filterCategory: 'all',
      priceMax: 3000,
      sortBy: 'default',
      snackbar: false,
      snackbarText: '',
      allProducts: allProducts,
      productDialog: false,
      selectedProduct: null,
      qty: 1,
    };
  },
  computed: {
    searchQuery() {
      return this.getSearch();
    },
    routeCategory() {
      return this.$route.query.category || 'all';
    },
    pageTitle() {
      return CATEGORY_META[this.routeCategory]?.label ?? 'Магазин';
    },
    categoryIcon() {
      return CATEGORY_META[this.routeCategory]?.icon ?? 'mdi-store';
    },
    activeFiltersCount() {
      let count = 0;
      if (this.filterCategory !== 'all') count++;
      if (this.priceMax < 3000) count++;
      if (this.sortBy !== 'default') count++;
      return count;
    },
    filteredProducts() {
      let result = [...this.allProducts];

      // Фильтр по категории из URL
      if (this.routeCategory !== 'all') {
        result = result.filter(p => p.category === this.routeCategory);
      } else if (this.filterCategory !== 'all') {
        result = result.filter(p => p.category === this.filterCategory);
      }

      // Поиск по названию
      if (this.searchQuery && this.searchQuery.trim()) {
        const q = this.searchQuery.trim().toLowerCase();
        result = result.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      }

      // Цена
      result = result.filter(p => p.price <= this.priceMax);

      // Сортировка
      if (this.sortBy === 'price_asc')  result.sort((a, b) => a.price - b.price);
      if (this.sortBy === 'price_desc') result.sort((a, b) => b.price - a.price);
      if (this.sortBy === 'name')       result.sort((a, b) => a.name.localeCompare(b.name));

      return result;
    },
  },
  watch: {
    routeCategory(val) {
      this.filterCategory = val === 'all' ? 'all' : val;
    },
    productDialog(val) {
      if (!val) this.qty = 1;
    },
  },
  methods: {
    openProduct(product) {
      this.selectedProduct = product;
      this.qty = 1;
      this.productDialog = true;
    },
    addToCartLocal(product) {
      this.addToCart(product, 1);
      this.snackbarText = `«${product.name}» добавлен в корзину`;
      this.snackbar = true;
    },
    addToCartFromDialog() {
      this.addToCart(this.selectedProduct, this.qty);
      this.snackbarText = `«${this.selectedProduct.name}» × ${this.qty} добавлено`;
      this.snackbar = true;
      this.productDialog = false;
    },
    categoryChipLabel(cat) {
      return { common: 'Общее', cat: 'Кошки', dog: 'Собаки' }[cat] ?? cat;
    },
    categoryChipIcon(cat) {
      return { common: 'mdi-package-variant', cat: 'mdi-cat', dog: 'mdi-dog' }[cat] ?? 'mdi-tag';
    },
    categoryChipColor(cat) {
      return { common: 'blue', cat: 'purple', dog: 'teal' }[cat] ?? 'grey';
    },
    resetFilters() {
      this.filterCategory = 'all';
      this.priceMax = 3000;
      this.sortBy = 'default';
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