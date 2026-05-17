<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="$emit('update:drawer', $event)"
    app
    color="#FFFFFF"
  >
    <v-list nav dense>
      <v-list-subheader class="text-black">Навигация</v-list-subheader>
      <v-list-item prepend-icon="mdi-home-outline" title="Главная" to="/" color="#FF8C00" rounded="lg" />
      
      <v-list-group value="shopGroup" color="#FF8C00">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" prepend-icon="mdi-store" title="Магазин" color="#FF8C00"></v-list-item>
        </template>
        <v-list-item title="Общие" to="/shop?category=common" link class="ml-4" color="#FF8C00"></v-list-item>
        <v-list-item title="Кошки" to="/shop?category=cat" link class="ml-4" color="#FF8C00"></v-list-item>
        <v-list-item title="Собаки" to="/shop?category=dog" link class="ml-4" color="#FF8C00"></v-list-item>
      </v-list-group>
      
      <v-list-item prepend-icon="mdi-sale" title="Акции" to="/sales" color="#FF8C00" rounded="lg" />
      <v-list-item prepend-icon="mdi-phone-outline" title="Контакты" to="/contacts" color="#FF8C00" rounded="lg" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: { drawer: Boolean },
  emits: ['update:drawer'],
};
</script>