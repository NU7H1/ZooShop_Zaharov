<template>
  <div>
    <div class="d-flex justify-center mb-6">
      <v-btn-toggle
        v-model="selectedCategory"
        divided
        mandatory
        color="#FF8C00"
      >
        <v-btn value="all" variant="tonal">
          <v-icon left>mdi-package-variant</v-icon>
          Все товары
        </v-btn>
        <v-btn value="cat" variant="tonal">
          <v-icon left>mdi-cat</v-icon>
          Кошки
        </v-btn>
        <v-btn value="dog" variant="tonal">
          <v-icon left>mdi-dog</v-icon>
          Собаки
        </v-btn>
      </v-btn-toggle>
    </div>
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          variant="outlined"
          class="h-100 d-flex flex-column"
          style="border-color: #ff8c00"
        >
          <v-img
            :src="product.image"
            height="180"
            cover
            class="bg-grey-lighten-2"
          />
          <v-card-title
            class="text-h6 font-weight-bold pt-3"
            style="color: #000000"
          >
            {{ product.name }}
          </v-card-title>
          <v-card-text class="flex-grow-1">
            <div class="text-body-2 text-grey-darken-1 mb-2">
              {{ product.description }}
            </div>
            <div class="text-h6 font-weight-bold" style="color: #ff8c00">
              {{ product.price }} ₽
            </div>
          </v-card-text>
          <v-card-actions class="pt-0 pb-3">
            <v-btn
              color="#FF8C00"
              variant="flat"
              block
              @click="addToCart(product)"
            >
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
export default {
  name: 'mainPage',
  data() {
    return {
      selectedCategory: 'all',
      snackbar: false,
      products: [
        {
          id: 1,
          name: 'Корм для кошек "Премиум"',
          description: 'Сухой корм с курицей, 2 кг',
          price: 1250,
          category: 'cat',
          image:
            'https://via.placeholder.com/400x300/FFD966/FFFFFF?text=Cat+Food',
        },
        {
          id: 2,
          name: 'Игрушка-мышка для кошек',
          description: '3 шт, с кошачьей мятой',
          price: 350,
          category: 'cat',
          image:
            'https://via.placeholder.com/400x300/FFB3BA/FFFFFF?text=Cat+Toy',
        },
        {
          id: 3,
          name: 'Когтеточка-домик',
          description: 'Компактная, 45x45 см',
          price: 2890,
          category: 'cat',
          image:
            'https://via.placeholder.com/400x300/FFD700/FFFFFF?text=Scratcher',
        },
        {
          id: 4,
          name: 'Корм для собак "Энерджи"',
          description: 'Сухой корм с ягнёнком, 3 кг',
          price: 1890,
          category: 'dog',
          image:
            'https://via.placeholder.com/400x300/9AD0F5/FFFFFF?text=Dog+Food',
        },
        {
          id: 5,
          name: 'Мячик для собак',
          description: 'Прорезиненный, светится в темноте',
          price: 420,
          category: 'dog',
          image:
            'https://via.placeholder.com/400x300/F4C2C2/FFFFFF?text=Dog+Ball',
        },
        {
          id: 6,
          name: 'Шлейка для собак',
          description: 'Регулируемая, размер M',
          price: 750,
          category: 'dog',
          image:
            'https://via.placeholder.com/400x300/CCE7E8/FFFFFF?text=Harness',
        },
        {
          id: 7,
          name: 'Наполнитель для лотка',
          description: 'Комкующийся, 10 л',
          price: 590,
          category: 'cat',
          image:
            'https://via.placeholder.com/400x300/E0E0E0/FFFFFF?text=Litter',
        },
        {
          id: 8,
          name: 'Витамины для шерсти',
          description: 'Биотин + таурин, 60 таблеток',
          price: 480,
          category: 'all',
          image:
            'https://via.placeholder.com/400x300/B0C4DE/FFFFFF?text=Vitamins',
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === 'all') {
        return this.products;
      }
      return this.products.filter(
        (p) => p.category === this.selectedCategory || p.category === 'all'
      );
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
