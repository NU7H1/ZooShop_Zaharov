<template>
  <v-footer id="contacts" color="#000000" class="pa-0" style="flex-shrink: 0;">
    <v-container fluid class="pa-3">
      <v-row align="center" no-gutters>
        <v-col cols="12" sm="3" class="d-flex align-center">
          <v-icon color="#FF8C00" size="18" class="mr-2">mdi-store</v-icon>
          <span class="text-white text-body-2 font-weight-bold">ЗооМаркет</span>
        </v-col>
        <v-col cols="12" sm="6">
          <div class="d-flex flex-wrap align-center justify-center" style="gap: 20px;">
            <div class="d-flex align-center" style="gap: 5px;">
              <v-icon color="#FF8C00" size="14">mdi-phone</v-icon>
              <span class="text-grey-lighten-1" style="font-size: 12px;">+7 (999) 123-45-67</span>
            </div>
            <div class="d-flex align-center" style="gap: 5px;">
              <v-icon color="#FF8C00" size="14">mdi-email</v-icon>
              <span class="text-grey-lighten-1" style="font-size: 12px;">info@zoomarket.ru</span>
            </div>
            <div class="d-flex align-center" style="gap: 5px;">
              <v-icon color="#FF8C00" size="14">mdi-clock-outline</v-icon>
              <span class="text-grey-lighten-1" style="font-size: 12px;">Пн–Вс: 9:00–21:00</span>
            </div>
            <div class="d-flex align-center" style="gap: 5px;">
              <v-icon color="#FF8C00" size="14">mdi-map-marker</v-icon>
              <span class="text-grey-lighten-1" style="font-size: 12px;">г. Москва, ул. Примерная, 1</span>
            </div>
          </div>
        </v-col>
        <v-col cols="12" sm="3" class="text-right">
          <span class="text-grey" style="font-size: 11px;">© {{ new Date().getFullYear() }} ЗооМаркет</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default { name: 'AppFooter' };
</script>