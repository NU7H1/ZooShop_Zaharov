<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="$emit('update:drawer', $event)"
    app
    color="#FFFFFF"
  >
    <v-list nav dense>
      <v-list-subheader style="color: #000000">Навигация</v-list-subheader>
      <v-list-item
        prepend-icon="mdi-home-outline"
        title="Главная"
        to="/"
        color="#FF8C00"
        rounded="lg"
      />
      <v-list-item
        prepend-icon="mdi-shopping"
        title="Каталог"
        to="/"
        color="#FF8C00"
        rounded="lg"
      />
      <v-list-item
        prepend-icon="mdi-cart"
        title="Корзина"
        to="/"
        color="#FF8C00"
        rounded="lg"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    drawer: Boolean,
  },
  emits: ['update:drawer'],
};
</script>
