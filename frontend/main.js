import { createApp } from 'vue';
import App from './App.vue';
import router from './src/router';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { registerServices } from './src/plugins/api/services/index.js';

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' },
  icons: { defaultSet: 'mdi' },
});

const app = createApp(App);
registerServices(app);
app.use(router);
app.use(vuetify);
app.mount('#app');