<template>
  <v-dialog v-model="dialog" max-width="420" persistent>
    <v-card rounded="xl">
      <v-card-title class="pa-6 pb-2">
        <div class="d-flex align-center">
          <v-icon color="#FF8C00" class="mr-2">mdi-login</v-icon>
          <span class="text-h6 font-weight-bold">Авторизация</span>
        </div>
      </v-card-title>

      <v-card-text class="pa-6 pt-2">
        <v-text-field
          v-model="login"
          label="Логин"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          density="compact"
          class="mb-3"
          hide-details
        />
        <v-text-field
          v-model="password"
          label="Пароль"
          prepend-inner-icon="mdi-lock"
          type="password"
          variant="outlined"
          density="compact"
          hide-details
        />
        <v-alert v-if="error" type="error" density="compact" variant="tonal" class="mt-3">
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions class="pa-6 pt-0">
        <v-btn variant="text" color="grey" @click="close">Отмена</v-btn>
        <v-spacer />
        <v-btn color="#FF8C00" variant="flat" :loading="loading" @click="submit">
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoginDialog',
  inject: ['loginService', 'userService'],
  emits: ['login-success'],
  data() {
    return {
      dialog: false,
      loading: false,
      login: '',
      password: '',
      error: '',
    };
  },
  methods: {
    open() {
      this.dialog = true;
      this.login = '';
      this.password = '';
      this.error = '';
    },
    close() {
      this.dialog = false;
    },
    async submit() {
      if (!this.login || !this.password) {
        this.error = 'Заполните логин и пароль';
        return;
      }
      this.loading = true;
      this.error = '';
      try {
        const authRes = await this.loginService.authorizationUser(this.login, this.password);
        sessionStorage.setItem('userRecordId', authRes.userId);

        const userData = await this.userService.getCurrentUser(authRes.userId);
        const fields = userData.fields;
        const fullName = `${fields.Surname || ''} ${fields.Name || ''} ${fields.Patronymic || ''}`.trim();
        const isAdmin = fields.Surname === 'Захаров';
        const role = isAdmin ? 'admin' : 'client';

        sessionStorage.setItem('userName', fullName);
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('userId', authRes.userId);

        this.$emit('login-success', { userName: fullName, role, userId: authRes.userId });
        this.close();
      } catch (err) {
        this.error = 'Неверный логин или пароль';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>