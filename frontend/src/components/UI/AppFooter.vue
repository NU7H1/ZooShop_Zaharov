<template>
  <v-footer id="contacts" color="#000000" class="mt-8 pa-0">
    <v-container fluid class="pa-4">
      <v-row align="center">
        <!-- Логотип -->
        <v-col cols="12" sm="3" class="d-flex align-center">
          <v-icon color="#FF8C00" class="mr-2">mdi-store</v-icon>
          <span class="text-white font-weight-bold">ЗооМаркет</span>
        </v-col>

        <!-- Контакты -->
        <v-col cols="12" sm="6">
          <div class="d-flex flex-wrap align-center justify-center" style="gap: 24px;">
            <div class="d-flex align-center" style="gap: 6px;">
              <v-icon color="#FF8C00" size="16">mdi-phone</v-icon>
              <span class="text-grey-lighten-1 text-caption">+7 (999) 123-45-67</span>
            </div>
            <div class="d-flex align-center" style="gap: 6px;">
              <v-icon color="#FF8C00" size="16">mdi-email</v-icon>
              <span class="text-grey-lighten-1 text-caption">info@zoomarket.ru</span>
            </div>
            <div class="d-flex align-center" style="gap: 6px;">
              <v-icon color="#FF8C00" size="16">mdi-clock-outline</v-icon>
              <span class="text-grey-lighten-1 text-caption">Пн–Сб: 9:00–20:00</span>
            </div>
            <div class="d-flex align-center" style="gap: 6px;">
              <v-icon color="#FF8C00" size="16">mdi-map-marker</v-icon>
              <span class="text-grey-lighten-1 text-caption">г. Северодвинск, ул. Пушкина, 67</span>
            </div>
          </div>
        </v-col>

        <!-- Копирайт -->
        <v-col cols="12" sm="3" class="text-right">
          <span class="text-grey text-caption">© {{ new Date().getFullYear() }} ЗооМаркет</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>