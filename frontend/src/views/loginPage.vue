<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 80vh;">
    <v-card width="420" rounded="xl" elevation="3">
      <v-card-title class="pa-6 pb-2">
        <div class="d-flex align-center">
          <v-icon color="#FF8C00" class="mr-2">mdi-store</v-icon>
          <span class="text-h6 font-weight-bold">ЗооМаркет</span>
        </div>
      </v-card-title>

      <!-- Табы -->
      <v-tabs v-model="tab" color="#FF8C00" class="px-4">
        <v-tab value="login">Войти</v-tab>
        <v-tab value="register">Регистрация</v-tab>
      </v-tabs>

      <v-card-text class="pa-6">
        <!-- Логин -->
        <div v-if="tab === 'login'">
          <v-text-field
            v-model="loginForm.login"
            label="Логин"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            density="compact"
            class="mb-3"
            hide-details
          />
          <v-text-field
            v-model="loginForm.password"
            label="Пароль"
            prepend-inner-icon="mdi-lock"
            :type="showPass ? 'text' : 'password'"
            :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPass = !showPass"
            variant="outlined"
            density="compact"
            class="mb-4"
            hide-details
          />
          <v-alert v-if="error" type="error" density="compact" class="mb-3" variant="tonal">
            {{ error }}
          </v-alert>
          <v-btn color="#FF8C00" variant="flat" block size="large" @click="doLogin" :loading="loading">
            Войти
          </v-btn>
        </div>

        <!-- Регистрация -->
        <div v-if="tab === 'register'">
          <v-text-field
            v-model="registerForm.name"
            label="Имя"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            density="compact"
            class="mb-3"
            hide-details
          />
          <v-text-field
            v-model="registerForm.login"
            label="Логин"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            density="compact"
            class="mb-3"
            hide-details
          />
          <v-text-field
            v-model="registerForm.password"
            label="Пароль"
            prepend-inner-icon="mdi-lock"
            :type="showPass ? 'text' : 'password'"
            :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPass = !showPass"
            variant="outlined"
            density="compact"
            class="mb-4"
            hide-details
          />
          <v-alert v-if="error" type="error" density="compact" class="mb-3" variant="tonal">
            {{ error }}
          </v-alert>
          <v-btn color="#FF8C00" variant="flat" block size="large" @click="doRegister" :loading="loading">
            Зарегистрироваться
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  inject: ['setUser'],
  data() {
    return {
      tab: 'login',
      showPass: false,
      loading: false,
      error: '',
      loginForm: { login: '', password: '' },
      registerForm: { name: '', login: '', password: '' },
    };
  },
  methods: {
    async doLogin() {
      this.error = '';
      this.loading = true;
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.loginForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        this.setUser(data);
        this.$router.push('/');
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    async doRegister() {
      this.error = '';
      this.loading = true;
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.registerForm),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        this.setUser(data);
        this.$router.push('/');
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>