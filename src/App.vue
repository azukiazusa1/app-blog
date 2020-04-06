<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        私のブログ
      </div>

      <v-spacer></v-spacer>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-search</v-icon>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
