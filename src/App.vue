<template>
  <v-app>
    <v-app-bar
      app
      color="red accent-2"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        私のブログ
      </div>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>fas fa-search</v-icon>
      </v-btn>
      <toggle-dark-theme></toggle-dark-theme>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import toggleDarkTheme from '@/components/ToggleDarkTheme'
export default {
  name: 'App',
  components: {
    toggleDarkTheme
  }
};
</script>
