<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        私のブログ
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>fas fa-search</v-icon>
      </v-btn>
      <toggle-dark-theme></toggle-dark-theme>
    </v-app-bar>
    <nav-drawer :drawer.sync="drawer"></nav-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import ToggleDarkTheme from '@/components/ToggleDarkTheme'
import NavDrawer from '@/components/NavDrawer'
export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),
  methods: {
    openDrawer() {
      this.drawer = true
    }
  },
  components: {
    ToggleDarkTheme, NavDrawer
  }
};
</script>
