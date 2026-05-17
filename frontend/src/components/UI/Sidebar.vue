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
        color="#FF8C00"
        rounded="lg"
      />

      <v-list-item
        prepend-icon="mdi-store"
        title="Магазин"
        color="#FF8C00"
        rounded="lg"
        :active="isShopActive && !currentCategory"
        @click="navigateShop(null)"
      />

      <v-list-item
        prepend-icon="mdi-package-variant"
        title="Общие товары"
        color="#FF8C00"
        rounded="lg"
        style="margin-left: 12px;"
        :active="currentCategory === 'common'"
        @click="navigateShop('common')"
      />
      <v-list-item
        prepend-icon="mdi-cat"
        title="Кошки"
        color="#FF8C00"
        rounded="lg"
        style="margin-left: 12px;"
        :active="currentCategory === 'cat'"
        @click="navigateShop('cat')"
      />
      <v-list-item
        prepend-icon="mdi-dog"
        title="Собаки"
        color="#FF8C00"
        rounded="lg"
        style="margin-left: 12px;"
        :active="currentCategory === 'dog'"
        @click="navigateShop('dog')"
      />

      <v-list-item
        prepend-icon="mdi-sale"
        title="Акции"
        to="/sales"
        color="#FF8C00"
        rounded="lg"
      />

      <v-list-item
        prepend-icon="mdi-phone-outline"
        title="Контакты"
        color="#FF8C00"
        rounded="lg"
        @click="scrollToContacts"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: { drawer: Boolean },
  emits: ['update:drawer'],
  computed: {
    isShopActive() {
      return this.$route.path === '/shop';
    },
    currentCategory() {
      return this.$route.query.category || null;
    },
  },
  methods: {
    navigateShop(category) {
      if (category) {
        this.$router.push({ path: '/shop', query: { category } });
      } else {
        this.$router.push({ path: '/shop' });
      }
    },
    scrollToContacts() {
  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>