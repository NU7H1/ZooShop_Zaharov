<template>
  <div>
    <v-card color="#FF8C00" dark class="pa-5 mb-8" rounded="lg">
      <v-card-title class="text-h4">Лучшие предложения недели!</v-card-title>
      <v-card-text class="text-h6">
        Скидка 20% на корма для кошек и собак
      </v-card-text>
      <v-btn variant="outlined" color="white" to="/shop">Перейти в магазин</v-btn>
    </v-card>

    <h2 class="text-h5 font-weight-bold mb-4">Популярные товары</h2>
    <v-row>
      <v-col v-for="product in featuredProducts" :key="product.id" cols="12" sm="6" md="3">
        <v-card variant="outlined" style="border-color: #ff8c00">
          <v-img :src="product.image" height="160" cover />
          <v-card-title class="text-subtitle-1 font-weight-bold">{{ product.name }}</v-card-title>
          <v-card-text class="text-orange font-weight-bold">{{ product.price }} ₽</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'mainPage',
  data() {
    return {
      featuredProducts: [
        { id: 1, name: 'Корм для кошек "Премиум"', price: 1250, image: 'https://via.placeholder.com/400x300/FFD966/FFFFFF?text=Корм' },
        { id: 4, name: 'Корм для собак "Энерджи"', price: 1890, image: 'https://via.placeholder.com/400x300/9AD0F5/FFFFFF?text=Корм' },
        { id: 7, name: 'Витамины для шерсти', price: 480, image: 'https://via.placeholder.com/400x300/B0C4DE/FFFFFF?text=Витамины' },
      ],
    };
  },
};
</script>