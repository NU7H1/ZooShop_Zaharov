<template>
  <v-footer id="contacts" color="#000000" class="app-footer">
    <v-container fluid class="app-footer__inner">
      <div class="app-footer__row">
        <div class="app-footer__brand">
          <v-icon color="#FF8C00" size="18">mdi-store</v-icon>
          <span class="text-white text-body-2 font-weight-bold">ЗооМаркет</span>
        </div>
        <div class="app-footer__contacts">
          <span class="app-footer__contact">
            <v-icon color="#FF8C00" size="14">mdi-phone</v-icon>
            +7 (999) 123-45-67
          </span>
          <span class="app-footer__contact">
            <v-icon color="#FF8C00" size="14">mdi-email</v-icon>
            info@zoomarket.ru
          </span>
          <span class="app-footer__contact">
            <v-icon color="#FF8C00" size="14">mdi-clock-outline</v-icon>
            Пн–Сб: 9:00–20:00
          </span>
          <span class="app-footer__contact">
            <v-icon color="#FF8C00" size="14">mdi-map-marker</v-icon>
            г. Северодвинск, ул. Пушкина, 67
          </span>
        </div>
        <span class="app-footer__copy text-grey">© {{ year }} ЗооМаркет</span>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.app-footer {
  flex-shrink: 0;
  height: 72px;
  min-height: 72px;
  max-height: 72px;
  padding: 0;
  margin-top: auto;
}

.app-footer__inner {
  height: 72px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.app-footer__row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: nowrap;
  overflow: hidden;
}

.app-footer__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.app-footer__contacts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.app-footer__contact {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #bdbdbd;
  white-space: nowrap;
}

.app-footer__copy {
  font-size: 11px;
  flex-shrink: 0;
  white-space: nowrap;
}

@media (max-width: 960px) {
  .app-footer__contacts {
    display: none;
  }
}
</style>
