<template>
  <v-app>
    <v-app-bar app hide-on-scroll>
      <v-app-bar-nav-icon @click="openDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="title-link text--primary" to="/">{{ getBlogInfo.title }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <search-date></search-date>
      <toggle-dark-theme></toggle-dark-theme>
    </v-app-bar>
    <nav-drawer :drawer.sync="drawer"></nav-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import SearchDate from '@/components/SearchDate'
import ToggleDarkTheme from '@/components/ToggleDarkTheme'
import NavDrawer from '@/components/NavDrawer'
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters('blog', ['getBlogInfo'])
  },
  components: {
    SearchDate,
    ToggleDarkTheme,
    NavDrawer
  }
};
</script>

<style>
.title-link {
  text-decoration: none;
}
</style>