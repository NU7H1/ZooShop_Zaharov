<template>
  <v-app-bar color="#000000" dark flat app elevation="2">
    <v-app-bar-nav-icon @click="$emit('toggle-sidebar')" />

    <div class="d-flex align-center">
      <v-icon color="#FF8C00">mdi-store</v-icon>
      <v-toolbar-title class="ml-2" style="color: white"
        >ЗооМаркет</v-toolbar-title
      >
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

    <v-btn icon @click="showCart = !showCart" style="color: white">
      <v-badge color="#FF8C00" content="3" overlap>
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          variant="text"
          class="text-none"
          style="color: white"
        >
          <v-icon left color="#FF8C00">mdi-account-circle</v-icon>
          Захаров С.А.
        </v-btn>
      </template>
      <v-list>
        <v-list-item prepend-icon="mdi-account" title="Профиль" />
        <v-list-item prepend-icon="mdi-logout" title="Выйти" />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  emits: ['toggle-sidebar'],
  data() {
    return {
      showCart: false,
    };
  },
};
</script>
