<template>
  <v-app-bar color="#000000" dark flat app elevation="2">
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')" />

    <div class="d-flex align-center">
      <v-icon color="#FF8C00">mdi-store</v-icon>
      <v-toolbar-title class="ml-2 text-white">ЗооМаркет</v-toolbar-title>
    </div>

    <v-spacer />

    <v-text-field
      density="compact"
      variant="solo"
      placeholder="Поиск товаров"
      prepend-inner-icon="mdi-magnify"
      hide-details
      single-line
      class="mx-4"
      style="max-width: 300px"
      bg-color="white"
    />

    <v-btn icon style="color: white" class="mr-2" @click="openFilterDrawer">
      <v-icon>mdi-tune</v-icon>
    </v-btn>

    <v-btn icon style="color: white">
      <v-badge color="#FF8C00" :content="cartItemsCount" overlap>
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="text" class="text-none text-white">
          <v-icon left color="#FF8C00">mdi-account-circle</v-icon>
          Захаров С.А.
        </v-btn>
      </template>
      <v-list>
        <v-list-item prepend-icon="mdi-account" title="Профиль" />
        <v-list-item prepend-icon="mdi-logout" title="Выйти" />
      </v-list>
    </v-menu>

    <FilterDrawer ref="filterDrawer" />
  </v-app-bar>
</template>

<script>
import FilterDrawer from './FilterDrawer.vue';

export default {
  name: 'Navbar',
  components: { FilterDrawer },
  emits: ['toggle-sidebar'],
  data() {
    return { cartItemsCount: 0 };
  },
  methods: {
    openFilterDrawer() {
      this.$refs.filterDrawer.open();
    },
  },
};
</script>