<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="$emit('update:drawer', $event)"
    app
    color="#FFFFFF"
  >
    <v-list nav dense>
      <v-list-subheader class="text-black">Навигация</v-list-subheader>

      <v-list-item
        prepend-icon="mdi-home-outline"
        title="Главная"
        to="/"
        rounded="lg"
      />

      <v-list-group value="shopGroup">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-store"
            title="Магазин"
            :active="false"
          ></v-list-item>
        </template>

        <v-list-item
          prepend-icon="mdi-package-variant"
          title="Общие"
          :to="{ path: '/shop', query: { category: 'common' } }"
          class="ml-4"
          :class="{ 'active-category': ($route.query.category === 'common' || !$route.query.category) }"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-cat"
          title="Кошки"
          :to="{ path: '/shop', query: { category: 'cat' } }"
          class="ml-4"
          :class="{ 'active-category': $route.query.category === 'cat' }"
        ></v-list-item>

        <v-list-item
          prepend-icon="mdi-dog"
          title="Собаки"
          :to="{ path: '/shop', query: { category: 'dog' } }"
          class="ml-4"
          :class="{ 'active-category': $route.query.category === 'dog' }"
        ></v-list-item>
      </v-list-group>

      <v-list-item
        prepend-icon="mdi-sale"
        title="Акции"
        to="/sales"
        rounded="lg"
      />

      <v-list-item
        prepend-icon="mdi-phone-outline"
        title="Контакты"
        to="/contacts"
        rounded="lg"
      />
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

<style scoped>
/* Полное переопределение всех состояний – убираем серые фоны, рамки, тени */
.v-list-item {
  background-color: transparent !important;
  color: #000000 !important;
  box-shadow: none !important;
  outline: none !important;
}

.v-list-item .v-icon {
  color: #000000 !important;
}

/* Убираем фон при наведении, фокусе, активном состоянии */
.v-list-item:hover,
.v-list-item:focus,
.v-list-item:active,
.v-list-item--link:hover,
.v-list-item--active,
.v-list-item--active:hover,
.v-list-item--active:focus {
  background-color: transparent !important;
  color: #000000 !important;
}

.v-list-item:hover .v-icon,
.v-list-item--active .v-icon {
  color: #000000 !important;
}

/* Для групп – убираем фон у родительского элемента */
.v-list-group .v-list-item--active {
  background-color: transparent !important;
  color: #000000 !important;
}

.v-list-group .v-list-item--active .v-icon {
  color: #000000 !important;
}

/* Активная категория – оранжевая подсветка */
.active-category {
  background-color: rgba(255, 140, 0, 0.12) !important;
  color: #FF8C00 !important;
  border-left: 3px solid #FF8C00;
}

.active-category .v-icon {
  color: #FF8C00 !important;
}

/* Дополнительно: убираем серый фон у кнопок-активаторов группы */
.v-list-group__activator .v-list-item--active {
  background-color: transparent !important;
  color: #000000 !important;
}
</style>