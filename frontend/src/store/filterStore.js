import { reactive } from 'vue';

export const filterStore = reactive({
  priceMin: null,
  priceMax: null,
  setPriceRange(min, max) {
    this.priceMin = min;
    this.priceMax = max;
  },
  resetFilters() {
    this.priceMin = null;
    this.priceMax = null;
  }
});