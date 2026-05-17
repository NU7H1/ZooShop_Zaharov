<template>
  <v-navigation-drawer v-model="drawer" location="right" temporary width="300" app>
    <v-list>
      <v-list-subheader>Фильтры</v-list-subheader>
      <v-list-item>
        <v-range-slider v-model="priceRange" :min="0" :max="3000" step="100" label="Цена" thumb-label="always" class="mt-4"></v-range-slider>
      </v-list-item>
      <v-list-item>
        <v-btn color="#FF8C00" block @click="applyFilters">Применить</v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn variant="text" block @click="resetFilters">Сбросить</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { filterStore } from '../../store/filterStore';   // <- ИСПРАВЛЕНО

export default {
  name: 'FilterDrawer',
  data() {
    return {
      drawer: false,
      priceRange: [0, 3000],
    };
  },
  methods: {
    open() { this.drawer = true; },
    applyFilters() {
      filterStore.setPriceRange(this.priceRange[0], this.priceRange[1]);
      this.drawer = false;
    },
    resetFilters() {
      filterStore.resetFilters();
      this.priceRange = [0, 3000];
      this.drawer = false;
    },
  },
};
</script>